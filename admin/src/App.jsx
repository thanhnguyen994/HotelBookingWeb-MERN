import React, { useState } from 'react'
import Login from './Components/Login'
import Sidebar from './Components/Sidebar'
import Reservation from './pages/Reservation'
import {Route, Router} from 'react-router-dom'
import AddHotel  from './pages/AddHotel'
import ListHotel  from './pages/ListHotel'



export const backendUrl = 'http://localhost:4000'

const App = () => {
  const [token, setToken] = useState('')
  return (
    <div>
      {
        !token ? (
          //Nếu người dùng chưa đăng nhập trước đây (token not available)
          <Login />
        ) : (
          //Người dùng đã đăng nhập, hiển thị Sidebar (token available)
          <>
          <div>
            <Sidebar />
            <div>
              <Routes>
                <Route path = '/add' element = {<AddHotel />} />
                <Route path = '/list' element = {<ListHotel />} />
                <Route path = '/add' element = {<Reservation />} />
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