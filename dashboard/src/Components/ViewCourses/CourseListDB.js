import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppContextProvider';

/**
 * View Course Page > Course List Paper Content.
 * Display the filtered course list with different filter condition.
 * 
 * @param props 
 * @param {JSON list} courseList 
 *       JSON list - 'CourseNumber', 'CourseName', 'CourseLocation' and 'CourseSubject'.
 * @param {list} setList 
 *       Content - [department, setDepartment, number, setNumber].
 *       Use to change the useState in the ViewCourses.js
 * @return {React.Fragment} Display the filtered course list.
 */

export default function DisplayCourseList(props) {
  //'courseList' means the current list which appears on the page.(i.e.search result)
  
  // let courseList1 = props.courseList;

  const context = useContext(AppContext);
  const [courseList, setCourseList] = useState([]);
  let [department, setDepartment, number, setNumber] = props.setList;

  const startsWithNumber = (numToCheck, param) => {
    const regex = new RegExp(`^${param}`)
    const isMatched = regex.test(numToCheck.toString())
    return isMatched
  }

  const loadCourseList = () => {

    let currentResult = []

    if (context.courseList && context.courseList.length > 0 && !department && !number) {
      setCourseList(context.courseList)
    }
    else if (department) {
      // console.log(1)
      let splitStr = department.split(' ');
      let splitStrResult = splitStr[splitStr.length - 1];
      let currentDepartment = splitStrResult.substring(1, splitStrResult.length - 1);
    
          
      if (!number) {
        // let currentResult = courseList.filter(s => s.CourseSubject == currentDepartment + number);
        //let currentResult = [];
        // console.log(2)
        currentResult = context.courseList.filter(course => course.Subject == currentDepartment);
        setCourseList(currentResult)
      }
          //if the input number is null.
      else if(number && number.length!=0){
        // console.log(courseList)
        // console.log(3)
        let currentResult = context.courseList.filter(course => course.Subject == currentDepartment && startsWithNumber(course.Catalogue, number));
        // console.log(currentResult)
        setCourseList(currentResult)
      }
    }
  
    else if(!department && number && number.length!=0){
      // console.log(4)
      let currentResult = context.courseList.filter(course => startsWithNumber(course.Catalogue, number));
      setCourseList(currentResult)
    }
  }

  useEffect(()=>{
    // console.log(department, number)
    loadCourseList()
  }, [context.courseList, department, number])



  // console.log(department, number)

  

  // if(!department && !number){
  //   console.log('Got null for both')
  // } else if (department != null) {
  //     let splitStr = department.split(' ');
  //     let splitStrResult = splitStr[splitStr.length - 1];
  //     let currentDepartment = splitStrResult.substring(1, splitStrResult.length - 1);

  //     if (number != null && number.length!=0) {
  //       // let currentResult = courseList.filter(s => s.CourseSubject == currentDepartment + number);
  //       let currentResult = courseList.filter(course => s.CourseSubject == currentDepartment + number);

  //       //if the input department and number are existing.
  //       if (currentResult.length != 0) {
  //         courseList = currentResult;
  //       }
  //     }
  //     //if the input number is null.
  //     else {
  //       // let currentResult = courseList.filter(s => s.CourseSubject.indexOf(currentDepartment) != -1);
  //       // if (currentResult.length != 0) {
  //       //   courseList = currentResult;
  //       // }
  //       console.log('Got null')
  //     }
  //   } else if (number != null) {
  //       //if input department is null and number is not null.
  //       let currentResult = courseList.filter(s => s.CourseSubject.indexOf(number) != -1);
  //       if (currentResult.length != 0) {
  //         courseList = currentResult;
  //       }
  // }

  console.log(courseList)
  
  return (
    <React.Fragment>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100%' },
        }}
      >
        <Typography variant='h5'>
          Course List
        </Typography>

        {
        // courseList.map((data, key) => (
        //   <Card key={key} sx={{ minWidth: '100%', border: '0.2px solid darkGrey' }}>
        //     <CardContent>
        //       <Grid container spacing={2} alignItems="center">
        //         <Grid item xs={10}>
        //           <Typography variant='h6'>
        //             {/* e.g. COMPSCI 732 */}
        //             {data.CourseNumber}
        //           </Typography>
        //           <Typography variant="body1" color="text.secondary">
        //             Course name: {' '}
        //             <strong>{data.CourseName}</strong>
        //           </Typography>
        //           <Typography variant="body1" color="text.secondary">
        //             Location: {' '}
        //             <strong>{data.CourseLocation}</strong>
        //           </Typography>
        //         </Grid>
        //         <Grid item xs={2}>
        //           <CardActions style={{ width: '100%', justifyContent: 'flex-end' }}>
        //             <Button variant="contained" size="large" href={`/ViewCourses/CourseDetails/${data.CourseSubject}`}>Select</Button>
        //           </CardActions>
        //         </Grid>
        //       </Grid>
        //     </CardContent>
        //   </Card>
        // ))
        }

        {courseList.map(
          (course) => (
            
            <Card key={course.CourseTitle} sx={{ minWidth: '100%', border: '0.2px solid darkGrey' }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={10}>
                    <Typography variant='h6'>
                      {/* e.g. COMPSCI 732 */}
                      <b>{`${course.Subject} ${course.Catalogue}`}</b>
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Course name: {' '}
                      <strong>{course.CourseTitle}</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>

                    <CardActions style={{ width: '100%', justifyContent: 'flex-end' }}>
                      <Button variant="contained" size="large" href={`/ViewCourses/CourseDetails/${course.Subject}${course.Catalogue}`}>Select</Button>
                    </CardActions>

                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
      </Box>
    </React.Fragment>
  );
}