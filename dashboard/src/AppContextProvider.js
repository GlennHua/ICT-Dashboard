import React, { useEffect, useState } from 'react';
import useGet from './hooks/useGet';
import axios from 'axios';
import { departmentFullName } from './Components/ReportsHomepage/DepartmentListDB';

const AppContext = React.createContext({
});

function AppContextProvider({ children }) {

    const [context, setContext] = useState({
        dashboard_st: [],
        numberOfCourses: 0,
        numberOfStudents: 0,
        allTakes: [],
        allStudents:[],
        currentStudentsCount: 0,
        courseList:[],
        internshipEligibilityList:{}
       
    });

    // const { data: dashboard_st } = useGet('/api/dashboard/studentDetailsJson', []);
    // const { data: coursesCount } = useGet('/api/course/totalcourse', []);
    // const { data: studentsCount } = useGet('/api/student/totalstu', []);
    // const { data: allTakes } = useGet('/api/take/', []);

    // const numberOfStudents = studentsCount.studentsCount;
    // const numberOfCourses = coursesCount.coursesCount
    
    // // The context value that will be supplied to any descendants of this component.
    // let data = {
    //     dashboard_st,
    //     numberOfCourses,
    //     numberOfStudents,
    //     allTakes
    // }
    // const [context, setContext] = useState(data);


    // useEffect(()=>{
    //     console.log('context changed')
    // },[context])

    // const setContext = (newContext) =>{
    //     console.log(newContext)
    //     context = newContext
    // }


    const fetchData = async () => {

        const { data: dashboard_st }  = await axios.get('/api/dashboard/studentDetailsJson')
        const { data: coursesCount } = await axios.get('/api/course/totalcourse');
        const { data: studentsCount } = await axios.get('/api/student/totalstu');
        const { data: currentStudentsCount } = await axios.get(`/api/student/totalstu/2016`);
        const { data: allTakes } = await axios.get('/api/take/');
        const { data: allStudents} =await axios.get('/api/student');
        const { data: courseList } = await axios.get('/api/course')
        const { data: internshipEligibilityList } = await axios.get('/api/student/allStuInternshipStatus')

        const numberOfStudents = studentsCount.studentsCount;
        const numberOfCourses = coursesCount.coursesCount
       
        // const data = {
        //     ...context,
        //     dashboard_st,
        //     numberOfCourses,
        //     numberOfStudents,
        //     allTakes,
        //     testing: 123
        // }
        // setContext(context1)

        let subjectList = []
        let newSubjectList= []
        if(courseList && courseList.length>0){
          courseList.map(
            course => subjectList.push(course.Subject)
          )
          subjectList = [...new Set(subjectList)];
          let subjectFullNameList = departmentFullName(subjectList)
          for (let i = 0; i < subjectFullNameList.length; i++) {
            newSubjectList.push(subjectFullNameList[i] + " (" + subjectList[i] + ")");
          }
        }

        setContext(
            prevContext => ({
                ...prevContext,
                dashboard_st,
                numberOfStudents,
                currentStudentsCount,
                numberOfCourses,
                allTakes,
                allStudents,
                courseList,
                subjectList: newSubjectList,
                internshipEligibilityList: internshipEligibilityList.fullInternshipStatusList
              })
        )
    }

    useEffect(()=>{
        fetchData()
    }, [])





    // const { data: dashboard_st }  = axios.get('/api/dashboard/studentDetailsJson');
    // const { data: coursesCount } = axios.get('/api/course/totalcourse');
    // const { data: studentsCount } = axios.get('/api/student/totalstu');
    // const { data: allTakes } = axios.get('/api/take/');

    // const numberOfStudents = studentsCount.studentsCount;
    // const numberOfCourses = coursesCount.coursesCount

    // const data = {
    //     dashboard_st,
    //     numberOfCourses,
    //     numberOfStudents,
    //     allTakes,
    //     testing: 123
    // }
    // // setContext(context1)
    // setContext(data)

    // Wraps the given child components in a Provider for the above context.
    return (
        <AppContext.Provider value={{...context, updateContext: setContext}}>
            {children}
        </AppContext.Provider>
    );
}

export {
    AppContext,
    AppContextProvider
};