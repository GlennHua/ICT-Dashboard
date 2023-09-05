import mongoose from 'mongoose';
import Notifications from './schema_notification';
import StudentDetails from './schema_studentDetails';
import dotenv from 'dotenv';
import Course from './schema_course'
import Student from './schema_studentInfo'
import Take from './schema_take_course'


clearDatabase();

async function clearDatabase() {

    dotenv.config();
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(console.log('Connected to database!'));

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

    await mongoose.disconnect();
}
