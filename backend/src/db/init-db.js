import mongoose from 'mongoose';
import Notifications from './schema_notification';
import StudentDetails from './schema_studentDetails';
import dotenv from 'dotenv';

import Course from './schema_course'
import Student from './schema_studentInfo'
import Take from './schema_take_course'


import studentDetailsJson from './minfotech-data-ictDashboard-dummyData.json';

main();

async function main() {
    console.log('run db init');

    dotenv.config();

    //!For localhost testing
    // await mongoose.connect('mongodb://127.0.0.1:27017/ict-dashboard', {
    //     useNewUrlParser: true
    // }).then(console.log('Connected to database!'))

    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(console.log('Connected to database!'));



    await clearDatabase();

    //Populate Student, Take, Course collections with dummy dataset, according
    //to new data models
    Promise.all([listCourse(), listStudent(), listTake()]).then((res) => {
        console.log(res)
    }).then(dbDisconnect)

    // await listCourse()
    // await listStudent()
    // await listTake()

    //add data to database
    for(let notification of notifications){
        const dbNotifications = await addData(notification,Notifications);
        console.log(`A notification is added to database (_id = ${dbNotifications._id})`);

    }

    let detailNumber = 0;
    for(let studentDetail of studentDetailsJson){
        await addData(studentDetail,StudentDetails);
        detailNumber = detailNumber + 1;
    }
    console.log(`${detailNumber}/1786 studentDetails are added to database`);


    // for (let row of studentDetailsJson) {

    //     let { CourseTitle, Subject, Catalogue,
    //         FirstName, LastName, StudentEmail, AcadPlan, ResStatus, Gender,
    //         AcademicYear, Semester, Term, Campus, Grade, GpaPoint } = row

    //     if (!await Course.findOne({ CourseTitle })) {
    //         let newCourse = new Course({
    //             Subject,
    //             CourseTitle,
    //             Catalogue
    //         })

    //         newCourse.save()
    //     }

    //     if (!await Student.findOne({ StudentId: row.Id })) {
    //         let newStudent = new Student({
    //             StudentId: row.Id,
    //             Name: {
    //                 FirstName,
    //                 LastName
    //             },
    //             StudentEmail,
    //             AcadPlan,
    //             ResStatus,
    //             Gender
    //         })

    //         newStudent.save()
    //     }

    //     if (!await Take.findOne({
    //         StudentId: row.Id,
    //         AcademicYear,
    //         Semester,
    //         CourseTitle
    //     })) {
    //         let newTake = new Take({
    //             StudentId: row.Id,
    //             AcademicYear,
    //             Semester,
    //             Term,
    //             Subject,
    //             Catalogue,
    //             Campus,
    //             Grade,
    //             GpaPoint
    //         })

    //         newTake.save()
    //     }
    // }


    // // Disconnect when complete
    // await mongoose.disconnect();
    // console.log('Disconnected from database!');
}

//clear database
async function clearDatabase() {
    const response_notif = await Notifications.deleteMany({});
    console.log(`Cleared database (removed ${response_notif.deletedCount} notifications).`);

    const response_studentDetails = await StudentDetails.deleteMany({});
    console.log(`Cleared database (removed ${response_studentDetails.deletedCount} studentDetails).`);

    const response_takes = await Take.deleteMany({});
    const response_courses = await Course.deleteMany({})
    const response_students = await Student.deleteMany({})
    console.log(`Cleared database (removed ${response_takes.deletedCount} takes)`)
    console.log(`Cleared database (removed ${response_courses.deletedCount} courses)`)
    console.log(`Cleared database (removed ${response_students.deletedCount} students)`)
}

async function addData(data,schema) {
    const db = new schema(data);
    await db.save();
    return db;
}

const notifications = [
    {
        content: "A new course is added.",
        status: false,
        date: '2022/09/09'
    },
    {
        content: "gpa updated",
        status: false,
        date: '2022/09/10'
    },
    {
        content: "new request.",
        status: false,
        date: '2022/09/11'
    },
];

const listCourse = async () => {
    let count = 0

        for (let row of studentDetailsJson) {

            let { CourseTitle, Subject, Catalogue } = row
    
            if (!await Course.findOne({ CourseTitle })) {
                let newCourse = new Course({
                    Subject,
                    CourseTitle,
                    Catalogue
                })
            
                await newCourse.save()
                count++
            }
        }

        return new Promise(async (resolve, reject) => {
            if(count>0){
                resolve(`Course: ' ${count} rows`)
            } else{
                console.log('No new course')
            }
        })
}

const listStudent = async () => {
    
    let count = 0

    for (let row of studentDetailsJson) {

        let { FirstName, LastName, StudentEmail, AcadPlan, ResStatus, Gender } = row
    
        if (!await Student.findOne({ StudentId: row.Id })) {
            let newStudent = new Student({
                StudentId: row.Id,
                Name: {
                    FirstName,
                    LastName
                },
                StudentEmail,
                AcadPlan,
                ResStatus,
                Gender
            })
    
            await newStudent.save()
            count++
        }
    }

    return new Promise(async (resolve, reject) => {
        if(count>0){
            resolve(`Students: ' ${count} rows`)
        } else{
            console.log('No new student')
        }
    })
}

const listTake = async () => {

    let count = 0

    for (let row of studentDetailsJson) {

    let { CourseTitle, Subject, Catalogue, AcademicYear, Semester, Term, Campus, Grade, GpaPoint } = row

    if (!await Take.findOne({
            StudentId: row.Id,
            AcademicYear,
            Semester,
            CourseTitle
        })) {
            let newTake = new Take({
                StudentId: row.Id,
                AcademicYear,
                Semester,
                Term,
                Subject,
                CourseTitle,
                Catalogue,
                Campus,
                Grade,
                GpaPoint
            })

            await newTake.save()
            count++
        }
    }

    return new Promise(async (resolve, reject) => {
        if(count>0){
            resolve(`Takes: ' ${count} rows`)
        } else{
            console.log('No new takes')
        }
    })
    
}

const dbDisconnect = async () => {
    return new Promise(async (resolve, reject) => {
        await mongoose.disconnect();
        resolve('Disconnected from database!')
    })
}
