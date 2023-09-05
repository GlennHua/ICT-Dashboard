import * as React from 'react'
import { useEffect, useState } from 'react'
import Title from '../SharedComponent/Title'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import CoursePieChart from './CoursePieChart'
import { subjectList,courseList,semesterList,passedFailedBySubject,passedFailedBySubjectAndCourse,passedFailedBySubjectAndCourseAndSemester } from '../../Request/DashboardRequest'
/**
 * Dashboard Page > Course Overview Paper Content.
 * Select and display the passed and failed student of a course.
 *
 * @return {React.Fragment} Display a piechart and two selecter.
 */

export default function CourseOverview() {
  const [pieData, setPieData] = useState({passedAndFailed:[],passedStudent:[],failedStudent:[]})
  const [subject, setSubject] = useState([])
  const [selectSubject, setSelectSubject] = useState('')
  const [course, setCourse] = useState([])
  const [selectCourse, setSelectCourse] = useState('')
  const [semester, setSemester] = useState([])
  const [selectSemester, setSelectSemester] = useState('');
  const pieChartList =[selectSubject,selectCourse,selectSemester];
  
  useEffect(() => {
    getSubjectList().then((subject) => {
      setSubject(subject)
    })
  },[])

  useEffect(() => {
    if(selectSubject !== ''){
      getCourseList().then((course) => {
        setCourse(course)
      })
    }
  }, [selectSubject])

  useEffect(() => {
    if(selectSubject !== '' && selectCourse !== ''){
      getSemesterList().then((semester) => {
        setSemester(semester)
      })
    }
  }, [selectCourse])

  const getSubjectList = async () => {
    let {data} = await subjectList()
    return data
  }

  const getCourseList = async () => {
    let {data} = await courseList(selectSubject)
    return data
  }

  const getSemesterList = async () => {
    let {data} = await semesterList(selectSubject,selectCourse)
    return data
  }

  const getPassedFailedBySubject = async (subject) => {
    let {data} = await passedFailedBySubject(subject)
    return data
  }

  const getPassedFailedBySubjectAndCourse = async (course) => {
    let {data} = await passedFailedBySubjectAndCourse(selectSubject,course)
    return data
  }

  const getPassedFailedBySubjectAndCourseAndSemester = async (semester) => {
    let {data} = await passedFailedBySubjectAndCourseAndSemester(selectSubject,selectCourse,semester)
    return data
  }


  const handleSelectSubject = (event) => {
    setSelectSubject(event.target.value)
    setSelectCourse('')
    setSelectSemester('')
    getPassedFailedBySubject(event.target.value).then((res) => {
      setPieData(res)
    })
  }

  const handleSelectCourse = (event) => {
    setSelectCourse(event.target.value)
    setSelectSemester('')
    getPassedFailedBySubjectAndCourse(event.target.value).then((res) => {
      setPieData(res)
    })
  }

  const handleSelectSemester = (event) => {
    setSelectSemester(event.target.value)
    getPassedFailedBySubjectAndCourseAndSemester(event.target.value).then((res) => {
      setPieData(res)
    })
  }


  return (
    <React.Fragment>
      <Grid container height="100%" width="100%" >
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Title>Course Overview</Title>
            </Grid>
            <Grid item>
              <FormControl sx={{ m: 1, minWidth: 125 }} size="small">
                <InputLabel>Subject</InputLabel>
                <Select
                  value={selectSubject}
                  label="Subject"
                  onChange={handleSelectSubject}
                >
                  {subject.map((subject, index) => {
                    return (
                      <MenuItem key={index} value={subject}>
                        {subject}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl sx={{ m: 1, minWidth: 125 }} size="small">
                <InputLabel>Course</InputLabel>
                <Select
                  value={selectCourse}
                  label="Course"
                  onChange={handleSelectCourse}
                >
                  {course.map((course, index) => {
                    return (
                      <MenuItem key={index} value={course}>
                        {course}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl sx={{ m: 1, minWidth: 125 }} size="small">
                <InputLabel>Semester</InputLabel>
                <Select
                  value={selectSemester}
                  label="Semester"
                  onChange={handleSelectSemester}
                >
                  {semester.map((semester, index) => {
                    return (
                      <MenuItem key={index} value={semester}>
                        {semester}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <CoursePieChart dataList={pieChartList}  passedAndFailed={pieData.passedAndFailed} passedStudent={pieData.passedStudent} failedStudent={pieData.failedStudent}/>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
