import { ChartContent } from '../SharedComponent/ChartReturnContent';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

/**
 * Course Detail Page > Course Line chart Paper Content.
 * Line chart function using MongoDB database dummy data for specific course.
 * 
 * @param props
 * @param {string} courseName course subject and catalogue (e.g., COMPSCI 701)
 * @return Display the course line chart.
 */

export default function Chart(props) {
  const [data, setData] = useState([])

  const getStuInCourseNumber = async () => {
    let {data} = await axios.get(`/api/take/averageGPAbyCourse/${props.courseName}`)
    return data
  }

  useEffect (() => {
    getStuInCourseNumber()
    .then(data => {
      setData(data)
    })
  }, [props.courseName]);

  return (
    ChartContent(props.theme, "Student GPA Overview", data, "time", "", "Average GPA", "AverageGPA")
  );
}