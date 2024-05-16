import React from 'react'
import './dashboard.css'
import PrioReports from '../Reports/PrioReports'
import TicketReport from '../TicketReport/TicketReport'
import Iteration from '../Project Iteration/Iteration'
import ProfileCard from '../ProfileCard/ProfileCard'
import CardNumber from '../Card/CardNumber'
import CardOpened from '../Card/CardOpened'
import CardClosed from '../Card/CardClosed'
import { useSelector } from 'react-redux'
import StatusChart from '../Reports/Faculty/StatusChart'
import TaskReport from '../TicketReport/TaskReport'
import PrioChart from '../Reports/Faculty/PrioChart'

const Dashboard = ({ socket }) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    return (
        <section className='dashboard'>
            <div className="row">
                <div className="col-lg-8">
                    <div className='row'>
                        <CardNumber />
                        <CardOpened />
                        <CardClosed />
                    </div>
                    <div className='col-12'>
                        {user.role === 'Faculty' ? <StatusChart /> : null}
                        {user.role === 'User' || user.role === 'Admin' || user.role === 'Department' ? <PrioReports /> : null}
                    </div>
                    <div className="col-12">
                        {user.role === 'Faculty' ? <TaskReport socket={socket} /> : null}
                        {user.role === 'User' || user.role === 'Admin' || user.role === 'Department' ? <TicketReport socket={socket} /> : null}
                    </div>
                </div>
                <div className="col-lg-4">
                    {user.role === 'Faculty' ? <PrioChart /> : null}
                    {user.role === 'User' || user.role === 'Admin' || user.role === 'Department'    ? <Iteration /> : null}
                    <ProfileCard />
                </div>
            </div>
        </section>
    )
}

export default Dashboard