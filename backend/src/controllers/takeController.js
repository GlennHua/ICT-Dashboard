import Take from '../db/schema_take_course';
import Student from '../db/schema_studentInfo';
import mongoose from 'mongoose';
import TechnicalAndProfessionalSkill from '../util/TechnicalAndProfessionalSkill.json';
const ObjectId = mongoose.Types.ObjectId;


export const createNewTake = async (req,res)=>{
   
    const take = req.body;
    if(take) {
         try{
            if(await isTakesExisted(take)!=null){
                res.status(406).send('This take already exist')
            }else{
                const newTake = new Take(take);
                await newTake.save();
                res.status(200).json(newTake);
            }
        } catch(error){
            res.status(400).send(error);
        }
    }else{  
            res.status(400).send('Invalid input of take')
    }
}

export const getTakesByStudentId =async (req,res)=>{
    
    const {id} =  req.params;

    if(id){
        try{
            const takes = await findTakesByStudentId(id);
           
            if(takes.length !==0){
                res.status(200).json(takes)
            }else{
                res.status(404).send('This student does not take courses')
            }
        } catch(error){
            res.status(400).send(`Error:${error}`)
        }
    } else{
        res.status(400).send('Invalid input of student Id')
    }
}

export const deleteAllTakesByStudentId = async (req,res)=>{

    const {id} = req.params;
    try{
        const studentTakes = await Take.find({
            StudentId:id
        });

        if(studentTakes.length!==0){
                studentTakes.forEach(e=>{
                    e.remove();
                })
                res.status(200).send('All takes were successfully deleted!')
            
        }else{
            res.status(400).send('This student does not have any takes.');
        }
    }catch(error){
        res.status(400).send(`Error: ${error}`);
    }

}

export const deleteTakeById = async (req,res)=>{

    let {id} = req.params;
    id = ObjectId(id);
        try{
            const take = await Take.findById(id);
            if(take){
                take.remove();
                res.status(200).json(take)
                
             }else{
                res.status(400).send('No such Take existed!')
             }
        }catch(error){
            res.status(400).send(`Error: ${error}`);
        }
}

export const updateTake = async (req,res)=>{
    const takedata = req.body;
    console.log(takedata)
        try{
            let UpdateRes = await Take.findOneAndUpdate(takedata.prv,takedata.updated,{new:true})
            res.status(200).json({message:'Update Success'});
        }catch(error){
            res.status(406).send(`Error: ${error}`)
        }
}

export const deleteATake = async (req,res)=>{
    const takedata = req.body;
    console.log('takedata')
    console.log(takedata)
        try{
            let deleteRes = await Take.findByIdAndDelete(takedata);
            res.status(200).json({message:'Delete Success'});
        }catch(error){
            res.status(406).send(`Error: ${error}`)
        }
}

export const getTakesByCourseAndTerm = async(req,res)=>{

    const{Term,Subject,Catalogue} = req.body;
        try{
            let takes = await Take.find({
                Term:Term,
                Subject: Subject,
                Catalogue:Catalogue
            });

            if(takes.length!==0){
                res.status(200).json(takes)
            }else{
                res.status(406).send('No student takes this course in this term')
            }
        }catch(error){
            res.status(406).send(`Error: ${error}`);
        }
}

export const getTakesByCourse = async(req,res)=>{

    const {Subject,Catalogue} = req.body;
        try{
            let takes = await Take.find({
                Subject:Subject,
                Catalogue:Catalogue
            });

            if(takes.length!==0){
                res.status(200).json(takes);
            }else{
                res.status(406).send('No student takes this course')
            }
        }catch(error){
            res.status(406).send(`Error: ${error}`)
        }
}

export const getTakesByTerm = async(req,res)=>{

    const {Term} = req.body;
        try{
            let takes = await Take.find({
                Term:Term
            });

            if(takes.length!==0){
                res.status(200).json(takes);
            }else{
                res.status(406).send('No student takes courses in this term')
            }
        }catch(error){
            res.status(406).send(`Error: ${error}`)
        }
}

