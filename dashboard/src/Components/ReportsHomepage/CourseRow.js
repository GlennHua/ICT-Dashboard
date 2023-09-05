import React, { useEffect } from "react";
import { useState } from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';
import Box from '@mui/material/Box';
import {Table, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import CoursesTable from "./CoursesTable";
import { ThemeProvider } from '@mui/material/styles';
import { courseTabelTheme } from "../SharedComponent/AppBarDrawer";

export default function Row(props) {
    const { row,setExpand } = props;
    const[allOpen] = setExpand;
    const [open, setOpen] = useState(false); 
    const navigate = useNavigate()
    const redirectToStudentDetailPage = () => {
      navigate('/IndividualStudent', {state:{
        stuId: row.Id,
        row: row
      }})
    }
    useEffect(()=>{
      setOpen(allOpen)
    },[allOpen])
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell  scope="row" onClick={redirectToStudentDetailPage}>
            <Typography variant='body1' sx={{cursor: 'pointer'}}>
              {row.Name}
            </Typography>
          </TableCell>
          <TableCell align='right' >{row.Id}</TableCell>
          <TableCell align="right">{row.Gender}</TableCell>
          <TableCell align="right">{row.AverageGpa}</TableCell>
          <TableCell align="right">{row.Email}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Course
                </Typography>
                <Table size="small" aria-label="purchases">
                 <ThemeProvider theme={courseTabelTheme}>
                    <TableHead>
                      <TableRow >
                        <TableCell align="right">Course Name</TableCell>
                        <TableCell align="right">Course Title</TableCell>
                        <TableCell align="right">Year</TableCell>
                        <TableCell align="right">Semester</TableCell>
                        <TableCell align="right">Grade</TableCell>
                        <TableCell align="right">GPA</TableCell>
                        <TableCell align="right">Campus</TableCell>
                      </TableRow>
                    </TableHead>
                 </ThemeProvider>

                  {/* <TableBody>
                    {row.courses.map((courseRow) => (
                      <TableRow key={courseRow.Year+courseRow.CourseName}>
                        <TableCell component="th" scope="row">
                          {courseRow.CourseName}
                        </TableCell>
                        <TableCell align="right">{courseRow.CourseTitle}</TableCell>
                        <TableCell align="right">{courseRow.Year}</TableCell>
                        <TableCell align="right">{courseRow.Semester}</TableCell>
                        <TableCell align="right">{courseRow.Grade}</TableCell>
                        <TableCell align="right">
  
                          {courseRow.Gpa}</TableCell>
                        <TableCell align="right">{courseRow.Campus}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody> */}

                  <CoursesTable row={row}/>

                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        
      </React.Fragment>
    );
  }
  