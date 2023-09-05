

export  function formatStudentData(students,takes, course=null){
   let tableContent = [];
   if(Array.isArray(students) && !course){
        students.forEach(student=>{
        const enrolledCourse = takes.filter(take => take.StudentId===student.StudentId);
        const courses = getStudentEnrolledCourses(enrolledCourse);
        const name = getFullName(student.Name);

        const averageGpa = getAverageGpa(courses);
            const studentRow = {
                Id:student.StudentId,
                Name:name,
                Gender:student.Gender,
                AverageGpa:averageGpa,
                Email:student.StudentEmail,
                courses:courses
            }
            if(courses.length!==0){
                tableContent.push(studentRow)
            }
         
        })
        
            return tableContent;
            
    } 
    else if(students.length> 0 && 
        takes.length > 0 &&
        course !== null &&
        typeof course === 'object'
    ){
        let enrolments = []
        for(let stu of students){
            const enrolledCourse = takes.filter(take => take.StudentId===stu.StudentId);
            const courses = getStudentEnrolledCourses(enrolledCourse);

            const averageGpa = getAverageGpa(courses);
            console.log(averageGpa)

            for(let take of takes){
                if(take.StudentId === stu.StudentId && 
                    take.Subject === course.subject &&
                    take.Catalogue === course.catalogue){
                        
                        enrolments.push({
                            Id: stu.StudentId,
                            Name: getFullName(stu.Name),
                            Gender: stu.Gender,
                            AverageGpa:averageGpa,
                            Email: stu.StudentEmail,
                            Term: take.Term,
                            courses
                        })
                    }
            }       
        }
        return enrolments;
    }
    else{
        
        const enrolledCourse = takes.filter(take=>take.StudentId===students.StudentId);
        const courses = getStudentEnrolledCourses(enrolledCourse);     
        const name = getFullName(students.Name);
        const averageGpa = getAverageGpa(courses);
        console.log(averageGpa)
            const studentRow = {
                Id:students.StudentId,
                Name:name,
                Gender:students.Gender,
                AverageGpa: averageGpa ? averageGpa : 0.00,
                Email:students.StudentEmail,
                courses:courses
            }
            if(courses.length!==0){
                tableContent.push(studentRow)
            }
            return tableContent;
    }
    
}

export  function getAverageGpa(courses){
    let averageGpa = 0;
    let Num = 0;
    courses.forEach(course => {
        if(course.Grade !== "CPL" && course.Grade!=="FNG"){
            averageGpa += course.Gpa
             Num += 1;
        }
    });
    if(Num===0){
        return 0.00;
    }
    return (averageGpa/Num).toFixed(2);
}

export function getFullName(props){

    return props.FirstName+' '+props.LastName;
}

export function getStudentEnrolledCourses(takes){
    const studentEnrolledCourses = [];
    
    takes.forEach(element=>{
   
        const{AcademicYear,Semester,Grade,GpaPoint,Subject,Catalogue,Campus,CourseTitle, Term} = element;
        const courseName = Subject+' '+Catalogue;
        const  course = {
            CourseName:courseName,
            CourseTitle:CourseTitle,
            Year:AcademicYear,
            Semester:Semester,
            Grade:Grade,
            Gpa:GpaPoint,
            Campus:Campus,
            Term
        }
        studentEnrolledCourses.push(course);
    })
    return studentEnrolledCourses;
}


export function descendingComparator(a,b,orderBy)
{
  if(b[orderBy]<a[orderBy]){
  
    return -1;
  }
  if(b[orderBy]>a[orderBy]){
    return 1;
  }
  return 0;
}

export function getComparator(order,orderBy){
    return order ==='desc'
      ?(a,b)=> descendingComparator(a,b,orderBy)
      :(a,b)=>-descendingComparator(a,b,orderBy);
  }

 export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

 export function filterByGpaRange(greater,lower,rows){

 return rows.filter(row=> 
 parseFloat(row.AverageGpa)<=greater && parseFloat(row.AverageGpa)>=lower
    )

 }

 export function getExportJsonData(rows){
    let jsonData=[];
        rows.map(row=>{
                row.courses.forEach(course=>{
                jsonData.push({...row,...course})
                })
        })
       return jsonData;
 }

export const getStudentByGrade =(grade,arr)=>{
    let newRows = [];
    let courses = [];
   arr.map(row=>{      
       courses = row.courses.filter(course=>course.Grade === grade)
     if(courses.length!==0){
       newRows.push({...row,...{courses:courses}})     
     }      
    }
    )
   return newRows;
}

export const getStudentByPass=(isPass,arr)=>{
    let newRows = [];
    let courses = [];
    if(isPass){
        arr.map(row=>{
            courses = row.courses.filter(course=>course.Gpa>=4)
          if(courses.length!==0){
            newRows.push({...row,...{courses:courses}})
          }
        })
    }else{
        arr.map(row=>{
            courses = row.courses.filter(course=>course.Gpa<4)
          if(courses.length!==0){
            newRows.push({...row,...{courses:courses}})
          }
        })
    }

    return newRows;
}