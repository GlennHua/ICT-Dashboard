import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { SemesterFilter } from '../SharedComponent/CourseSemesterFilter';
import { averageGPA, domesticInternationalStudent } from '../SharedComponent/RelatedFunctions';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    width: '75%',
    textAlign: 'center',
    background: '#D3D3D3',
  }));

/**
 * Course Comparison Page > Comparative Result Paper Content.
 * Display the filtered information for 3 courses with specific semester 
 * Content - Average GPA; Number of students; Distribution of students - domestic student 
 *           number and international student number
 * 
 * @param props 
 * @param {string} courseName specific course subject and course catalogue
 * @param {list} courseSemesterList 
 *       Content - [Course1Semester, Course2, Course2Semester, Course3, Course3Semester].
 *       Use the changed useState in the page to filter the needed information
 * @return {React.Fragment} 
 *       Display the filtered information for 3 courses with specific semester.
 */  

export default function ComparativeResult(props) {
    let Course1 = props.courseName;
    let allTakes = props.alltakes;
    let allStudents = props.allStudents;
    let [Course1Semester, Course2, Course2Semester, Course3, Course3Semester] = props.courseSemesterList;
    /* Course 1 details in semester */
    let courseStuInSem1 = SemesterFilter(Course1, Course1Semester, allTakes);
    const found1 = allStudents.filter(student => 
        courseStuInSem1.some(c => c.StudentId === student.StudentId)
    )

    /* Course 2 details in semester */
    let courseStuInSem2 = SemesterFilter(Course2, Course2Semester, allTakes);
    const found2 = allStudents.filter(student => 
        courseStuInSem2.some(c => c.StudentId === student.StudentId)
    )

    /* Course 3 details in semester */
    let courseStuInSem3 = SemesterFilter(Course3, Course3Semester, allTakes);
    const found3 = allStudents.filter(student => 
        courseStuInSem3.some(c => c.StudentId === student.StudentId)
    )

    /* Average GPA */
    let avgGpa1 = averageGPA(courseStuInSem1);
    let avgGpa2 = averageGPA(courseStuInSem2);
    let avgGpa3 = averageGPA(courseStuInSem3);

    /* Student number */
    let stuNumber1 = courseStuInSem1.length;
    let stuNumber2 = courseStuInSem2.length;
    let stuNumber3 = courseStuInSem3.length;

    /* Domestic / international student number */
    let [domesticStudentNumber1, internationalStudentNumber1] = domesticInternationalStudent(found1);
    let [domesticStudentNumber2, internationalStudentNumber2] = domesticInternationalStudent(found2);
    let [domesticStudentNumber3, internationalStudentNumber3] = domesticInternationalStudent(found3);

    let comparativeJson = [];
    comparativeJson.push({
        'courseName': Course1,
        'courseSemester': Course1Semester,
        'averageGpa': avgGpa1,
        'studentNumber': stuNumber1,
        'domestic': domesticStudentNumber1,
        'international': internationalStudentNumber1
    },
    {
        'courseName': Course2,
        'courseSemester': Course2Semester,
        'averageGpa': avgGpa2,
        'studentNumber': stuNumber2,
        'domestic': domesticStudentNumber2,
        'international': internationalStudentNumber2
    },
    {
        'courseName': Course3,
        'courseSemester': Course3Semester,
        'averageGpa': avgGpa3,
        'studentNumber': stuNumber3,
        'domestic': domesticStudentNumber3,
        'international': internationalStudentNumber3
    })

    return (
      <React.Fragment>
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      >
        <Typography variant='h5'>
          Comparative Result 
        </Typography>
        
        <Grid container spacing={1}>
            {comparativeJson.map((data, index) => (
            <Grid item key={index} container direction='column' spacing={1} xs={4}>
                <Grid item>
                    {
                        data.courseName && data.courseSemester ?
                            <div>
                                <Typography variant='h6' align='center'>
                                    {data.courseName}
                                </Typography>
                                <Typography variant='h6' align='center'>
                                    {data.courseSemester}
                                </Typography>
                            </div> :
                            <br/>
                    }
                    
                </Grid>

                <Grid item>
                    <Typography variant='subtitle1'>Average GPA</Typography>
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid align='center' item>
                    <Item>{data.averageGpa}</Item>
                </Grid>
                <Grid item>
                    <Typography variant='subtitle1'>Number of students</Typography>
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid align='center' item>
                    <Item>{data.studentNumber}</Item>
                </Grid>
                <Grid item>
                    <Typography variant='subtitle1'>Distribution of students</Typography>
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid align='center' item>
                    <Item>Domestic: {data.domestic}  International: {data.international}</Item>
                </Grid>
            </Grid>
            ))}
        </Grid>
      </Box>
      </React.Fragment>
    )
}