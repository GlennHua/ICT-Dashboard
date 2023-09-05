import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * Course Report Page > Bar chart Paper Content.
 * Display the filtered student number for current course and selected semester for different grade
 *  
 * @return {ResponsiveContainer} Display the bar chart.
 */

export default class Grades extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/bar-chart-has-no-padding-jphoc';

  render() {
    let courseStuInSem = this.props.courseStuInSem;
    
    let APlusStudent = courseStuInSem.filter(s => s.Grade === "A+");
    let AStudent = courseStuInSem.filter(s => s.Grade === "A");
    let AMinusStudent = courseStuInSem.filter(s => s.Grade === "A-");
    let BPlusStudent = courseStuInSem.filter(s => s.Grade === "B+");
    let BStudent = courseStuInSem.filter(s => s.Grade === "B");
    let BMinusStudent = courseStuInSem.filter(s => s.Grade === "B-");
    let lowerThanBMinusStudentNumber = courseStuInSem.length - APlusStudent.length - AStudent.length - AMinusStudent.length - BPlusStudent.length - BStudent.length - BMinusStudent.length;

    let data = [
      { Grade: 'A+', Students: APlusStudent.length },
      { Grade: 'A', Students: AStudent.length },
      { Grade: 'A-', Students: AMinusStudent.length },
      { Grade: 'B+', Students: BPlusStudent.length },
      { Grade: 'B', Students: BStudent.length },
      { Grade: 'B-', Students: BMinusStudent.length },
      { Grade: '< B-', Students: lowerThanBMinusStudentNumber },
    ];

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={450}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="Grade" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="Students" name="Number of students" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
