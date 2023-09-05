import { useTheme } from '@mui/material/styles';
import { AppContext } from '../../AppContextProvider';
import { useContext } from 'react';
import { ChartContent } from '../SharedComponent/ChartReturnContent';
import { averageGPA } from '../SharedComponent/RelatedFunctions';

/**
 * Dashboard Page > Line chart Paper Content.
 * Line chart function using MongoDB database dummy data.
 *  
 * @return Display the line chart.
 */

export default function Chart() {
  const theme = useTheme();
  const { allTakes } = useContext(AppContext);

  console.log(useContext(AppContext))

  // Get all semesters
  let semesterYearList = [];
  allTakes.forEach(element => {
    semesterYearList.push(element.AcademicYear + " " + element.Semester)
  })

  // Remove duplicate elements from the array
  let allSemesterTerm = Array.from(new Set(semesterYearList));

  // Calculate average GPA for each Semester
  const averageGPAs = [];
  for (let semester of allSemesterTerm) {
    // Grab the students in that semester
    let stuInAcademicYear = allTakes.filter(
      rec => 
        rec.AcademicYear === parseInt(semester.substring(0, semester.indexOf(' ')))
    );

    let stuInSemester = stuInAcademicYear.filter(
      s => 
        s.Semester === semester.substring(semester.indexOf(' ')+1)
    );

    // Calc the average GPA of those students
    let avgGpa = averageGPA(stuInSemester);
    // Stick it in the result array
    averageGPAs.push(avgGpa);
  }


  // Combine the allSemesterTerm and averageGPAs arrays into the graphData array, to display in the graph
  const graphData = [];
  for (let i = 0; i < allSemesterTerm.length; i++) {
    const point = {
      Term: allSemesterTerm[i],
      AverageGPA: averageGPAs[i]
    }
    graphData.push(point);
  }

  return (
    ChartContent(theme, "Student GPA Overview", graphData, "Term", "AverageGPA", "Average GPA", "AverageGPA")
  );
}
