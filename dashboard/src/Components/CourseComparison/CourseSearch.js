import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
// import { AppContext } from '../../AppContextProvider';
// import { useContext } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { SemesterListFilter, SemesterJsonFilter } from '../SharedComponent/CourseSemesterFilter';

/**
 * Course Comparison Page > Course search Paper Content.
 * Click to choose the displayed specific course corresponding semester information 
 * Choose the other 2 courses and corresponding semesters in 4 Autocomplete boxes
 * Use them to filter the other information in the Page.
 * 
 * @param props 
 * @param {string} courseName specific course subject and course catalogue
 * @param {list} courseSet 
 *       Content - [Course1Semester, setSemester1, Course2, setCourse2, Course2Semester, 
 *                  setSemester2, Course3, setCourse3, Course3Semester, setSemester3].
 *       Use to change the useState in the page
 * @return {React.Fragment} 
 *       Display a list of Button and 4 Autocomplete box for course and relevant semester selection.
 */

export default function CourseSearch(props) {

  const { courses, alltakes } = props
  // console.log(alltakes)

  let Course1 = props.coursename;
  // const { dashboard_st } = useContext(AppContext);
  // let dashboard_st = props.dashboard_st;

  // let semesterData1 = SemesterJsonFilter(Course1, dashboard_st);
  let semesterData1 = SemesterJsonFilter(Course1, alltakes);

  let [Course1Semester, 
    setSemester1, 
    Course2, 
    setCourse2, 
    Course2Semester, 
    setSemester2, 
    Course3, 
    setCourse3, 
    Course3Semester, 
    setSemester3] 
  = props.courseset;

  // let semesterList2 = SemesterListFilter(Course2,dashboard_st);
  let semesterList2 = SemesterListFilter(Course2, alltakes);

  // let semesterList3 = SemesterListFilter(Course3, dashboard_st);
  let semesterList3 = SemesterListFilter(Course3, alltakes);


  // let coursesList = [];
  // dashboard_st.forEach(
  //   dashboard_st => coursesList.push(dashboard_st.Subject + " " + dashboard_st.Catalogue)
  // )
  // // Remove duplicate elements from the array
  // coursesList = [...new Set(coursesList)];
  // coursesList.sort();
  // console.log(coursesList)


  

  let allCourses = [];
  // console.log(courses)
  if(courses && courses.length > 0){
    courses.forEach(
      course => allCourses.push(course.Subject + " " + course.Catalogue)
    )
  }
  allCourses = Array.from(new Set(allCourses));
  allCourses.sort();
  // console.log(allCourses)


  const handleClick = (index, e) => {
    setSemester1(semesterData1[index].semester);
  };

  const handleChangeCourse2 = (event, newCourse) => {
    setCourse2(newCourse);
    setSemester2("");
  };

  const handleChangeSemester2 = (event, newSemester) => {
    if (semesterList2.includes(newSemester)) {
      setSemester2(newSemester);
    }
  };

  const handleChangeCourse3 = (event, newCourse) => {
    setCourse3(newCourse);
    setSemester3("");
  };

  const handleChangeSemester3 = (event, newSemester) => {
    setSemester3(newSemester);
  };
 
  console.log(semesterList2)
  return (
    <React.Fragment>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100%' },
        }}
      >
        <Typography variant='h5'>
          Compare with <strong>{Course1}</strong>
        </Typography>

        <div {...props}>
          <p>Please select the semester for {Course1}</p>
          {semesterData1.map((data, index) => (
              <Button key={index} variant="contained" sx={{fontSize: '20px', p: '6px 18px 6px 18px', m: '5px 10px 5px 10px'}} onClick={(e) => handleClick(index, e)}>{data.semester}</Button>
          ))}
        </div>

        <p>Please select the comparative courses and semesters</p>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Autocomplete
              disablePortal
              id="course2_search"
              options={allCourses}
              onChange={handleChangeCourse2}
              sx={{ width: '100%', m: '-15px 10px 5px 10px' }}
              renderInput={(params) => <TextField {...params} label="Second Course" />}
            />
          </Grid>
          <Grid item xs={5}>
            <Autocomplete
              disablePortal
              id="course2_semester_search"
              options={semesterList2}
              value = {Course2Semester || ''}
              onChange={handleChangeSemester2}
              sx={{ width: '100%', m: '-15px 10px 5px 10px' }}
              renderInput={(params) => <TextField {...params} label="Second's Semester" />}
            />
          </Grid>


          
          <Grid item xs={6}>
            <Autocomplete
              disablePortal
              id="course3_search"
              options={allCourses}
              onChange={handleChangeCourse3}
              sx={{ width: '100%', m: '-15px 10px 5px 10px' }}
              renderInput={(params) => <TextField {...params} label="Third Course" />}
            />
          </Grid>
          <Grid item xs={5}>
            <Autocomplete
              disablePortal
              id="course3_semester_search"
              options={semesterList3}
              value = {Course3Semester || ''}
              onChange={handleChangeSemester3}
              sx={{ width: '100%', m: '-15px 10px 5px 10px' }}
              renderInput={(params) => <TextField {...params} label="Third's Semester" />}
            />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment >
  );
}