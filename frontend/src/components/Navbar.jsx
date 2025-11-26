import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-between p-[2rem] bg-black text-white'>
        <Link to='/'>
        <div>
          <h2 className='font-bold text-2xl'>DELUXE <span className='text-lime-400'>HOTELS</span></h2>
        </div>
        </Link>
        

        <div>
          <ul className='flex justify-between gap-8'>
            <li  className='font-bold text-lg cursor-pointer hover:text-lime-500'>BOOKING</li>
            <li  className='font-bold text-lg cursor-pointer hover:text-lime-500'>ROOMS</li>
            <li  className='font-bold text-lg cursor-pointer hover:text-lime-500'>CONTACT</li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar