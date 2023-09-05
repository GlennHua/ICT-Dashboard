import React from 'react'
import InternshipStatusTable from './InternshipStatusTable'

const InternshipStatusLists = () => {
  return (
    <React.Fragment>
        {/* Student Internship status list (Completed) */}
        <InternshipStatusTable />
        {/* Student Internship status list (Eligible) */}
        <InternshipStatusTable />
        {/* Student Internship status list (Not Eligible) */}
        <InternshipStatusTable />
    </React.Fragment>
  )
}

export default InternshipStatusLists