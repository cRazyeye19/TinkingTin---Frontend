import React from 'react'
import './reply.css'
import { useSelector } from 'react-redux';
import { format } from 'timeago.js'

const Reply = ({ reply }) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    return (
        <footer className='mb-2 mt-3 ms-5'>
            <div className='d-flex align-items-center justify-content-between'>
                <p className='d-inline-flex me-3 align-items-center edit_label'>{reply?.username}</p>
                <p className=' text-secondary date_span'>{format(reply?.createdAt)}</p>
            </div>
            <div className='d-flex align-items-baseline justify-content-between'>
                <p className='fw-semibold mb-0 ms-2'>{reply?.reply}</p>
                {user.username === reply.username &&
                    <div className='mt-2 d-flex justify-content-end'>
                        <span className='me-2 reply_settings text-primary'>Edit</span>  
                        <span className='reply_settings text-danger'>Delete</span>
                    </div>
                }
            </div>
        </footer>
    )
}

export default Reply