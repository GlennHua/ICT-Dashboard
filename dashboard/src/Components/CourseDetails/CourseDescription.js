import React, { useEffect, useState } from 'react'
import {Typography, Link} from '@mui/material';
import axios from 'axios';

const CourseDescription = (props) => {

    const [courseInfo, setCourseInfo] = useState({})
    const subject = props.subject ? props.subject : ''
    const courseNumber = props.courseNumber ? props.courseNumber : ''

    const getCurrentCourse = async () => {

        const { data } = await axios.post('/api/course/getCourseBySubjectAndCatalogue', {
            subject: props.subject,
            catalogue: props.courseNumber
        })
        console.log(data)
        data && setCourseInfo(data)
    }
    
    useEffect(() => {
        getCurrentCourse()
    }, [props])
    
    return (
        <React.Fragment>
            <Typography 
                sx={{ fontSize: 30, fontWeight: 'bold' }}
                variant='h1'
            >
                {props.courseName}: {courseInfo.CourseTitle}
            </Typography>
            <br />

            <Typography
                sx={{ fontSize: 18 }}
                align='justify'
            >
                {courseInfo.Description}
            </Typography>
            <br />

            <Link
                underline="hover"
                href={`https://courseoutline.auckland.ac.nz/dco/course/${subject}/${courseNumber}`}
            >
                Course outlines
            </Link>

        </React.Fragment>
    )
}

export default CourseDescription