import React from 'react'
import './main.css'
import PageTitle from '../PageTitle/PageTitle'
import DashboardDept from '../Dashboard/Dashboard-Dept'

const MainDept = () => {
    return (
        <main id='main' className='main'>
            <PageTitle />
            <DashboardDept />
        </main>
    )
}

export default MainDept