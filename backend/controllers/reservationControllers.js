import reservationModels from "../models/reservationModels.js";


//Function 1: Tạo đặt chỗ
const createReservation = async (req, res) => {
    try {
        const {name, email, phone, checkin, checkout, guests, roomName, roomId} = req.body
        //Kiểm tra thông tin
        if(!name || !email || !phone || !checkin || !checkout || !guests || !roomName || !roomId){
            return res.json({message: "Yêu cầu điền đầy đủ thông tin!"})
        }
        // Kiểm tra trùng lặp: không cho phép 2 booking chồng ngày cho cùng roomId
        // Parse ngày từ chuỗi 
        const newCheckin = new Date(checkin)
        const newCheckout = new Date(checkout)
        // Kiểm tra tính hợp lệ của đặt phòng (phải đủ cả 2 ngày, ngày vào phải trc ngày ra)
        if (isNaN(newCheckin) || isNaN(newCheckout) || newCheckin >= newCheckout) {
            return res.status(400).json({message: 'Ngày không hợp lệ (check-in > check-out)'});
        }

        // Lấy tất cả reservation cho room này
        const existing = await reservationModels.find({ roomId })

        // HÀM KIỂM TRA TRÙNG LỊCH
        // Nếu exCheckout mà lớn hơn newCheckin thì lặp
        const overlaps = existing.some(r => {
            const exCheckin = new Date(r.checkin)
            const exCheckout = new Date(r.checkout)
            
            if (isNaN(exCheckin) || isNaN(exCheckout)) return false
            return !(exCheckout <= newCheckin || exCheckin >= newCheckout)
        })

        if (overlaps) {
            return res.status(409).json({message: 'Phòng đã được đặt trong khoảng thời gian này'})
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

// Function 4: Cập nhật đặt phòng
const updateReservation = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, phone, checkin, checkout, guests, roomName, roomId } = req.body

        const existingReservation = await reservationModels.findById(id)
        if (!existingReservation) return res.status(404).json({message: 'Không tìm thấy đặt phòng'})

        // Xác định lại ttin checkin, checkout là cái cũ hay là mới đc sửa
        const newCheckin = checkin ? new Date(checkin) : new Date(existingReservation.checkin)
        const newCheckout = checkout ? new Date(checkout) : new Date(existingReservation.checkout)

        if (isNaN(newCheckin) || isNaN(newCheckout) || newCheckin >= newCheckout) {
            return res.status(400).json({message: 'Ngày không hợp lệ (check-in < check-out)'});
        }

        // Check overlaps 
        const roomIdToCheck = roomId || existingReservation.roomId
        const otherReservations = await reservationModels.find({ roomId: roomIdToCheck, _id: { $ne: id } })

        const overlaps = otherReservations.some(r => {
            const exCheckin = new Date(r.checkin)
            const exCheckout = new Date(r.checkout)
            if (isNaN(exCheckin) || isNaN(exCheckout)) return false
            return !(exCheckout <= newCheckin || exCheckin >= newCheckout)
        })

        if (overlaps) {
            return res.status(409).json({message: 'Phòng đã được đặt trong khoảng thời gian này'})
        }

        // Dùng thông tin mới được sửa
        if (name !== undefined) existingReservation.name = name
        if (email !== undefined) existingReservation.email = email
        if (phone !== undefined) existingReservation.phone = phone
        if (checkin !== undefined) existingReservation.checkin = checkin
        if (checkout !== undefined) existingReservation.checkout = checkout
        if (guests !== undefined) existingReservation.guests = guests
        if (roomName !== undefined) existingReservation.roomName = roomName
        if (roomId !== undefined) existingReservation.roomId = roomId

        await existingReservation.save()

        res.json({message: 'Cập nhật đặt phòng thành công', reservation: existingReservation})
    } catch (error) {
        console.log(error)
        res.json({message: 'Cập nhật đặt phòng thất bại'})
    }
}

export {createReservation, getAllReservation, deleteReservation, updateReservation}