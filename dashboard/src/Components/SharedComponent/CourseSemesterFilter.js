// import { AppContext } from '../../AppContextProvider';
// import { useContext } from 'react';

/**
 *  Get the filtered course information JSON list
 * 
 *  === include the type checking, catalogue's type is Number, 
 *    so need to parseInt() before check if it match.
 * 
 *  @param {string} courseName specific course name (subject and catalogue)
 *  @return {JSON list} the filtered course information JSON list
 */ 

export function CourseInfoFilter(courseName, allTakes) {
  // const { dashboard_st } = useContext(AppContext);
  // Delete the whitespace between subject and catalogue, if any, e.g. COMPSCI 726 -> COMPSCI726

  // courseName = courseName.replace(/\s/g, ''); 
  const subject = courseName.substring(0, courseName.length - 4);
  const catalogue = courseName.substring(courseName.length-3);
  // console.log(subject)
  // console.log(catalogue)
  let courseInfo = [];

  // if (Array.isArray(dashboard_st) && dashboard_st.length > 0) {
  //   let courseInfoSubject = dashboard_st.filter(s => s.Subject === subject);
  //   courseInfo = courseInfoSubject.filter(s => s.Catalogue === parseInt(catalogue));
  // }

  if (Array.isArray(allTakes) && allTakes.length > 0) {
    let courseInfoSubject = allTakes.filter(take => take.Subject == subject);
    courseInfo = courseInfoSubject.filter(course => course.Catalogue == catalogue);
  }

  return courseInfo;
}

/** 
 *  Get the sorted filtered semester list
 * 
 *  @param {string} courseName specific course name (subject and catalogue)
 *  @return {list} the sorted filtered semester list - e.g., 2020 S1
 */ 

export function SemesterListFilter(courseName, alltakes) {
  // console.log(courseName)
  // console.log(alltakes)
  
  let semesterList = [];
  let courseInfo = CourseInfoFilter(courseName, alltakes);

  // courseInfo.forEach(element => {
  //   semesterList.push(element.AcademicYear + " " + element.Semester)
  // })

  courseInfo.forEach(element => {
    semesterList.push(element.AcademicYear + " " + element.Semester)
  })

  semesterList = [...new Set(semesterList)];
  semesterList.sort();

  return semesterList;
}

/**
 *  Get the filtered semester JSON list, push the semester list content into JSON format for easy use
 * 
 *  @param {string} courseName specific course name (subject and catalogue)
 *  @return {JSON list} the filtered semester JSON list
 */ 

export function SemesterJsonFilter(courseName, alltakes) {
  let semesterList = SemesterListFilter(courseName, alltakes);
  let semesterJson = [];

  for (let i = 0; i < semesterList.length; i++) {
    semesterJson.push({'semester': semesterList[i]});
  }

  return semesterJson;
}

/**
 *  Get the filtered semester JSON list 
 *    - for specific course subject, course catalogue, academic year and semester
 * 
 *  @param {string} courseName specific course name (subject and catalogue)
 *  @param {string} targetYearSemester specific academic year and semester, e.g., 2020 S1
 *  @return {JSON list} the filtered semester JSON list
 */ 

export function SemesterFilter(courseName, targetYearSemester, alltakes) {
  let courseInfo = CourseInfoFilter(courseName, alltakes);
  let courseStuInAcademicYear = courseInfo.filter(s => s.AcademicYear === parseInt(targetYearSemester.substring(0, targetYearSemester.indexOf(' '))));
  let courseStuInSem = courseStuInAcademicYear.filter(s => s.Semester === targetYearSemester.substring(targetYearSemester.indexOf(' ')+1));
// console.log(courseStuInSem)
  return courseStuInSem;
} 