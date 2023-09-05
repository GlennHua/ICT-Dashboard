import React from "react";
import CourseSearch from "../ClassSearch";
import {fireEvent, render,screen}from '@testing-library/react';
import { AppContext } from "../../../AppContextProvider";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

/**
 * @param props 
 * @param {list} setList 
 */

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
        "Subject": "INFOSYS",
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
it('testing the functionality of course search box',()=>{
  let department = '';
  const setDepartment = jest.fn((value)=>{department=value});
  let number = '732';
  const setNumber = jest.fn((value)=>{number=value});
  let setList = [department,setDepartment,number,setNumber];
    render(<CourseSearch setList={setList}/>, {
        wrapper:({children})=> <AppContext.Provider value={context}>{children}</AppContext.Provider>
    })

  expect(screen.getByLabelText('subject').textContent).toBe('');
  userEvent.click(screen.getByRole('combobox'));
    const list = screen.getAllByRole('option');
    expect(list).toHaveLength(2);
    expect(list[0].textContent).toBe("Computer Science (COMPSCI)");
    expect(list[1].textContent).toBe("Information Systems (INFOSYS)")

    // once type COMPSCI, the list only contain one option
  userEvent.type(screen.getByRole('combobox'),'COMPSCI');
  expect(screen.getByRole('combobox').value).toBe('COMPSCI');
  expect(screen.getByRole('option').textContent).toBe('Computer Science (COMPSCI)')
  expect(screen.getByRole("textbox").value).toBe('732');
})
