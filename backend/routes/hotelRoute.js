import express from 'express'
import {addHotel, listHotel, removeHotel, singleHotel} from '../controllers/hotelControllers.js'

// Tạo route cho controller để thêm khách sạn
const hotelRouter = express.Router()

//Router phụ trách việc thêm phòng khách sạn
hotelRouter.post('/add' , addHotel) 
hotelRouter.post('/remove' , removeHotel) 
hotelRouter.get('/list' , listHotel) 
hotelRouter.get('/rooms/:id' , singleHotel) 


export default hotelRouter