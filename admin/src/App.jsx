import React, { useEffect, useState } from 'react'
import Login from './Components/Login'
import Sidebar from './Components/Sidebar'
import Reservation from './pages/Reservation'
import {Route, Routes} from 'react-router-dom'
import AddHotel  from './pages/AddHotel'
import ListHotel  from './pages/ListHotel'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export const backendUrl = 'http://localhost:4000'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])
  return (
    <div className='bg-white min-h-screen '>
      <ToastContainer position="top-right" autoClose={3000}/>
      {
        !token ? (
          //Nếu người dùng chưa đăng nhập trước đây (token not available)
          <Login setToken={setToken}/>
        ) : (
          //Người dùng đã đăng nhập, hiển thị Sidebar (token available)
          <>
          <div className='flex w-full'>
            <Sidebar setToken={setToken}/>
            <div className='w-[70%] ml-[max(5vw, 25px)] my-8 text-black text-base'>
              <Routes>
                <Route path = '/add' element = {<AddHotel token={token}/>} />
                <Route path = '/list' element = {<ListHotel token={token}/>} />
                <Route path = '/reservation' element = {<Reservation />} />
              </Routes>
            </div>
          </div>
          </>
        )
      }

    </div>
  )
}

export default App