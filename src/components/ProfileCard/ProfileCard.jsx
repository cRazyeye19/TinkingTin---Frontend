import React, { useEffect, useState } from 'react'
import './profile.css'
import { format } from 'timeago.js'
import { useSelector } from 'react-redux'
import * as UserApi from '../../api/UserRequest.js'
import ProfileEdit from '../ProfileEdit/ProfileEdit.jsx'

const ProfileCard = () => {

  const { user } = useSelector((state) => state.authReducer.authData)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const profileUserId = user?._id
  const [profileUser, setProfileUser] = useState({})
  const [editProfile, setEditProfile] = useState(false)

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId) {
        setProfileUser(user)
      } else {
        const profileUser = await UserApi.getUser(profileUserId)
        setProfileUser(profileUser)
      }
    }
    if (user) {
      fetchProfileUser()
    }
  }, [user, profileUserId])


  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className='d-flex align-items-center justify-content-between'>
            <h5 className="card-title title_design">
              Profile <span>| User</span>
            </h5>
            {user._id === profileUserId ? (
              <i className="bi bi-feather edit_icon" title='Edit Profile' onClick={() => setEditProfile(true)}></i>
            ) : null}
          </div>
          <div className='d-flex align-items-center justify-content-center'>
            <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "default_propic.jpg"} alt="" className='profile_img border border-3' title='Profile Picture' />
          </div>

          <br />

          <h2 className='d-flex align-items-center justify-content-center user_name'>{profileUser.firstname} {profileUser.lastname}</h2>

          <hr />

          <span className='fw-bold info_detail'>Profile Information</span>
          <div className='d-flex flex-column mt-3'>
            <p title={profileUser.username} className='info_detail'>Email: <span className='text-primary user_detail'>{profileUser.username}</span></p>
            {user.role === "Department" ?
              <p title={profileUser.department} className='info_detail'>Department: <span className='text-primary user_detail'>{profileUser.department}</span></p> :
              <p title={profileUser.role} className='info_detail'>Role: <span className='text-primary user_detail'>{profileUser.role}</span></p>}
            <p title={profileUser.createdAt} className='info_detail'>Joined: <span className='text-primary user_detail'>{format(profileUser.createdAt)}</span></p>
          </div>

          <hr />

          <span className='fw-bold info_detail'>Other Information</span>
          <div className='d-flex flex-column mt-3'>
            <p title={profileUser.schoolId} className='info_detail'>School ID: <span className='text-primary user_detail'>{profileUser.schoolId}</span></p>
            {user.role === "Department" ? null :
              <p title={profileUser.job} className='info_detail'>Occupation: <span className='text-primary user_detail'>{profileUser.job}</span></p>
            }
          </div>
        </div>
      </div>
      <ProfileEdit editProfile={editProfile} setEditProfile={setEditProfile} data={user} />
    </>
  )
}

export default ProfileCard