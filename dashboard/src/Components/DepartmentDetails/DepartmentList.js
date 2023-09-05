import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import { AppContext } from '../../AppContextProvider';
import { useContext } from 'react';

/**
 * Get the course JSON list with key pairs - Box_bgcolor and courseNumber
 * 
 * @param {JSON list} dashboard_st MongoDB database dummy data JSON list - initial version
 * @param {string} subject specific department name
 * @return {JSON list} courseList. key pairs - Box_bgcolor and courseNumber
 */

export function getCatalogue(subject, courseList) {
  let courseListToRender = [];
  let catalogueList = [];
  let color = [
    'secondary.main',
    'success.main',
    'info.main',
    'warning.main',
    'error.main'];

  //Original
  // let totalCatalogue = dashboard_st.filter(s => s.Subject === subject);
  // totalCatalogue.forEach(element => {
  //   catalogueList.push(element.Catalogue)
  // })

  // catalogueList = [...new Set(catalogueList)];
  // catalogueList.sort();


  if(courseList && courseList.length > 0){

    let totalCatalogue = courseList.filter(s => s.Subject === subject);
    totalCatalogue.forEach(element => {
      catalogueList.push(element.Catalogue)
    })
  
    catalogueList = [...new Set(catalogueList)];
    catalogueList.sort();
  
    console.log(catalogueList)
  
    for (let i = 0; i < catalogueList.length; i++) {
      const data = {
        Box_bgcolor: color[i % 5],
        courseNumber: catalogueList[i]
      }
      courseListToRender.push(data);
    }
  
    return courseListToRender;
  }


}

/**
 * Department Detail Page > Department List Paper Content.
 * Display the corresponding courses list in card for specific department
 * 
 * @param {string} subject specific department name
 * @return {React.Fragment} Display the filtered course list for specific department.
 */

export default function ClassSearch(subject) {
  const currentSubject = subject.subject;

  
  const { courseList } = useContext(AppContext);

  const context = useContext(AppContext);

  console.log(context)
  console.log(courseList)

  let catalogueList = getCatalogue(currentSubject, courseList);

  return (
    <React.Fragment>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100%' },
        }}
      >
        <Typography variant='h5'>
          Course List for <strong>{currentSubject}</strong>
        </Typography>
        <Grid container spacing={2}>

          {
            catalogueList && 
            catalogueList.map((course) => (
              <Grid item key={course.courseNumber}>
                <Card sx={{ width: 200, height: 200 }}>
                  <CardActionArea href={`/Reports/DepartmentDetails/${currentSubject}/CourseReport/${currentSubject+course.courseNumber}`}>
                    <CardContent>
                      <Box sx={{ bgcolor: course.Box_bgcolor, height: 120 }} />
                    </CardContent>
                    <CardActions>
                      <Button size="medium" color='inherit' style={{ margin: '0 auto', display: "flex" }} >{currentSubject} {course.courseNumber}</Button>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          }

        </Grid>
      </Box>
    </React.Fragment>
  );
}