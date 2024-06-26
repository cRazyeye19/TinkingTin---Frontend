import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import ModalTitle from 'react-bootstrap/esm/ModalTitle'
import ModalBody from 'react-bootstrap/esm/ModalBody'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select'
import { format } from 'timeago.js'
import { useDispatch, useSelector } from 'react-redux'
import './edit.css'
import { Link } from 'react-router-dom'
import { updateTicket } from '../../actions/TicketAction'
import { createComment } from '../../actions/CommentAction'
import Comments from '../Comments/Comments'

function FactEdit({ ticketId, showEdit, setShowEdit, socket }) {

  const { user } = useSelector((state) => state.authReducer.authData);
  const userRole = user.role;
  const { users } = useSelector(state => state.userReducer);
  const ticket = useSelector((state) => state.ticketReducer.tickets.find((ticket) => ticket._id === ticketId));

  const assignee = users
    .filter(user => user.role === "Faculty")
    .map(assignee => ({
      label: `${assignee.firstname} ${assignee.lastname}`,
      value: `${assignee.username}`,
    }));

  const [ticketIssue, setTicketIssue] = useState(ticket?.issue || '');
  const [description, setDescription] = useState(ticket?.description || '');
  const [ticketStatus, setTicketStatus] = useState(ticket?.status || '');
  const [ticketAssignee, setTicketAssignee] = useState([]);
  const [ticketPrio, setTicketPrio] = useState(ticket?.priority || '');
  const [timeAllotted, setTimeAllotted] = useState(ticket?.minTime || 0);
  const [totalTime, setTotalTime] = useState(ticket?.maxTime || 0);
  const [error, setError] = useState('');
  const comment = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (ticket && users) {
      setTicketIssue(ticket.issue);
      setDescription(ticket.description);
      setTicketStatus(ticket.status);
      setTicketAssignee(ticket.assignee.map(assigneeName => {
        const user = users.find(user => user.username === assigneeName);
        return {
          label: `${user.firstname} ${user.lastname}`,
          value: assigneeName
        };
      }));
      setTicketPrio(ticket.priority);
      setTimeAllotted(ticket.minTime);
      setTotalTime(ticket.maxTime);
    }
  }, [ticket, users]);

  const issueList = [
    { label: 'Bug', value: 'Bug' },
    { label: 'Maintenance', value: 'Maintenance' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Missing', value: 'Missing' },
  ]

  const prio = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
  ]

  const statusList = [
    { label: 'Open', value: 'Open' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Closed', value: 'Closed' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedTicket = {
      issue: ticketIssue?.value,
      description: description,
      status: ticketStatus?.value,
      assignee: ticketAssignee?.map(assignee => assignee.value),
      priority: ticketPrio?.value,
      minTime: timeAllotted,
      maxTime: totalTime,
    }
    console.log(updatedTicket);
    dispatch(updateTicket(ticket._id, updatedTicket));
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      ticketId: ticket._id,
      username: user.username,
      comment: comment.current.value,
    }
    dispatch(createComment(newComment));
    reset();
  }

  const handleNotification = (type) => {
    socket.emit('sendNotification', {
      senderName: user.username,
      receiverFirstname: ticket.userfirstname,
      receiverLastname: ticket.userlastname,
      type,
    })
  }

  const handleSaveChanges = (e) => {
    handleNotification(1);
    handleSubmit(e);
  }

  const handleComment = (e) => {
    handleNotification(2);
    handleCommentSubmit(e);
  }

  const truncateTicketId = (id, length) => {
    if (id.length <= length) return id;
    return id.substring(0, length);
  };

  const reset = () => {
    comment.current.value = "";
  }

  useEffect(() => {
    if (timeAllotted > totalTime) {
      setError('Time allotted cannot exceed total time');
    } else {
      setError('');
    }
  }, [timeAllotted, totalTime]);

  return (
    <>
      <Modal show={showEdit} onHide={() => setShowEdit(false)} size='xl'>
        <ModalHeader closeButton>
          <ModalTitle>
            <span className='title'>Ticket <span className='title-2'>Details</span></span>
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className='row'>
            <div className='col-md-8'>
              <label className='form-label d-flex edit_label'>Issue</label>
              <Select
                className="basic-single edit_label"
                classNamePrefix="select"
                name="issue"
                options={issueList}
                value={ticketIssue}
                defaultValue={ticketIssue}
                placeholder={ticketIssue}
                onChange={(selectedIssue) => {
                  setTicketIssue(selectedIssue);
                }}
                required
                isDisabled={userRole === 'Admin' || userRole === 'User' ? false : true}
              />

              <hr />

              <label className='form-label d-flex edit_label'>Description</label>
              <ReactQuill
                theme='snow'
                value={description}
                onChange={(value) => setDescription(value)}
                readOnly={userRole === 'Admin' || userRole === 'User' ? false : true}
              >
              </ReactQuill>

              <hr />

              <label className='form-label d-flex edit_label'>Comments</label>
              <>
                <textarea
                  name="comment"
                  rows="3"
                  placeholder='Add a comment...'
                  className='form-control edit_field'
                  maxLength="500"
                  ref={comment}
                  required
                >
                </textarea>
                <div className='d-flex mt-2'>
                  <button className='btn btn-primary btn-sm' onClick={handleComment}>Post Comment</button>
                </div>

                <Comments ticketId={ticketId} />
              </>
            </div>
            <div className='col-md-4'>
              <label className='form-label d-flex edit_label'>Status</label>
              <Select
                className="basic-single edit_label"
                classNamePrefix="select"
                name="status"
                options={statusList}
                value={ticketStatus}
                defaultValue={ticketStatus}
                placeholder={ticketStatus}
                onChange={(selectedStatus) => {
                  setTicketStatus(selectedStatus);
                }}
                required
                isDisabled={userRole === 'Admin' || userRole === 'Department' || userRole === 'Faculty' ? false : true}
              />

              <div className='mt-4' />

              <label className='form-label d-flex edit_label'>Assignee</label>
              <Select
                className="basic-multi-select edit_label"
                isMulti
                classNamePrefix="select"
                name="assignee"
                options={assignee}
                value={ticketAssignee}
                onChange={(selectedAssignee) => {
                  setTicketAssignee(selectedAssignee);
                }}
                required
                isDisabled={userRole === 'Admin' || userRole === 'Department' ? false : true}
              />

              <div className='mt-4' />

              <label className='form-label d-flex edit_label'>Reporter</label>
              <div className='d-flex align-items-center'>
                <span className='text-bg-info edit_status'>{ticket.userfirstname} {ticket.userlastname}</span>
              </div>

              <div className='mt-4' />

              <label className='form-label d-flex edit_label'>Priority</label>
              <Select
                className="basic-single edit_label"
                classNamePrefix="select"
                name="issue"
                options={prio}
                value={ticketPrio}
                onChange={(selectedPriority) => {
                  setTicketPrio(selectedPriority);
                }}
                required
                isDisabled={userRole === 'Admin' || userRole === 'User' || userRole === 'Department' ? false : true}
              />

              <div className='mt-4' />

              <label className='form-label d-flex edit_label ms-1'>Time Tracking</label>
              <input
                type="range"
                className='slide-range'
                id="timeTracking"
                min="0"
                max={totalTime}
                value={timeAllotted}
                onChange={(e) => setTotalTime(e.target.value)}
              />

              <div className='d-flex align-items-center justify-content-between'>
                <span className='date_span'>{timeAllotted}h logged</span>
                <span className='date_span'>{totalTime}h remaining</span>
              </div>

              <div className='mt-4' />

              <div className='d-flex justify-content-between '>
                <label className='form-label d-flex edit_label-time align-items-center'>Time Alloted (Hours)</label>
                <label className='form-label d-flex edit_label-time align-items-center'>Total Time (Hours)</label>
              </div>
              <div className='d-flex justify-content-between'>
                <input
                  type="text"
                  className='form-control edit_field'
                  defaultValue={timeAllotted}
                  value={timeAllotted}
                  onChange={(e) => {
                    const value = e.target.value.trim();
                    setTimeAllotted(value === "" ? 0 : parseInt(value));
                  }}
                />
                <input
                  type="text"
                  defaultValue={totalTime}
                  className='form-control edit_field ms-2'
                  value={totalTime}
                  readOnly
                />
              </div>
              <div className='mt-2'>
                {error && <span className='text-danger error-label'>{error}</span>}
              </div>

              <hr />

              <span className='date_span'>Created at: {format(ticket.createdAt)}</span> <br />
              <span className='date_span'>Updated at: {format(ticket.updatedAt)}</span>
              <div className='d-flex align-items-center'>
                <i className="bi bi-exclamation-octagon ticket_icon"></i>
                <span className='date_span m-1'>Ticket ID: <span className='ticket_id'>{truncateTicketId(ticket._id, 10)}</span></span>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='d-flex justify-content-end align-items-center mt-4'>
              <Link to="/dashboard/user">
                <button className='btn btn-sm rounded-3 btn-primary' onClick={handleSaveChanges}>Save Changes</button>
              </Link>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default FactEdit