import React from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'

const Assignee = () => {

    const { user } = useSelector((state) => state.authReducer.authData);
    return (
        <Select isMulti name='users' options={user} className='basic-multi-select' classNamePrefix="select" />
    )
}

export default Assignee