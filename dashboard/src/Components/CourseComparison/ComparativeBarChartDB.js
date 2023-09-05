import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import { SemesterFilter } from '../SharedComponent/CourseSemesterFilter';

/**
 * Course Comparison Page > Bar chart Paper Content.
 * Display the filtered student number for current course and selected semester for different grade
 * 
 * @param props 
 * @param {string} courseName specific course subject and course catalogue
 * @param {list} courseSemesterList 
 *       Content - [Course1Semester, Course2, Course2Semester, Course3, Course3Semester].
 *       Use the changed useState in the page to filter the needed information
 * @return {React.Fragment} 
 *       Display the filtered student number as bar chart for 3 courses with specific 
 *       semester for different grade.
 */  

export default function Chart(props) {
  let Course1 = props.courseName;
  let allTakes = props.alltakes;
  let [Course1Semester, Course2, Course2Semester, Course3, Course3Semester] = props.courseSemesterList;

  let courseStuInSem1 = SemesterFilter(Course1, Course1Semester, allTakes);
  // console.log(courseStuInSem1);
  let APlusStudent1 = courseStuInSem1.filter(s => s.Grade === "A+");
  let AStudent1 = courseStuInSem1.filter(s => s.Grade === "A");
  let AMinusStudent1 = courseStuInSem1.filter(s => s.Grade === "A-");
  let BPlusStudent1 = courseStuInSem1.filter(s => s.Grade === "B+");
  let BStudent1 = courseStuInSem1.filter(s => s.Grade === "B");
  let BMinusStudent1 = courseStuInSem1.filter(s => s.Grade === "B-");
  let CPlusStudent1 = courseStuInSem1.filter(s => s.Grade === "C+");
  let CStudent1 = courseStuInSem1.filter(s => s.Grade === "C");
  let CMinusStudent1 = courseStuInSem1.filter(s => s.Grade === "C-");
  let DStudent1 = courseStuInSem1.filter(s => s.GpaPoint === 0);

  let courseStuInSem2 = SemesterFilter(Course2, Course2Semester, allTakes);
  let APlusStudent2 = courseStuInSem2.filter(s => s.Grade === "A+");
  let AStudent2 = courseStuInSem2.filter(s => s.Grade === "A");
  let AMinusStudent2 = courseStuInSem2.filter(s => s.Grade === "A-");
  let BPlusStudent2 = courseStuInSem2.filter(s => s.Grade === "B+");
  let BStudent2 = courseStuInSem2.filter(s => s.Grade === "B");
  let BMinusStudent2 = courseStuInSem2.filter(s => s.Grade === "B-");
  let CPlusStudent2 = courseStuInSem2.filter(s => s.Grade === "C+");
  let CStudent2 = courseStuInSem2.filter(s => s.Grade === "C");
  let CMinusStudent2 = courseStuInSem2.filter(s => s.Grade === "C-");
  let DStudent2 = courseStuInSem2.filter(s => s.GpaPoint === 0);

  let courseStuInSem3 = SemesterFilter(Course3, Course3Semester, allTakes);
  let APlusStudent3 = courseStuInSem3.filter(s => s.Grade === "A+");
  let AStudent3 = courseStuInSem3.filter(s => s.Grade === "A");
  let AMinusStudent3 = courseStuInSem3.filter(s => s.Grade === "A-");
  let BPlusStudent3 = courseStuInSem3.filter(s => s.Grade === "B+");
  let BStudent3 = courseStuInSem3.filter(s => s.Grade === "B");
  let BMinusStudent3 = courseStuInSem3.filter(s => s.Grade === "B-");
  let CPlusStudent3 = courseStuInSem3.filter(s => s.Grade === "C+");
  let CStudent3 = courseStuInSem3.filter(s => s.Grade === "C");
  let CMinusStudent3 = courseStuInSem3.filter(s => s.Grade === "C-");
  let DStudent3 = courseStuInSem3.filter(s => s.GpaPoint === 0);

  let courseSemester1 = Course1 + " " + Course1Semester;
  let courseSemester2 = Course2 + " " + Course2Semester;
  let courseSemester3 = Course3 + " " + Course3Semester;

  let data = [
    { Grade: 'A+', [courseSemester1]: APlusStudent1.length, [courseSemester2]: APlusStudent2.length, [courseSemester3]: APlusStudent3.length },
    { Grade: 'A', [courseSemester1]: AStudent1.length, [courseSemester2]: AStudent2.length, [courseSemester3]: AStudent3.length },
    { Grade: 'A-', [courseSemester1]: AMinusStudent1.length, [courseSemester2]: AMinusStudent2.length, [courseSemester3]: AMinusStudent3.length },
    { Grade: 'B+', [courseSemester1]: BPlusStudent1.length, [courseSemester2]: BPlusStudent2.length, [courseSemester3]: BPlusStudent3.length },
    { Grade: 'B', [courseSemester1]: BStudent1.length, [courseSemester2]: BStudent2.length, [courseSemester3]: BStudent3.length },
    { Grade: 'B-', [courseSemester1]: BMinusStudent1.length, [courseSemester2]: BMinusStudent2.length, [courseSemester3]: BMinusStudent3.length },
    { Grade: 'C+', [courseSemester1]: CPlusStudent1.length, [courseSemester2]: CPlusStudent2.length, [courseSemester3]: CPlusStudent3.length },
    { Grade: 'C', [courseSemester1]: CStudent1.length, [courseSemester2]: CStudent2.length, [courseSemester3]: CStudent3.length },
    { Grade: 'C-', [courseSemester1]: CMinusStudent1.length, [courseSemester2]: CMinusStudent2.length, [courseSemester3]: CMinusStudent3.length },
    { Grade: 'D', [courseSemester1]: DStudent1.length, [courseSemester2]: DStudent2.length, [courseSemester3]: DStudent3.length },
  ];

  return (
    <React.Fragment>
      <Typography variant='h5'>Grade Breakdown</Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Grade" label={{ value: 'Grade', dy: 20 }}/>
          <YAxis label={{ value: 'Number of students', angle: -90, dx: -30 }}/>
          <Tooltip />
          <Legend verticalAlign="top" height={50} />
          <Bar dataKey={courseSemester1} fill="#8884d8" />
          <Bar dataKey={courseSemester2} fill="#82ca9d" />
          <Bar dataKey={courseSemester3} fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
