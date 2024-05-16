import React from 'react'
import CardNumber from '../Card/CardNumber'
import CardOpened from '../Card/CardOpened'
import CardClosed from '../Card/CardClosed'
import ProfileCard from '../ProfileCard/ProfileCard'
import TaskReport from '../TicketReport/TaskReport'
import StatusChart from '../Reports/Faculty/StatusChart'
import PrioChart from '../Reports/Faculty/PrioChart'

const DashboardFac = ({ socket }) => {
    return (
        <section className='dashboard section'>
            <div className="row">
                <div className="col-lg-8">
                    <div className="row">
                        <CardNumber />
                        <CardOpened />
                        <CardClosed />
                        <div className="col-12">
                            <StatusChart />
                        </div>
                        <div className="col-12">
                            <TaskReport socket={socket}/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <PrioChart />
                    <ProfileCard />
                </div>
            </div>
        </section>
    )
}

export default DashboardFac