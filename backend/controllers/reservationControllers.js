import reservationModels from "../models/reservationModels.js";


//Function 1: Tạo đặt chỗ
const createReservation = async (req, res) => {
    try {
        const {name, email, phone, checkin, checkout, guests, roomName, roomId} = req.body
        //Kiểm tra thông tin
        if(!name || !email || !phone || !checkin || !checkout || !guests || !roomName || !roomId){
            return res.json({message: "Yêu cầu điền đầy đủ thông tin!"})
        }
        //Tạo reservation và lưu vào database
        const newReservation = new reservationModels({name, email, phone, checkin, checkout, guests, roomName, roomId})
        await newReservation.save();

        res.json({message: "Đặt phòng thành công!", reservation: newReservation})

    } catch (error) {
        console.log(error)
        res.json({message: "Đặt phòng không thành công!"})
    }
}

//Function 2: Xem tat ca dat cho
const getAllReservation = async (req, res) => {
    try {
        const reservations = await reservationModels.find()
        res.json(reservations)
    } catch (error) {
        console.log(error);
        res.json({message: "Lỗi lấy thông tin đặt phòng!"})
    }
}

//Function 3: Xoa dat cho
const deleteReservation = async (req, res) => {
    try {
        const {id} = req.params
        await reservationModels.findByIdAndDelete(id)
        res.json({message: "Xóa đặt phòng thành công!"})
        
    } catch (error) {
        console.log(error)
        res.json({message: "Xóa đặt phòng thất bại!"})
    }
}

export {createReservation, getAllReservation, deleteReservation}