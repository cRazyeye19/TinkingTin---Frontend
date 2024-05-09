import React, { useEffect } from 'react'
import AssignTable from '../TicketTable/AssignTable'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../actions/UserAction'

const AssignReport = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { user } = useSelector((state) => state.authReducer.authData);
  const { users, loading } = useSelector(state => state.userReducer);
  const filteredUsers = users.filter((u) => u._id !== user._id && u.role !== 'Admin' && u.role !== 'Department');

  return (
    <div className="card recent-sales overflow-auto">
      <div className="card-body">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <AssignTable users={filteredUsers} />
        )}
      </div>
    </div>
  )
}

export default AssignReport