import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaConciergeBell, FaSwimmingPool, FaUtensils, FaWifi, FaTv } from 'react-icons/fa'
import axios from 'axios'
import { backendUrl } from '../App'

const HotelDetail = () => {
  const [room, setRoom] = useState(null)
  const { id } = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [checkinInput, setCheckinInput] = useState('')
  const [checkoutInput, setCheckoutInput] = useState('')
  const [guestsInput, setGuestsInput] = useState('1')

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        // Gọi API
        const response = await axios.get(`${backendUrl}/api/hotel/rooms/${id}`)
        
        console.log("Dữ liệu nhận được:", response.data); 

        // BE trả thông tin trong `response.data.hotel`
        
        const data = response.data
        if (data && data.hotel) {
          setRoom(data.hotel)
        } else if (data && (data.success || data.succes)) {
          if (data.hotel) setRoom(data.hotel)
          else setRoom(data)
        } else if (data && data.name) {
          // server sẽ trả về đối tượng phòng
          setRoom(data)
        } else {
          console.log('Phản hổi không mong đợi:', data)
        }
      } catch (error) {
        console.log("Lỗi gọi API:", error)
      }
    }

    if (id) {
        fetchRoomDetails()
    }
  }, [id])

  console.log("Dữ liệu Render:", room);
  if (!room) {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='text-xl text-gray-600 font-semibold'>Đang tải...</div>
        </div>
    )
  }
  //Xử lí khi nhấn đặt phòng
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        name,
        email,
        phone,
        checkin: checkinInput,
        checkout: checkoutInput,
        guests: guestsInput,
        roomName: room.name,
        roomId: room._id || id
      }

      const response = await axios.post(`${backendUrl}/api/reservations/create`, payload)
      if (response.data && response.data.message) {
        alert(response.data.message)
        //reset lạ ithoong tin form đặt phòng
        setName('')
        setEmail('')
        setPhone('')
        setCheckinInput('')
        setCheckoutInput('')
        setGuestsInput('1')
      } else {
        alert('Booking submitted')
      }
    } catch (error) {
      console.log('Booking error:', error)
      alert('Đặt phòng thất bại, thử lại sau')
    }
  }

  // 3. Hiển thị dữ liệu 
  return (
    <div className='mx-auto max-w-8xl p-6 grid grid-cols-1 md:grid-cols-3 gap-8'>
      {/* Cột trái: Thông tin phòng */}
       <div className='md:col-span-2 space-y-6'>
        <div>
          
          <h1 className='text-3xl font-bold'>{room.name}</h1>
          <p className='text-xl text-lime-300 mt-1'>{room.price} VNĐ</p>
        </div>

        <img 
            src={room.image ? room.image : 'https://via.placeholder.com/600x400'} 
            alt={room.name} 
            className='w-full rounded-lg shadow-md object-cover max-h-[500px]'
        />
        
        <div className='bg-gray-50 p-6 rounded-lg border border-gray-100'>
            <h3 className='text-xl font-bold mb-3 text-gray-800'>Mô tả</h3>
            <p className='text-gray-600 leading-relaxed text-lg whitespace-pre-line'>
                {room.description ? room.description : "No description available for this room."}
            </p>
        </div>
        
       </div>

      {/* Cột phải: Form đặt phòng) */}
       <div className='bg-white p-6 rounded-lg shadow-md h-fit sticky top-10'>
        <h2 className='text-2xl font-bold mb-4'>Book Your Stay</h2>
        <ReservationForm room={room} />
       </div>
    </div>
  )
}

export default HotelDetail

