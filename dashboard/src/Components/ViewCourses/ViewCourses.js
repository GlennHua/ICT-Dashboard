import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ClassSearch from './ClassSearch';
import CourseListDB from './CourseListDB';
import { mdTheme } from '../SharedComponent/AppBarDrawer';
import { Bar } from '../SharedComponent/SharedBarContent';
import { AppContext } from '../../AppContextProvider';
import { useContext, useState, useEffect } from 'react';
import useGet from '../../hooks/useGet';
import axios from 'axios';

/**
 * View Course Page
 * Drawer and AppBar - Navigation located on the left and top of the page
 * Course Search Paper - Get the department and relevant course number data from two Autocomplete box
 * Course List Paper - Display the filtered course list
 * 
 * @return {ThemeProvider} Display the View Course Page content.
 */

function DashboardContent() {
  const [department, setDepartment] = useState("");
  const [number, setNumber] = useState('');
  
  const [courseList, setCourseList] = useState([]);

  // const { dashboard_st } = useContext(AppContext);


  let setList = [department, setDepartment, number, setNumber];

  let currentList = [];
  let courses = [];

  // Get all courses from the database

  // const fetchCourses = async () =>{
  //   const {data : courses} = await axios.get('/api/course')
  //   setCourseList(courses)
  // }

  const getCoursesFromContext = () => {
    setCourseList(context.courses)
  }

  
  const context = useContext(AppContext)

  // console.log(context)


  
  useEffect(()=>{
    // fetchCourses()
    // context.updateContext(
    //   prev => ({...prev, courseList, testing: 3123213})
    // )

    getCoursesFromContext()
  }, [])


  // dashboard_st.forEach(
  //   dashboard_st => courses.push(dashboard_st.Subject + " " + dashboard_st.Catalogue)
  // )
  // // Remove duplicate elements from the array
  // courses = [...new Set(courses)];
  // courses.sort();
  // // console.log(courses)

  // let courseList1 = [];
  // courses.forEach(coursesNumber => {
  //   let stuInSubject = dashboard_st.filter(s => s.Subject === coursesNumber.substring(0, coursesNumber.indexOf(' ')));
  //   let stuInCatalogue = stuInSubject.filter(s => s.Catalogue === parseInt(coursesNumber.substring(coursesNumber.indexOf(' ') + 1)));
  //   stuInCatalogue = [...new Set(stuInCatalogue)];
  //   let courseName = stuInCatalogue[0].CourseTitle;
  //   let courseLocation = stuInCatalogue[0].Campus;
  //   let courseSubject = coursesNumber.replace(/\s/g, '');

  //   courseList1.push({
  //     'CourseNumber': coursesNumber,
  //     'CourseName': courseName,
  //     'CourseLocation': courseLocation,
  //     'CourseSubject': courseSubject,
  //   })
  // })
  

  //'courseList' means all courses list. 
  // currentList = courseList1;

  
  // console.log(useContext(AppContext))
  // console.log(context)

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Class Search */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <ClassSearch setList={setList} />
                </Paper>
              </Grid>

              {/* Course List */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto', 
                  }}
                >
                  {/* <p>{department}</p>
                  <p>{number}</p> */}
                  <CourseListDB setList={setList} />
                </Paper>
              </Grid>

            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
