import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const IssueReports = () => {
    const { user } = useSelector((state) => state.authReducer.authData);
    let { tickets } = useSelector((state) => state.ticketReducer);

    if (user.role === 'User') {
        tickets = tickets.filter((ticket) => ticket.userId === user._id);
    }

    const issueCounts = {
        Bug: 0,
        Maintenance: 0,
        Finance: 0,
        Missing: 0
    };

    tickets.forEach((ticket) => {
        if (ticket.issue === 'Bug') {
            issueCounts.Bug += 1;
        } else if (ticket.issue === 'Maintenance') {
            issueCounts.Maintenance += 1;
        } else if (ticket.issue === 'Finance') {
            issueCounts.Finance += 1;
        } else if (ticket.issue === 'Missing') {
            issueCounts.Missing += 1;
        }
    });

    const chartData = {
        series: [issueCounts.Bug, issueCounts.Maintenance, issueCounts.Finance, issueCounts.Missing],
        options: {
            chart: {
                type: 'pie',
            },
            plotOptions: {
                pie: {
                    customScale: 1,
                },
            },
            dataLabels: {
                style: {
                    fontSize: '10px',
                }
            },
            labels: ['Bug', 'Maintenance', 'Finance', 'Missing'],
        },
    };

    return (
        <div className="card">
            <div className="filter">
            </div>
            <div className="card-body">
                <h6 className="card-title">
                    Reports <span>/ Today</span>
                </h6>
                <Chart options={chartData.options} series={chartData.series} type="pie" height={350} />
            </div>
        </div>
    );
};

export default IssueReports;