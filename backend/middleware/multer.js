//File này để cấu hình cài đặt lưu trữ khi tải tệp lên
import multer from "multer";

const storage = multer.diskStorage({
    fileName: function(req, file, callback){
        callback(null, file.originalname)
    }
})

const upload = multer(storage)

export default upload