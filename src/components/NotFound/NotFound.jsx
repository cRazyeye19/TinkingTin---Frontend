import React from 'react'
import './notfound.css'
import ErrorImg from '../../imgs/404-error.png'

const NotFound = () => {
  return (
    <>
      <div className='d-flex flex-column align-items-center'>
        <img src={ErrorImg} alt="Error Image" title='Page Not Found' className='image-size' />
        <h5 className='error-msg'>Hmmm no issues here :D</h5>
      </div>
    </>
  )
}

export default NotFound