import React, { useEffect, useState } from "react";
import { Grid,Autocomplete,TextField} from "@mui/material";
import {filterByGpaRange } from "./controller";


export default function CourseGPASearchBox(props){ 
  const [greaterNumber,setGreaterNumber] = useState('');
  const [lowerNumber,setLowerNumber] = useState('');

  const [rows,setRows,course,setCourse,allCourse,undoRows,refresh,academicYear,semester,studentId,studentName]  = props.setList;
 
    const courseChange=(event,newCourse)=>{
        setCourse(newCourse);
    }

    const handleGreaterChange=(event)=>{
        setGreaterNumber(event.target.value)
        if(lowerNumber===''){
          setLowerNumber(0);
        }
     
    }
    const handleLowerChange=(event)=>{
      setLowerNumber(event.target.value)
      if(greaterNumber===''){
        setGreaterNumber('9')
      }
    }
 

  useEffect(()=>{
    if(greaterNumber!=='' && lowerNumber!==''){
    setRows(filterByGpaRange(greaterNumber,lowerNumber,undoRows))
   } 
  },[greaterNumber,lowerNumber])

  useEffect(()=>{
    setGreaterNumber('');
    setLowerNumber('');
  },[refresh,course,studentId,studentName,academicYear,semester])

return(
    <>   
            <Grid item xs={12} ml={4}>
            <Autocomplete
                    disablePortal
                    id="course_search"
                    options={allCourse}
                    size="small"
                    sx={{ m:1,width: '100%' }}
                    value={course || null}
                    onChange={courseChange}
                    renderInput={(params) => <TextField {...params} label="Course"/>}
                    />
            </Grid> 
            <Grid item xs={12}  ml={4}>
            <div style={{ display: 'flex'}}>
            <TextField
        sx={{m:1,width:"49%"}}
        label="Lower"
        InputLabelProps={{
          style:{fontSize:'14px'}
        }}
        value={lowerNumber}
        variant="outlined"
        size="small"
        type="number"
        inputProps={{min:0,max:9}}
        onChange={handleLowerChange}
      />
      <span style={{margin:'15px 8px'}}>—</span>
      <TextField 
        sx={{m:1,width:"49%"}}
        label="Greater"
        InputLabelProps={{
          style:{fontSize:'14px'}
        }}
        value={greaterNumber}
        variant="outlined"
        size="small"
        type="number"
        inputProps={{min:0,max:9}}
        onChange={handleGreaterChange}
      />
    </div>
            </Grid> 
          </>
)


}