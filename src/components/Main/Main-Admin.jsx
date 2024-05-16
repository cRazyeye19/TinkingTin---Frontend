import React from 'react'
import './main.css'
import PageTitle from '../PageTitle/PageTitle'
import DashboardAdmin from '../Dashboard/Dashboard-Admin'

const MainAdmin = ({ socket }) => {
    return (
        <main id='main' className='main'>
            <PageTitle />
            <DashboardAdmin socket={true} />
        </main>
    )
}

export default MainAdmin