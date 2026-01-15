import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'

const Reservation = () => {
  const [reservations, setReservations] = useState([])
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    const fetchReservation = async() => {
      try {
        const response = await axios.get(backendUrl + '/api/reservations/get')
        setReservations(response.data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchReservation()
  }, [])

  const handleDelete = async (id) => {
    const ok = window.confirm('Bạn có chắc chắn muốn xóa đơn đặt phòng này?')
    if (!ok) return

    setDeletingId(id)
    try {
      const response = await axios.delete(backendUrl + '/api/reservations/delete/' + id)
      if (response.data && response.data.message) {
       //xóa khỏi giao diện 
        setReservations(prev => prev.filter(r => (r._id || r.id) !== id))
      } else {
        alert('Xóa thất bại')
      }
    } catch (error) {
      console.error('Lỗi khi xóa đặt phòng:', error)
      alert('Lỗi khi xóa đặt phòng')
    } finally {
      setDeletingId(null)
    }
  }
  return (
    <div className='min-h-screen'>
      <h2 className='text-3xl font-bold text-gray-700 text-center mb-6'>Đặt Phòng</h2>
      <div className='overflow-x-auto'>
        <table className='ư-full shadow-lg rounded-xl'>
          <thead>
            <tr className='bg-fuchsia-600 text-left text-white '>
              <th className='p-3'>Tên phòng</th>
              <th className='p-3'>Tên khách</th>
              <th className='p-3'>Email</th>
              <th className='p-3'>SĐT</th>
              <th className='p-3'>Số khách</th>
              <th className='p-3'>Check-in</th>
              <th className='p-3'>Check-out</th>
              <th className='p-3'>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {
              reservations.length === 0 ? (
                <tr>
                  <td colSpan="8" className='p-4 text-center '>Không có đơn đặt phòng</td>
                </tr>
              ) : (
                reservations.map((res, index) => (
                  <tr key={index} className='border-b hover:bg-gray-300 '>
                    <td className='p-3'>{res.roomName}</td>
                    <td className='p-3'>{res.name}</td>
                    <td className='p-3'>{res.email}</td>
                    <td className='p-3'>{res.phone}</td>
                    <td className='p-3'>{res.guests}</td>
                    <td className='p-3'>{res.checkin}</td>
                    <td className='p-3'>{res.checkout}</td>
                    <td className='p-3'>
                      <button
                        onClick={() => handleDelete(res._id || res.id)}
                        disabled={deletingId === (res._id || res.id)}
                        className='bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50'
                      >
                        {deletingId === (res._id || res.id) ? 'Đang xóa...' : 'Xóa'}
                      </button>
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Reservation