import * as React from 'react';
import {Typography, Table, Grid} from '@mui/material';
import Title from '../SharedComponent/Title';
import PeopleIcon from '@mui/icons-material/People';
import Icon from '@mui/material/ListItemIcon';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

/**
 * Course Detail Page > Course Total information Paper Content.
 * Get and display the total filtered student number in the MongoDB database dummy data dataset.
 * 
 * @param props
 * @param {string} courseName course subject and catalogue (e.g., COMPSCI 701)
 * @return {React.Fragment} Display the total filtered student number.
 */

export default function Deposits(props) {
  const [studentNum, setStudentNum] = useState(0)
  const [studentNumForThisSem, setStudentNumForThisSem] = useState(0)

  const mockYear = 2019
  const mockSem = "S1"

  const getStuInCourseNumber = async () => {
    let {data} = await axios.get(`/api/student/stuByCourse/${props.courseName}`)
    return data
  }

  const getStuInCurrentSem = async () =>{

    let {data} = await axios.post('/api/student/stuByCourseAndYear', {
      Subject: props.subject,
      Catalogue: props.courseNumber,
      AcademicYear: mockYear,
      Semester: mockSem
    })
    data && setStudentNumForThisSem(data)
  }

  useEffect (() => {
    getStuInCourseNumber()
    .then(data => {
      setStudentNum(data)
    })

    getStuInCurrentSem()
  }, [props.courseName])

  return (
    <React.Fragment>
      {/* <Typography sx={{ fontSize: 30 }}>
        <strong>{props.courseName}</strong>
      </Typography>
      <br /> */}
      <Title>Total Students</Title>

        <Icon sx={{ fontSize: 300 }}>
          <PeopleIcon />
        </Icon>
        
        <Typography component="p" variant="h4">
          {studentNum}
        </Typography>

      <Title>Current semester</Title>
        <Icon sx={{ fontSize: 300 }}>
          <PeopleIcon />
        </Icon>

        <Typography component="p" variant="h4">
          {studentNumForThisSem}
        </Typography>

      {/* <Icon sx={{ fontSize: 300 }}>
        <PeopleIcon />
      </Icon> */}
    </React.Fragment>
  );
}
