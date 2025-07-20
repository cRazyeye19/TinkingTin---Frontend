import { format } from 'timeago.js';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllNotifs, deleteNotif, getNotifs, toggleReadNotif } from '../../actions/NotifAction';
import Nothing from '../../imgs/stopwatch.png';

const Notification = ({ socket }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);

    useEffect(() => {
        socket?.on('getNotification', (data) => {
            dispatch({ type: "ADD_NOTIFICATION", data: data });
        });
        return () => {
            socket?.off('getNotification');
        };
    }, [socket, dispatch]);

    useEffect(() => {
        dispatch(getNotifs());
    }, [dispatch]);

    const { notifs, loading, error } = useSelector((state) => state.notifReducer);

    const handleDeleteAll = () => {
        try {
            dispatch(deleteAllNotifs());
        } catch (error) {
            console.error("Error deleting notification:", error);
            alert("Failed to delete notification. Please try again.");
        }
    };

    const handleDelete = (id) => {
        try {
            dispatch(deleteNotif(id));
        } catch (error) {
            console.error("Error deleting all notifications:", error);
            alert("Failed to delete all notifications. Please try again.");
        }
    };

    const handleToggleRead = (id, currentReadStatus) => {
        try {
            dispatch(toggleReadNotif(id, currentReadStatus));
        } catch (error) {
            console.error("Error toggling read status:", error);
            alert("Failed to update notification status. Please try again.");
        }
    };

    const filteredNotifs = notifs.filter(
        notif => notif.receiverFirstName === user.firstname && notif.receiverLastName === user.lastname
    );

    return (
        <li className="nav-item dropdown">
            <button className="nav-link nav-icon" data-bs-toggle="dropdown">
                <i className="bi bi-bell"></i>
                {filteredNotifs?.length > 0 && (
                    <span className="badge bg-primary badge-number">{filteredNotifs.length}</span>
                )}
            </button>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                    You have {filteredNotifs?.length > 0 ? filteredNotifs.length : "no"} new notifications
                    {filteredNotifs?.length > 0 && (
                        <button className="btn btn-sm btn-primary ms-2" onClick={handleDeleteAll}>
                            Delete All
                        </button>
                    )}
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>

                {loading ? (
                    <li className="notification-item">
                        <div className='d-flex flex-column align-items-center'>
                            <span className='ms-2'>Loading notifications...</span>
                        </div>
                    </li>
                ) : error ? (
                    <li className="notification-item">
                        <div className='d-flex flex-column align-items-center'>
                            <span className='ms-2 text-danger'>Error: {error}</span>
                        </div>
                    </li>
                ) : filteredNotifs.length === 0 ? (
                    <li className="notification-item">
                        <div className='d-flex flex-column align-items-center'>
                            <img src={Nothing} alt="No Notifications" className='img-fluid w-50' />
                            <span className='ms-2'>No new notifications</span>
                        </div>
                    </li>
                ) : (
                    filteredNotifs.map((notif) => (
                        <React.Fragment key={notif._id}>
                            <li className={`notification-item ${notif.read ? 'read' : 'unread'}`}>
                                <i className="bi bi-exclamation-circle text-warning"></i>
                                <div>
                                    <h6>
                                        <div className='d-flex justify-content-between align-items-baseline'>
                                            {notif.senderName}
                                            <div className='d-flex align-items-center'>
                                                <i
                                                    className={`bi ${notif.read ? 'bi-envelope-open' : 'bi-envelope'} text-info fs-6 pointer me-2`}
                                                    onClick={() => handleToggleRead(notif._id, notif.read)}
                                                />
                                                <i
                                                    className='bi bi-trash text-danger fs-6 pointer'
                                                    onClick={() => handleDelete(notif._id)}
                                                />
                                            </div>
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