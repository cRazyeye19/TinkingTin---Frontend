import React, { useEffect, useState } from 'react'
import './card.css'
import { useSelector } from 'react-redux'

const CardNumber = () => {

    const { user } = useSelector((state) => state.authReducer.authData);
    let { tickets } = useSelector((state) => state.ticketReducer);

    const [openTicketsCount, setOpenTicketsCount] = useState(0);

    useEffect(() => {
        const openTickets = tickets.filter((ticket) => ticket.userId === user._id);
        setOpenTicketsCount(openTickets.length);
    }, [tickets, user._id]);

    return (
        <div className="col-xxl-4 col-md-6">
            <div className="card info-card sales-card">
                <div className="card-body">
                    <h5 className='card-title'>
                        Total <span>/Tickets</span>
                    </h5>
                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className='bi bi-file-earmark-break-fill'></i>
                        </div>
                        <div className="ps-3">
                            <h6>Tickets</h6>
                            <span className='text-success small pt-1 fw-bold'>{openTicketsCount}</span>
                            <span className='text-muted small pt-2 ps-1'>Total Tickets</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardNumber