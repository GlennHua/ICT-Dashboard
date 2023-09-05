import { CourseInfoFilter,SemesterListFilter,SemesterJsonFilter,SemesterFilter } from "../CourseSemesterFilter";


describe('test the functions of CourseSemesterFilter',()=>{
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

it ('test CourseInfoFilter',()=>{
    const courseName = "COMPSCI 732";
    const result = CourseInfoFilter(courseName,dashboard_st);
    expect(result).toEqual([{
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
      }])
})

it('test SemesterListFilter',()=>{
    const courseName = "COMPSCI 734";
    const result = SemesterListFilter(courseName,dashboard_st);
    expect(result).toEqual(["2016 S1","2016 S2"])
})

it('test SemesterJsonFilter',()=>{
    const courseName = "COMPSCI 734";
    const result = SemesterJsonFilter(courseName,dashboard_st);
    expect(result).toEqual([{'semester': '2016 S1'},{'semester': '2016 S2'}])
})

it('test SemesterFilter',()=>{
    const courseName = "COMPSCI734";
    const targetYearSemester = "2016 S1";
    const result = SemesterFilter(courseName,targetYearSemester,dashboard_st);
    expect(result).toEqual([{
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
      }])
})
    
})
