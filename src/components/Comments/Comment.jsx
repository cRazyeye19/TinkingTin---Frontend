import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import '../Edit Ticket/edit.css'
import Reply from '../Reply/Reply'
import { useDispatch, useSelector } from 'react-redux'
import { addReply, deleteComment, updateComment } from '../../actions/CommentAction'

const Comment = ({ comment }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [showReply, setShowReply] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedComment, setSelectedComment] = useState(comment?.comment)
  const [updatedComment, setUpdatedComment] = useState(comment)
  const [reply, setReply] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setUpdatedComment(comment)
  }, [comment])

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReply = {
      commentId: comment._id,
      username: comment.username,
      reply: reply
    }
    dispatch(addReply(comment._id, newReply))
    setReply('')
    setShowReply(false)
    setUpdatedComment((comment) => ({
      ...comment,
      replies: [...comment.replies, newReply],
    }));
  }

  const handleEdited = (e) => {
    e.preventDefault();
    let newUpdatedComment = {
      comment: selectedComment,
    }
    console.log(newUpdatedComment)
    dispatch(updateComment(comment._id, newUpdatedComment))
    setIsEditing(false);
  }

  const handleReply = () => {
    setShowReply(!showReply)
  }

  const handleEditComment = () => {
    setIsEditing(prev => !prev);
  }


  const handleDeleteComment = () => {
    try {
      dispatch(deleteComment(comment._id))
      setUpdatedComment(null)
    } catch (error) {
      console.log(error)
    }
  }

  if(!updatedComment) return null

  return (
    <>
      <article className='p-4 rounded-3 lh-1 bg-white'>
        <footer className='mb-2 mt-3'>
          <div className='d-flex align-items-center justify-content-between'>
            <p className='d-inline-flex me-3 align-items-center edit_label'>{comment?.username}</p>
            <p className=' text-secondary date_span'>{format(comment?.createdAt)}</p>
          </div>
          {isEditing ? (
            <div className='d-flex align-items-baseline justify-content-between'>
              <input
                className='form-control form-control-sm'
                type="text"
                value={selectedComment}
                onChange={(e) => setSelectedComment(e.target.value)}
              />
              <div className='d-flex justify-content-end'>
                <span className='me-2 reply_settings text-success fw-bold ms-1' onClick={handleEdited}>Save</span>
                <span className='reply_settings text-secondary fw-bold ' onClick={() => setIsEditing(false)}>Cancel</span>
              </div>
            </div>
          ) : (
            <div className='d-flex align-items-baseline justify-content-between'>
              <p className='fw-semibold mb-0 ms-2'>{comment?.comment}</p>
              {user?.username === comment?.username && (
                <div className='mt-2 d-flex justify-content-end'>
                  <span className='me-2 reply_settings text-primary fw-bold ' onClick={handleEditComment}>Edit</span>
                  <span className='reply_settings text-danger fw-bold ' onClick={handleDeleteComment}>Delete</span>
                </div>
              )}
            </div>
          )}
        </footer>
        <div className='d-flex flex-column flex-md-row align-items-baseline mt-2'>
          <button className='btn btn-sm me-md-2 mb-2 mb-md-0 rounded-3' onClick={handleReply}>
            <i className='bi bi-reply-fill reply_settings text-secondary'></i>
            <span className='ms-1 reply_settings text-secondary fw-bold'>Reply</span>
          </button>
          {showReply &&
            <form onSubmit={handleSubmit} className='d-flex flex-grow-1'>
              <input
                type="text"
                value={reply}
                className='form-control form-control-sm rounded-2 me-md-2 ms-2' 
                onChange={(e) => setReply(e.target.value)}
                placeholder='Reply...'
                title='Type your reply'
              />
              <button className='btn btn-primary btn-sm me-md-2 mb-2 mb-md-0 rounded-3'>Reply</button>
            </form>
          }
        </div>
        {updatedComment?.replies?.length > 0 &&
          updatedComment?.replies?.map((reply) => {
            return <Reply key={reply?._id} reply={reply} />;
          })}
      </article >
    </>
  )
}

export default Comment