import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/**
 * Course Report Page > Semester Select Paper Content.
 * Click to choose the displayed specific course corresponding semester information.
 * Use the selected semester to filter the other information in the page.
 * 
 * @param props 
 * @param {object} getSemester Set semester to the useState currentSemester and use it in the Paper
 * @param {JSON list} semesterData The key is 'semester'
 * @return {React.Fragment} 
 *    According to the filtering of different courses, the buttons of different academic year and 
 *    semesters are displayed for users to press
 */

export default function SemesterSelect(props) {

  let semesterData = props.semesterData;
  
  const handleClick = (index, e) => {
    props.getSemester(semesterData[index].semester);
  };

  return (
    <React.Fragment>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
      >
        <Typography variant='h6' color="text.secondary">
          Semester Selection
        </Typography>        
     
        {semesterData.map((data, index) => (
            <Button key={index} variant="contained" sx={{fontSize: '20px', p: '6px 18px 6px 18px'}} onClick={(e) => handleClick(index, e)}>{data.semester}</Button>
          ))}

      </Box>
    </React.Fragment>
  );
}