import mongoose from 'mongoose';


 
const ratingSchema = new mongoose.Schema({
    value:{
        type: Number,
        required: "Please Provide value for the rating"
    },
    rater: {
        type: mongoose.Schema.Types.ObjectID,
        required: "Please provide the rater of the rating"
    },
    listing: {
        type: mongoose.Schema.Types.ObjectID,
        required: "Please provide the listing id for the rating"
    }
});
var RatingSchema = mongoose.model('RatingSchema', ratingSchema);
export default RatingSchema;