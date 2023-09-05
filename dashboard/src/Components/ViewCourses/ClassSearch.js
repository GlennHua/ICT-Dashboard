import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import { departmentName, departmentFullName } from '../ReportsHomepage/DepartmentListDB';
import { AppContext } from '../../AppContextProvider';
import { useContext, useState, useEffect } from 'react';

/**
 * View Course Page > Course Search Paper Content.
 * Get the department and relevant course number data.
 * Use them to filter the course list in CourseListDB.js.
 * 
 * @param props 
 * @param {list} setList 
 *       Content - [department, setDepartment, number, setNumber].
 *       Use to change the useState in the ViewCourses.js
 * @return {React.Fragment} 
 *       Display two Autocomplete box for department and relevant course number selection.
 */

export default function ClassSearch(props) {
  // const { dashboard_st } = useContext(AppContext);
  const context = useContext(AppContext);

  const [subjectListWithAbbr, setSubjectListWithAbbr] = useState([])

  // console.log(context.courseList)

  let [department, setDepartment, number, setNumber] = props.setList;


  // const getSubjectWithAbbr = (courses) ={

  // }

  //let subjectList = []
  // context.courseList.map(
  //   course => subjectList.push(course.Subject)
  // )
  // subjectList = [...new Set(subjectList)];

  // let subjectListWithAbbr = departmentFullName(subjectList)
  // // subjectList.map((
  // //   subject => subjectListWithAbbr.push(subject + " (" + departmentName(subject) + ")")
  // // ))
  // console.log(subjectListWithAbbr)

  //let subjectListWithAbbr = []

  const subjectListReformat = () =>{
    let subjectList = []
    if(context.courseList && context.courseList.length>0){
      context.courseList.map(
        course => subjectList.push(course.Subject)
      )
      subjectList = [...new Set(subjectList)];
      let subjectFullNameList = departmentFullName(subjectList)
      let newSubjectList= []
      for (let i = 0; i < subjectFullNameList.length; i++) {
        newSubjectList.push(subjectFullNameList[i] + " (" + subjectList[i] + ")");
      }
      // console.log(newSubjectList)
      setSubjectListWithAbbr(newSubjectList)
    }
  }

  useEffect(()=>{
    subjectListReformat()

  }, [context.courseList])

  // let departments = departmentName(dashboard_st);
  // let departmentsTotalName = departmentFullName(departments);

  // const departmentList = [];
  // for (let i = 0; i < departments.length; i++) {
  //   departmentList.push(departmentsTotalName[i] + " (" + departments[i] + ")");
  // }

  const departmentChange = (event, newDepartment) => {
    setDepartment(newDepartment);
    setNumber("");
  }

  const courseNumberChange = (event) => {
    // console.log(event.target.value)
    setNumber(event.target.value);
    // console.log(number)
  }

  
  return (
    <React.Fragment>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100%' },
        }}
      >
        <Typography variant='h5'>
          Course Search
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4} align='center'>
            <Typography variant="h6" textAlign='center'>
              Select subject
            </Typography>
          </Grid>
          <Grid item xs={7.7}>
            <Autocomplete
              disablePortal
              id="select-subject"
              options={subjectListWithAbbr}
              sx={{ width: '100%' }}
              value={department || null}
              onChange={departmentChange} 
              renderInput={(params) => <TextField {...params} placeholder='Select subject' />}
            />
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h6" textAlign='center' >
              Course number
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField value={number} placeholder='Input course number' onChange={courseNumberChange} id="course-number" />
          </Grid>
          </Grid>
      </Box>
    </React.Fragment>
  );
}
