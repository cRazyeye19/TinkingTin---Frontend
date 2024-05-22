import { format } from 'timeago.js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllNotifs, deleteNotif, getNotifs } from '../../actions/NotifAction';
import Nothing from '../../imgs/stopwatch.png';

const Notification = ({ socket }) => {
    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState([]);
    const { user } = useSelector((state) => state.authReducer.authData);

    useEffect(() => {
        socket?.on('getNotification', (data) => {
            setNotifications((prev) => [...prev, data]);
        });
    }, [socket]);

    useEffect(() => {
        dispatch(getNotifs());
    }, [dispatch]);

    const { notifs } = useSelector((state) => state.notifReducer);
    console.log(notifs);

    const handleDeleteAll = () => {
        try {
            dispatch(deleteAllNotifs());
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = (id) => {
        try {
            dispatch(deleteNotif(id));
        } catch (error) {
            console.log(error);
        }
    };

    const filteredNotifs = notifs.filter(
        notif => notif.receiverFirstName === user.firstname && notif.receiverLastName === user.lastname
    );

    return (
        <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-bell"></i>
                {filteredNotifs?.length > 0 && (
                    <span className="badge bg-primary badge-number">{filteredNotifs.length}</span>
                )}
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                    You have {filteredNotifs?.length > 0 ? filteredNotifs.length : "no"} new notifications
                    {notifs?.length > 0 && (
                        <a href="#">
                            <span className="badge round-pill bg-primary p-2 ms-2" onClick={handleDeleteAll}>
                                Delete All
                            </span>
                        </a>
                    )}
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>

                {notifs.length === 0 ? (
                    <li className="notification-item">
                        <div className='d-flex flex-column align-items-center'>
                            <img src={Nothing} alt="No Notifications" className='img-fluid w-50' />
                            <span className='ms-2'>Waiting...</span>
                        </div>
                    </li>
                ) : (
                    filteredNotifs.map((notif) => (
                        <React.Fragment key={notif._id}>
                            <li className="notification-item">
                                <i className="bi bi-exclamation-circle text-warning"></i>
                                <div>
                                    <h6>
                                        <div className='d-flex justify-content-between align-items-baseline'>
                                            {notif.senderName}
                                            <i
                                                className='bi bi-trash text-danger fs-6 pointer'
                                                onClick={() => handleDelete(notif._id)}
                                            />
                                        </div>
                                    </h6>
                                    <p>{notif.notification}</p>
                                    <p>{format(notif.createdAt)}</p>
                                </div>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                        </React.Fragment>
                    ))
                )}
            </ul>
        </li>
    );
};

export default Notification;