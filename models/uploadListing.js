import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    companyName: String,
 // selectedFile: String,

    creator: String,
    logo:String,
    location:String,
    description:String,
    map:String,
    phoneNumber:String,
    category: {type: mongoose.Types.ObjectId, ref: 'Category'},
    productImages: [{type: mongoose.Types.ObjectId, ref: 'Image'}], 
    services:[String],
    totalRating: {type: Number, default: 0},
    ratingCount: {type: Number, default: 0},
    averageRating: {type: Number, default: 0},
    views: {type:Number, default: 0},
    comments: [{ type:  mongoose.Types.ObjectId, ref: 'Comment'} ],
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var Listing = mongoose.model('Listing', postSchema);

export default Listing;