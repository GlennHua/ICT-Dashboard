import React from "react";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import RefreshIcon from '@mui/icons-material/Refresh';
import CourseGPASearchBox from "./SearchGrid_Course_GPA";
import YearSemesterSearchBox from "./SearchGrid_Year_Semester";
import NameIdSearchBox from "./SearchGrid_Name_Id";





export default function StudentSearch(props){
    let [rows,setRows,allCourse,course,setCourse,studentId,setStudentId,studentName,setStudentName,academicYear,setAcademicYear,semester,setSemester,undoRows,refresh,setRefresh] = props.setList;
    const courseGpaList = [rows,setRows,course,setCourse,allCourse,undoRows,semester,studentId,studentName,academicYear,refresh,studentId,studentName];
    const yearSemesterList = [semester,setSemester,academicYear,setAcademicYear,setCourse];
    const nameIdList =[studentName,setStudentName,studentId,setStudentId];

    const handleClickRefresh=(event)=>{
        setSemester(null);
        setAcademicYear(null);
        setStudentName(null);
        setStudentId(null);
        setCourse(null);
        setRefresh(true);
    }
   return(
    
        <React.Fragment>
            <Box 
             component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100%' },
        }}>
                  
                         <Typography variant='h6'>
                            Search Student
                         </Typography>  
                   
        <Grid container spacing={1}>
       
            <Grid item xs={3}>
                <NameIdSearchBox setList={nameIdList}/>
            </Grid>
            <Grid item xs={3}> 
                <YearSemesterSearchBox setList={yearSemesterList} 
            /></Grid>
            <Grid item xs={3} >
                <CourseGPASearchBox setList={courseGpaList} />
            </Grid>
            <Grid item xs={3}>
                    <Grid item xs={12} textAlign={'center'} sx={{m:1}}>
                        <Button 
                            size="small" 
                            onClick={handleClickRefresh} >       
                            <RefreshIcon fontSize="small" /> 
                            <Typography variant="h7" ml={1}>Clear search </Typography>       
                        </Button>
                    </Grid>
                </Grid>    
        </Grid>
     </Box>
        </React.Fragment>
   )
}