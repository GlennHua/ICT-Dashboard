import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { Box, Container, Grid, Paper } from '@mui/material';
import { mdTheme } from '../SharedComponent/AppBarDrawer';
import { Bar } from '../SharedComponent/SharedBarContent';
import StudentBasicInfo from './StudentBasicInfo';
import StudentEnrolments from './StudentEnrolments';
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const IndividualStudentReport = () => {

    const location = useLocation()
    const [stuId, setStuId] = useState(location.state.stuId ? location.state.stuId : 'invalid')
    const [stuRow, setStuRow] = useState(location.state.row ? {
        courses: location.state.row.courses
    } : undefined)

    // const [stuRow, setStuRow] = useState(location.state.row ? {
    //     courses: location.state.row.courses
    // } : 'invalid')

    // const stuId = location.state.stuId ? location.state.stuId : 'invalid'
    // const stuRow = location.state.row ? {
    //     courses: location.state.row.courses
    // } : 'invalid'

    const getStuDetails = async (studentId) => {
        const {data: stuDetails} = await axios.get(`/api/student/stuDetails/${studentId}`)
        console.log(stuDetails.Courses)
        setStuRow({
            courses: stuDetails.Courses
        })
    }

    useEffect(() => {
        !location.state.row && getStuDetails(stuId) 
    },[])
    
    console.log(stuRow)
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
                    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                        <Grid container spacing={3}>

                            {/* Student Basic Information */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 750,
                                    }}
                                >
                                    <StudentBasicInfo stuId={stuId} />
                                </Paper>
                            </Grid>

                            {/* Student internship eligibility*/}
                            {/* <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <StudentInternshipEligibility />
                                </Paper>
                            </Grid> */}

                            {/* Student enrolments*/}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: stuRow ? 100 + stuRow.courses.length * 80 : 500,
                                    }}
                                >
                                    {
                                        stuRow && <StudentEnrolments row={stuRow} />
                                    }
                                </Paper>
                            </Grid>

                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>   
    )
}

export default IndividualStudentReport