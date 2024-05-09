import React from 'react'
import Notification from '../Notification/Notification'
import Avatar from '../Avatar/Avatar'
import './nav.css'

const Navigation = () => {
  return (
    <nav className='header-nav ms-auto'>
        <ul className="d-flex align-items-center">
            <Notification />
            <Avatar />
        </ul>
    </nav>
  )
}

export default Navigation