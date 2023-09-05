import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

const Course = new Schema({
    // _id:{
    //     type:ObjectId,
    //     required:true
    // },
    Subject:{
        type: String,
        required:true
    },
    CourseTitle:{
        type:String,
        required: true,
        unique: true
    },
    Catalogue:{
        type: String,
        required:true
    }
})

export default mongoose.model('Course',Course);