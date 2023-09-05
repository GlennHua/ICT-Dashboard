import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {Autocomplete,FormControl,InputLabel,TextField,Select, MenuItem} from "@mui/material";


export default function GradeSearchBox(props){
   
 
    const [isPass,setIsPass,grade,setGrade,allGrade] = props.gradeList;

    const gradeChange = (event,newGrade)=>{
        setGrade(newGrade)
    }  

    const handleSelectIsPass= (event)=>{
        setIsPass(event.target.value)
        
    }

    return(
        <>
            <Grid item xs={12} ml={4}>
                <FormControl sx={{ m:1,width: '100%' }} size="small">
                    <InputLabel>Pass or Fail</InputLabel>
                    <Select 
                    value={isPass}
                    onChange={handleSelectIsPass}
                    >
                        <MenuItem key={'pass'} value={'pass'}>
                            Pass
                        </MenuItem>
                        <MenuItem key={'fail'} value={'fail'}>
                            Fail
                        </MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} ml={4}>
                    <Autocomplete
                                disablePortal
                                id="grade_search"
                                options={allGrade}
                                size="small"
                                sx={{ m:1,width: '100%' }}
                                value={grade|| null}
                                onChange={gradeChange}
                                renderInput={(params) => <TextField {...params} label="Grade"/>}
                                />
                </Grid>
                
        </>
    )

}