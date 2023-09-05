import * as React from 'react';
import BarChart from '../SharedComponent/BarChart';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

/**
 * Course Detail Page > Course Barchart Paper content.
 * Barchart function using MongoDB database dummy data for domestic and internal student 
 * number comparison for different academic year and semester for specific course
 * 
 * @param props
 * @param {string} courseName course subject and catalogue (e.g., COMPSCI 701)
 * @return Display the bar chart.
 */

export default function Chart(props) {
  const [data, setData] = useState([])

  const getStuInCourseNumber = async () => {
    let {data} = await axios.get(`/api/take/resStatusbyCourse/${props.courseName}`)
    return data
  }

  useEffect (() => {
    getStuInCourseNumber()
    .then(data => {
      setData(data)
    })
  }, [props.courseName]);

  return (



    <BarChart flag_allowDecimals="true" data={data} XAxis_dataKey="Semester" />
    
  );
}
