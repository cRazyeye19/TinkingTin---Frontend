import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import MainAdmin from '../../components/Main/Main-Admin'
import Sidebar from '../../components/Sidebar/Sidebar'
import MainFooter from '../../components/Footer/MainFooter'
import Scroll from '../../components/Scroll/Scroll'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'

const Admin = () => {
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
      <MainAdmin socket={socket} />
      <Sidebar />
      <MainFooter />
      <Scroll />
    </>
  )
}

export default Admin