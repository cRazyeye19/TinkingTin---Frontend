import React from 'react'
import './main.css'
import PageTitle from '../PageTitle/PageTitle'
import Dashboard from '../Dashboard/Dashboard'

const Main = ({ socket }) => {
    return (
        <main id='main' className='main'>
            <PageTitle />
            <Dashboard socket={socket}/>
        </main>
    )
}

export default Main