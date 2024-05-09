import React, { useEffect, useState } from 'react'
import image from '../../imgs/log-in.png';
import { Link } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { resetPass } from '../../actions/AuthAction';
import { getAllUsers } from '../../actions/UserAction';

const Forgot = () => {
    const [showToast, setShowToast] = useState(false);
    const [existsToast, setExistsToast] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [data, setData] = useState({ username: '' });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const { users } = useSelector((state) => state.userReducer);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const existingUsername = users.find((user) => user.username === data.username);

        setSubmit(true);
        if (!data.username) {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000);
            return;
        }

        if (!existingUsername) {
            setExistsToast(true);
            setTimeout(() => {
                setExistsToast(false);
            }, 2000);
            return;
        }
        let userData = { username: data.username };
        dispatch(resetPass(userData));
    }

    return (
        <section className='vh-100'>
            <div className='d-flex align-items-center justify-content-between'>
                <div className='app-name mx-2 mt-2 d-flex justify-content-between'>
                    <h3>Tinking<span>Tin</span></h3>
                    {(showToast && submit && (!data.username)) && (
                        <div className='toast-animation show'>
                            <Toast className='position-absolute top-0 start-50 translate-middle-x m-2'>
                                <Toast.Header closeButton={false}>
                                    <strong className="me-auto">TinkingTin</strong>
                                </Toast.Header>
                                <Toast.Body>
                                    <i className='bi bi-exclamation-circle-fill me-2 text-danger'></i>
                                    Please provide an email address.
                                </Toast.Body>
                            </Toast>
                        </div>
                    )}
                    {(existsToast && submit) && (
                        <div className='toast-animation show'>
                            <Toast className='position-absolute top-0 start-50 translate-middle-x m-2'>
                                <Toast.Header closeButton={false}>
                                    <strong className="me-auto">TinkingTin</strong>
                                </Toast.Header>
                                <Toast.Body>
                                    <i className='bi bi-exclamation-circle-fill me-2 text-danger'></i>
                                    Provided email address does not exist.
                                </Toast.Body>
                            </Toast>
                        </div>
                    )}
                </div>
            </div>
            <div className='container py-5 h-100'>
                <div className='row d-flex justify-content-center align-items-center h-100'>
                    <div className='col-md-6 mb-5'>
                        <img src={image} alt='' className='img-fluid' />
                    </div>
                    <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                        <div className='card shadow-2-strong rounded-4'>
                            <form onSubmit={handleSubmit} className='card-body p-5 text-center'>
                                <h3 className='title mb-3'>Forgot Password</h3>
                                <p className='subtitle mb-4 text-muted'>
                                    To reset your password, please provide your email address.
                                </p>

                                {/* Email Input Field */}
                                <div className='form-outline mb-3'>
                                    <label for="typeEmailX-2" className='form-label d-flex input_label'>Email Address</label>
                                    <input
                                        type="email"
                                        className='form-control'
                                        placeholder='name@cit.edu'
                                        name='username'
                                        onChange={handleChange}
                                        value={data.username}
                                    />
                                </div>

                                <Link to='/auth' className='forgot-pass mb-3 d-flex flex-row-reverse fw-medium'>Back to Login</Link>

                                {/* Submit Button */}
                                <button className='sign-in_btn shadow-sm' type='submit'>
                                    <i className='bi bi-box-arrow-in-right m-2'></i>
                                    <span>Send Reset Link</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Forgot