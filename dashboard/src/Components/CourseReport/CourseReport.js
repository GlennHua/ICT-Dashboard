import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SemesterSelect from './SemesterList';
import Grades from './BarChart';
import Button from '@mui/material/Button';
import StudentsAndResult from './StudentResultPieChart';
import { mdTheme } from '../SharedComponent/AppBarDrawer';
import { Bar } from '../SharedComponent/SharedBarContent';
import { useState } from "react";
import { Tooltip } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import { SemesterFilter, SemesterJsonFilter } from '../SharedComponent/CourseSemesterFilter';
import { averageGPA } from '../SharedComponent/RelatedFunctions';
import { AppContext } from '../../AppContextProvider';
import { useContext } from 'react';
import { CourseInfoFilter } from '../SharedComponent/CourseSemesterFilter';
import { useEffect } from 'react';
import { set } from 'date-fns';
/**
 * Course Report Page
 * Drawer and AppBar - Navigation located on the left and top of the page
 * Semester Select Paper 
 *   - Click to choose the displayed specific course corresponding semester information 
 * Pie chart Paper - Display the filtered information pie charts 
 *                 - domestic student or international student; pass or failed
 * Bar chart Paper 
 *   - Display the filtered student number for current course and selected semester for different grade
 * More detail button 
 *   - filtered student details for specific course subject, course catalogue, academic year and semester 
 * 
 * @return {ThemeProvider} Display the Course Report Page content.
 */

function DashboardContent() {
  const courseSubject = useParams().courseSubject;
  
  const context = useContext(AppContext);
  const { allTakes } = useContext(AppContext);

  const subject = courseSubject.substring(0, courseSubject.length-3);
  const catalogue = courseSubject.substring(courseSubject.length-3);
  const courseName = subject + " " + catalogue;


  let semesterData = SemesterJsonFilter(courseName, allTakes);

  // let CourseInfo = CourseInfoFilter(courseSubject,dashboard_st, allTakes)
  let CourseInfo = CourseInfoFilter(courseName, allTakes)

  const [currentSemester, setSemester] = useState("");
  const [courseData, setCourseData] = useState([]);

  const [avgGpa, setAvgGpa] = useState(0);

  // let setSem = [currentSemester, setSemester]

  let currentSemesterJoin = currentSemester.replace(/ /g, "");

  let courseStuInSelectedSem = SemesterFilter(courseName, currentSemester, allTakes);
  
  // Calc the average GPA
  // let avgGpa = averageGPA(courseData);

  useEffect (() => {
      if (currentSemester !== "") {
        setCourseData(courseStuInSelectedSem);
        setAvgGpa(averageGPA(courseStuInSelectedSem));
      }else{
        setCourseData(CourseInfo);
        setAvgGpa(averageGPA(CourseInfo));
      }
  }, [allTakes, currentSemester]);


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

              {/* Semester Select */}
              <Grid item xs={12}>

                <Typography variant="h4" color="text.secondary">
                  <strong>{courseName}</strong>
                </Typography> 

                <Paper
                  sx={{
                    p: 2,
                    display: 'flex', 
                    flexWrap: 'wrap',
                    height: 'auto'
                  }}
                >
                  <SemesterSelect getSemester={setSemester} semesterData={semesterData}/>
                </Paper>
              </Grid> 
              
              {/* Pie chart */}
              <Grid item xs={12}>
                <Typography variant="h6" color="text.secondary">
                    {currentSemester} Course Detail
                  </Typography>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex', 
                    height: 400,
                  }} 
                >

                  <StudentsAndResult subject={subject} catalogue={catalogue} courseStuInSem={courseData} semStatus={currentSemester}/>

                </Paper>
              </Grid>

              {/* Bar chart */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 450,
                  }}
                > 
                  <Typography variant="h6" color="text.secondary">
                      Grades Breakdown
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                      Total Students: {courseData.length}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                      Average GPA: {avgGpa}
                  </Typography>
                  <Grades courseStuInSem={courseData}/>

                  <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                    <Tooltip title="Student Grade Details" placement="right">
                      <Button variant="contained" href={`/Reports/DepartmentDetails/${subject}/CourseReport/${courseSubject+"_"+currentSemesterJoin}/StudentDetails`}>More Details</Button>
                    </Tooltip>
                  </Stack>
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
  