import jwt from "jsonwebtoken"

 const adminLogin = async(req, res) => {
    try {
        const {email, password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({success: false, message: "Thông tin chưa chính xác!"})
        }
    } catch (error) {
        console.log();
        res.json({success: false, message: "Đăng nhập admin thất bại!"})
    }
 }

 export {adminLogin}

 GIT ADD USER ROUTES