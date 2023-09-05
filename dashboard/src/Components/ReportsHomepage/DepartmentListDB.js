import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { AppContext } from '../../AppContextProvider';
import { useContext, useEffect, useState } from 'react';

/**
 * Get the list of department (subject).
 * 
 * @param {JSON list} dashboard_st MongoDB database dummy data JSON list - initial version
 * @return {list} departments
 */

// export function departmentName(dashboard_st) {
//   let departments = [];
//   dashboard_st.forEach(
//     dashboard_st => departments.push(dashboard_st.Subject)
//   )
//   // Remove duplicate elements from the array
//   departments = [...new Set(departments)];
//   departments.sort();
//   return departments;
// }

/**
 * Get the list of department full name.
 * 
 * @param {list} departments Specific department/subject list
 * @return {list} departmentsTotalName
 */

export function departmentFullName(departments) {
  let departmentsTotalName = [];
  for (let department of departments) {
    if (department == "COMPSCI") {
      departmentsTotalName.push("Computer Science");
    }
    else if (department == "INFOSYS") {
      departmentsTotalName.push("Information Systems");
    }
    else if (department == "OPSMGT") {
      departmentsTotalName.push("Operations and Supply Chain Management");
    }
    else if (department == "SOFTENG") {
      departmentsTotalName.push("Software Engineering");
    }
    else if (department == "HLTHINFO") {
      departmentsTotalName.push("Health Informatics");
    }
    else if (department == "STATS") {
      departmentsTotalName.push("Statistics");
    }
    else if (department == "GLMI") {
      departmentsTotalName.push("Global Management and Innovation");
    }
    else if (department == "SCIENT") {
      departmentsTotalName.push("Science Enterprise");
    }
    else if (department == "COMPSYS") {
      departmentsTotalName.push("Computer Systems Engineering");
    }
    else if (department == "ELECTENG") {
      departmentsTotalName.push("Electrical & Electronic Engineering");
    }
    else if (department == "ACADINT") {
      departmentsTotalName.push("Academic Integrity Course");
    }
  }
  return departmentsTotalName;
}

/**
 * Get the total number of courses for each department.
 * 
 * @param {JSON list} dashboard_st MongoDB database dummy data JSON list - initial version
 * @param {list} departments Specific department list
 * @return {list} coursesNumber
 */

// export function departmentCourseNumber(dashboard_st, departments) {
//   let coursesNumber = [];
//   for (let department of departments) {
//     let courses = [];
//     let courseInDepartment = dashboard_st.filter(s => s.Subject === department);
//     courseInDepartment.forEach(element => {
//       courses.push(department + " " + element.Catalogue)
//     })
//     courses = [...new Set(courses)];
//     coursesNumber.push(courses.length);
//   }
//   return coursesNumber;
// }

/**
 * Get the filtered department data JSON list.
 * 
 * @param {JSON list} dashboard_st MongoDB database dummy data JSON list - initial version
 * @return {JSON list} 
 *       Content - departmentName, departmentTotalName and courseNumber
 */

// function getDepartmentData(dashboard_st) {
//   let departments = departmentName(dashboard_st);
//   let departmentsTotalName = departmentFullName(departments);
//   let coursesNumber = departmentCourseNumber(dashboard_st, departments);

//   // Combine the above arrays into the general departmentData array, to display in the card
//   const departmentData = [];
//   for (let i = 0; i < departments.length; i++) {
//     const data = {
//       departmentName: departments[i],
//       departmentTotalName: departmentsTotalName[i],
//       courseNumber: coursesNumber[i]
//     }
//     departmentData.push(data);
//   }
//   return departmentData;
// }

/**
 * Reports Home Page > Department List Paper Content.
 * Display the filtered department list.
 * 
 * @param props 
 * @param {list} setList 
 *       Content - [department, setDepartment].
 *       Use to change the useState in the ReportsHomepage.js
 * @return {React.Fragment} 
 *       Display filtered department list.
 */

export default function DisplayDepartmentList(props) {

  const context = useContext(AppContext);
  
  console.log(context)

  // const [courses, setCourses] = useState([]);
  // const [departments, setDepartments] = useState([]);

  const [deptWithCourseNum, setDeptWithCourseNum] = useState([]);
  let [department, setDepartment] = props.setList;

  const filterDeptList = (fullList) => {
    console.log(fullList)
    if(department){

      let splitStr1 = department.split('(');
      let targetStr1 = splitStr1[splitStr1.length - 1];
      let selectedDeptAbbr = targetStr1.slice(0, targetStr1.length-1);

      let filteredList = fullList.filter(
        dept => dept.deptAbbr === selectedDeptAbbr
      )
      console.log(filteredList)
      return filteredList;
    }
  }


  const getDataFromContext = () => {
    if(context.courseList &&
       context.courseList.length > 0 &&
       context.subjectList &&
       context.subjectList.length > 0
      ) {
      let deptInfoFullList = context.subjectList.map(
        department => {
          let splitStr1 = department.split('(');
          let targetStr1 = splitStr1[splitStr1.length - 1];
          let deptAbbr = targetStr1.slice(0, targetStr1.length-1);
  
          let splitStr2 = department.split('(');
          let targetStr2 = splitStr2[0];
          let deptFullName = targetStr2.slice(0, targetStr2.length-1);
  
          let coursesInDept = context.courseList.filter(course => course.Subject === deptAbbr);
          let courseNum = coursesInDept.length;
          let deptWithCourseNum = {
            deptAbbr,
            deptFullName,
            courseNumber: courseNum
          }
          return deptWithCourseNum;
        }
      )
      //console.log(filterDeptList(deptInfoFullList))

      if(department){
        setDeptWithCourseNum(filterDeptList(deptInfoFullList));
        console.log(filterDeptList(deptInfoFullList))
      } else{
        setDeptWithCourseNum(deptInfoFullList);
      }
      // setDeptWithCourseNum(deptInfoFullList);
    }
  }

  useEffect(() => {
    getDataFromContext()
    console.log(department)
  }, [context.courseList, context.subjectList, department])


  // !Original
  // const { dashboard_st } = useContext(AppContext);
  // const departmentData = getDepartmentData(dashboard_st);

  
  // let currentDepartmentData = departmentData;

  // if (department != null) {
  //   let splitStr = department.split(' ');
  //   let splitStrResult = splitStr[splitStr.length - 1];
  //   let currentDepartment = splitStrResult.substring(1, splitStrResult.length - 1);
  //   let currentResult = departmentData.filter(s => s.departmentName == currentDepartment);

  //   if (currentResult.length != 0) {
  //     currentDepartmentData = currentResult;
  //   }
  //   else {
  //     currentDepartmentData = departmentData;
  //   }
  // }


  // console.log(courses)
  // console.log(departments)
  console.log(deptWithCourseNum)
  
  return (
    <React.Fragment>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100%' },
        }}
      >
        <Typography variant='h5'>
          Course Subject Lookup
        </Typography>

        {deptWithCourseNum.map((dept) => (
          <Card key={dept.deptFullName} sx={{ minWidth: '100%', border: '0.2px solid darkGrey' }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={10}>
                  <Typography variant='h6'>
                    {dept.deptAbbr}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Name of Department: <strong>{dept.deptFullName}</strong>
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Total number of courses: <strong>{dept.courseNumber}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <CardActions style={{ width: '100%', justifyContent: 'flex-end' }}>
                    <Button variant="contained" size="large" href={`/Reports/DepartmentDetails/${dept.deptAbbr}`}>Select</Button>
                  </CardActions>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}

        {/* {deptWithCourseNum.map((data, key) => (
          <Card key={key} sx={{ minWidth: '100%', border: '0.2px solid darkGrey' }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={10}>
                  <Typography variant='h6'>
                    {data.departmentName}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Name of Department: <strong>{data.departmentTotalName}</strong>
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Total number of courses: <strong>{data.courseNumber}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <CardActions style={{ width: '100%', justifyContent: 'flex-end' }}>
                    <Button variant="contained" size="large" href={`/Reports/DepartmentDetails/${data.departmentName}`}>Select</Button>
                  </CardActions>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))} */}

      </Box>
    </React.Fragment>
  );
}