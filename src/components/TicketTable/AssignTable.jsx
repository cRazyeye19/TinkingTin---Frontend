import React, { useState } from 'react'
import './ticketTable.css'
import NotFound from '../NotFound/NotFound'
import DeptEdit from '../Edit Ticket/DeptEdit'
import Button from 'react-bootstrap/Button'

const AssignTable = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  const [searchText, setSearchText] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const handleEditModal = (user) => {
    setSelectedUser(user._id)
    setShowEditModal(true)
  }

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h5 className='card-title title_design'>
          Manage <span>| Role</span>
        </h5>
        <div className='search-bar'>
          <div className='search-bar'>
            <form action="#" className='search-form d-flex align-items-center'>
              <input type="text" name='search' placeholder='Search a user...' title='Enter search' onChange={(e) => setSearchText(e.target.value)} />
              <button type='submit' title='Search'>
                <i className='bi bi-search'></i>
              </button>
            </form>
          </div>
        </div>
      </div>
      <table className='table table-borderless'>
        <thead className='table-light'>
          <tr>
            <th scope='col'>User ID</th>
            <th scope='col'>First Name</th>
            <th scope='col'>Last Name</th>
            <th scope='col'>Role</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.filter((user) => {
            if (searchText.trim() === '') return true;
            const searchTerm = searchText.toLowerCase();
            return (
              user._id.toLowerCase().includes(searchTerm) ||
              user.firstname.toLowerCase().includes(searchTerm) ||
              user.lastname.toLowerCase().includes(searchTerm) ||
              user.role.toLowerCase().includes(searchTerm)
            );
          }).length === 0 ? (
            <tr>
              <td colSpan="6"><NotFound /></td>
            </tr>
          ) : (
            records.filter((user) => {
              if (searchText.trim() === '') return true;
              const searchTerm = searchText.toLowerCase();
              return (
                user._id.toLowerCase().includes(searchTerm) ||
                user.firstname.toLowerCase().includes(searchTerm) ||
                user.lastname.toLowerCase().includes(searchTerm) ||
                user.role.toLowerCase().includes(searchTerm)
              );
            }).map(user => (
              <tr key={user._id}>
                <th scope='row'>
                  <span className='data'>{user._id.substring(0, 10)}</span>
                </th>
                <td>
                  <span title={user.firstname} className='data-title'>{user.firstname}</span>
                </td>
                <td>
                  <span title='Details' className='data'>{user.lastname}</span>
                </td>
                <td>
                  <span title={user.role} className='data'>{user.role}</span>
                </td>
                <td>
                  <Button className='btn-size' variant='outline-primary' size='sm' onClick={() => handleEditModal(user)}>Edit Access</Button>
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
      {showEditModal && selectedUser && <DeptEdit userId={selectedUser} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />}
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

export default AssignTable