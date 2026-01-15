import React, { useEffect, useState } from "react";
import {roomData} from '../assets/asset';
import { createContext } from "react";
import axios from "axios"
import { backendUrl } from "../App";

export const RoomContext = createContext();

const RoomContextProvider = ({children}) => {
    const [rooms, setRooms] = useState(roomData)

    const fetchHotelRoom = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/hotel/list`)
            console.log("API response:", response.data);

        if (response.data && Array.isArray(response.data.hotels)) {
            setRooms(response.data.hotels);
        } else {
            console.log("Không có mảng hotels trong response");
        }

        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=> {
        fetchHotelRoom()
    },[])
    // Lắng nghe thông báo phòng đã được cập nhật
    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === 'roomsUpdated') {
                fetchHotelRoom()
            }
        }

        const onCustom = () => fetchHotelRoom()

        window.addEventListener('storage', onStorage)
        window.addEventListener('roomsUpdated', onCustom)

        return () => {
            window.removeEventListener('storage', onStorage)
            window.removeEventListener('roomsUpdated', onCustom)
        }
    }, [])
    return(
        <RoomContext.Provider value={{ rooms: rooms }}>
            {children}
        </RoomContext.Provider>
    )
}

export default RoomContextProvider