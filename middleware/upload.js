import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname).toLowerCase();
        cb(null,  Date.now() + ext);
    }
});

const imageUpload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == 'image/jpg' || file.mimetype == 'image/png'){
            cb(null, true);
        }else{
            req.uploadErr = "you can only upload png or jpg format";
            cb(null, false);
        }
    },
    limits: {
        fileSize: 1024*1024*5
    }
}); 
export default imageUpload;