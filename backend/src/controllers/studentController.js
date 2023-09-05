import Student from '../db/schema_studentInfo'
import mongoose from 'mongoose'
import Take from '../db/schema_take_course';
import Course from '../db/schema_course';
import TechnicalAndProfessionalSkill from '../util/TechnicalAndProfessionalSkill.json';



export const getStudent = async (req, res) => {
  try {
    const student = await Student.find()
    res.status(200).json(student)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getStudentByName = async (req, res) => {
  try {
    const { firstName, lastName } = req.body
    const Name = {
      FirstName: firstName,
      LastName: lastName
    }
    const student = await Student.findOne({ Name: Name })
    res.status(200).send(student)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getToalStudent = async (req, res) => {
  try {
    const studentsCount = await Student.count()
    res.status(200).send({
      studentsCount
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getToalStudentByYear = async (req, res) => {
  const { year } = req.params
  try {
    const distinctStudents = await Take.distinct('StudentId', {
      AcademicYear: year
    })
    res.status(200).json(distinctStudents.length)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getToalStudentByCourseName = async (req, res) => {
  const { courseName } = req.params
  try {
    const distinctStudents = await Take.distinct('StudentId', {
      Subject: courseName.split(' ')[0],
      Catalogue: courseName.split(' ')[1]
    })
    res.status(200).json(distinctStudents.length)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getToalStudentBySemester = async (req, res) => {
  try {
    const takeList = await Take.find({})
    let semesterList = []
    takeList.map((take) => {
      if (!semesterList.includes(take.AcademicYear + ' ' + take.Semester)) {
        semesterList.push(take.AcademicYear + ' ' + take.Semester)
      }
    })
    let result = []
    semesterList.map((semester) => {
      let count = 0
      takeList.map((take) => {
        if (take.AcademicYear + ' ' + take.Semester === semester) {
          count++
        }
      })
      result.push({ semester, count })
    })
    res.status(200).json(result)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getToalStudentByCourseNameForCurrentSemester = async (
  req,
  res
) => {
  const { Subject, Catalogue, AcademicYear, Semester } = req.body
  try {
    const distinctStudents = await Take.distinct('StudentId', {
      Subject,
      Catalogue,
      AcademicYear,
      Semester
    })
    res.status(200).json(distinctStudents.length)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getStudentById = async (req, res) => {
  const { id } = req.params
  try {
    const student = await Student.findOne({ StudentId: id })
    res.status(200).json(student)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getStudentByIdNew = async (req, res) => {
  const { id } = req.params
  try {
    const student = await Student.findOne({ StudentId: id })
      .select('-_id -__v')
      .then((student) => {
        const {
          Name,
          StudentEmail,
          AcadProg,
          AcadPlan,
          ResStatus,
          CumGpa,
          EthnicGroup,
          StudentGroup,
          SecSchool,
          PreferredPhone,
          Gender,
          ExternalSponsor,
          Birthdate,
          PreferedName,
          // AcadGroup,
          UntTaken,
          UnitsEarned,
          StudentId,
          Courses
        } = student

        return {
          Name: Name.FirstName + ' ' + Name.LastName,
          PreferredName: PreferedName ? PreferedName : Name.FirstName,
          StudentId,
          Gender,
          AcadProg: AcadProg,
          Gpa: CumGpa,
          UntTaken, //Mock
          UnitsEarned, //Mock
          AcadPlan,
          EthnicGroup: EthnicGroup,
          BirthDate: Birthdate,
          ExternalSponsor: ExternalSponsor.Descr
            ? ExternalSponsor.Descr
            : 'N/A',
          PreferredPhone: PreferredPhone,
          StudentEmail,
          SecSchool,
          ResStatus,
          StudentGroup: StudentGroup ? StudentGroup : 'N/A',
          Courses
        }

//     console.log(req.params.id)
//     const { id } = req.params;
//     try {
//         const student = await Student.findOne({StudentId : id}).select('-_id -__v').then(
//             (student) => {
//                 console.log(student)
//                 const {Name, 
//                     StudentEmail,
//                     AcadProg,
//                     ResStatus,
//                     CumGpa,
//                     AcadPlan,
//                     EthnicGroup,
//                     StudentGroup,
//                     SecSchool,
//                     PreferredPhone,
//                     Gender,
//                     ExternalSponsor,
//                     Birthdate,
//                     AcadGroup,
//                     PreferedName
                    
//                 } = student;

//                 return{
//                     Name: Name.FirstName + ' ' + Name.LastName,
//                     PreferredName: PreferedName ? PreferedName : Name.FirstName,
//                     Gender,
//                     AcadProg: AcadProg,
//                     AcadPlan,
//                     Gpa: CumGpa,
//                     UnitsTaken: 60, //Mock
//                     UnitsPassed: 60,   //Mock
//                     AcadGroup: AcadGroup,
//                     EthnicGroup: EthnicGroup,
//                     BirthDate: Birthdate,
//                     ExternalSponsor: ExternalSponsor.Descr ? ExternalSponsor.Descr : 'N/A',
//                     PreferredPhone: PreferredPhone,
//                     StudentEmail,
//                     SecSchool,
//                     ResStatus,
//                     StudentGroup: StudentGroup ? StudentGroup : 'N/A',
//                 }
// >>>>>>> Stashed changes

        // return {
        //     ...student._doc,
        //     PreferredName: 'Mock Prefered Name',
        //     AcadProg: 'Mock Academic Programme',
        //     Gpa: 6.5,
        //     UnitsTaken: 180,
        //     UnitsPassed: 180,
        //     Campus: 'International Offshore (Mock)',
        //     AcadGroup: 'Mock Academic Group',
        //     EthnicGroup: 'Mock Ethnic',
        //     BirthDate: 'Mock Birth Date',
        //     ExternalSponsor: 'Mock External Sponsor',
        //     SecSchool: 'Mock Secondary School',
        //     PreferredPhone: 'Mock Preferred Phone'
        // }
      })
    res.status(200).json(student)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createStudent = async (req, res) => {
  const student = req.body
  const newStudent = new Student(student)
  try {
    await newStudent.save()
    res.status(201).json(newStudent)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updateStudent = async (req, res) => {
  const { id } = req.params
  const student = req.body
  try {
    await Student.findOneAndUpdate({ StudentId: id }, {CumGpa: student.Gpa}, { new: true });
    res.status(200).json({ message: 'update success' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const deleteStudent = async (req, res) => {
  const { id } = req.params
  try {
    await Student.findOneAndDelete({ StudentId: id })
    res.status(200).json({ message: 'Student deleted successfully.' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getStudentTakeCourse = async (req, res) => {
  const { id } = req.params
  try {
    // const student = await Student.findOne({ StudentId: id})
    const take = await Take.find({ StudentId: id })
    // const course = await Course.find();
    // const result = [];
    // for (let i = 0; i < take.length; i++) {
    //     for (let j = 0; j < course.length; j++) {
    //         if (take[i].Catalogue == course[j].Catalogue) {
    //             result.push({
    //                 Term: take[i].Term,
    //                 AcademicYear: take[i].AcademicYear,
    //                 Campus: take[i].Campus,
    //                 Semester: take[i].Semester,
    //                 Grade: take[i].Grade,
    //                 GpaPoint: take[i].GpaPoint,
    //                 Subject: course[j].Subject,
    //                 CourseTitle: course[j].CourseTitle,
    //                 Catalogue: course[j].Catalogue
    //             })
    //         }
    //     }
    // }
    res.status(200).json(take)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const importCSV = async (req, res) => {
  try {
    req.body.map(async (row) => {
      if (row.Id) {
        let {
          FirstName,
          LastName,
          StudentEmail,
          ResStatus,
          Gender,
          AcadProg,
          AcadPlan,
          CumGpa,
          Gpa,
          UnitsEarned,
          UntTaken,
          UntPassed,
          AcacGroup,
          StudentGroup,
          EthnicGroup,
          BirthDate,
          ExternalSponsor,
          Descr,
          SponsershipType,
          SecSchool,
          RecruitmentCategory,
          UtasAttribute,
          PreferredPhone,
          PreferedName,
          Subject,
          Catalogue,
          Term,
          CourseTitle,
          Campus,
          Grade,
          SessionDesc,
          ClassNbr,
          RepeatCandidate,
          RepeatCode,
          Dept
        } = row

        let AcademicYear = parseInt('20' + Term.substring(1, 3))
        let Semester = null
        if (Term.endsWith('3')) {
          Semester = 'S1'
        } else if (Term.toString().endsWith(5)) {
          Semester = 'S2'
        } else {
          Semester = 'S3'
        }
        Catalogue = Catalogue.replace(/[\u202D\u202C]/g, '')
        const stuRes = await Student.findOne({ StudentId: row.Id })
        const takeRes = await Take.findOne({
          StudentId: row.Id,
          Subject,
          Catalogue,
          AcademicYear,
          Semester
        })

        const stuObj = {
          StudentId: row.Id,
          Name: {
            FirstName,
            LastName
          },
          PreferedName: PreferedName ? PreferedName : FirstName,
          StudentEmail,
          AcadPlan,
          AcadProg,
          ResStatus,
          Gender,
          CumGpa,
          UnitsEarned,
          UntTaken,
          UntPassed,
          AcacGroup,
          StudentGroup: StudentGroup.toString(),
          EthnicGroup,
          BirthDate,
          ExternalSponsor: {
            ExternalSponsor,
            Descr,
            SponsershipType
          },
          SecSchool,
          RecruitmentCategory,
          UtasAttribute,
          PreferredPhone
        }

        const takeObj = {
          StudentId: row.Id,
          AcademicYear,
          Semester,
          Term,
          Subject,
          CourseTitle,
          Catalogue,
          Campus,
          Grade,
          GpaPoint: Gpa,
          SessionDesc,
          ClassNbr,
          RepeatCandidate,
          RepeatCode,
          Dept
        }
        //if not found student, create new student and take
        //if found student but not take, create new take
        //if found student and take, update student and take
        if (stuRes == null) {
          let newStudent = new Student(stuObj)
          let newTake = new Take(takeObj)
          await newStudent.save()
          await newTake.save()
        } else if (takeRes == null) {
          let newTake = new Take(takeObj)
          await newTake.save()
        } else {
          await Student.findOneAndUpdate({ StudentId: row.Id }, stuObj)
          await Take.findOneAndUpdate({ StudentId: row.Id }, takeObj)
        }
      }
    })
    console.log('Import Success')
    res.status(200).json({ message: 'Import Success' })
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error.message })
  }
}

export const checkStuInternshipEligibility = async (req, res) => {
  const { studentId } = req.params
  const mockAcademicPlan = 'INFT-MIT'

  // INFT-T4MIT: 240pts
  // INFT-T3MIT: 180pts
  // INFT-MIT: 180pts
  // INFT-T2MIT: 120pts

  try {
    // Assuming all students are doing180pts and 240pts
    const courseList = await Take.find({
      StudentId: studentId
    })

    switch (mockAcademicPlan) {
      case 'INFT-MIT':
        if (courseList.length) {
        }
    }

    res.status(200).json({ internshipEligibility })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}


export const conditionalCheckStudentsInternshipEligibility = async (req, res) => {
  // const {status} = req.params
  const studentList = await Student.find()

  const internshipStatusPromises = studentList.map(
    async (student) => {
      const response = await getInternshipStatusByStu(student)
      return {
        student,
        response
      }
    }
  )
  const internshipStatusList = await Promise.all(internshipStatusPromises)

  // const internshipStatusList = ['Eligible', 'Not Eligible', 'Completed', 'Academic Plan Not Defined']

  let eligibleStudentList = []
  let notEligibleStudentList = []
  let completedList = []
  let acacPlanNotDefinedList = []

  try {

      // for(let stu in studentList){
      //   const response = await getInternshipStatusByStu(studentList[stu])
      //   switch(response){
      //     case 'Eligible':
      //       eligibleStudentList.push(studentList[stu])
      //       break;
      //     case 'Not Eligible':
      //       notEligibleStudentList.push(studentList[stu])
      //       break;
      //     case 'Completed':
      //       completedList.push(studentList[stu])
      //       break;
      //     case 'Academic Plan Not Defined':
      //       acacPlanNotDefinedList.push(studentList[stu])
      //       break;
      //   }
      // }

      internshipStatusList.forEach((item) => {
        switch (item.response) {
          case 'Eligible':
            eligibleStudentList.push({
              ...item.student._doc,
              Name: item.student._doc.Name.FirstName + ' ' + item.student._doc.Name.LastName
            });
            break;
          case 'Not Eligible':
            notEligibleStudentList.push({
              ...item.student._doc,
              Name: item.student._doc.Name.FirstName + ' ' + item.student._doc.Name.LastName
            });
            break;
          case 'Completed':
            completedList.push({
              ...item.student._doc,
              Name: item.student._doc.Name.FirstName + ' ' + item.student._doc.Name.LastName
            });
            break;
          case 'Academic Plan Not Defined':
            acacPlanNotDefinedList.push({
              ...item.student._doc,
              Name: item.student._doc.Name.FirstName + ' ' + item.student._doc.Name.LastName
            });
            break;
        }
      });


      console.log(eligibleStudentList.length)
      console.log(notEligibleStudentList.length)
      console.log(completedList.length)
      console.log(acacPlanNotDefinedList.length)

    res.status(200).json({
      fullInternshipStatusList: {
        eligibleStudentList,
        notEligibleStudentList,
        completedList,
        acacPlanNotDefinedList
      }
    })

  } catch(error){
    res.status(400).json({ message: error.message })
  }
}

export const checkSingleStuInternshipEligibility = async (req,res)=>{
    const { id } = req.params;
    // const AcademicPlan = 'INFT-MIT'

    // INFT-T4MIT: 240pts
    // INFT-T3MIT: 180pts
    // INFT-MIT: 180pts
    // INFT-T2MIT: 120pts
    
    try{

        const student = await Student.findOne({
            StudentId: id
        })

        if(student){
            const response = await getInternshipStatusByStu(student)
            response != '' ? 
              res.status(200).json({ internshipEligibility: response }) 
              : 
              res.status(404).json({ message: 'Student not found' })
        }

        // const courseList = await Take.find({
        //     StudentId: id,
        //     Subject: {$ne: 'ACADINT'}
        // })

        // // if(courseList.includes((course) => course.Subject == 'COMPSCI' && course.Catalogue == '778')){
        // if(courseList.find((course) => course.Subject == 'COMPSCI' && course.Catalogue == '778')){
        //     res.status(200).json({ 
        //         internshipEligibility: 'Completed'
        //     });

        // } else {

        //     switch(student.AcadPlan){
        //         case 'INFT-MIT': 
        //         case 'INFT-T3MIT':
        //             if(checktNumOfPassedCourse(courseList) >= 8 &&
        //                 checkNumOfTechCourses(courseList) >= 3 &&
        //                 checkNumOfProfCourses(courseList) >= 3 &&
        //                 student.CumGpa >= 4.0
        //             ){
        //                 res.status(200).json({ 
        //                     internshipEligibility: 'Eligible'
        //                 });
        //             } else{
        //                 res.status(200).json({
        //                     internshipEligibility: 'Not Eligible'
        //                 })
        //             }
        //             break;
                
        //         case 'INFT-T4MIT':
        //             if(checktNumOfPassedCourse >= 10 &&
        //                 checkNumOfTechCourses >= 3 &&
        //                 checkNumOfProfCourses >= 3 &&
        //                 courseList.find((course) => course.Subject == 'COMPSCI' && course.Catalogue == '718') &&
        //                 courseList.find((course) => course.Subject == 'COMPSCI' && course.Catalogue == '719') &&
        //                 student.CumGpa >= 4.0
        //             ){
        //                 res.status(200).json({ 
        //                     internshipEligibility: 'Eligible'
        //                 });
        //             } else{
        //                 res.status(200).json({
        //                     internshipEligibility: 'Not Eligible'
        //                 })
        //             }
        //             break;

        //         case 'INFT-T2MIT':
        //             if(checktNumOfPassedCourse >= 4 &&
        //                 checkNumOfProfCourses >= 3 &&
        //                 student.CumGpa >= 4.0
        //             ){
        //                 res.status(200).json({ 
        //                     internshipEligibility: 'Eligible'
        //                 });
        //             } else{
        //                 res.status(200).json({
        //                     internshipEligibility: 'Not Eligible'
        //                 })
        //             }
        //             break;

        //         default:
        //             res.status(200).json({
        //                 internshipEligibility: 'Academic Plan Not Defined'
        //             });

        //     }
            
        // }

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getInternshipStatusByStu = async (student) =>{

  let internshipEligibility = ''

  const courseList = await Take.find({
    StudentId: student.StudentId,
    Subject: {$ne: 'ACADINT'}
  })

  // if(courseList.includes((course) => course.Subject == 'COMPSCI' && course.Catalogue == '778')){
  if(courseList.find((course) => course.Subject == 'COMPSCI' && course.Catalogue == '778')){
      // res.status(200).json({ 
      //     internshipEligibility: 'Completed'
      // });
      internshipEligibility = 'Completed'

  } else {

      switch(student.AcadPlan){
          case 'INFT-MIT': 
          case 'INFT-T3MIT':
              if(checktNumOfPassedCourse(courseList) >= 8 &&
                  checkNumOfTechCourses(courseList) >= 3 &&
                  checkNumOfProfCourses(courseList) >= 3 &&
                  student.CumGpa >= 4.0
              ){
                  // res.status(200).json({ 
                  //     internshipEligibility: 'Eligible'
                  // });
                  internshipEligibility = 'Eligible'
              } else{
                  // res.status(200).json({
                  //     internshipEligibility: 'Not Eligible'
                  // })
                  internshipEligibility = 'Not Eligible'
              }
              break;
          
          case 'INFT-T4MIT':
              if(checktNumOfPassedCourse >= 10 &&
                  checkNumOfTechCourses >= 3 &&
                  checkNumOfProfCourses >= 3 &&
                  courseList.find((course) => course.Subject == 'COMPSCI' && course.Catalogue == '718') &&
                  courseList.find((course) => course.Subject == 'COMPSCI' && course.Catalogue == '719') &&
                  student.CumGpa >= 4.0
              ){
                  // res.status(200).json({ 
                  //     internshipEligibility: 'Eligible'
                  // });
                  internshipEligibility = 'Eligible'
              } else{
                  // res.status(200).json({
                  //     internshipEligibility: 'Not Eligible'
                  // })
                  internshipEligibility = 'Not Eligible'
              }
              break;

          case 'INFT-T2MIT':
              if(checktNumOfPassedCourse >= 4 &&
                  checkNumOfProfCourses >= 3 &&
                  student.CumGpa >= 4.0
              ){
                  // res.status(200).json({ 
                  //     internshipEligibility: 'Eligible'
                  // });
                  internshipEligibility = 'Eligible'
              } else{
                  // res.status(200).json({
                  //     internshipEligibility: 'Not Eligible'
                  // })
                  internshipEligibility = 'Not Eligible'
              }
              break;

          default:
              // res.status(200).json({
              //     internshipEligibility: 'Academic Plan Not Defined'
              // });
              internshipEligibility = 'Academic Plan Not Defined'
              break;

      }
      
    }
    return internshipEligibility
}

const checktNumOfPassedCourse = async (courseList) => {
    let count = 0;
    const passRange = ['A+','A','A-','B+','B','B-','C+','C','C-'];

    for(let i=0;i<courseList.length;i++){
        if(passRange.includes(courseList[i].Grade)){
            count++;
        }
    }
    return count;
}

const checkNumOfTechCourses = (courseList) =>{
    let count = 0;
    const techList = TechnicalAndProfessionalSkill.technical;
    for(let i=0;i<courseList.length;i++){
        if(techList.includes(courseList[i].Subject)){
            count++;
        }
    }
    return count;
}

const checkNumOfProfCourses = (courseList) =>{
    let count = 0;
    const profList = TechnicalAndProfessionalSkill.professionalSkill;
    for(let i=0;i<courseList.length;i++){
        if(profList.includes(courseList[i].Subject)){
            count++;
        }
    }
    return count;
}