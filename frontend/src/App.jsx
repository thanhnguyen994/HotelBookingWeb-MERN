import React from 'react'
import NavBar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Homepage from './pages/HomePage'
import HotelDetails from './pages/HotelDetails'
import Footer from './components/Footer'

const App = () => {

  return (

    <div>
      <NavBar /> 

       <Routes>
        <Route path='/' element={<Homepage />} /> 
        <Route path='/room/:id' element={<HotelDetails />} /> 
      </Routes>

      <Footer /> 
      

    </div>
  )
}
export default App