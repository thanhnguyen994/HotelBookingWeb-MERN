//File này để xử lí dữ liệu upload file ảnh từ client lên server
import multer from 'multer';

//Cấu hình cấu trúc mẫu để upload files
const storage = multer.diskStorage({
    //Định nghĩa tên file
    fileName: function(req, file, callback){
        callback(null, file.originalname) //Dùng tên gốc của file
    }
})
//Tạo 1 đối tượng bằng cách dùng cấu hình lưu trữ được định nhĩa
const upload = multer({storage})

export default upload