import React, { useContext, useEffect, useState } from 'react'
import Hero from '../components/Hero'
import HotelList from '../components/HotelList'
import { RoomContext } from '../context/RoomContext'

const HomePage = () => {
  const { rooms } = useContext(RoomContext) // Lấy dữ liệu gốc
  const [filteredRooms, setFilteredRooms] = useState([]) // State lưu danh sách hiển thị

  // Khi mới load trang, danh sách hiển thị = danh sách gốc
  useEffect(() => {
    setFilteredRooms(rooms)
  }, [rooms])

  // Logic tìm kiếm
  const handleSearch = (keyword, guests) => {
    const lowerKeyword = keyword.toLowerCase()
    
    const results = rooms.filter(room => {
      // 1. Kiểm tra tên phòng
      const matchName = room.name.toLowerCase().includes(lowerKeyword)
      
      // 2. Kiểm tra số người (Giả sử trong DB bạn có trường maxPeople, nếu chưa có thì tạm thời bỏ qua điều kiện này hoặc mặc định là true)
      // Nếu logic của bạn là tìm phòng chứa ĐƯỢC số người này trở lên:
      const matchGuests = room.maxPeople ? room.maxPeople >= guests : true 

      return matchName && matchGuests
    })

    setFilteredRooms(results)

    // Tự động cuộn xuống phần danh sách phòng
    const listSection = document.getElementById('hotel-list-section')
    if (listSection) {
      listSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div>
      {/* Truyền hàm tìm kiếm xuống Hero */}
      <Hero onSearch={handleSearch} />
      
      {/* Truyền danh sách đã lọc xuống HotelList */}
      <div id="hotel-list-section">
        <HotelList rooms={filteredRooms} />
      </div>
    </div>
  )
}

export default HomePage