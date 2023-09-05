import React, { useContext } from "react";
import { Grid,Autocomplete,TextField } from "@mui/material";
import { AppContext } from "../../AppContextProvider";

function studentIdList(props){
    let studentIdList = [];
    props.forEach(student=>{
        studentIdList.push( student.StudentId.toString());
    })
    return studentIdList;
}

function studentNameList(props){
    let studentsNameList = [];
    props.forEach(student => {
        studentsNameList.push(student.Name.FirstName+' '+student.Name.LastName)
    });
    return studentsNameList;
}

export default function NameIdSearchBox(props){
    const {allStudents} = useContext(AppContext);
    let students = studentNameList(allStudents);
    let studentIds = studentIdList(allStudents);
    const [studentName,setStudentName,studentId,setStudentId] = props.setList

    const studentChange =(event,newStudent)=>{
       setStudentName(newStudent);
       setStudentId(null);
      
    }
    const studentIdChange=(event,newId)=>{
        setStudentId(newId);
        setStudentName(null);
    }




    return(
        <>
        <Grid item xs={12} ml={-3}>
            <Autocomplete
                disablePortal
                id="name_search"
                options={students}
                sx={{ m:1,width: '100%' }}
                size="small"
                value={studentName || null}
                onChange={studentChange}
                renderInput={(params) => <TextField {...params} label="Name"/>}
                />
        </Grid>
        <Grid item xs={12} ml={-3}>
            <Autocomplete
                disablePortal
                id="id_search"
                options={studentIds}
                size="small"
                sx={{ m:1,width: '100%' }}
                value={studentId || null}
                onChange={studentIdChange}
                renderInput={(params) => <TextField {...params} label="ID"/>}
                />
        </Grid>
      </> 
    )
}