import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    name: String,
    phone: String,
    mail: String,
    course: String,
    details: Object
})

var PostMessage = mongoose.model('PostMessage',postSchema);

export default PostMessage;