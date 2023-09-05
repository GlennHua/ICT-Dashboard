import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
// import {departmentName, departmentFullName} from './DepartmentListDB';
import { AppContext } from '../../AppContextProvider';
import { useContext ,useState, useEffect } from 'react';

/**
 * Reports Home Page > Department Search Paper Content.
 * Get the department data, use it to filter the department list in DepartmentListDB.js.
 * 
 * @param props 
 * @param {list} setList 
 *       Content - [department, setDepartment].
 *       Use to change the useState in the ReportsHomepage.js
 * @return {React.Fragment} 
 *       Display one Autocomplete box for department selection.
 */

export default function ClassSearch(props) {
  const context = useContext(AppContext)
  const [subjectListWithAbbr, setSubjectListWithAbbr] = useState([])
  const [currentDepartment, setCurrentDepartment] = useState('');
  let [department, setDepartment]=props.setList;

  // const { dashboard_st } = useContext(AppContext);

  

  //Original
  // let departments = departmentName(dashboard_st);
  // let departmentsTotalName = departmentFullName(departments);
  // const departmentList = [];
  // for (let i = 0; i < departments.length; i++) {
  //   departmentList.push(departmentsTotalName[i] + " (" + departments[i] + ")");
  // }


  // const subjectListReformat = () =>{
  //   let subjectList = []
  //   if(context.courseList && context.courseList.length > 0){
  //     context.courseList.map(
  //       course => subjectList.push(course.Subject)
  //     )
  //     subjectList = [...new Set(subjectList)];
  //     let subjectFullNameList = departmentFullName(subjectList)
  //     let newSubjectList= []
  //     for (let i = 0; i < subjectFullNameList.length; i++) {
  //       newSubjectList.push(subjectFullNameList[i] + " (" + subjectList[i] + ")");
  //     }
  //     setSubjectListWithAbbr(newSubjectList)
  //   }
  // }

  // useEffect(() => {
  //   subjectListReformat()
  // }, [context.courseList])


  const getSubjectsFromContext = () =>{
    if(context.subjectList && context.subjectList.length > 0){
      setSubjectListWithAbbr(context.subjectList)
    }
  }

  useEffect(() => {
    getSubjectsFromContext()
  }, [context.subjectList])


  
  const departmentChange = (event, newDepartment) => {
 
    setCurrentDepartment(newDepartment);
    setDepartment(newDepartment);
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
          Search by department
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={8}>
          <Autocomplete
              disablePortal
              id="department_search"
              options={subjectListWithAbbr}
              sx={{ width: '100%' }}
              value={currentDepartment || null}
              onChange={departmentChange} 
              renderInput={(params) => <TextField {...params} label="Department Search" />}
            />
            </Grid>          
        </Grid>
      </Box>
    </React.Fragment>
  );
}
