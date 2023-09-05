import React from "react";
import TotalInfoDB from '../TotalInfoDB';
import {render,screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AppContext } from "../../../AppContextProvider";

describe('testing totalInfoDB', ()=>{
    const dashboard_st = [
        {
            "Id": 159448,
            "FirstName": "Qxitdo",
            "LastName": "Neqide",
            "Term": 1163,
            "AcademicYear": 2016,
            "Semester": "S1",
            "Subject": "COMPSCI",
            "Catalogue": 732,
            "CourseTitle": "Software Tools and Techniques",
            "AcadPlan": "INFT-MIT",
            "Grade": "B+",
            "GpaPoint": 6,
            "Campus": "City",
            "ResStatus": "Citizen",
            "Gender": "M",
            "StudentEmail": "xxx@aucklanduni.ac.nz"
          },
          {
            "Id": 159448,
            "FirstName": "Qxitdo",
            "LastName": "Neqide",
            "Term": 1163,
            "AcademicYear": 2016,
            "Semester": "S1",
            "Subject": "COMPSCI",
            "Catalogue": 734,
            "CourseTitle": "Web, Mobile, Enterprise Comptg",
            "AcadPlan": "INFT-MIT",
            "Grade": "B-",
            "GpaPoint": 4,
            "Campus": "City",
            "ResStatus": "Citizen",
            "Gender": "M",
            "StudentEmail": "xxx@aucklanduni.ac.nz"
          },
          {
            "Id": 159448,
            "FirstName": "Qxitdo",
            "LastName": "Neqide",
            "Term": 1163,
            "AcademicYear": 2016,
            "Semester": "S2",
            "Subject": "COMPSCI",
            "Catalogue": 734,
            "CourseTitle": "Adv Topics in Database Systems",
            "AcadPlan": "INFT-MIT",
            "Grade": "C+",
            "GpaPoint": 3,
            "Campus": "City",
            "ResStatus": "Citizen",
            "Gender": "M",
            "StudentEmail": "xxx@aucklanduni.ac.nz"
          }
    ]
    const context = {dashboard_st};
    it('',async ()=>{
        render(<TotalInfoDB/>,{
            wrapper:({children})=> <AppContext.Provider value={context}>{children}</AppContext.Provider>
        });
      const studentInfo = await screen.findByText("Total Student Currently");
      expect(studentInfo).toBeInTheDocument();
      const courseInfo = await screen.findByText('Total Courses Currently');
      expect(courseInfo).toBeInTheDocument();
            // base on the mock data, there are 2 courses and 1 student, so the page should be rendered with 1 and 2
      expect(await screen.findByText(1)).toBeInTheDocument();
      expect(await screen.findByText(2)).toBeInTheDocument();
    }) 
   
  
})