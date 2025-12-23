//Hàm này xác thực Admin
import jwt from "jsonwebtoken"

const adminAuth = async(req, res, next) => {
    try {
        const {token} = req.headers

        if(!token){
            return res.json({success: false, message: "Vui lòng xác thực!"})
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "Không phải Admin!"})
        }

        next()
    } catch (error) {
        return res.json({success: false, message: "Xác thực không thành công!"})
    }
}

export default adminAuth