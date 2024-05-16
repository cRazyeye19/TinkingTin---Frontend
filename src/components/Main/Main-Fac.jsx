import React from 'react'
import PageTitle from '../PageTitle/PageTitle'
import DashboardFac from '../Dashboard/Dashboard-Fac'

const MainFac = ({ socket }) => {
    return (
        <main id='main' className='main'>
            <PageTitle />
            <DashboardFac socket={socket}/>
        </main>
    )
}

export default MainFac