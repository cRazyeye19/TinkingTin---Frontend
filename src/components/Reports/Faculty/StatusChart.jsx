import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const StatusChart = () => {
    const { user } = useSelector((state) => state.authReducer.authData);
    let { tickets } = useSelector((state) => state.ticketReducer);

    const filteredTickets = user.role === 'Faculty' ? tickets.filter(ticket => ticket.assignee.some(assignee => assignee === user.username)) : tickets;

    const groupedTickets = filteredTickets.reduce((groups, ticket) => {
        const date = ticket.createdAt.split('T')[0];
        if (!groups[date]) {
            groups[date] = {};
        }
        groups[date][ticket.status] = (groups[date][ticket.status] || 0) + 1;
        return groups;
    }, {});

    const dates = Object.keys(groupedTickets);
    dates.sort((a, b) => new Date(a) - new Date(b));
    const allStatuses = [...new Set(Object.values(tickets.map(ticket => ticket.status)))];
    const series = allStatuses.map(status => {
        const data = dates.map(date => groupedTickets[date][status] || 0);
        return {
            name: status,
            data: data,
        };
    });

    return (
        <div className="card">
            <div className="filter"></div>
            <div className="card-body">
                <h6 className="card-title">
                    Reports <span>/ Status</span>
                </h6>
                <Chart
                    options={{
                        xaxis: {
                            categories: dates
                        },
                        plotOptions: {
                            bar: {
                                horizontal: true,
                            }
                        }
                    }}
                    series={
                        series
                    }
                    type='bar'
                    height={350}
                />
            </div>
        </div>
    );
};

export default StatusChart;