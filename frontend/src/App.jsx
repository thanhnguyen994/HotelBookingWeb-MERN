import React from 'react'
import NavBar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Homepage from './pages/HomePage'
import HotelDetails from './pages/HotelDetails'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop';
import MyBookings from './pages/MyBookings';

export const backendUrl = 'http://localhost:4000'

const App = () => {

  return (

    <div>
      <ScrollToTop />
      <NavBar /> 

       <Routes>
        <Route path='/' element={<Homepage />} /> 
        <Route path='/room/:id' element={<HotelDetails />} /> 
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>

      <Footer /> 
      

    </div>
  )
}
export default App