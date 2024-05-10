import React, { useState } from 'react'
import './reply.css'
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'timeago.js'
import { deleteReply, editReply } from '../../actions/CommentAction';

const Reply = ({ reply }) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [editedReply, setEditedReply] = useState(reply?.reply);
    const dispatch = useDispatch();

    const handleEditClick = () => {
        setIsEditing(prev => !prev);
    };

    const handleDeleteClick = () => {
        try {
            dispatch(deleteReply(reply.commentId, reply._id))
            setIsDeleted(true)
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleSaveClick = (e) => {
        e.preventDefault();
        let updatedReply = {
            reply: editedReply
        }
        console.log(updatedReply)
        dispatch(editReply(reply.commentId, reply._id, updatedReply))
        setIsEditing(false);
    };

    if(isDeleted) return null

    return (
        <footer className='mb-2 mt-3 ms-5'>
            <div className='d-flex align-items-center justify-content-between'>
                <p className='d-inline-flex me-3 align-items-center edit_label'>{reply?.username}</p>
                <p className='text-secondary date_span'>{format(reply?.createdAt)}</p>
            </div>
            {isEditing ? (
                <div className='d-flex align-items-baseline justify-content-between'>
                    <input
                        className='form-control form-control-sm'
                        type="text"
                        value={editedReply}
                        onChange={(e) => setEditedReply(e.target.value)}
                    />
                    <div className='d-flex justify-content-end'>
                        <span className='me-2 reply_settings text-success fw-bold ms-1' onClick={handleSaveClick}>Save</span>
                        <span className='reply_settings text-secondary fw-bold ' onClick={() => setIsEditing(false)}>Cancel</span>
                    </div>
                </div>
            ) : (
                <div className='d-flex align-items-baseline justify-content-between'>
                    <p className='fw-semibold mb-0 ms-2'>{reply?.reply}</p>
                    {user?.username === reply?.username && (
                        <div className='mt-2 d-flex justify-content-end'>
                            <span className='me-2 reply_settings text-primary fw-bold ' onClick={handleEditClick}>Edit</span>
                            <span className='reply_settings text-danger fw-bold ' onClick={handleDeleteClick}>Delete</span>
                        </div>
                    )}
                </div>
            )}
        </footer>
    );
}

export default Reply