export const getTakesByAcadYear = async(req,res)=>{
    const {academicYear} = req.body;
   
    try{
        let takes = await Take.find({
            AcademicYear:academicYear
        });
        if(takes.length!==0){
            res.status(200).json(takes);
        }else{
            res.status(406).send("No student takes courses in this academic year!")
        }
    }catch(err){
        res.status(406).send(`Error: ${err}`)
    }
}

export const getTakesByCourseAndAcadYear = async(req,res)=>{

    const {Subject,Catalogue,academicYear} = req.body;
        try{
            let takes = await Take.find({
                Subject:Subject,
                Catalogue:Catalogue,
                AcademicYear:academicYear
            });

            if(takes.length!==0){
                res.status(200).json(takes);
            }else{
                res.status(406).send('No student takes this course')
            }
        }catch(error){
            res.status(406).send(`Error: ${error}`)
        }
}
export const getTakesByCourseAcadYearAndSemester = async(req,res)=>{

    const {Subject,Catalogue,academicYear,semester} = req.body;
        try{
            let takes = await Take.find({
                Subject:Subject,
                Catalogue:Catalogue,
                AcademicYear:academicYear,
                Semester:semester
            });

            if(takes.length!==0){
                res.status(200).json(takes);
            }else{
                res.status(406).send('No student takes this course')
            }
        }catch(error){
            res.status(406).send(`Error: ${error}`)
        }
}

export const getTakesByAcadYearAndSemester = async(req,res)=>{
    const {academicYear,semester} = req.body;
    try{
        let takes = await Take.find({
            AcademicYear:academicYear,
            Semester:semester
        });
        if(takes.length!==0){
            res.status(200).json(takes);
        }else{
            res.status(406).send(" In this academic year, no student takes courses in this semester !")
        }
    }catch(err){
        res.status(406).send(`Error: ${err}`)
    }
}


export const getAllTakes = async(req,res)=>{
        try{
            let takes = await Take.find().select('-_id -__v');
            if(takes.length!==0){
                res.status(200).send(takes)
            }else{
                res.status(404).send('No takes existed')
            }
        }catch(error){
            res.status(400).send(`Error: ${error}`)
        }
}

export const getDomesticAndInternationalStudentsByYearAndTerm = async (req,res)=>{

    const { AcademicYear, Semester } = req.body;
    
        try{
            let takes = await Take.find({
                AcademicYear,
                Semester
            });

            let domestic = []
            let international = []

            if(takes.length>0){
                
                for(let row of takes){
                    let student = await Student.findOne({
                        StudentId: row.StudentId
                    });

                    if(student.ResStatus === 'Overseas'){
                        international.push(student)
                    } else{
                        domestic.push(student)
                    }
                }
                res.status(200).json({
                    Semester: `${AcademicYear} ${Semester}`,
                    Domestic: domestic.length,
                    International: international.length
                });
            }else{
                res.status(404).send('ops')
            }
        }catch(error){
            res.status(400).send(`Error: ${error}`);
        }

}
        
