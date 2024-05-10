import React, { useState } from 'react'
import image from '../../imgs/log-in.png';
import Toast from 'react-bootstrap/Toast';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { forgotPass } from '../../actions/AuthAction';

const Reset = () => {
  const [showToast, setShowToast] = useState(false);
  const [showConfirmToast, setShowConfirmToast] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);
  const [data, setData] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const { id, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleToast = () => {
    setShowToast((prev) => !prev);
    setTimeout(() => {
      setShowToast((prev) => !prev);
    }, 2000);
  }

  const handleConfirmToast = () => {
    setShowConfirmToast((prev) => !prev);
    setTimeout(() => {
      setShowConfirmToast((prev) => !prev);
      navigate('/auth');
    }, 2000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(data).some((value) => value === '');
    const buttonClicked = e.nativeEvent.submitter;
    const buttonType = buttonClicked.getAttribute('type');

    if (isEmpty && buttonType === 'submit') {
      handleToast();
      return
    } 
    if (data.password !== data.confirmPassword && buttonType === 'submit') {
      setConfirmPass(true);
    } else if (data.password === data.confirmPassword && buttonType === 'submit') {
      let updatedPassword = {
        password: data.password
      };
      dispatch(forgotPass(id, token, updatedPassword));
      handleConfirmToast();
    }
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
                Please provide new password.
              </Toast.Body>
            </Toast>
          </div>
          <div className={showConfirmToast ? 'toast-animation show' : 'toast-animation hide'}>
            <Toast className='position-absolute top-0 start-50 translate-middle-x m-2'>
              <Toast.Header closeButton={false}>
                <strong className="me-auto">TinkingTin</strong>
              </Toast.Header>
              <Toast.Body className='text-center'>
                <i className='bi bi-check-circle-fill me-2 text-primary'></i>
                Reset Password Successful.
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
                <h3 className='title mb-3'>Reset Password</h3>
                <p className='subtitle mb-4 text-muted'>
                  Please enter your new password
                </p>

                {/* New Password Input Field */}
                <div className='form-outline mb-3'>
                  <label className='form-label d-flex input_label'>New Password</label>
                  <div className='input-group'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className='form-control'
                      placeholder='New Password'
                      name='password'
                      onChange={handleChange}
                      value={data.password}
                    />
                    <div className='input-group-append'>
                      <button className='input-group-text' onClick={() => setShowPassword((prev) => !prev)}>
                        <i className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Confirm New Password Input Field */}
                <div className='form-outline mb-3'>
                  <label className='form-label d-flex input_label'>Confirm New Password</label>
                  <div className='input-group'>
                    <input
                      type={showConfirmPass ? 'text' : 'password'}
                      className='form-control'
                      placeholder='Confirm New Password'
                      name='confirmPassword'
                      onChange={handleChange}
                      value={data.confirmPassword}
                    />
                    <div className='input-group-append'>
                      <button className='input-group-text' onClick={() => setShowConfirmPass((prev) => !prev)}>
                        <i className={`bi ${showConfirmPass ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                      </button>
                    </div>
                  </div>
                </div>

                {confirmPass && (
                  <span className='subtitle mb-4 text-danger d-flex fw-medium'>*Passwords do not match</span>
                )}

                {/* Submit Button */}
                <button className='sign-in_btn shadow-sm' type='submit'>
                  <i className='bi bi-lock m-2'></i>
                  <span>Reset Password</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reset