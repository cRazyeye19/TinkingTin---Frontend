import React from 'react'
import Header from '../../components/Header/Header'
import MainAdmin from '../../components/Main/Main-Admin'
import Sidebar from '../../components/Sidebar/Sidebar'
import MainFooter from '../../components/Footer/MainFooter'
import Scroll from '../../components/Scroll/Scroll'

const Admin = () => {
  return (
    <>
      <Header />
      <MainAdmin />
      <Sidebar />
      <MainFooter />
      <Scroll />
    </>
  )
}

export default Admin