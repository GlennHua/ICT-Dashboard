import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ChartDB from './ChartDB';
import GPAByTechnicalAndProfessionalSkill from './GPAByTechnicalAndProfessionalSkill'
import TotalInfoDB from './TotalInfoDB';
import BarChartDB from './BarChartDB';
import CourseOverview from './CourseOverview';
import { mdTheme } from '../SharedComponent/AppBarDrawer';
import { Bar } from '../SharedComponent/SharedBarContent';
/**
 * Dashboard Page 
 * Drawer and AppBar - Navigation located on the left and top of the page
 * Total information Paper - total course and total students in the MongoDB database dummy data dataset
 * Line chart Paper - Student GPA Overview based on different academic year and semester
 * Bar chart Paper - Domestic and internal student number comparison for different academic 
 *                   year and semester
 * @return {ThemeProvider} 
 *       Display the Dashboard Page content.
 */

function DashboardContent() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{}}>
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
              {/* Total information */}
              {/* <Grid item sm={12} md={4}>
                <Paper
                  sx={{
                    p: 3.6,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <TotalInfoDB />
                </Paper>
              </Grid> */}
              <Grid item xs={12} md={12} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                    // height: 240,
                  }}
                >
                  <CourseOverview />
                </Paper>
              </Grid>
              {/* Line Chart */}
              <Grid item xs={12} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <ChartDB />
                </Paper>
              </Grid>

              {/* BarChart */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 260,
                  }}
                >
                  <BarChartDB />
                </Paper>
              </Grid>
              {/* Line Chart */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <GPAByTechnicalAndProfessionalSkill />
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
// export default function Dashboard() {
//   return <DashboardContent />;
// }

export default DashboardContent
