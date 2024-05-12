import React from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import MainFac from '../../components/Main/Main-Fac'
import MainFooter from '../../components/Footer/MainFooter'
import Scroll from '../../components/Scroll/Scroll'

const Faculty = () => {
    return (
        <>
            <Header />
            <MainFac />
            <Sidebar />
            <MainFooter />
            <Scroll />
        </>
    )
}

export default Faculty