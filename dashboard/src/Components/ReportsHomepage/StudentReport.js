import * as React from 'react';
import  {useState,useEffect,useContext} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Bar } from '../SharedComponent/SharedBarContent';
import Paper from '@mui/material/Paper';
import { formatStudentData, getExportJsonData} from './controller';
import { AppContext } from '../../AppContextProvider';
import StudentSearch from './StudentSearch';
import axios from 'axios';
import ExportCsv from './ExportCsv';
import StudentTable from './StudentTable';


export default function StudentPage() {
  const [studentsInfo,setStudentsInfo] = useState([]);
  const [takesInfo,setTakesInfo] = useState([]);
  const [rows,setRows] = useState([]);
  const [undoRows,setUndoRows] = useState([]);
  const {allStudents,allTakes,courseList} = useContext(AppContext);
  const [allCourse, setAllCourse] = useState([]);
  const [studentName,setStudentName] = useState(null);
  const [studentId,setStudentId] = useState(null);
  const [course,setCourse] = useState(null);
  const [academicYear,setAcademicYear] = useState(null);
  const [semester,setSemester] = useState(null);
  const [refresh,setRefresh] = useState(false);
  let setList = [rows,setRows,allCourse,course,setCourse,studentId,setStudentId,studentName,setStudentName,academicYear,setAcademicYear,semester,setSemester,undoRows,refresh,setRefresh,studentId,studentName];
  

  const handleCourseListChange=(props)=>{
    let courses =[];
    props.map((course)=>{
      courses.push(course.Subject+' '+course.Catalogue)
    })
    courses = [...new Set(courses)]
    setAllCourse(courses)
  }

  // init set info
  useEffect( ()=>{
    setStudentsInfo(allStudents);
    setTakesInfo(allTakes);   
    handleCourseListChange(courseList)
  },[allStudents,allTakes,courseList]);

  // filter by Name
  useEffect(()=>{
    if(studentName!==null){
    const firstName = studentName.split(' ')[0];
    const lastName = studentName.split(' ')[1];
     axios.post('/api/student/getStudentByName',{firstName,lastName})
     .then(function(response){
      setStudentsInfo(response.data)  
     }) 
    }else{
      setStudentsInfo(allStudents);
      
    }
  },[studentName])

  // filter by Id
  useEffect(()=>{
    if(studentId!==null){
      axios.get(`/api/student/${studentId}`)
      .then(function(response){
        setStudentsInfo(response.data)
      })
    }else{
      setStudentsInfo(allStudents)
    }
  },[studentId])

  // filter by year, seemester, and course
  useEffect(()=>{
    if(course!==null){
      if(academicYear!==null){
        if(semester!==null){
          axios.post('/api/take/getTakesByCourseAcadYearAndSemester',
                    {Subject:course.split(' ')[0],
                     Catalogue:course.split(' ')[1],
                     semester,
                     academicYear})
          .then(function(response){
            setTakesInfo(response.data)
          })
        }else{
                      axios.post('/api/take/getTakesByCourseAndAcadYear',
                                {Subject:course.split(' ')[0],
                                Catalogue:course.split(' ')[1],
                                academicYear})
                      .then(function(response){
                        setTakesInfo(response.data)
                      })
        }
       
      } else{
                    axios.post('/api/take/getTakesByCourse',
                                { Subject:course.split(' ')[0],
                                Catalogue:course.split(' ')[1]})
                    .then(function(response){
                    setTakesInfo(response.data)
                    }) 
      }
    }else{
      if(academicYear!==null){
              if(semester!==null){
                axios.post('/api/take/getTakesByAcadYearAndSemester',{academicYear,semester})
                .then(function(response){
                  setTakesInfo(response.data);
                  handleCourseListChange(response.data)
                })
              }else{
                axios.post('/api/take/getTakesByAcadYear',{academicYear})
                .then(function(response){
                  setTakesInfo(response.data);
                  handleCourseListChange(response.data);
                })
              }
      }else{
        setTakesInfo(allTakes);
        handleCourseListChange(courseList);
      }
    }
  },[course,semester,academicYear])

  useEffect(()=>{
    setStudentsInfo(allStudents)
    setTakesInfo(allTakes);
    handleCourseListChange(courseList);
    setRefresh(false);
    getExportJsonData(rows)
  },[refresh])

  //set rows 
  useEffect(()=>{
    setRows(formatStudentData(studentsInfo,takesInfo));
    setUndoRows(formatStudentData(studentsInfo,takesInfo));
  },[studentsInfo,takesInfo,refresh])
 
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
                <StudentSearch setList={setList} />
              </Paper>
            </Grid>
              {/* Student Report */}
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
  );
}