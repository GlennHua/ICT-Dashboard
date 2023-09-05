import * as React from 'react';
import { useEffect, useState } from "react";
import Title from '../SharedComponent/Title';
import BarChart from '../SharedComponent/BarChart';
import { resStatus } from '../../Request/DashboardRequest';
/**
 * Dashboard Page > Barchart Paper content.
 * Barchart function using MongoDB database dummy data.
 *  
 * @return {React.Fragment} Display the bar chart.
 */

export default function Chart() {
  const [studentData, setStudentData] = useState([])
  
  useEffect(() => {
    getResStatus().then((data) => {
      setStudentData(data)
    })
  }, [])

const getResStatus = async () => {
  const { data } = await resStatus()
  return data
}
  return (
    <React.Fragment>
      <Title>Number of students</Title>
      <BarChart XAxis_dataKey="Semester" flag_allowDecimals="false" data={studentData}></BarChart>
    </React.Fragment>
  );
}
