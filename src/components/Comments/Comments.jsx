import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment';
import { getAllComments } from '../../actions/CommentAction';

const Comments = ({ ticketId }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

  let { tickets } = useSelector((state) => state.ticketReducer)
  const ticket = tickets.find((ticket) => ticket._id === ticketId);
  let { comments } = useSelector((state) => state.commentReducer);

  comments = comments.filter((comments) => comments.ticketId === ticket._id)

  return (
    <>
      <div className='d-flex flex-column'>
        {comments.map((comment, id) => (
          <Comment key={id} comment={comment} />
        ))}
      </div>
    </>
  )
}

export default Comments