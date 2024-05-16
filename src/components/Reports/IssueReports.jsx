import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const IssueReports = () => {
    // Retrieve the authenticated user from the Redux store
    const { user } = useSelector((state) => state.authReducer.authData);

    // Retrieve all tickets from the Redux store
    let { tickets } = useSelector((state) => state.ticketReducer);

    // If the user is a regular user, filter the tickets to only include those
    // that belong to the user
    if (user.role === 'User') {
        tickets = tickets.filter((ticket) => ticket.userId === user._id);
    }

    // Initialize an object to keep track of the count of each issue type
    const issueCounts = {
        Bug: 0,
        Maintenance: 0,
        Finance: 0,
        Missing: 0
    };

    // Iterate over each ticket and increment the count of its issue type
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

    // Prepare the data for the chart
    const chartData = {
        series: [issueCounts.Bug, issueCounts.Maintenance, issueCounts.Finance, issueCounts.Missing],
        options: {
            chart: {
                type: 'pie', // The type of chart to render
            },
            plotOptions: {
                pie: {
                    customScale: 1, // Custom scaling for the chart
                },
            },
            dataLabels: {
                style: {
                    fontSize: '10px', // Set the font size for the data labels
                }
            },
            labels: ['Bug', 'Maintenance', 'Finance', 'Missing'], // Set the labels for the chart
        },
    };

    // Render the chart component with the prepared data
    return (
        <div className="card">
            <div className="filter">
            </div>
            <div className="card-body">
                <h6 className="card-title">
                    Reports <span>/ Today</span>
                </h6>
                <Chart
                    options={chartData.options} // Set the options for the chart
                    series={chartData.series} // Set the series data for the chart
                    type="pie" // Set the type of chart to render
                    height={350} // Set the height of the chart
                />
            </div>
        </div>
    );
};

export default IssueReports;