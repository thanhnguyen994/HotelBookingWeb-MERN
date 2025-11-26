import React, { useState } from "react";
import {roomData} from '../assets/asset';
import { createContext } from "react";

export const RoomContext = createContext();

const RoomContextProvider = ({children}) => {
    const [rooms, setRoom] = useState(roomData)

    return(
        <RoomContext.Provider value={{ rooms: rooms }}>
            {children}
        </RoomContext.Provider>
    )
}

export default RoomContextProvider