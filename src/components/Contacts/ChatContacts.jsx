import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


var aDay = 24 * 60 * 60 * 1000;
const ChatContacts = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchChats())
    }, [dispatch])
    return (
        <div className='d-flex flex-column pb-5 h-75 overflow-y-hidden'></div>
    )
}

export default ChatContacts