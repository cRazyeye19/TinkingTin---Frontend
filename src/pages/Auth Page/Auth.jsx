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
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
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

  const togglePassword = () => {
    setShowPassword(!showPassword);
  }

  const toggleConfirmPassword = () => {
    setShowConfirmPass(!showConfirmPass);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(data).some((value) => value === '');
    const buttonClicked = e.nativeEvent.submitter;
    const buttonType = buttonClicked.getAttribute('type');

    if (!isSignUp) {
      const { username, password } = data;
      const isBlank = username === '' || password === '';
      if (isBlank && buttonType === 'submit') {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
        return
      }
    } else if (isEmpty && buttonType === 'submit') {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return
    }

    const existingUsername = users.find((user) => user.username === data.username);

    if (isSignUp && existingUsername && buttonType === 'submit') {
      setExistsToast(true);
      setTimeout(() => {
        setExistsToast(false);
      }, 2000);
      return
    }

    if (isSignUp) {
      data.password !== data.confirmPassword && buttonType === 'submit' ? setConfirmPass(true) : dispatch(signUp(data));
    } else if (!isSignUp && buttonType === 'submit') {
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
          <div className={showToast ? 'toast-animation show' : 'toast-animation hide'}>
            <Toast className='position-absolute top-0 start-50 translate-middle-x m-2'>
              <Toast.Header closeButton={false}>
                <strong className="me-auto">TinkingTin</strong>
              </Toast.Header>
              <Toast.Body className='text-center'>
                <i className='bi bi-exclamation-circle-fill me-2 text-danger'></i>
                Please provide necessary information.
              </Toast.Body>
            </Toast>
          </div>
          <div className={existsToast ? 'toast-animation show' : 'toast-animation hide'}>
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
                        <label className='form-label d-flex input_label'>First Name</label>
                        <input
                          type="text"
                          className='form-control'
                          placeholder='Jane'
                          name='firstname'
                          onChange={handleChange}
                          value={data.firstname}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className='form-outline'>
                        <label className='form-label d-flex input_label'>Last Name</label>
                        <input
                          type="text"
                          className='form-control'
                          placeholder='Doe'
                          name='lastname'
                          onChange={handleChange}
                          value={data.lastname}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Email Input Field */}
                <div className='form-outline mb-3'>
                  <label className='form-label d-flex input_label'>Email Address</label>
                  <input
                    type="email"
                    className='form-control'
                    placeholder='name@hotmail.com'
                    name='username'
                    onChange={handleChange}
                    value={data.username}
                  />
                </div>

                {/* Password Input Field */}
                <div className='form-outline mb-3'>
                  <label className='form-label d-flex input_label'>Password</label>
                  <div className='input-group'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className='form-control'
                      placeholder='Password'
                      name='password'
                      onChange={handleChange}
                      value={data.password}
                    />
                    <div className='input-group-append'>
                      <button className='input-group-text' onClick={togglePassword}>
                        <i className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                      </button>
                    </div>
                  </div>
                </div>

                {!isSignUp && (
                  <Link to='/forgot-password' className='forgot-pass mb-3 d-flex flex-row-reverse fw-medium'>Forgot Password?</Link>
                )}

                {/* Confirm Password Input Field */}
                {isSignUp && (
                  <div className='form-outline mb-3'>
                    <label className='form-label d-flex input_label'>Confirm Password</label>
                    <div className='input-group'>
                      <input
                        type={showConfirmPass ? 'text' : 'password'}
                        className='form-control'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        onChange={handleChange}
                        value={data.confirmPassword}
                      />
                      <div className='input-group-append'>
                        <button className='input-group-text' onClick={toggleConfirmPassword}>
                          <i className={`bi ${showConfirmPass ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {confirmPass && (
                  <span className='subtitle mb-4 text-danger d-flex fw-medium'>*Passwords do not match</span>
                )}

                {/* Submit Button */}
                <button className='sign-in_btn shadow-sm' type='submit'>
                  <i className='bi bi-box-arrow-in-right m-2'></i>
                  <span>{isSignUp ? "Sign Up" : "Login"}</span>
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