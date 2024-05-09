import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import ModalTitle from 'react-bootstrap/esm/ModalTitle'
import ModalBody from 'react-bootstrap/esm/ModalBody'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import './edit.css'
import { Link } from 'react-router-dom'
import { updateAssignee } from '../../actions/UserAction'

const DeptEdit = ({ userId, showEditModal, setShowEditModal }) => {

  const { users } = useSelector(state => state.userReducer);
  const user = users.find(user => user._id === userId)
  console.log(user)

  const [userRole, setUserRole] = useState(user?.role || "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setUserRole(user.role);
    }
  }, [user]);

  const roleList = [
    { value: "User", label: "User" },
    { value: "Faculty", label: "Faculty" },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedUser = {
      role: userRole?.value
    }
    console.log(updatedUser)
    dispatch(updateAssignee(user._id, updatedUser));
    setShowEditModal(false);
  }

  return (
    <>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <ModalHeader closeButton>
          <ModalTitle>
            <span className='title'>User <span className='title-2'>Details</span></span>
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className='row'>
            <div className='col'>
              <label className='form-label d-flex input_label'>First Name</label>
              <input title="First Name" type="text" className='form-control edit_field' name='firstname' value={user?.firstname} disabled />

              <div className='mt-3' />

              <label className='form-label d-flex input_label'>Email Address</label>
              <input title="Email Address" type="text" className='form-control edit_field' name='username' value={user?.username} disabled />
            </div>
            <div className='col'>
              <label className='form-label d-flex input_label'>Last Name</label>
              <input title="Last Name" type="text" className='form-control edit_field' name='lastname' value={user?.lastname} disabled />

              <div className='mt-3' />

              <label className='form-label d-flex input_label'>Role</label>
              <Select
                className='basic-single edit_label'
                classNamePrefix='select'
                name='role'
                options={roleList}
                value={userRole}
                placeholder={userRole}
                onChange={(selectedRole) => {
                  console.log(selectedRole)
                  setUserRole(selectedRole);
                }}
                required
              />
            </div>
          </div>
          <div className='row'>
            <div className='d-flex justify-content-end align-items-center mt-4'>
              <Link to="/manage/assign">
                <button className='btn btn-sm rounded-3 btn-primary' onClick={handleSubmit}>Save Changes</button>
                <button className='btn btn-sm rounded-3 btn-secondary ms-2' onClick={() => setShowEditModal(false)}>Cancel</button>
              </Link>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default DeptEdit