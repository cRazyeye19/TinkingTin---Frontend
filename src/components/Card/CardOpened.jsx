import React, { useEffect, useState } from 'react'
import './card.css'
import CardFilter from '../CardFilter/CardFilter'
import { useSelector } from 'react-redux'

const CardOpened = () => {

    const { user } = useSelector((state) => state.authReducer.authData);
    let { tickets } = useSelector((state) => state.ticketReducer);

    const [openTicketsCount, setOpenTicketsCount] = useState(0);

    useEffect(() => {
        const openTickets = tickets.filter((ticket) => ticket.userId === user._id && ticket.status === 'Open');
        setOpenTicketsCount(openTickets.length);
    }, [tickets, user._id]);

    return (
        <div className="col-xxl-4 col-md-6">
            <div className="card info-card sales-card">
                <CardFilter />
                <div className="card-body">
                    <h5 className="card-title">
                        <span>User || Open</span>
                    </h5>
                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className='bi bi-people-fill'></i>
                        </div>
                        <div className="ps-3">
                            <h6>Tickets</h6>
                            <span className='text-success small pt-1 fw-bold'>{openTicketsCount}</span>
                            <span className='text-muted small pt-2 ps-1'>Open Tickets</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardOpened