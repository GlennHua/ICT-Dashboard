import React from "react";
import { useContext,useState, useEffect } from "react";
import StudentTable from "./StudentTable";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { AppContext } from "../../AppContextProvider";
import { formatStudentData,getStudentByGrade } from "./controller";
import PerformanceSearch from "./PerformanceSearch";
import ExportCsv from "./ExportCsv";
import axios from "axios";

export default function PerformancePage(){
    const {allStudents,allTakes} = useContext(AppContext);
    const [studentsInfo,setStudentsInfo] = useState([]);
    const [takesInfo,setTakesInfo] = useState([]);
    const [isPass,setIsPass] = useState('');
    const [grade,setGrade] = useState(null);
    const [allGrade,setAllGrade] = useState([]);
    const [academicYear,setAcademicYear] = useState(null);
    const [semester,setSemester] = useState(null);
    const [course,setCourse] = useState(null);
    const [rows,setRows] = useState([]);
    const [undoRows,setUndoRows] = useState([]);

    let setList = [isPass,setIsPass,semester,setSemester,academicYear,setAcademicYear,setCourse,grade,setGrade,allGrade,setAllGrade]
    
    const handleGradeListChange=(props)=>{
        let grades = [];
        props.map((course)=>{
            grades.push(course.Grade)
        })
        grades = [...new Set(grades)];
        grades = [...grades].sort((a,b)=>a.localeCompare(b))
        setAllGrade(grades)
    }

      useEffect( ()=>{
        setStudentsInfo(allStudents);
        setTakesInfo(allTakes); 
        handleGradeListChange(allTakes);     
      },[allStudents,allTakes]);

useEffect(()=>{
    if(academicYear!==null){
        if(semester!==null){
          axios.post('/api/take/getTakesByAcadYearAndSemester',{academicYear,semester})
          .then(function(response){
            setTakesInfo(response.data);
          })
        }else{
          axios.post('/api/take/getTakesByAcadYear',{academicYear})
          .then(function(response){
            setTakesInfo(response.data);
          })
        }
}else{
  setTakesInfo(allTakes);

}
},[semester,academicYear])


useEffect(()=>{
    if(grade!==null){
 setRows(getStudentByGrade(grade,undoRows));        
    }else{
        setRows(formatStudentData(studentsInfo,takesInfo));
    }
},[grade])

useEffect(()=>{

    if(isPass!==''){
        if(academicYear!==null){
                if(semester!==null){
                        axios.post('/api/take/getAllPassedFailedByAcadYearAndSemester',{academicYear,semester})
                        .then(function(response){
                            if(isPass==='pass'){
                                setTakesInfo(response.data.passTakes)
                            }else{
                                setTakesInfo(response.data.failTakes)
                            } 
                        })
                }else{
                    axios.post('/api/take/getAllPassedFailedByAcadYear',{academicYear})
                    .then(function(response){
                        if(isPass==='pass'){
                            setTakesInfo(response.data.passTakes)
                        }else{
                            setTakesInfo(response.data.failTakes)
                        } 
                    })
                }
        } else{
            axios.post('/api/take/getAllPassedFailed')
            .then(function(response){
                if(isPass==='pass'){
                    setTakesInfo(response.data.passTakes)
                }else{
                    setTakesInfo(response.data.failTakes)
                } 
            })
        }
       
    }  
    setGrade(null)
},[isPass])

useEffect(()=>{
    setGrade(null);
    setIsPass('')
},[academicYear,semester])

      useEffect(()=>{
        setRows(formatStudentData(studentsInfo,takesInfo));
        setUndoRows(formatStudentData(studentsInfo,takesInfo));
        handleGradeListChange(takesInfo);
      },[studentsInfo,takesInfo])   

return (
  <Box sx={{ display: 'flex' }}>
  <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
  >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

          <ExportCsv rows={rows} 
                      academicYear={academicYear}
                      semester={semester}
                      course={course}>

          </ExportCsv>

        <Grid container spacing={3}>
            {/*  Search */}
          <Grid item xs={12} >
            <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 220,
                }}
              >
           <PerformanceSearch setList={setList}/>
            </Paper>
          </Grid>
            {/* Performance Report */}
          <Grid item xs={12}>
            <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 'auto'
                }}
            >
            <StudentTable
                rows={rows}
                />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </Box>
)

}