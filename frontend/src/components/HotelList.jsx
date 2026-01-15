import React from 'react'
import {Link} from 'react-router-dom'

//  Nhận 'rooms' từ HomePage truyền vào
const HotelList = ({ rooms }) => {
  return (
    <div className='bg-[#f7f0eb] py-16 px-4'>
      <div className='max-w-6x1 mx-auto'> 
        <h2 className='text-4xl font-serif text-center mb-12 text-gray-800'>Book your stay and <br/> relax in luxury </h2>
        
        {/* Display the rooms */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          { 
            rooms && rooms.length > 0 ? (
              rooms.map((room, index) => {
                const { _id, id, image, name, price} = room
                
                const roomId = _id || id;

                return(
                  <div key={index} className='bg-white shadow rounder-lg overflow-hidden'>
                    {/* Link tới trang chi tiết */}
                    <Link to={`/room/${roomId}`}>  
                      <img src={image} alt={name} className='w-full h-80 object-cover hover:scale-105 transition duration-300'/>
                    </Link>
                    
                    <div className='p-5'>
                      <h3 className='text-2xl font-semibold text-gray-800 mb-1'>{name}</h3>
                      <p className='text-lime-600 font-bold text-lg mb-4'>{price} VNĐ<span className='text-gray-400 text-sm font-normal'>/Đêm</span></p>
                    </div>
                  </div>
                )
              })
            ) : (
              // Thông báo nếu không tìm thấy phòng nào phù hợp
              <div className='col-span-full text-center py-10'>
                 <p className='text-gray-500 text-xl'>Không tìm thấy phòng!</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default HotelList