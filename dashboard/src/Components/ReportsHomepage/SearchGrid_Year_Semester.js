import React, { useContext, useState,useEffect } from "react";
import { Grid,FormControl,InputLabel,Select,MenuItem,Autocomplete,TextField } from "@mui/material";
import { AppContext } from "../../AppContextProvider";
import axios from "axios";

export default function YearSemesterSearchBox(props){
    const {allTakes} = useContext(AppContext);
    const [allAcadYear,setAllAcadYear] = useState([]);
    const [allSemester,setAllSemester] = useState([]);
    const [semester,setSemester,academicYear,setAcademicYear,setCourse] = props.setList;

    const yearChange=(event,newYear)=>{
        setAcademicYear(newYear);
        setSemester(null);
        setCourse(null)
      
    }
    const semesterChange=(event,newSemester)=>{
        setSemester(newSemester);
        setCourse(null);
    
    }

    useEffect(()=>{
        let acadYear =[];
         allTakes.map((take)=>{
            acadYear.push(take.AcademicYear.toString())
        })
        acadYear = [...new Set(acadYear)];
        setAllAcadYear(acadYear);
    },[allTakes])


useEffect(()=>{
    let semesters = [];
    if(academicYear!==null){
        axios.post('/api/take/getTakesByAcadYear',{academicYear: parseInt(academicYear)})
        .then(function(response){
         const   takes = response.data;
            takes.map((take)=>{
                semesters.push(take.Semester);     
            })
            semesters = [...new Set(semesters)];
            setAllSemester(semesters)
        })
    }else{ 
        setAllSemester([])}
   
},[academicYear])
    

return(
      
  <>
        <Grid item xs={12} ml={4}>
        <Autocomplete
                        disablePortal
                        id="year_search"
                        options={allAcadYear}
                        size="small"
                        sx={{ m:1,width: '100%' }}
                        value={academicYear || null}
                        onChange={yearChange}
                        renderInput={(params) => <TextField {...params} label="Year"/>}
                        />
        </Grid> 
        <Grid item xs={12} ml={4}>
    
        <Autocomplete
                        disablePortal
                        id="semester_search"
                        options={allSemester}
                        size="small"
                        sx={{ m:1,width: '100%' }}
                        value={semester || null}
                        onChange={semesterChange}
                        renderInput={(params) => <TextField {...params} label="Semester"/>}
                        />
        </Grid> 
  </>

)

}