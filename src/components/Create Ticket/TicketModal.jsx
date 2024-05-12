import './ticket.css';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadSpinners from '../LoadSpinners/LoadSpinners';
import { createTicket } from '../../actions/TicketAction';

function TicketModal({ showTicket, setShowTicket }) {
    const loading = useSelector((state) => state.ticketReducer.uploading);
    const { user } = useSelector((state) => state.authReducer.authData)
    const [ticketPrio, setTicketPrio] = useState(null);
    const [ticketDept, setTicketDept] = useState(null);
    const [ticketIssue, setTicketIssue] = useState(null);
    const [showError, setShowError] = useState(false);
    const description = useRef();
    const dispatch = useDispatch();

    const prio = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
    ]

    const deptlist = [
        { label: 'IT', value: 'IT (Information Technology)' },
        { label: 'Library', value: 'Library' },
        { label: 'Accounting', value: 'Finance' },
        { label: 'Maintenance', value: 'Maintenance' },
        { label: 'Security', value: 'Security' },
    ]

    const issueList = [
        { label: 'Bug', value: 'Bug' },
        { label: 'Maintenance', value: 'Maintenance' },
        { label: 'Finance', value: 'Finance' },
        { label: 'Missing', value: 'Missing' },
    ]


    const reset = () => {
        setTicketIssue(null);
        description.current.value = '';
        setTicketPrio(null);
        setTicketDept(null);
        setShowError(false);
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            ticketIssue === '' ||
            description.current.value === '' ||
            ticketPrio === null ||
            ticketDept === null
        ) {
            setShowError(true);
            return;
        }

        const newTicket = {
            userId: user._id,
            userfirstname: user.firstname,
            userlastname: user.lastname,
            issue: ticketIssue.value,
            description: description.current.value,
            priority: ticketPrio.value,
            department: ticketDept.value
        }
        console.log(newTicket);
        dispatch(createTicket(newTicket));
        reset();
    }

    return (
        <>
            <Modal
                show={showTicket}
                onHide={() => setShowTicket(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span className='title'>Create <span className='title-2'>Ticket</span></span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className='form-label d-flex input_label'>Issue</label>
                    <Select
                        className="basic-single input_label"
                        classNamePrefix="select"
                        name="issue"
                        options={issueList}
                        value={ticketIssue}
                        onChange={(selectedIssue) => {
                            console.log(selectedIssue);
                            setTicketIssue(selectedIssue);
                        }}
                        required
                    />
                    <span className={`input_label-2 ${showError ? 'error-text' : ''}`}>{showError ? '*This field is required!' : 'Type of Issue'}</span>
                    <hr />

                    <label className='form-label d-flex input_label'>Description</label>
                    <ReactQuill
                        theme="snow"
                        ref={description}
                        required
                    />
                    <span className={`input_label-2 ${showError ? 'error-text' : ''}`}>{showError ? '*This field is required!' : 'Concisely summarize the issue in one or two sentences.'}</span>

                    <hr />

                    <label className='form-label d-flex input_label'>Department</label>
                    <>
                        <Select
                            className="basic-single input_label"
                            classNamePrefix="select"
                            name="department"
                            options={deptlist}
                            value={ticketDept}
                            onChange={(selectedDepartment) => {
                                console.log(selectedDepartment);
                                setTicketDept(selectedDepartment);
                            }}
                            required
                        />
                    </>
                    <span className={`input_label-2 ${showError ? 'error-text' : ''}`}>{showError ? '*This field is required!' : 'Department involved in the issue.'}</span>

                    <hr />

                    <label className='form-label d-flex input_label'>Priority</label>
                    <>
                        <Select
                            className="basic-single input_label"
                            classNamePrefix="select"
                            name="priority"
                            options={prio}
                            value={ticketPrio}
                            onChange={(selectedPriority) => {
                                console.log(selectedPriority);
                                setTicketPrio(selectedPriority);
                            }}
                            required
                        />
                    </>
                    <span className={`input_label-2 ${showError ? 'error-text' : ''}`}>{showError ? '*This field is required!' : 'Priority in relation to the issue.'}</span>

                    <br />

                    <div className='d-flex align-items-center justify-content-end'>
                        {loading ? <LoadSpinners /> :
                            <button className='btn btn-sm btn-primary mx-3' onClick={handleSubmit}>Create Ticket</button>
                        }
                        <button className='btn btn-sm btn-secondary' onClick={() => setShowTicket(false)}>Cancel</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default TicketModal;