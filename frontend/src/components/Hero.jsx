import React, { useState, useContext } from 'react'
import bgImage from '../assets/hero2.jpg'
import { RoomContext } from '../context/RoomContext'
import { Link } from 'react-router-dom' 

const Hero = () => {
  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState('')
  const [guests, setGuests] = useState('')
  const { rooms } = useContext(RoomContext)
  const [results, setResults] = useState([])

  //Hàm xử lí việc chuyển sang tìm kiếm
  const handleToggle = () => setShowSearch(s => !s)

  //Hàm itmf kiếm
  //q là tên phòng, g là số người
  const runSearch = (e) => {
    if (e) e.preventDefault()
    const q = query.trim().toLowerCase()
    const g = Number(guests) || 0

    // Nếu không nhập gì thì không hiển thị kết quả
    if (!q && g === 0) {
        setResults([]);
        return;
    }

    const filtered = (rooms || []).filter(r => {
      // Logic lọc tên
      const nameMatch = !q || (r.name && r.name.toLowerCase().includes(q))

      // Logic lọc số người 
      const capacity = r.guests || r.maxPeople || r.capacity || 0 
      const capacityNum = Number(capacity) || 0
      
      // Logic: Nếu khách nhập 0 hoặc để trống -> bỏ qua 
      // Nếu có nhập -> phòng phải chứa được >= số khách
      const guestMatch = g <= 0 ? true : (capacityNum === 0 ? true : capacityNum >= g)

      return nameMatch && guestMatch
    })

    setResults(filtered)
  }

  return (
   
    <div className='relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center' style={{backgroundImage :`url(${bgImage})`}}>
      <div className='absolute inset-0 bg-gray-900 opacity-30 z-10'></div>
      
      <div className='relative z-20 flex flex-col items-center justify-center w-full text-center text-white px-4 py-20'>
        
        {/* Chỉ hiện tiêu đề khi KHÔNG bật tìm kiếm */}
        {!showSearch && (
            <>
                <h2 className='text-lg mb-4 tracking-widest uppercase'>Where Luxury Meets Diner</h2>
                <h1 className='text-4xl font-bold mb-6'>DELUXE HOTELS</h1>
            </>
        )}
        
        {/* Nút tìm kiếm */}
        <button onClick={handleToggle} className='bg-lime-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-lime-600 transition mb-6'>
            {showSearch ? 'ĐÓNG' : 'ĐẶT PHÒNG '}
        </button>

        {showSearch && (
          <div className='w-full max-w-4xl bg-white rounded-lg p-6 text-black shadow-2xl animate-fadeIn'>
            <form onSubmit={runSearch} className='flex flex-col md:flex-row gap-3 border-b pb-6 mb-4 border-gray-200'>
              <input 
                value={query} 
                onChange={e => setQuery(e.target.value)} 
                placeholder='Nhập loại phòng' 
                className='flex-1 p-3 border border-gray-300 rounded focus:outline-lime-500' 
              />
              <input 
                value={guests} 
                onChange={e => setGuests(e.target.value)} 
                placeholder='Người' 
                type='number' 
                min='1' 
                className='w-full md:w-32 p-3 border border-gray-300 rounded focus:outline-lime-500' 
              />
              <div className='flex gap-2'>
                <button type='submit' className='bg-lime-500 text-white font-bold py-3 px-6 rounded hover:bg-lime-600 transition'>Tìm kiếm</button>
                <button type='button' onClick={() => { setQuery(''); setGuests(''); setResults([]) }} className='bg-gray-200 text-gray-700 py-3 px-4 rounded hover:bg-gray-300'>Xóa</button>
              </div>
            </form>

            {/* Khu vực hiển thị kết quả */}
            <div>
              <p className='font-semibold text-left mb-2 text-gray-600'>Tìm thấy {results.length} phòng</p>
              
              <div className='grid grid-cols-1 gap-4 max-h-[60vh] overflow-y-auto pr-2'>
                {results.length > 0 ? (
                    results.map((r, idx) => {
                         // Xử lý ID
                         const roomId = r._id || r.id;
                         return (
                           //Nhấn sẽ chuyển sang chi tiết phòng do có Link
                            <Link to={`/room/${roomId}`} key={roomId || idx} className='block group'>
                                <div className='bg-gray-50 border border-gray-200 p-3 rounded-lg flex gap-4 items-center hover:bg-lime-50 hover:border-lime-300 transition cursor-pointer'>
                                    <img src={r.image} alt={r.name} className='w-32 h-24 object-cover rounded bg-gray-300' />
                                    <div className='text-left'>
                                    <div className='font-bold text-lg text-gray-800 group-hover:text-lime-700'>{r.name}</div>
                                    <div className='text-lime-600 font-bold'>{r.price} VNĐ <span className='text-gray-400 text-sm font-normal'>/Đêm</span></div>
                                    {r.description && <div className='text-sm text-gray-500 mt-1 line-clamp-2'>{r.description}</div>}
                                    </div>
                                </div>
                            </Link>
                         )
                    })
                ) : (
                    <div className='text-gray-400 py-8 italic'>Không có phòng thỏa mãn yêu cầu!</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Hero