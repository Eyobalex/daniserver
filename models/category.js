import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name: String,
    fa_icon: String

});


export default mongoose.model('Category', categorySchema);