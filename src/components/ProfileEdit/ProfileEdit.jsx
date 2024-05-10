import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import ModalTitle from 'react-bootstrap/esm/ModalTitle'
import ModalBody from 'react-bootstrap/esm/ModalBody'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage } from '../../actions/UploadAction'
import { updateUser } from '../../actions/UserAction'

function ProfileEdit({ editProfile, setEditProfile, data }) {

    const { password, ...other } = data;
    const [formData, setFormData] = useState(other);
    const [profileImage, setProfileImage] = useState(null);
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            if (event.target.name === 'profileImage') {
                setProfileImage(img);
            }
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        let UserData = formData
        if (profileImage) {
            const data = new FormData()
            const filename = Date.now() + profileImage.name
            data.append("name", filename)
            data.append("file", profileImage)
            UserData.profilePicture = filename
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }
        }
        dispatch(updateUser(user._id, UserData))
        setEditProfile(false)
    }

    return (
        <Modal show={editProfile} onHide={() => setEditProfile(false)}>
            <ModalHeader closeButton>
                <ModalTitle>
                    <span className='title'>Personal <span className='title-2'>Info</span></span>
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div className='row'>
                    <div className='col'>
                        <label className='form-label d-flex input_label'>First Name</label>
                        <input
                            title="First Name"
                            type="text"
                            className='form-control edit_field'
                            name='firstname'
                            onChange={handleChange} value={formData.firstname}
                        />

                        <div className='mt-3' />

                        {user.role !== "Department" && (
                            <>
                                <label className='form-label d-flex input_label'>Occupation</label>
                                <input
                                    title="Occupation"
                                    type="text"
                                    className='form-control edit_field'
                                    name='job'
                                    onChange={handleChange} value={formData.job}
                                />
                            </>
                        )}

                        <div className='mt-3' />

                        {user.role === "Department" || user.role === "Faculty" ? (
                            <div>
                                <label className='form-label d-flex input_label'>School ID</label>
                                <input
                                    title="School ID"
                                    type="text"
                                    className='form-control edit_field'
                                    name='schoolId'
                                    onChange={handleChange}
                                    value={formData.schoolId}
                                />
                            </div>
                        ) : null}

                    </div>
                    <div className='col'>
                        <label className='form-label d-flex input_label'>Last Name</label>
                        <input
                            title="Last Name"
                            type="text"
                            className='form-control edit_field'
                            name='lastname'
                            onChange={handleChange} value={formData.lastname}
                        />

                        <div className='mt-3' />

                        {user.role !== "Department" && (
                            <>
                                <label className='form-label d-flex input_label'>Role</label>
                                <input
                                    title="Role"
                                    type="text"
                                    className='form-control edit_field'
                                    name='role'
                                    onChange={handleChange} value={formData.role}
                                />
                            </>
                        )}


                        {(user.role === "Department" || user.role === "Faculty") && (
                            <>
                                <div className='mt-3' />
                                <label className='form-label d-flex input_label'>Department</label>
                                <input
                                    title="Department"
                                    type="text"
                                    className='form-control edit_field'
                                    name='department'
                                    onChange={handleChange}
                                    value={formData.department}
                                    disabled={user.role === "Department" || user.role === "Faculty"}
                                />
                            </>
                        )}
                    </div>
                </div>

                {user.role !== "Department" && user.role !== "Faculty" && (
                    <>
                        <label className='form-label d-flex input_label'>School ID</label>
                        <input
                            title="School ID"
                            type="text"
                            className='form-control edit_field'
                            name='schoolId'
                            onChange={handleChange}
                            value={formData.schoolId}
                        />
                    </>
                )}

                <div className='mt-3' />

                <label className='form-label d-flex input_label'>Profile Picture</label>
                <input
                    type="file"
                    className='form-control edit_field'
                    name='profileImage'
                    onChange={onImageChange}
                />

                <div className='mt-3' />

                <div className='d-flex justify-content-end'>
                    <button className='btn btn-sm btn-primary' onClick={handleSubmit}>Save Changes</button>
                    <button className='btn btn-sm btn-secondary ms-2' onClick={() => setEditProfile(false)}>Cancel</button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ProfileEdit