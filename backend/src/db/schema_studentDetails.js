import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/* Each studentDetailsSchema object has the following key:
   a Number Id (e.g., 159448), String Firstname, String LastName, Number Term (e.g., 1163), 
   Number AcademicYear (e.g., 2016), String Semester (e.g., "S1"), String course Subject (e.g., COMPSCI),
   Number course Catalogue (e.g., 732), String CourseTitle, String AcadPlan (e.g., "INFT-MIT"), String Grade (e.g., B+), Number corresponding GpaPoint (e.g., 6), String Campus (e.g., "City"), ResStatus (e.g., "Citizen"), Gender and StudentEmail
*/
const studentDetailsSchema = new Schema({
    Id: Number,
    FirstName: String,
    LastName: String,
    Term: Number,
    AcademicYear: Number,
    Semester: String,
    Subject: String,
    Catalogue: Number,
    CourseTitle: String,
    AcadPlan: String,
    Grade: String,
    GpaPoint: Number,
    Campus: String,
    ResStatus: String,
    Gender: String,
    StudentEmail: String
});



export default mongoose.model('StudentDetails', studentDetailsSchema);