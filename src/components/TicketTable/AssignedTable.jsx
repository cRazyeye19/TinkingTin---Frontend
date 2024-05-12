import React, { useState } from 'react'
import './ticketTable.css'
import FactEdit from '../Edit Ticket/FactEdit';
import NotFound from '../NotFound/NotFound';
import Button from 'react-bootstrap/esm/Button';

const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
};

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'High':
            return 'bg-danger';
        case 'Medium':
            return 'bg-warning';
        case 'Low':
            return 'bg-success';
        default:
            return 'bg-secondary';
    }
};

const AssignedTable = ({ filteredTickets }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = filteredTickets.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredTickets.length / recordsPerPage);
    const numbers = [...Array(totalPages + 1).keys()].slice(1);
    const [searchText, setSearchText] = useState('')
    const [showEdit, setShowEdit] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const handleEditClick = (ticket) => {
        setSelectedTicket(ticket._id);
        setShowEdit(true);
    };

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <h5 className="card-title title_design">
                    Assigned <span>| Tickets</span>
                </h5>
                <div className='search-bar'>
                    <form action="#" className='search-form d-flex align-items-center'>
                        <input type="text" name='search' placeholder='Search a ticket...' title='Enter search' onChange={(e) => setSearchText(e.target.value)} />
                        <button type='submit' title='Search'>
                            <i className='bi bi-search'></i>
                        </button>
                    </form>
                </div>
            </div>
            <table className='table table-borderless'>
                <thead className='table-light'>
                    <tr>
                        <th scope='col'>Ticket #</th>
                        <th scope='col'>Issue</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Priority</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {records.filter((ticket) => {
                        return searchText.toLowerCase() === '' ? ticket : ticket.issue.toLowerCase().includes(searchText)
                    }).length === 0 ? (
                        <tr>
                            <td colSpan="6"><NotFound /></td>
                        </tr>
                    ) : (
                        records.filter((ticket) => {
                            return searchText.toLowerCase() === '' ? ticket : ticket.issue.toLowerCase().includes(searchText)
                        }).map(ticket => (
                            <tr key={ticket._id}>
                                <th scope='row'>
                                    <span className='data'>{ticket._id.substring(0, 10)}</span>
                                </th>
                                <td>
                                    <span title={ticket.issue} className='data-title'>{ticket.issue}</span>
                                </td>
                                <td>
                                    <span title='Details' className='data'>{truncateText(ticket.description, 20)}</span>
                                </td>
                                <td>
                                    <span title={ticket.status} className='data'>{ticket.status}</span>
                                </td>
                                <td>
                                    <span title={ticket.priority} className={`badge ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>
                                </td>
                                <td>
                                    <Button className='btn-size' variant='outline-primary' size='sm' onClick={() => handleEditClick(ticket)}>Modify</Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <nav>
                <ul className='pagination pagination-sm justify-content-center'>
                    <li className='page-item'>
                        <span className='page-link' onClick={prevPage}><span aria-hidden='true'>&laquo;</span></span>
                    </li>
                    {
                        numbers.map((num, index) => (
                            <li className={`page-item ${currentPage === num ? 'active' : ''}`} key={index}>
                                <span className='page-link' onClick={() => changeCurrPage(num)}>{num}</span>
                            </li>
                        ))
                    }
                    <li className='page-item'>
                        <span className='page-link' onClick={nextPage}><span aria-hidden='true'>&raquo;</span></span>
                    </li>
                </ul>
            </nav>
            {selectedTicket && showEdit && <FactEdit ticketId={selectedTicket} showEdit={showEdit} setShowEdit={setShowEdit} />}
        </>
    )
    function changeCurrPage(id) {
        setCurrentPage(id);
    }

    function prevPage() {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    }

    function nextPage() {
        if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
    }
}

export default AssignedTable