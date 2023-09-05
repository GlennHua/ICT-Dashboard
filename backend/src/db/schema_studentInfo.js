import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Student = new Schema({
    StudentId: {
        type:Number,
        required:true,
        unique: true
    },
    Name:{
        FirstName:{
            type: String,
            required: true
        },
        LastName:{
            type: String,
            required: true
        }
    },
    PreferedName:{
        type: String
    },
    StudentEmail:{
        type: String,
        required:true
    },
    AcadPlan:{
        type:String,
        required:true
    },
    ResStatus:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    AcadProg:{
        type:String
    },
    AcadPlan:{
        type:String,
        required:true
    },
    CumGpa: {
        type: Number
    },
    UnitsEarned: {
        type: Number
    },
    UntTaken: {
        type: Number
    },
    UntPassed:{
        type: Number
    },
    AcacGroup:{
        type: Number
    },
    StudentGroup: {
        type: String
    },
    EthnicGroup: {
        type: String
    },
    Birthdate: {
        type: String
    },
    ExternalSponsor: {
        ExternalSponsor:{
            type: Number
        },
        Descr:{
            type: String
        },
        SponsershipType: {
            type: String
        }
    },
    SecSchool: {
        type: String
    },
    RecruitmentCategory: {
        type: String
    },
    UtasAttribute: {
        type: String
    },
    PreferredPhone: {
        type: String
    },
    Courses:{
        type: [Object]
    }

})

export default mongoose.model('Student',Student)