import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ComparativeBarChartDB from './ComparativeBarChartDB';
import CourseSearch from './CourseSearch';
import ComparativeResult from './ComparativeResult';
import { mdTheme } from '../SharedComponent/AppBarDrawer';
import { Bar } from '../SharedComponent/SharedBarContent';
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { AppContext } from '../../AppContextProvider';
import { useContext } from 'react';

/**
 * Course Comparison Page
 * Drawer and AppBar - Navigation located on the left and top of the page
 * Course search Paper 
 *   - Click to choose the displayed specific course corresponding semester information 
 *   - Choose the other 2 courses and corresponding semesters in 4 Autocomplete boxes
 * Comparative Result Paper - Display the filtered information for 3 courses with specific semester 
 *                          - Average GPA; Number of students; 
 *                            Distribution of students - domestic student number and international 
 *                            student number
 * Bar chart Paper 
 *   - Display the filtered student number for current course and selected semester for different grade
 * 
 * @return {ThemeProvider} Display the Course Comparison Page content.
 */

function CourseComparisonContent() {
  const courseSubject = useParams().courseSubject;
  const { dashboard_st } = useContext(AppContext);

  const context = useContext(AppContext);
  const {courseList, allTakes, allStudents} = context;
  // console.log(allStudents)

  let subject = courseSubject.substring(0, courseSubject.length-3);
  let courseNumber = courseSubject.substring(courseSubject.length-3);
  let courseName = subject + " " + courseNumber; //e.g. COMPSCI 701

  const [Course1Semester, setSemester1] = useState("");
  const [Course2, setCourse2] = useState("");
  const [Course2Semester, setSemester2] = useState("");
  const [Course3, setCourse3] = useState("");
  const [Course3Semester, setSemester3] = useState("");

  let courseSet = [Course1Semester, setSemester1, Course2, setCourse2, Course2Semester, setSemester2, Course3, setCourse3, Course3Semester, setSemester3];
  let courseSemesterList = [Course1Semester, Course2, Course2Semester, Course3, Course3Semester];

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
              {/* Course search */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto' // 250,
                  }}
                >
                  <CourseSearch 
                    coursename={courseName} 
                    courseset={courseSet} 
                    dashboard_st={dashboard_st}

                    courses = {courseList}
                    alltakes = {allTakes}
                  />
                </Paper>
              </Grid>

              {/* Comparative Result */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                  }}
                >
                  <ComparativeResult 
                    courseName={courseName} 
                    courseSemesterList={courseSemesterList} 
                    allStudents = {allStudents}
                    alltakes = {allTakes}
                  />
                </Paper>
              </Grid>
              
              {/* BarChart */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 450,
                  }}
                >
                  <ComparativeBarChartDB 
                    courseName={courseName} 
                    courseSemesterList={courseSemesterList}
                    alltakes = {allTakes} 
                  />
                </Paper>
              </Grid> 
            </Grid>  
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

//export default Dashboard;
export default function CourseComparison() {
  return <CourseComparisonContent />;
}
