import { averageGPA,domesticInternationalStudent } from "../RelatedFunctions";

describe('testing to related functions',()=>{
  const courseJson = [  {
        "Id": 159438,
        "FirstName": "Abc",
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
        "Semester": "S1",
        "Subject": "COMPSCI",
        "Catalogue": 734,
        "CourseTitle": "Adv Topics in Database Systems",
        "AcadPlan": "INFT-MIT",
        "Grade": "C+",
        "GpaPoint": 3,
        "Campus": "City",
        "ResStatus": "NZ Permanent Resident",
        "Gender": "M",
        "StudentEmail": "xxx@aucklanduni.ac.nz"
      }
      ,
      {
        "Id": 159441,
        "FirstName": "Bca",
        "LastName": "Neqide",
        "Term": 1163,
        "AcademicYear": 2016,
        "Semester": "S1",
        "Subject": "COMPSCI",
        "Catalogue": 734,
        "CourseTitle": "Adv Topics in Database Systems",
        "AcadPlan": "INFT-MIT",
        "Grade": "C+",
        "GpaPoint": 4,
        "Campus": "City",
        "ResStatus": "Overseas",
        "Gender": "M",
        "StudentEmail": "xxx@aucklanduni.ac.nz"
      }
  ]
  it('testing functions',()=>{
    expect(averageGPA(courseJson)).toBe("3.667");
    expect(domesticInternationalStudent(courseJson)).toEqual([2,1]);
  })
})