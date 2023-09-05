import React from 'react'
import {Typography, TableHead, Table, TableCell, TableRow} from '@mui/material';
import CoursesTable from '../ReportsHomepage/CoursesTable';

const StudentEnrolments = (props) => {
  console.log(props)
  return (
    <React.Fragment>
      <Typography variant='h5' mb={1}>
        Student Enrolments
      </Typography>
      
      <Table size="small" aria-label="purchases" >
        <TableHead>
          <TableRow>
            <TableCell align="right">Course Name</TableCell>
            <TableCell align="right">Course Title</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">Semester</TableCell>
            <TableCell align="right">Grade</TableCell>
            <TableCell align="right">GPA</TableCell>
            <TableCell align="right">Campus</TableCell>
            <TableCell align="right">Operation</TableCell>
          </TableRow>
        </TableHead>
        <CoursesTable row={props.row} />
      </Table>       
    </React.Fragment>
  )
} 

export default StudentEnrolments