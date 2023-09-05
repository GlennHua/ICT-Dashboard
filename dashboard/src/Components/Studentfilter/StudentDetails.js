import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FilteringTable from './FilteringTable';
import { mdTheme } from '../SharedComponent/AppBarDrawer';
import { Bar } from '../SharedComponent/SharedBarContent';
import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CourseInfoFilter, SemesterFilter } from '../SharedComponent/CourseSemesterFilter';
import { AppContext } from '../../AppContextProvider';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
/**
 * Student Detail Page
 * Drawer and AppBar - Navigation located on the left and top of the page
 * Filtering Table Paper - Get and display the filtered student details
 * 
 * @return {ThemeProvider} Display the Student Detail Page content.
 */
 
function DashboardContent() {
  
  const courseSubjectCurrentSemester = useParams().courseSubjectCurrentSemester;
  console.log(useContext(AppContext))
  const { dashboard_st } = useContext(AppContext);
  const [studentData, setStudentData] = useState([])
  const courseSubject = courseSubjectCurrentSemester.substring(0, courseSubjectCurrentSemester.indexOf('_'));
  const subject = courseSubject.substring(0,courseSubject.length-3);
  const catalogue = courseSubject.substring(courseSubject.length-3);
  const courseName = subject + " " + catalogue;
  const currentSemesterJoin = courseSubjectCurrentSemester.substring(courseSubjectCurrentSemester.indexOf('_')+1);
  let currentSemester = currentSemesterJoin.substring(0, 4) + " " + currentSemesterJoin.substring(4);
  let courseStuInSem = SemesterFilter(courseName, currentSemester,dashboard_st);
  let courseInfo = CourseInfoFilter(courseName,dashboard_st)
  console.log(courseName)
  
  useEffect (() => {
    if (currentSemesterJoin !== "") {
      setStudentData(courseStuInSem);
    }else{
      setStudentData(courseInfo);
    }
}, [dashboard_st]);

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
            overflow: 'auto'
          }}
        >
          <Container maxWidth="auto" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Filtering Table */}
              <Grid item xs={15} md={4} lg={12}>
                <Paper
                  sx={{
                    padding: '20px 20px 20px 20px',
                    width: '1700px',
                  }}
                >
                  <FilteringTable courseStuInSem={studentData}/>
                  <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                    <Button variant="contained" href={`/Reports/DepartmentDetails/${subject}/CourseReport/${courseSubject}`}>Back</Button>
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
