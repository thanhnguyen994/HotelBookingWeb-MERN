import express from 'express'
import {addHotel, listHotel, removeHotel, singleHotel, updateHotel} from '../controllers/hotelControllers.js'
import upload from '../middleware/multer.js'

// Tạo route cho controller để thêm khách sạn
const hotelRouter = express.Router()

//Router phụ trách việc thêm phòng khách sạn
hotelRouter.post('/add' ,upload.single("image"), addHotel) 
hotelRouter.post('/remove' , removeHotel) 
hotelRouter.get('/list' , listHotel) 
hotelRouter.get('/rooms/:id' , singleHotel) 
hotelRouter.post('/update', updateHotel)


export default hotelRouter