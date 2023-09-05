import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DepartmentSearch from './DepartmentSearch';
import DepartmentListDB from './DepartmentListDB';
import { mdTheme } from '../SharedComponent/AppBarDrawer';
import { Bar } from '../SharedComponent/SharedBarContent';
import { useState } from 'react';

/**
 * Reports Home Page
 * Drawer and AppBar - Navigation located on the left and top of the page
 * Department Search Paper - Get the department data from a Autocomplete box
 * Department List Paper - Display the filtered department list
 * 
 * @return {ThemeProvider} Display the Reports Home Page content.
 */

function DashboardContent() {
  const [department, setDepartment] = useState();
  let setList = [department, setDepartment];

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
              {/* Department Search */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <DepartmentSearch setList={setList}/>
                </Paper>
              </Grid>

              {/* Department List */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto'
                  }}
                >
                  <DepartmentListDB setList={setList}/>
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
