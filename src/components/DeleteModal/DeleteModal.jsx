import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import ModalTitle from 'react-bootstrap/esm/ModalTitle'
import ModalBody from 'react-bootstrap/esm/ModalBody'
import ModalFooter from 'react-bootstrap/esm/ModalFooter'
import { deleteTicket } from '../../actions/TicketAction'
import { useDispatch } from 'react-redux'

function DeleteModal({ ticketId, showModal, setShowModal }) {
    const dispatch = useDispatch();
    console.log(ticketId)

    const handleDelete = () => {
        try {
            dispatch(deleteTicket(ticketId));
            console.log(deleteTicket);
        } catch (error) {
            console.error("Error deleting ticket:", error);
        }
        setShowModal(false);
    };

    return (
        <div>
            <Modal show={showModal} size='sm' onHide={() => setShowModal(false)} className='d-flex justify-content-center align-items-center'>
                <ModalHeader>
                    <ModalTitle>
                        <span className='title'>Delete <span className='title-2'>Ticket?</span></span>
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <span className='body'>Are you sure you want to delete this ticket?</span>
                </ModalBody>
                <ModalFooter>
                    <div className='d-flex justify-content-end'>
                        <Button className='btn btn-sm btn-primary delete-btn rounded-3' onClick={handleDelete}>Delete</Button>
                        <Button className='btn btn-sm btn-secondary ms-2 rounded-3' onClick={() => setShowModal(false)}>Cancel</Button>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default DeleteModal