import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography, Button,Autocomplete,TextField } from "@mui/material";
import YearSemesterSearchBox from "./SearchGrid_Year_Semester";
import GradeSearchBox from './SearchGrid_Grade';
import RefreshIcon from '@mui/icons-material/Refresh';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

export default function PerformanceSearch(props){
  
    const [isPass,setIsPass,semester,setSemester,academicYear,setAcademicYear,setCourse,grade,setGrade,allGrade] = props.setList;
    const yearSemesterList = [semester,setSemester,academicYear,setAcademicYear,setCourse];
    const gradeList = [isPass,setIsPass,grade,setGrade,allGrade]

    const handleClickRefresh = ()=>{
        setAcademicYear(null);
        setSemester(null);
        setGrade(null);
        setIsPass('');
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
                <Grid item xs={4}> 
                        <YearSemesterSearchBox setList={yearSemesterList} />
                </Grid>
                
                <Grid item xs={4}>
                        <GradeSearchBox gradeList = {gradeList}/>
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