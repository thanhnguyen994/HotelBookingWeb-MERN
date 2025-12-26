import React, { useEffect, useState } from 'react'
import Login from './Components/Login'
import Sidebar from './Components/Sidebar'
import Reservation from './pages/Reservation'
import {Route, Routes} from 'react-router-dom'
import AddHotel  from './pages/AddHotel'
import ListHotel  from './pages/ListHotel'



export const backendUrl = 'http://localhost:4000'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])
  return (
    <div>
      {
        !token ? (
          //Nếu người dùng chưa đăng nhập trước đây (token not available)
          <Login setToken={setToken}/>
        ) : (
          //Người dùng đã đăng nhập, hiển thị Sidebar (token available)
          <>
          <div>
            <Sidebar setToken={setToken}/>
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