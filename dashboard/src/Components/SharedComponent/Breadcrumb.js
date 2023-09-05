import React from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import {
    Link as RouterLink,
    useLocation,
} from 'react-router-dom';

/**
 'breadcrumbNameMap' means the map of breadcrumb.
 when a breadcrumb with props is created, it will be added to 'breadcrumbNameMap'.
 */
let breadcrumbNameMap = {
    '/': 'Dashboard',
    '/ViewCourses': 'View Courses',
    '/Reports': 'Reports',
    '/Reports/DepartmentDetails/': 'DepartmentDetails',
    '/Profile': 'Profile',
    '/StudentReport': 'Students Overview',
    '/StudentPerformance':'Students Performance',
    '/IndividualStudent': 'Student Details',
    '/importCSV': 'Import CSV',
};

export default function Header() {

    const [breadcrumbNameMapState, setBreadcrumbNameMapState] = useState(breadcrumbNameMap);
    const location = useLocation();
    //get pathname list
    let pathnames = location.pathname.split('/').filter((x) => x);

    /*
        when the target path is 'ViewCourses/CourseDetails/:courseSubject' or
        'ViewCourses/CourseDetails/:courseSubject/CourseComparison', the breadcrumbNameMap will be changed.
    */
    if (pathnames.length >= 3 && location.pathname.indexOf("ViewCourses/CourseDetails") != -1) {

        let path1 = `/${pathnames.slice(0, 3).join('/')}`;
        let path2 = `/${pathnames.slice(0, 4).join('/')}`;
        breadcrumbNameMap[path1] = 'CourseDetails';

        if (pathnames.length == 4) {
            breadcrumbNameMap[path2] = 'CourseComparison';
        }
        /**
            Judge if the path is added to breadcrumbNameMapState, avoid re-render too many times
        */
        if (breadcrumbNameMapState[path1] == null || breadcrumbNameMapState[path2] == null) {
            setBreadcrumbNameMapState(breadcrumbNameMap);
        }
    }

    /*
        when the target path is 'Reports/DepartmentDetails/:subject' 
        or 'Reports/DepartmentDetails/:subject/CourseReport/:courseSubject',
        or 'Reports/DepartmentDetails/:subject/CourseReport/:courseSubjectCurrentSemester/StudentDetails',
        the breadcrumbNameMap will be changed.
    */
    if (pathnames.length >= 3 && location.pathname.indexOf("/Reports/DepartmentDetails") != -1) {
        let path3 = `/${pathnames.slice(0, 3).join('/')}`;
        breadcrumbNameMap[path3] = 'DepartmentDetails';

        if (breadcrumbNameMapState[path3] == null) {
            setBreadcrumbNameMapState(breadcrumbNameMap);
        }

        if (pathnames.length == 5) {

            if (location.pathname.indexOf("_") != -1) {
                pathnames[4] = pathnames[4].substring(0, pathnames[4].indexOf('_'));
            }
            let path5 = `/${pathnames.slice(0, 5).join('/')}`;
            breadcrumbNameMap[path5] = 'CourseReport';
            if (breadcrumbNameMapState[path5] == null) {
                setBreadcrumbNameMapState(breadcrumbNameMap);
            }
        }
        if (pathnames.length == 6) {
            if (location.pathname.indexOf("_") != -1) {
                pathnames[4] = pathnames[4].substring(0, pathnames[4].indexOf('_'));
            }
            let path5 = `/${pathnames.slice(0, 5).join('/')}`;
            let path6 = `/${pathnames.slice(0, 6).join('/')}`;

            breadcrumbNameMap[path5] = 'CourseReport';
            breadcrumbNameMap[path6] = 'StudentDetails';

            if (breadcrumbNameMapState[path5] == null || breadcrumbNameMapState[path6] == null) {
                setBreadcrumbNameMapState(breadcrumbNameMap);
            }
        }
    }

    return (
        <div role="presentation" >
            <Breadcrumbs aria-label="breadcrumb">
                <RouterLink underline="hover" color="inherit" to="/">
                    Home
                </RouterLink>
                {pathnames.length != 0 ? '' :
                    <Typography color="text.primary" key="/">
                        Dashboard
                    </Typography>
                }

                {pathnames.map((value, index) => {
                    let last = index === pathnames.length - 1;
                    let to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    let continueFlag = false;
                    if (to == "/ViewCourses/CourseDetails" ||
                        to.split("DepartmentDetails").slice(-1)[0] === "" ||
                        to.split("CourseReport").slice(-1)[0] === "") {
                        continueFlag = true;
                    }

                    return continueFlag ? '' : last ?
                        <Typography color="text.primary" key={to}>
                            {breadcrumbNameMap[to]}
                        </Typography> : (
                            <RouterLink underline="hover" color="inherit" to={to} key={to}>
                                {breadcrumbNameMap[to]}
                            </RouterLink>
                        );
                })}
            </Breadcrumbs>
        </div>
    );
}
