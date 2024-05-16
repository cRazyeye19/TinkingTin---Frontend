import React from 'react'
import './header.css'
import Logo from '../Logo/Logo'
import Navigation from '../Navigation/Navigation'

const Header = ({ socket }) => {
  return (
    <header id='header' className='header fixed-top d-flex align-items-center'>
      <Logo />
      <Navigation socket={socket} />
    </header>
  )
}

export default Header