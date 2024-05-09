import React from 'react'
import './main.css'
import PageTitle from '../PageTitle/PageTitle'
import DashboardAdmin from '../Dashboard/Dashboard-Admin'

const MainAdmin = () => {
    return (
        <main id='main' className='main'>
            <PageTitle />
            <DashboardAdmin />
        </main>
    )
}

export default MainAdmin