import React from 'react'
import './dashboard.css'
// import Reports from '../Reports/Reports'
import TicketReport from '../TicketReport/TicketReport'
import Iteration from '../Project Iteration/Iteration'
import ProfileCard from '../ProfileCard/ProfileCard'
import CardNumber from '../Card/CardNumber'
import CardOpened from '../Card/CardOpened'
import CardClosed from '../Card/CardClosed'

const Dashboard = () => {
    return (
        <section className='dashboard section'>
            <div className="row">
                <div className="col-lg-8">
                    <div className="row">
                        <CardNumber />
                        <CardOpened />
                        <CardClosed />
                        {/* <div className="col-12">
                            <Reports />
                        </div> */}
                        <div className="col-12">
                            <TicketReport />
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <ProfileCard />
                    <Iteration />
                </div>
            </div>
        </section>
    )
}

export default Dashboard