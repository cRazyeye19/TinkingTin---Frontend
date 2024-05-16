import React from 'react'
import TicketReport from '../TicketReport/TicketReport'
import ProfileCard from '../ProfileCard/ProfileCard'
import Iteration from '../Project Iteration/Iteration'
import CardNumber from '../Card/CardNumber'
import CardOpened from '../Card/CardOpened'
import CardClosed from '../Card/CardClosed'
import PrioReports from '../Reports/PrioReports'

const DashboardAdmin = ({ socket }) => {
    return (
        <section className='dashboard section'>
            <div className="row">
                <div className="col-lg-8">
                    <div className="row">
                        <CardNumber />
                        <CardOpened />
                        <CardClosed />
                        <div className="col-12">
                            <PrioReports />
                        </div>
                        <div className="col-12">
                            <TicketReport socket={socket} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <Iteration />
                    <ProfileCard />
                </div>
            </div>
        </section>
    )
}

export default DashboardAdmin