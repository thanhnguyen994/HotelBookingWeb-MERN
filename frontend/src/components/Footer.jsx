import React from 'react'
import {FaFacebook, FaInstagram, FaYoutube} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  //Hàm cuộn lên
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Tạo hiệu ứng trượt mượt mà (nếu thích nhảy ngay thì bỏ dòng này)
    });
  };

  return (
    <div className='flex flex-col gap-12 px-16 py-16 bg-black text-white'>
      
      
      {/*Bottom section */}
      <div className='flex flex-col justify-between items-center text-center gap-6' >
        <div >
          <h2 className='text-2xl font-bold'>DELUXE HOTELS</h2>
          <div className='flex justify-center gap-4 mt-3 text-lime-500'>
            <FaFacebook className='text-3xl cursor-pointer'/>
            <FaInstagram className='text-3xl cursor-pointer'/>
            <FaYoutube className='text-3xl cursor-pointer'/>
          </div>
        </div>

        <div>
          <ul className='flex gap-6  justify-center text-base font-medium'>
            <Link to='/' onClick={scrollToTop}>
              <li className='cursor-pointer hover:text-lime-500'>HOMES</li>
            </Link>

            <Link to='/my-bookings' onClick={scrollToTop}>
              <li className='cursor-pointer hover:text-lime-500'>BOOKINGS</li>
            </Link>
            
            <Link to='/' onClick={scrollToTop}>
              <li className='cursor-pointer hover:text-lime-500'>ROOMS</li>
            </Link>
            
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer