import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TakeCourse = new Schema({
    Term:{
        type:Number,
        required:true
    },
    AcademicYear:{
        type:Number,
        required: true
    },
    Campus:{
        type:String,
        required:true
    },
    Semester:{
        type:String,
    },
    Grade:{
        type:String
    },
    GpaPoint:{
        type:Number
    },
    Subject:{
        type: String,
        required:true
    },
    Catalogue:{
        type: String,
        required: true,
        ref: 'Course',
        default:' '
    },
    StudentId:{
        type: Number,
        required: true,
        ref: 'Student'
    },
    CourseTitle:{
        type:String,
        required:true
    },
    SessionDesc:{
        type:String
    },
    ClassNbr:{
        type:Number
    },
    RepeatCandidate:{
        type:String,
        default:'N'
    },
    RepeatCode: {
        type: String
    },
    Dept: {
        type: String
    },
    Gpa:{
        type:Number
    }

    // ,
    // CourseId:{
    //     type:Schema.Types.ObjectId,
    //     required:true
    // }
})

TakeCourse.pre('save', async function(next){
    switch(this.Grade){
        case "A+":
            this.GpaPoint = 9; 
            break;
        case "A":
            this.GpaPoint = 8;
            break;
        case "A-":
            this.GpaPoint = 7;
            break;
        case "B+":
            this.GpaPoint = 6;
            break;
        case "B":
            this.GpaPoint = 5;
            break;
        case "B-":
            this.GpaPoint = 4;
            break;
        case "C+":
            this.GpaPoint = 3;
            break;
        case "C":
            this.GpaPoint = 2;
            break;
        case "C-":
            this.GpaPoint = 1;
            break;
        case "CPL":
            this.GpaPoint = '';
            break;
        case "FNG":
            this.GpaPoint = '';
            break;
        default:
            this.GpaPoint = 0;
    }
  
})
export default mongoose.model('Take', TakeCourse);