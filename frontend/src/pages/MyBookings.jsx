import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/reservations/get`)
        if (res.data && Array.isArray(res.data)) setBookings(res.data)
        else setBookings([])
      } catch (err) {
        console.error(err)
        setBookings([])
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return (
    <div className='min-h-screen p-6'>
      <h2 className='text-3xl font-bold text-gray-700 text-center mb-6'>My Bookings</h2>

      {loading ? (
        <div className='text-center'>Loading...</div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full shadow-lg rounded-xl'>
            <thead>
              <tr className='bg-fuchsia-600 text-left text-white'>
                <th className='p-3'>Room</th>
                <th className='p-3'>Name</th>
                <th className='p-3'>Email</th>
                <th className='p-3'>Phone</th>
                <th className='p-3'>Guests</th>
                <th className='p-3'>Check-in</th>
                <th className='p-3'>Check-out</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan='7' className='p-4 text-center'>No bookings found</td>
                </tr>
              ) : (
                bookings.map((b, i) => (
                  <tr key={b._id || b.id || i} className='border-b hover:bg-gray-100'>
                    <td className='p-3'>{b.roomName}</td>
                    <td className='p-3'>{b.name}</td>
                    <td className='p-3'>{b.email}</td>
                    <td className='p-3'>{b.phone}</td>
                    <td className='p-3'>{b.guests}</td>
                    <td className='p-3'>{b.checkin}</td>
                    <td className='p-3'>{b.checkout}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default MyBookings
