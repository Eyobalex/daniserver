import mongoose from 'mongoose';


const commentSchema = mongoose.Schema({
    listing: {
        type: mongoose.Types.ObjectId,
        ref: 'Listing'
        
    },
    name:{
        type: String,
        required: "Please Provide the author of the comment"
    },
    comment: {
        type: String,
        required: "Please provide the content of the comment"
    },
    email: {
        type:String,
        required: "Please provide the email of author of the comment"
    },
    createdAt: {
        type: String,
        default: new Date()
    }
});
var Comment = mongoose.model('Comment', commentSchema);
export default Comment;