// Có chức năng thêm phòng 
//Có chức năng hiển thị toàn bộ danh sách phòng đã được thêm
// Có chức năng xóa phòng
// Có chức năng xem chi tiết cụ thể từng phòng

import hotelModel from "../models/hotelModels.js"
import{v2 as cloudinarry} from 'cloudinary'

//API thêm phòng
const addHotel = async (req, res) => {
    try {
        const {name, price, description} = req.body
        const image = req.file;
        let imageUrl = ""; 

        // Nếu ảnh đc upload thì lưu vào cloudinary, k thì dùng placeholder
        if (image) {
            let result = await cloudinarry.uploader.upload(image.path, {resource_type: 'image'})
            imageUrl = result.secure_url;
        } else {
            imageUrl = "https://placehold.co/600x400"
        }
        //Tạo obj dlieu phòng để lưu vào database
        const hotelData = {
            name, description, price: Number(price), 
            image: imageUrl,
            date: Date.now()
        }

        const hotel = new hotelModel(hotelData)
        await hotel.save()  //lưu vào database

        res.json({succes: true, message: "Thêm phòng thành công!"})
    } catch (error) {
        console.log(error);
        res.json({succes: false, message: "Thêm phòng thất bại!"})
        
    }

}

const listHotel = async (req, res) => {
     try {
        const hotels = await hotelModel.find({})
        res.json({succes: true, hotels})
     } catch (error) {
        console.log(error);
        res.json({succes: false, message: "Hiển thị danh sách thất bại!"})
     }
}

const removeHotel = async (req, res) => {
     try {
        await hotelModel.findByIdAndDelete(req.body._id)
        res.json({succes: true, message: "Xoá phòng thành công!"})
     } catch (error) {
        console.log(error);
        res.json({succes: false, message: "Xóa phòng thất bại!"})
     }
}

const singleHotel = async (req, res) => {
     try {
        const hotel = await hotelModel.findById(req.params.id)
        if(!hotel) return res.json({message: "Không tìm thấy phòng!"})
            res.json({hotel})
     } catch (error) {
        console.log(error);
        res.json({succes:false, message: 'Xem thông tin chi tiết thất bại!'})
     }
}

export {addHotel, listHotel, removeHotel, singleHotel}
