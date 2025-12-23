//File này để xử lí dữ liệu upload file ảnh từ client lên server
import multer from "multer";

const storage = multer.diskStorage({
    fileName: function(req, file, callback){
        callback(null, file.originalname)
    }
})

const upload = multer(storage)

export default upload