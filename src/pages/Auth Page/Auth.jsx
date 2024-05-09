import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './auth.css'
import { logIn, signUp } from '../../actions/AuthAction';
import image from '../../imgs/business.png';
import Toast from 'react-bootstrap/Toast';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../actions/UserAction';

const Auth = () => {

  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState({ firstname: '', lastname: '', username: '', password: '', confirmPassword: '' });
  const loading = useSelector((state) => state.authReducer.loading);
  const [confirmPass, setConfirmPass] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [existsToast, setExistsToast] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSignUp) {
      dispatch(getAllUsers());
    }
  }, [isSignUp, dispatch]);

  const { users } = useSelector((state) => state.userReducer);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUsername = users.find((user) => user.username === data.username);

    setSubmit(true);
    if (!data.username || !data.password || (isSignUp && (!data.firstname || !data.lastname || !data.confirmPassword))) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return;
    }

    if (isSignUp && existingUsername) {
      setExistsToast(true);
      setTimeout(() => {
        setExistsToast(false);
      }, 2000);
      return;
    }

    if (isSignUp) {
      data.password !== data.confirmPassword ? setConfirmPass(true) : dispatch(signUp(data));
    } else {
      dispatch(logIn(data));
    }
  }

  const resetForm = () => {
    setConfirmPass(false);
    setData({ firstname: '', lastname: '', username: '', password: '', confirmPassword: '' });
  }

  return (
    <section className='vh-100'>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='app-name mx-2 mt-2 d-flex justify-content-between'>
          <h3>Tinking<span>Tin</span></h3>
          {(showToast && submit && (!data.username || !data.password || (isSignUp && (!data.firstname || !data.lastname || !data.confirmPassword)))) && (
            <div className='toast-animation show'>
              <Toast className='position-absolute top-0 start-50 translate-middle-x m-2'>
                <Toast.Header closeButton={false}>
                  <strong className="me-auto">TinkingTin</strong>
                </Toast.Header>
                <Toast.Body>
                  <i className='bi bi-exclamation-circle-fill me-2 text-danger'></i>
                  Please provide all required information.
                </Toast.Body>
              </Toast>
            </div>
          )}
          {(existsToast && submit && isSignUp) && (
            <div className='toast-animation show'>
              <Toast className='position-absolute top-0 start-50 translate-middle-x m-2'>
                <Toast.Header closeButton={false}>
                  <strong className="me-auto">TinkingTin</strong>
                </Toast.Header>
                <Toast.Body>
                  <i className='bi bi-exclamation-circle-fill me-2 text-danger'></i>
                  User already exists. Please try again.
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
                <h3 className='title mb-3'>{isSignUp ? "Create your Account" : "Welcome Back"}</h3>
                <p className='subtitle mb-4 text-muted'>
                  {isSignUp ? "To join our amazing community, first create your account." : "To get started with TinkingTin, just login your account and enjoy the experience."}
                </p>

                {/* First Name && Last Name Input Field */}
                {isSignUp && (
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-outline">
                        <label className='form-label d-flex input_label' for="form3Example1">First Name</label>
                        <input type="text" id="form3Example1" className='form-control' placeholder='John Lester' name='firstname' onChange={handleChange} value={data.firstname} />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className='form-outline'>
                        <label className='form-label d-flex input_label' for="form3Example2">Last Name</label>
                        <input type="text" id="form3Example2" className='form-control' placeholder='Pansoy' name='lastname' onChange={handleChange} value={data.lastname} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Email Input Field */}
                <div className='form-outline mb-3'>
                  <label for="typeEmailX-2" className='form-label d-flex input_label'>Email Address</label>
                  <input type="email" className='form-control' placeholder='name@cit.edu' name='username' onChange={handleChange} value={data.username} />
                </div>

                {/* Password Input Field */}
                <div className='form-outline mb-3'>
                  <label for="typePasswordX-2" className='form-label d-flex input_label'>Password</label>
                  <input type="password" className='form-control' placeholder='Password' name='password' onChange={handleChange} value={data.password} />
                </div>

                {!isSignUp && (
                  <Link to='/forgot-password' className='forgot-pass mb-3 d-flex flex-row-reverse fw-medium'>Forgot Password?</Link>
                )}

                {/* Confirm Password Input Field */}
                {isSignUp && (
                  <div className='form-outline mb-3'>
                    <label for="typePasswordX-2" className='form-label d-flex input_label'>Confirm Password</label>
                    <input type="password" id='typePasswordX-2' className='form-control' placeholder='Confirm Password' name='confirmPassword' onChange={handleChange} value={data.confirmPassword} />
                  </div>
                )}

                {confirmPass && (
                  <span className='subtitle mb-4 text-danger d-flex fw-medium'>*Passwords do not match</span>
                )}

                {/* Submit Button */}
                <button className='sign-in_btn shadow-sm' type='submit'>
                  <i className='bi bi-box-arrow-in-right m-2'></i>
                  <span>{loading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}</span>
                </button>

                <hr />

                {/* Forgot Password && Create Account */}
                <div className="d-flex flex-row mt-2 justify-content-around">
                  {isSignUp ?
                    <p className='p'>Already have an account? <span className='span' onClick={() => { setIsSignUp((prev) => !prev); resetForm() }}>Login</span></p>
                    : <p className='p'>Don't have an account? <span className='span' onClick={() => { setIsSignUp((prev) => !prev); resetForm() }}>Sign Up</span></p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Auth