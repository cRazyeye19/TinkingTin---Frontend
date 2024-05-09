import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../actions/AuthAction';

const Avatar = () => {

    const { user } = useSelector((state) => state.authReducer.authData);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logOut())
    }

    return (
        <>
            <style>
                {`.avatar_img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }`}
            </style>
            <li className='nav-item dropdown pe-3'>
                <a href="#" className='nav-link nav-profile d-flex align-items-center pe-0' data-bs-toggle='dropdown'>
                    <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "default_propic.jpg"} alt="" className='avatar_img' title='Profile Picture' />
                    <span className='d-none d-md-block dropdown-toggle ps-2'>{user.firstname.substring(0, 1)}. {user.lastname}</span>
                </a>

                <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow profile'>
                    <li className='dropdown-header'>
                        <h6>{user.firstname} {user.lastname}</h6>
                        <span>{user.job}</span>
                    </li>
                    <li>
                        <hr className='dropdown-divider' />
                    </li>

                    {/* <li>
                        <a href="users-profile.html" className="dropdown-item d-flex align-items-center ">
                            <i className='bi bi-person'></i>
                            <span>My Profile</span>
                        </a>
                    </li>
                    <li>
                        <hr className='dropdown-divider' />
                    </li>

                    <li>
                        <a href="users-profile.html" className="dropdown-item d-flex align-items-center ">
                            <i className='bi bi-gear'></i>
                            <span>Account Settings</span>
                        </a>
                    </li>
                    <li>
                        <hr className='dropdown-divider' />
                    </li> */}

                    <li>
                        <a href="pages-faq.html" className="dropdown-item d-flex align-items-center ">
                            <i className='bi bi-question-circle'></i>
                            <span>Need Help?</span>
                        </a>
                    </li>
                    <li>
                        <hr className='dropdown-divider' />
                    </li>

                    <li onClick={handleLogOut}>
                        <a className="dropdown-item d-flex align-items-center ">
                            <i className='bi bi-arrow-right'></i>
                            <span>Sign Out</span>
                        </a>
                    </li>
                </ul>
            </li>
        </>
    )
}

export default Avatar