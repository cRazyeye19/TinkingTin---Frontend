import React from 'react'
import Header from '../../components/Header/Header'
import MainDept from '../../components/Main/Main-Dept'
import Sidebar from '../../components/Sidebar/Sidebar'
import MainFooter from '../../components/Footer/MainFooter'
import Scroll from '../../components/Scroll/Scroll'

const AssignWrapper = () => {
  return (
    <>
      <Header />
      <MainDept />
      <Sidebar />
      <MainFooter />
      <Scroll />
    </>
  )
}

export default AssignWrapper