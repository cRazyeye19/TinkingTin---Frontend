import React from 'react'
import '../Edit Ticket/edit.css'

const CardFilter = ({ comment }) => {

    const handleEdit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="filter">
            <a className="icon" data-bs-toggle='dropdown'>
                <i className='bs bi-three-dots'></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header">
                    <span className='edit_label fw-bold fs-6'>Settings</span>
                </li>
                <li>
                    <a className="dropdown-item">
                        <i className='bs bi-pencil w-25 text-success'></i>
                        <span onClick={handleEdit}>Edit</span>
                    </a>
                </li>
                <li>
                    <a className="dropdown-item">
                        <i className='bs bi-trash w-25 text-danger'></i>
                        <span>Delete</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default CardFilter