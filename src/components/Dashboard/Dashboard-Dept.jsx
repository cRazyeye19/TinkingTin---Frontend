import React from 'react'
import CardNumber from '../Card/CardNumber'
import CardOpened from '../Card/CardOpened'
import CardClosed from '../Card/CardClosed'
import AssignReport from '../TicketReport/AssignReport'
import ProfileCard from '../ProfileCard/ProfileCard'
import Iteration from '../Project Iteration/Iteration'

const DashboardDept = () => {
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
                            <AssignReport />
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

export default DashboardDept