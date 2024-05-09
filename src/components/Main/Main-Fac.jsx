import React from 'react'
import PageTitle from '../PageTitle/PageTitle'
import DashboardFac from '../Dashboard/Dashboard-Fac'

const MainFac = () => {
    return (
        <main id='main' className='main'>
            <PageTitle />
            <DashboardFac />
        </main>
    )
}

export default MainFac