// thành phần biểu mẫu đặt chỗ 
function ReservationForm({ room }){
  const [form, setForm] = useState({
    name: '', email: '', phone: '', checkin: '', checkout: '', guests: '1'
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [existing, setExisting] = useState([])
  const [available, setAvailable] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // Lấy thông tin về các đặt phòng hiện có cho phòng này 
  useEffect(() => {
    const fetchExisting = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/reservations/get`)
        if (res.data && Array.isArray(res.data)) {
          const list = res.data.filter(r => (r.roomId === (room._id || room.id)))
          setExisting(list)
        } else {
          setExisting([])
        }
      } catch (err) {
        console.error('Error fetching reservations', err)
      }
    }
    if (room) fetchExisting()
  }, [room])

  // Kiểm tra xem có đặt được phòng ko
  useEffect(() => {
    const { checkin, checkout } = form
    if (!checkin || !checkout) {
      setAvailable(null)
      return
    }

    const newCheckin = new Date(checkin)
    const newCheckout = new Date(checkout)
    if (isNaN(newCheckin) || isNaN(newCheckout) || newCheckin >= newCheckout) {
      setAvailable(false)
      return
    }
    //Ktra 2 đơn có trùng ngày nhau k
    const overlaps = existing.some(r => {
      const exCheckin = new Date(r.checkin)
      const exCheckout = new Date(r.checkout)
      if (isNaN(exCheckin) || isNaN(exCheckout)) return false
      return !(exCheckout <= newCheckin || exCheckin >= newCheckout)
    })

    setAvailable(!overlaps)
  }, [form.checkin, form.checkout, existing])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    if (available === false) {
      setMessage('Phòng không còn trống trong khoảng ngày bạn chọn.')
      setLoading(false)
      return
    }
    try {
      const payload = {
        ...form,
        roomName: room.name,
        roomId: room._id || room.id
      }

      const res = await axios.post(`${backendUrl}/api/reservations/create`, payload)
      if (res.data && res.data.reservation) {
        setMessage('Đặt phòng thành công!')
        // đặt xong thì clear thông tin
        setForm({ name: '', email: '', phone: '', checkin: '', checkout: '', guests: '1' })
        //tải lại thông tin
        setExisting(prev => [...prev, res.data.reservation])
      } else if (res.data && res.data.message) {
        setMessage(res.data.message)
      } else {
        setMessage('Đặt phòng thất bại, thử lại sau.')
      }
    } catch (error) {
      console.error('Booking error', error)
      setMessage('Lỗi khi gửi yêu cầu đặt phòng')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      <input name='name' value={form.name} onChange={handleChange} required type="text" placeholder='Name' className='w-full border border-gray-300 p-3 rounded-lg'/>
      <input name='email' value={form.email} onChange={handleChange} required type="email" placeholder='Email' className='w-full border border-gray-300 p-3 rounded-lg'/>
      <input name='phone' value={form.phone} onChange={handleChange} required type="tel" placeholder='Phone Number' className='w-full border border-gray-300 p-3 rounded-lg'/>

      <div>
        <label className='font-bold block mb-1'>Check-In</label>
        <input name='checkin' value={form.checkin} onChange={handleChange} required type="date" className='w-full border border-gray-300 p-3 rounded-lg' />
      </div>
      <div>
        <label className='font-bold block mb-1'>Check-Out</label>
        <input name='checkout' value={form.checkout} onChange={handleChange} required type="date" className='w-full border border-gray-300 p-3 rounded-lg'/>
      </div>

      <div>
        <label className='font-bold block mb-1'>Số người</label>
        <select name='guests' value={form.guests} onChange={handleChange} className='w-full p-3 border border-gray-300 rounded-lg'>
          {[1, 2, 3, 4].map(num => (
            <option key={num} value={num}>{num} Người</option>
          ))}
        </select>
      </div>

      <button disabled={loading} type="submit" className='w-full bg-lime-400 text-white p-3 rounded-lg hover:bg-lime-500 transition font-bold'>
        {loading ? 'Booking...' : 'Book Now'}
      </button>

      {message && (
        <div className='text-center text-sm text-gray-700 mt-2'>{message}</div>
      )}
      {available !== null && (
        <div className={`text-center mt-2 ${available ? 'text-green-600' : 'text-red-600'} text-bold`}>
          {available ? 'Phòng trống cho ngày đã chọn' : 'Không còn phòng cho ngày đã chọn'}
        </div>
      )}
    </form>
  )
}