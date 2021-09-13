import Image from '../models/image.js'

export const uploadImage =async (file) => {
    try {
        const img = new Image();
        img.originalName = file.originalName
        img.mimeType = file.mimeType
        img.filename = file.filename
        img.path = file.path
        img.size = file.size
        img.imgFor = 'product image'
        img.save();

        return img;
    } catch (error) {
        console.log(error);
    }
}