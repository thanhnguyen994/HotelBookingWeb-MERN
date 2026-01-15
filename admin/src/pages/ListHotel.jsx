import React, { useState, useEffect } from 'react'
import { MdDeleteForever, MdEdit, MdSave, MdCancel } from 'react-icons/md' // Import thêm icon
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify' // Gợi ý dùng toast để báo lỗi đẹp hơn

const ListHotel = ({token}) => {
  const [list, setList] = useState([])
  
  // State để quản lý dòng nào đang được sửa
  const [editingId, setEditingId] = useState(null)
  
  // State lưu dữ liệu tạm thời khi đang gõ sửa
  const [editFormData, setEditFormData] = useState({
    name: '',
    price: ''
  })

  const fetchRoomList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/hotel/list', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data && response.data.succes) {
        setList(response.data.hotels || [])
      } else {
        console.log('Fetch list failed:', response.data?.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  // --- HÀM 1: Bắt đầu chế độ sửa ---
  const handleEditClick = (item) => {
    setEditingId(item._id || item.id)
    setEditFormData({
      name: item.name,
      price: item.price
    })
  }

  // --- HÀM 2: Hủy bỏ sửa ---
  const handleCancelEdit = () => {
    setEditingId(null)
    setEditFormData({ name: '', price: '' })
  }

  // --- HÀM 3: Lưu thay đổi xuống Server ---
  const handleSaveEdit = async (id) => {
    try {
      // Gọi API update (Bạn cần tạo API này ở Bước 2)
      const response = await axios.post(backendUrl + '/api/hotel/update', {
        _id: id,
        name: editFormData.name,
        price: Number(editFormData.price) // Đảm bảo giá là số
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data && response.data.succes) {
        // Cập nhật lại danh sách hiển thị ngay lập tức (không cần load lại trang)
        setList(prev => prev.map(item => {
          if ((item._id || item.id) === id) {
            return { ...item, name: editFormData.name, price: editFormData.price }
          }
          return item
        }))
        
        setEditingId(null) // Tắt chế độ sửa
        alert("Cập nhật thành công") 

      } else {
        console.log("Cập nhật thất bại:", response.data);
        alert(response.data?.message || "Cập nhật thất bại")
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error)
      alert("Đã có lỗi xảy ra")
    }
  }

  const handleDelete = async (hotelId) => {
    const ok = window.confirm('Bạn chắc chắn muốn xóa phòng này?')
    if (!ok) return

    try {
      const response = await axios.post(backendUrl + '/api/hotel/remove', {_id: hotelId}, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data && response.data.succes) {
        setList(prev => prev.filter(item => (item._id || item.id) !== hotelId))
        try {
            localStorage.setItem('roomsUpdated', String(Date.now()))
            window.dispatchEvent(new Event('roomsUpdated'))
        } catch (e) {}
      } else {
        alert(response.data?.message || 'Xóa thất bại')
      }
    } catch (error) {
      console.error('Lỗi xóa:', error)
    }
  }

  useEffect(()=> {
    fetchRoomList()
  }, [])

  return (
    <div>
      <p className='mb-2 font-bold text-2xl'>Danh sách Phòng & Quản lý</p>
      <div className='flex flex-col gap-2'>
        {/* Header Table */}
        <div className='grid grid-cols-[1fr_3fr_1.5fr_1.5fr] items-center p-2 border-b-2 border-gray-300 text-lg font-semibold bg-gray-100'>
          <b>Ảnh</b>
          <b>Tên phòng</b>
          <b>Giá phòng</b>
          <b className='text-center'>Hành động</b>
        </div>

        {/* Body Table */}
        {list.map((item, index) => {
          const isEditing = editingId === (item._id || item.id);
          
          return (
            <div key={index} className='grid grid-cols-[1fr_3fr_1.5fr_1.5fr] items-center p-2 border-b-2 border-gray-300 text-lg hover:bg-gray-50 transition'>
              
              {/* ẢNH  */}
              <img src={item.image} alt="" className='w-[60px] h-[40px] object-cover rounded shadow-sm'/>

              {/* TÊN */}
              {isEditing ? (
                <input 
                  type="text" 
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                  className='border border-lime-500 rounded px-2 py-1 w-[90%] outline-none'
                />
              ) : (
                <p className='font-medium'>{item.name}</p>
              )}

              {/* GIÁ */}
              {isEditing ? (
                <input 
                  type="number" 
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({...editFormData, price: e.target.value})}
                  className='border border-lime-300 rounded px-2 py-1 w-[80%] outline-none'
                />
              ) : (
                <p className='text-lime-500 font-bold'>{Number(item.price).toLocaleString()} VNĐ</p>
              )}

              {/* HÀNH ĐỘNG */}
              <div className='flex justify-center gap-4 text-[24px]'>
                {isEditing ? (
                  <>
                    {/* nút Save */}
                    <button 
                      onClick={() => handleSaveEdit(item._id || item.id)}
                      className='text-green-600 hover:text-green-800' title="Lưu">
                      <MdSave />
                    </button>
                    {/* nút Cancel */}
                    <button 
                      onClick={handleCancelEdit}
                      className='text-gray-500 hover:text-gray-700' title="Hủy">
                      <MdCancel />
                    </button>
                  </>
                ) : (
                  <>
                    {/* Nút Edit */}
                    <button 
                      onClick={() => handleEditClick(item)}
                      className='text-blue-500 hover:text-blue-600' title="Sửa">
                      <MdEdit />
                    </button>
                    {/* Nút Delete */}
                    <button
                      onClick={() => handleDelete(item._id || item.id)}
                      className='text-red-400 hover:text-red-600' title="Xóa">
                      <MdDeleteForever />
                    </button>
                  </>
                )}
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListHotel