import React from 'react'

const Notification = () => {
    return (
        <li className='nav-item dropdown'>
            <a className='nav-link nav-icon' href="#" data-bs-toggle="dropdown">
                <i className="bi bi-bell"></i>
                <span className='badge bg-primary badge-number'>4</span>
            </a>

            <ul className='dropdown-menu dropdown-menu-end dropdown menu-arrow notifications'>
                <li className='dropdown-header'>
                    You have 4 new notifications
                    <a href="#">
                        <span className='badge round-pill bg-primary p-2 ms-2'>
                            View All
                        </span>
                    </a>
                </li>
                <li>
                    <hr className='dropdown-divider' />
                </li>

                <li className='notification-item'>
                    <i className='bi bi-exclamation-circle text-warning'></i>
                    <div>
                        <h4>Lorem, ipsum.</h4>
                        <p>Lorem ipsum dolor sit amet.</p>
                        <p>30 mins ago</p>
                    </div>
                </li>

                <li>
                    <hr className='dropdown-divider' />
                </li>

                <li className='notification-item'>
                    <i className='bi bi-x-circle text-danger'></i>
                    <div>
                        <h4>Lorem, ipsum dolor.</h4>
                        <p>Lorem ipsum dolor sit amet.</p>
                        <p>1 hour ago</p>
                    </div>
                </li>

                <li>
                    <hr className='dropdown-divider' />
                </li>

                <li className='notification-item'>
                    <i className='bi bi-x-circle text-danger'></i>
                    <div>
                        <h4>Lorem, ipsum dolor.</h4>
                        <p>Lorem ipsum dolor sit amet.</p>
                        <p>1 hour ago</p>
                    </div>
                </li>

                <li>
                    <hr className='dropdown-divider' />
                </li>

                <li className='notification-item'>
                    <i className='bi bi-x-circle text-danger'></i>
                    <div>
                        <h4>Lorem, ipsum dolor.</h4>
                        <p>Lorem ipsum dolor sit amet.</p>
                        <p>1 hour ago</p>
                    </div>
                </li>
            </ul>
        </li>
    )
}

export default Notification