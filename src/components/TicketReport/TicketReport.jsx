import React from 'react'
import TicketTable from '../TicketTable/TicketTable'
import { useSelector } from 'react-redux'
const TicketReport = () => {

  const { user } = useSelector((state) => state.authReducer.authData)
  let { tickets, loading } = useSelector((state) => state.ticketReducer)

  if (user.role === 'User') {
    tickets = tickets.filter((tickets) => tickets.userId === user._id)
  } else if (user.role === 'Department') {
    tickets = tickets.filter((tickets) => tickets.department === user.department)
  }

  return (
    <div className="card recent-sales overflow-auto">
      <div className="card-body">
        {loading ? 'Loading...' : <TicketTable tickets={tickets} />}
      </div>
    </div>
  )
}

export default TicketReport