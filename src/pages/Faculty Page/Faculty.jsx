import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import MainFac from '../../components/Main/Main-Fac'
import MainFooter from '../../components/Footer/MainFooter'
import Scroll from '../../components/Scroll/Scroll'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'

const Faculty = () => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const [socket, setSocket] = useState(null)
    
    useEffect(() => {
        setSocket(io('http://localhost:8000'))
    }, [])

    useEffect(() => {
        socket?.emit('newUser', user.firstname, user.lastname, user._id)
    }, [user, socket])
    return (
        <>
            <Header socket={socket} />
            <MainFac socket={socket} />
            <Sidebar />
            <MainFooter />
            <Scroll />
        </>
    )
}

export default Faculty