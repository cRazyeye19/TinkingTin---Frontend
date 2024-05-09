import React, { useState } from 'react'
import { format } from 'timeago.js'
import '../Edit Ticket/edit.css'
import CardFilter from '../CardFilter/CardFilter'
import Reply from '../Reply/Reply'
import { useDispatch, useSelector } from 'react-redux'
import { addReply } from '../../actions/CommentAction'

const Comment = ({ comment }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [showReply, setShowReply] = useState(false)
  const [reply, setReply] = useState('')
  const dispatch = useDispatch()

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
  }

  const handleReply = () => {
    setShowReply(!showReply)
  }

  return (
    <>
      <article className='p-4 rounded-3 lh-1 bg-white'>
        <footer className='d-flex justify-content-between align-items-baseline'>
          <div className='d-flex align-items-center'>
            <p className='d-inline-flex me-3 align-items-center edit_label'>{comment?.username}</p>
            <p className=' text-secondary date_span'>{format(comment?.createdAt)}</p>
          </div>
          <div className='mb-2'>
            {user?.username === comment?.username && (
              <CardFilter comment={comment} />  
            )}
          </div>
        </footer>
        <p className='fw-semibold mb-0 ms-2'>{comment?.comment}</p>
        <div className='d-flex flex-column flex-md-row align-items-md-center mt-2'>
          <button className='btn btn-sm me-md-2 mb-2 mb-md-0 rounded-3' onClick={handleReply}>
            <i className='bi bi-reply-fill'></i>
            <span className='ms-1'>Reply</span>
          </button>
          {showReply &&
            <form onSubmit={handleSubmit} className='d-flex flex-grow-1'>
              <input
                type="text"
                value={reply}
                className='form-control rounded-2 me-md-2'
                onChange={(e) => setReply(e.target.value)}
                placeholder='Reply...'
                title='Type your reply'
              />
              <button className='btn btn-primary btn-sm me-md-2 mb-2 mb-md-0 rounded-3'>Reply</button>
            </form>
          }
        </div>
        {
          comment.replies.length >= 0 && comment.replies.map((reply) => {
            return <Reply key={reply._id} reply={reply} />
          })
        }
      </article >
    </>
  )
}

export default Comment