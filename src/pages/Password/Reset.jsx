import React, { useState } from 'react'
import image from '../../imgs/log-in.png';
import Toast from 'react-bootstrap/Toast';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { forgotPass } from '../../actions/AuthAction';

const Reset = () => {
  const [showToast, setShowToast] = useState(false);
  const [data, setData] = useState({ password: '', confirmPassword: '' });
  const [confirmPass, setConfirmPass] = useState(true);
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

  const resetForm = () => {
    setConfirmPass(true);
    setData({ password: '', confirmPassword: '' });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedPassword = {
      password: data.password
    };
    if (data.password === data.confirmPassword) {
      dispatch(forgotPass(id, token, updatedPassword));
      handleToast();
      resetForm();
      navigate('/auth');
    } else {
      setConfirmPass(false);
    }
  }

  return (
    <section className='vh-100'>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='app-name mx-2 mt-2 d-flex justify-content-between'>
          <h3>Tinking<span>Tin</span></h3>
          {showToast && (
            <div className='toast-animation show'>
              <Toast className='position-absolute top-0 start-50 translate-middle-x m-2'>
                <Toast.Header closeButton={false}>
                  <strong className="me-auto">TinkingTin</strong>
                </Toast.Header>
                <Toast.Body>
                  <i className='bi bi-check-circle-fill me-2 text-primary'></i>
                  Password reset succesful.
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
                <h3 className='title mb-3'>Reset Password</h3>
                <p className='subtitle mb-4 text-muted'>
                  Please provide you new password
                </p>

                {/* New Password Input Field */}
                <div className='form-outline mb-3'>
                  <label for="typePasswordX-2" className='form-label d-flex input_label'>New Password</label>
                  <input
                    type="password"
                    className='form-control'
                    placeholder='New Password'
                    name='password'
                    onChange={handleChange}
                    value={data.password} />
                </div>

                {/* Confirm New Password Input Field */}
                <div className='form-outline mb-3'>
                  <label for="typePasswordX-2" className='form-label d-flex input_label'>Confirm New Password</label>
                  <input
                    type="password"
                    id='typePasswordX-2'
                    className='form-control'
                    placeholder='Confirm New Password'
                    name='confirmPassword'
                    onChange={handleChange}
                    value={data.confirmPassword} />
                </div>

                {!confirmPass && (
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