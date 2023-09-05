import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Each notificationsSchema object has a String content, Boolean status and a Date date
const notificationsSchema = new Schema({
    content: String,
    status: Boolean,
    date: Date
});

export default mongoose.model('notificationsItems', notificationsSchema);