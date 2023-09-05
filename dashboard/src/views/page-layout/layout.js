import React, { memo } from 'react'
import { Bar } from '../../Components/SharedComponent/SharedBarContent'
import DashboardContent from '../../Components/Dashboard/Dashboard'
import { Routes, Route } from 'react-router-dom';
import ViewCourses from '../../Components/ViewCourses/ViewCourses';
import CourseDetails from '../../Components/CourseDetails/CourseDetails';
import ReportsHomepage from '../../Components/ReportsHomepage/ReportsHomepage';
import DepartmentDetails from '../../Components/DepartmentDetails/DepartmentDetails';
import CourseComparison from '../../Components/CourseComparison/CourseComparison';
import CourseReport from '../../Components/CourseReport/CourseReport'
import StudentDetails from '../../Components/Studentfilter/StudentDetails'
import ProfilePage from '../../Components/Login/ProfilePage';
import StudentPage from '../../Components/ReportsHomepage/StudentReport';
import IndividualStudentReport from '../../Components/IndividualStudentPage.js/IndividualStudentReport';
import StudentPerformance from '../../Components/ReportsHomepage/StudentPerformance';
import ImportCSV from '../../Components/fileStream/ImportCSV';
import { Fragment } from 'react';
import InternshipReport from '../../Components/InternshipDetails/InternshipReport';

const LayoutWrapper = () => {

  return (
    <Fragment>
        <Bar />
        <div style={{marginLeft:'240px'}}>
        <Routes>
          <Route index element={<DashboardContent />} />
          <Route path="Profile" element={<ProfilePage />} />
          <Route path="ViewCourses" element={<ViewCourses />} />
          <Route path="ViewCourses/CourseDetails/:courseSubject" element={<CourseDetails />} />
          <Route path="ViewCourses/CourseDetails/:courseSubject/CourseComparison" element={<CourseComparison />} />
          <Route path="Reports" element={<ReportsHomepage />} />
          <Route path="StudentReport" element={<StudentPage/>}/>
          <Route path="studentPerformance" element={<StudentPerformance/>}/>
          <Route path="individualStudent" element={<IndividualStudentReport/>} />
          <Route path="Reports/DepartmentDetails/:subject" element={<DepartmentDetails />} />
          <Route path="Reports/DepartmentDetails/:subject/CourseReport/:courseSubject" element={<CourseReport />} />
          <Route path="Reports/DepartmentDetails/:subject/CourseReport/:courseSubjectCurrentSemester/StudentDetails" element={<StudentDetails />} />
          <Route path="importCSV" element={<ImportCSV />} />
          <Route path="InternshipDetails" element={<InternshipReport/>} />
        </Routes>
        </div>
    </Fragment>
  )
}

export default memo(LayoutWrapper)