export const getAverageGPAbyCourse = async(req,res)=>{
    const { courseName } = req.params;
    try {
        const takes = await Take.find({
            Subject: courseName.split(" ")[0],
            Catalogue: courseName.split(" ")[1]
            });
        let semesterList = [];
        takes.map(take => {
            if (!semesterList.includes(take.AcademicYear + " " + take.Semester)) {
                semesterList.push(take.AcademicYear + " " + take.Semester);
            }
        });
        semesterList.map(semester => {
            let totalGpaPoint = 0;
            let studentNum = 0;
            takes.map(take => {
                if (take.AcademicYear + " " + take.Semester == semester) {
                    totalGpaPoint += take.GpaPoint;
                    studentNum++;
                }
            });
            let averageGrade = totalGpaPoint / studentNum;
            semesterList[semesterList.indexOf(semester)] = {
                time: semester,
                AverageGPA: averageGrade.toFixed(3)
            };
        });
        res.status(200).json(semesterList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAverageGPAByTechnicalAndProfessionalSkill = async(req,res)=>{

    try {
        const takes = await Take.find({});
        let semesterList = [];
        takes.map(take => {
            if (!semesterList.includes(take.AcademicYear + " " + take.Semester) && take.Semester != 'S3') {
                semesterList.push(take.AcademicYear + " " + take.Semester);
            }
        });

        let AveGPAList = [];
        console.log(semesterList);
        semesterList.map(semester => {
            let technicalStudentNum = 0;
            let professionalSkillStudentNum = 0;
            let technicalTotalGpaPoint = 0;
            let professionalSkillTotalGpaPoint = 0;
            takes.map(take => {
                if (take.AcademicYear + " " + take.Semester == semester) {
                    if (TechnicalAndProfessionalSkill.professionalSkill.includes(take.Subject + " " + take.Catalogue)) {
                        professionalSkillTotalGpaPoint += take.GpaPoint;
                        professionalSkillStudentNum++;
                    }
                    if (TechnicalAndProfessionalSkill.technical.includes(take.Subject + " " + take.Catalogue)) {
                        technicalTotalGpaPoint += take.GpaPoint;
                        technicalStudentNum++;
                    }
                }
            });

            let technicalAverageGrade = (technicalTotalGpaPoint / technicalStudentNum) || 0;
            let professionalSkillAverageGrade = professionalSkillTotalGpaPoint / professionalSkillStudentNum || 0;
            
            AveGPAList.push({
                Time: semester,
                Professional_Skill: professionalSkillAverageGrade.toFixed(3) ,
                Technical: technicalAverageGrade.toFixed(3)
            });
        });
        res.status(200).json(AveGPAList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getResStatus = async(req,res)=>{
    try {
        const takes = await Take.find({});
        let semesterList = [];
        takes.map(take => {
            if (!semesterList.includes(take.AcademicYear + " " + take.Semester)) {
                semesterList.push(take.AcademicYear + " " + take.Semester);
            }
        });
        let resStatusList = [];
        const promises = semesterList.map(async semester => {
            let domesticStudent = 0;
            let internationalStudent = 0;
            let studentList = [];
            takes.map(take => {
                if (take.AcademicYear + " " + take.Semester == semester) {
                    studentList.push(take.StudentId);
                }
            });
            const student = await Student.find({
                StudentId: studentList
            });
            student.map(student => {
                if (student.ResStatus == "Citizen" || student.ResStatus == "NZ Permanent Resident") {
                    domesticStudent++;
                } else {
                    internationalStudent++;
                }
            });
            
            resStatusList.push({
                Semester: semester,
                Domestic: domesticStudent,
                International: internationalStudent
            });
        });
        await Promise.all(promises);
        resStatusList.sort(function(a, b) {
            if (a.Semester < b.Semester) {
              return -1;
            } else if (a.Semester > b.Semester) {
              return 1;
            } else {
              return 0;
            }
          });
        res.status(200).json(resStatusList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getResStatusbyCourse = async(req,res)=>{
    const { courseName } = req.params;
    try {
        const takes = await Take.find({
            Subject: courseName.split(" ")[0],
            Catalogue: courseName.split(" ")[1]
            });
        let semesterList = [];
        takes.map(take => {
            if (!semesterList.includes(take.AcademicYear + " " + take.Semester)) {
                semesterList.push(take.AcademicYear + " " + take.Semester);
            }
        });
        const promises = semesterList.map(async semester => {
            let domesticStudent = 0;
            let internationalStudent = 0;
            let studentList = [];
            takes.map(take => {
                if (take.AcademicYear + " " + take.Semester == semester) {
                    studentList.push(take.StudentId);
                }
            });
            const student = await Student.find({
                StudentId: studentList
            });
            student.map(student => {
                if (student.ResStatus == "Citizen" || student.ResStatus == "NZ Permanent Resident") {
                    domesticStudent++;
                } else {
                    internationalStudent++;
                }
            });
                    
            return {
                Semester: semester,
                Domestic: domesticStudent,
                International: internationalStudent
            };
        });
        const semesterData = await Promise.all(promises);
        res.status(200).json(semesterData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function findTakesByStudentId(studentId){
   
   return  Take.find({StudentId: studentId}); 
}

async function isTakesExisted(data){
    return  Take.findOne({
        Term: data.Term,
        Subject: data.Subject,
        Catalogue: data.Catalogue,
        StudentId: data.StudentId
    })
}

export const getDomesticAndInternationalStudentsByYearAndTermAndCourse = async (req,res)=>{
    
        console.log(req.body)
        
        try{

            let takes = [];
            let domestic = []
            let international = []

            if(req.body.AcademicYear &&
                req.body.Semester &&
                req.body.Subject &&
                req.body.Catalogue    
            ){
                const { AcademicYear, Semester, Subject, Catalogue } = req.body;
                takes = await Take.find({
                    AcademicYear: parseInt(AcademicYear),
                    Semester,
                    Subject,
                    Catalogue
                });
                // let domestic = []
                // let international = []

                // if(takes.length>0){
                    
                //     for(let row of takes){
                //         let student = await Student.findOne({
                //             StudentId: row.StudentId
                //         });

                //         if(student.ResStatus === 'Overseas'){
                //             international.push(student)
                //         } else{
                //             domestic.push(student)
                //         }
                //     }
                    
                //     res.status(200).json({
                //         Semester: `${AcademicYear} ${Semester}`,
                //         Domestic: domestic.length,
                //         International: international.length
                //     });
                // }else{
                //     res.status(404).send('ops')
                // }
            } else{
                const { Subject, Catalogue } = req.body;
                
                takes = await Take.find({
                    Subject,
                    Catalogue
                });
            }

            if(takes.length>0){
                
                for(let row of takes){
                    let student = await Student.findOne({
                        StudentId: row.StudentId
                    });
                    if(student.ResStatus === 'Overseas'){
                        international.push(student)
                    } else{
                        domestic.push(student)
                    }
                }
                
                if(req.body.AcademicYear &&
                    req.body.Semester){
                        res.status(200).json({
                            Semester: `${req.body.AcademicYear} ${req.body.Semester}`,
                            Domestic: domestic.length,
                            International: international.length
                        });
                } else{
                    res.status(200).json({
                        Domestic: domestic.length,
                        International: international.length
                    });
                }

            }else{
                res.status(404).send('ops')
            }

            
        }catch(error){
            res.status(400).send(`Error: ${error}`);
        }
}

export const getSubjectList = async (req,res)=>{
    try{
        const subjectList = await Take.distinct("Subject");
        res.status(200).json(subjectList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCourseList = async (req,res)=>{

    const { subject } = req.params;
    try{
        const courseList = await Take.distinct("Catalogue", {
            Subject: subject,
        });
        res.status(200).json(courseList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getSemesterList = async (req,res)=>{

    const { subject, course } = req.params;
    try{
        const takeList = await Take.find({
            Subject: subject,
            Catalogue: course
        });
        let semesterList = [];
        takeList.map(take => {
            if (!semesterList.includes(take.AcademicYear + " " + take.Semester)) {
                semesterList.push(take.AcademicYear + " " + take.Semester);
            }
        });
        res.status(200).json(semesterList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAllPassedFailed= async (req,res)=>{

    try{
        let passTakes = [];
        let failTakes = [];
       const takeList = await Take.find();
        takeList.map(take=>{
            if(take.GpaPoint>=1 || take.Grade==="CPL"){
                passTakes.push(take);
            }else {
                failTakes.push(take)
            }
        })
        res.status(200).json({passTakes,failTakes})
       
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAllPassedFailedByAcadYear= async (req,res)=>{
        const {academicYear} = req.body;
    try{
        let passTakes = [];
        let failTakes = [];
       const takeList = await Take.find({AcademicYear:academicYear});
   
        takeList.map(take=>{
            if(take.GpaPoint>=1 || take.Grade==="CPL"){
                passTakes.push(take);
            }else {
                failTakes.push(take)
            }
        })
        res.status(200).json({passTakes,failTakes})
       
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAllPassedFailedByAcadYearAndSemester= async (req,res)=>{
    const {academicYear,semester} = req.body;
try{
    let passTakes = [];
    let failTakes = [];
   const takeList = await Take.find({AcademicYear:academicYear,Semester:semester});
    takeList.map(take=>{
        if(take.GpaPoint>=1 || take.Grade==="CPL"){
            passTakes.push(take);
        }
        else {
            failTakes.push(take)
        }
    })
    res.status(200).json({passTakes,failTakes})
   
} catch (error) {
    res.status(404).json({ message: error.message });
}
}

export const getPassedFailedBySubject = async (req,res)=>{

    const { subject } = req.params;
    try{
        let passedStudent = [];
        let failedStudent = [];
        let passed = 0;
        let failed = 0;
        const takeList = await Take.find({
            Subject: subject
        });
        const promises = takeList.map(async take => {
            if(take.Grade !== 'D' && take.Grade !== 'D-'&& take.Grade !== 'D+' && take.Grade !== 'DNC' && take.Grade !== 'DNS'){
                passed++;
                await Student.findOne({StudentId: take.StudentId}).then(student => {
                    passedStudent.push(student);
                })
                // passedStudent.push(take);
            }else{
                failed++;
                await Student.findOne({StudentId: take.StudentId}).then(student => {
                    failedStudent.push(student);
                })
                // failedStudent.push(take);
            }
        });
        await Promise.all(promises);
        res.status(200).json({passedAndFailed:[
            { name: 'Passed', value: passed },
            { name: 'Failed', value: failed }
        ],
        passedStudent,
        failedStudent});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPassedFailedBySubjectAndCourse = async (req,res)=>{

    const { subject,course } = req.params;
    try{
        let passedStudent = [];
        let failedStudent = [];
        let passed = 0;
        let failed = 0;
        const takeList = await Take.find({
            Subject: subject,
            Catalogue: course
        });
        const promises = takeList.map(async take => {
            if(take.Grade !== 'D' && take.Grade !== 'D-'&& take.Grade !== 'D+' && take.Grade !== 'DNC' && take.Grade !== 'DNS'){
                passed++;
                await Student.findOne({StudentId: take.StudentId}).then(student => {
                    passedStudent.push(student);
                })
            }else{
                failed++;
                await Student.findOne({StudentId: take.StudentId}).then(student => {
                    failedStudent.push(student);
                })
            }
        });
        await Promise.all(promises);
        res.status(200).json({passedAndFailed:[
            { name: 'Passed', value: passed },
            { name: 'Failed', value: failed }
        ],
        passedStudent,
        failedStudent});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPassedFailedBySubjectAndCourseAndSemester = async (req,res)=>{

    const { subject,course,semester } = req.params;
    try{
        let passed = 0;
        let failed = 0;
        let passedStudent = [];
        let failedStudent = [];
        const takeList = await Take.find({
            Subject: subject,
            Catalogue: course,
            AcademicYear: semester.split(" ")[0],
            Semester: semester.split(" ")[1]
        });
        const promises = takeList.map(async take => {
            if(take.Grade !== 'D' && take.Grade !== 'D-'&& take.Grade !== 'D+' && take.Grade !== 'DNC' && take.Grade !== 'DNS'){
                passed++;
                await Student.findOne({StudentId: take.StudentId}).then(student => {
                    passedStudent.push(student);
                })
            }else{
                failed++;
                await Student.findOne({StudentId: take.StudentId}).then(student => {
                    failedStudent.push(student);
                })
            }
        });
        await Promise.all(promises);
        res.status(200).json({passedAndFailed:[
            { name: 'Passed', value: passed },
            { name: 'Failed', value: failed }
        ],
        passedStudent,
        failedStudent});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getTop5CourseBySemester = async (req,res)=>{

    const { semester } = req.params;
    try{
        const takeList = await Take.find({
            AcademicYear: semester.split(" ")[0],
            Semester: semester.split(" ")[1]
        });
        const coursesCount = takeList.reduce((acc, curr) => {
            const course = curr.Subject + ' ' + curr.Catalogue;
            acc[course] = (acc[course] || 0) + 1;
            return acc;
          }, {});
        const sortedCourseCounts = Object.entries(coursesCount).sort((a, b) => b[1] - a[1]).map(([course, count]) => ({ course, count }));
        // const top5Course = sortedCourseCounts.slice(0, 5);
        res.status(200).json(sortedCourseCounts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

