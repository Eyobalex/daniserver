export const uploadImage =async (file) => {
    try {
        const img = new Image();
        img.originalName = productImage.originalName
        img.mimeType = productImage.mimeType
        img.filename = productImage.filename
        img.path = productImage.path
        img.size = productImage.size
        img.imgFor = 'product image'
        img.save();

        return img;
    } catch (error) {
        console.log(error);
    }
}