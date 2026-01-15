import React, { useState } from 'react'
import default_img from "../assets/upload_img.png"
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'


const AddHotel = ({token}) => { //Để chỉ admin có thể thêm phòng
  const [image, setImage] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [loading, setLoading] = useState(false)

  const roomSubmission = async(e) => {
    e.preventDefault()
    setLoading(true) // Bắt đầu gửi thì khóa nút lại

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      const rawPrice = price.replace(/\./g, ''); 
      formData.append("price", rawPrice);
      if(image) formData.append("image", image);

      const response = await axios.post(`${backendUrl}/api/hotel/add`, formData, {headers: {Authorization: `Bearer ${token}`}})
      
      //Kiểm tra yêu cầu có thành công không
      if(response.data.success){
        toast.success("Thêm phòng thành công!")
        //Reset lại forrm
        setName("")
        setDescription("")
        setPrice("")
        setImage(null)    
        const fileInput = document.getElementById('image');  
        if(fileInput) fileInput.value = "";
      }
      else{
       toast.error(response.data.message)
        
      }

    } catch (error) {
      console.log(error);    
    } finally {
        setLoading(false) // Mở khóa nút 
    }
  }

  return (
    <div>
      <form onSubmit={roomSubmission} className='flex flex-col items-start gap-1'>
        <div>
          <p>Tải ảnh lên</p>
          <div>
            <label htmlFor="image">
              <img src={!image ? default_img : URL.createObjectURL(image)} alt="" className='w-32 cursor-pointer border border-gray-300 rounded'/>
              <input type="file" id='image' onChange={(e) => setImage(e.target.files[0])} hidden/>
            </label>
          </div>
        </div>

        <div className='w-full'>
          <p className='mb-2 text-[22px]'>Tên Phòng</p>
          <input type="text" placeholder='Thêm tên phòng' value={name} onChange={(e)=> setName(e.target.value)} className='w-full max-w-[500px] p-4 border border-gray-300 rounded-2xl' />
        </div>

        <div className='w-full'>
          <p className='mb-2 text-[22px]'>Thông tin của phòng</p>
          <input type="text" placeholder='Thêm thông tin' value={description} onChange={(e)=> setDescription(e.target.value)} className='w-full max-w-[500px] p-4 border border-gray-300 rounded-2xl' />
        </div>

        <div className='w-full'>
          <p className='mb-2 text-[22px]'>Giá phòng</p>
          <input type="text" placeholder='500.000' value={price} onChange={(e)=> {
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            if (rawValue) {
              const formattedPrice = parseInt(rawValue).toLocaleString('vi-VN');
                    setPrice(formattedPrice);
                } else {
                    setPrice('');
                }
            }}
            className='w-full max-w-[500px] p-4 border border-gray-300 rounded-2xl'/>
        </div>

        <button 
            type="submit" 
            disabled={loading}
            className={`mt-4 px-10 py-3 rounded text-white transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-fuchsia-500 hover:bg-fuchsia-600'}`}
        >
            {loading ? 'Đang xử lý...' : 'THÊM PHÒNG'}
        </button>
      </form>
    </div>
  )
}

export default AddHotel