import React from 'react'
import './headmain.css'
import Topbar from '../Topbar/Topbar'
import Hero from '../Hero/Hero'
import Team from '../Team/Team'

const HeadMain = () => {
  return (
    <div className='head-main'>
      <Topbar />
      <Hero />
      <Team />
    </div>
  )
}

export default HeadMain