import mongosse from 'mongoose';


const imageSchema = mongosse.Schema({
    originalName: {
        type: String,
        default: ''
    },
    mimeType: {
        type:String,
        require: true
    },
    filename : {
        type: String,
        require: true
    },
    path: {
        type: String,
        require: true
    },
    size: {
        type: String,
        require: true
    },
    imgFor: {
        type: String, 
        require: true
    }
});

export default mongosse.model('Image', imageSchema);