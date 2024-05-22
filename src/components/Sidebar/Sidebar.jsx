import React, { useState } from 'react'
import './sidebar.css'
import TicketModal from '../Create Ticket/TicketModal'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../actions/AuthAction'
import { Link } from 'react-router-dom'

const Sidebar = () => {

    const { user } = useSelector((state) => state.authReducer.authData);

    const [showTicket, setShowTicket] = useState(false)
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logOut())
    }

    return (
        <aside id='sidebar' className='sidebar'>
            <ul className="sidebar-nav" id='sidebar-nav'>
                <li className='nav-item'>
                    <a className="nav-link">
                        <i className='bi bi-grid'></i>
                        <Link to={`/dashboard/${user.role.toLowerCase()}`}>Dashboard</Link>
                    </a>
                </li>
                {/* <li className='nav-item'>
                    <a className='nav-link collapsed' data-bs-target='#components-nav' data-bs-toggle='collapse'>
                        <i className='bi bi-file-earmark-person'></i>
                        <span>Faculty</span>
                        <i className='bi bi-chevron-down ms-auto'></i>
                    </a>
                    <ul id='components-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>
                        <li>
                            <a href="#">
                                <li className='bi bi-circle'></li>
                                <span>Manage</span>
                            </a>
                        </li>
                        
                        <li>
                            <a href="#">
                                <li className='bi bi-circle'></li>
                                <span>Suppliers</span>
                            </a>
                        </li>
                        
                        <li>
                            <a href="#">
                                <li className='bi bi-circle'></li>
                                <span>Suppliers</span>
                            </a>
                        </li>
                    </ul>
                </li> */}

                {user.role === "Admin" || user.role === "User" && (
                    <li className='nav-item' onClick={() => setShowTicket(true)}>
                        <a className="nav-link">
                            <i className='bi bi-ticket-perforated'></i>
                            <span>Create Ticket</span>
                        </a>
                    </li>
                )}
                
                {(user.role === "Admin" || user.role === "Department") && (
                    <li className='nav-item'>
                        <a className="nav-link">
                            <i className='bi bi-file-earmark-person'></i>
                            <Link to='/manage/assign'>Manage Faculty</Link>
                        </a>
                    </li>
                )}

                <li className='nav-item' onClick={handleLogOut}>
                    <a className="nav-link">
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Logout</span>
                    </a>
                </li>
            </ul>
            <TicketModal showTicket={showTicket} setShowTicket={setShowTicket} />
        </aside>
    )
}

export default Sidebar