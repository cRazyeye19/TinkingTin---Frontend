import React from 'react'
import { useSelector } from 'react-redux'
import AssignedTable from '../TicketTable/AssignedTable';
import LoadSpinners from '../LoadSpinners/LoadSpinners';

const TaskReport = () => {

  const { user } = useSelector((state) => state.authReducer.authData)
  let { tickets, loading } = useSelector((state) => state.ticketReducer);

  const filteredTickets = tickets.filter((ticket) => ticket.assignee.includes(user.username));

  console.log("Filtered Tickets:", filteredTickets);

  return (
    <div className="card recent-sales overflow-auto">
      <div className="card-body">
        {loading ? (
          <LoadSpinners />
        ) : (
          <AssignedTable filteredTickets={filteredTickets} />
        )}
      </div>
    </div>
  )
}

export default TaskReport