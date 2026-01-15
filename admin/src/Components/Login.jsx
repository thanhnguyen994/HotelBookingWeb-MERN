import React, { useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'

const Login = ({setToken}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const adminLoginHandler = async(e) => {
        try {
            e.preventDefault()

            const response = await axios.post(backendUrl + '/api/user/admin', {email, password})
            console.log(response);

            if(response.data.success) {
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
            }
             else {
                console.log("Lỗi đăng nhập:", response.data.message);
            }


        } catch (error) {
            console.log(error)
        }
    }
    return (
     <div>
        <div className='flex justify-center items-center min-h-screen bg-gray-100 '>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md'>
                <h1 className='text-2xl font-bold text-center text-gray-800 mb-4'>Đăng nhập Admin</h1>
                <form onSubmit={adminLoginHandler}>
                    <div className='mb-4'>
                        <p className='text-sm font-semibold text-gray-600 mb-2'>Email</p>
                        <input type="email" placeholder='Nhập địa chỉ email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-[95%] px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-b-gray-800' required/>
                    </div>
                    <div  className='mb-4'>
                        <p className='text-sm font-semibold text-gray-600 mb-2'>Mật khẩu</p>
                        <input type="password" placeholder='Mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)} className='w-[95%] px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-b-gray-800' required/>
                    </div>
                    <button type='submit' className='w-full px-3 py-2 text-lg font-bold bg-fuchsia-600 text-white rounded-md'>Đăng nhập</button>
                </form>
            </div>
        </div>
     </div>
  )
}

export default Login