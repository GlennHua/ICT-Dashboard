import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Toolbar, Table, TableContainer} from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CourseGPAChartDB from './CourseGPAChartDB';
import CourseTotalInfoDB from './CourseTotalInfoDB';
import CourseBarChartDB from './CourseBarChartDB';
import { mdTheme } from '../SharedComponent/AppBarDrawer';
import { Bar } from '../SharedComponent/SharedBarContent';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { AppContext } from '../../AppContextProvider';
import { useContext, useEffect, useState } from 'react';
import CourseDescription from './CourseDescription';
import StudentTable from '../ReportsHomepage/StudentTable';
import {formatStudentData} from '../ReportsHomepage/controller';


/**
 * Course Detail Page 
 * Drawer and AppBar - Navigation located on the left and top of the page
 * Course Total information Paper 
 *    - total filtered student number in the MongoDB database dummy data dataset
 * Course Line chart Paper 
 *    - Student GPA Overview for specific course based on different academic year and semester
 * Course Bar chart Paper - Domestic and internal student number comparison for different academic 
 *                   year and semester for specific course
 * @return {ThemeProvider} 
 *       Display the Course Detail Page content.
 */

function DashboardContent() {
  const courseSubject = useParams().courseSubject;
  const context = useContext(AppContext);
  const [enrolments, setEnrolments] = useState([]);

  let subject = courseSubject.substring(0, courseSubject.length-3);
  let courseNumber = courseSubject.substring(courseSubject.length-3);
  let courseName = subject + " " + courseNumber;

  const getStudentFullList = () => {
    if(context.allStudents.length > 0 && context.allTakes.length > 0){
      const data = formatStudentData(context.allStudents, context.allTakes, {
        subject: subject,
        catalogue: courseNumber
      })
      console.log(data)
      setEnrolments(data)
    } 
    
  }

  useEffect(()=>{
    getStudentFullList()
  },[context])
  
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

              {/* Course description */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <CourseDescription 
                    courseName={courseName} 
                    subject={subject}
                    courseNumber={courseNumber}
                  />
                </Paper>
              </Grid>

              {/* Course Total information */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <CourseTotalInfoDB 
                    courseName={courseName}
                    subject={subject}
                    courseNumber={courseNumber}
                  />
                </Paper>
              </Grid>
              {/* Course Line Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <CourseGPAChartDB courseName={courseName} theme={mdTheme}/>
                </Paper>
              </Grid>
              
              {/* Course BarChart */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 500
                  }}
                >
                  <CourseBarChartDB courseName={courseName}/>
                  <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                    <Button variant="contained" href={`/ViewCourses/CourseDetails/${courseSubject}/CourseComparison`} style={{textTransform: 'none', width: "auto"}}>Compare {courseName} With Other Courses</Button>
                  </Stack>
                </Paper>
              </Grid> 

              <Grid item xs={12} mb={20}>
                <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 900,
                      pt: 5
                    }}
                    
                >
                    <StudentTable
                rows={enrolments}
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
export default function Dashboard() {
  return <DashboardContent />;
}
