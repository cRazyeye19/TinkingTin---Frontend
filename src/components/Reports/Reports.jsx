import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const Reports = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  let { tickets } = useSelector((state) => state.ticketReducer);

  if (user.role === 'User') {
    tickets = tickets.filter((ticket) => ticket.userId === user._id);
  }

  // Initialize an object to store priority counts for each date
  const priorityCountsByDate = {};

  // Loop through tickets to count priority occurrences for each date
  tickets.forEach((ticket) => {
    const date = new Date(ticket.createdAt).toLocaleDateString(); // Use createdAt field for timestamp
    if (!priorityCountsByDate[date]) {
      priorityCountsByDate[date] = { Low: 0, Medium: 0, High: 0 }; // Initialize counts for date
    }
    priorityCountsByDate[date][ticket.priority]++; // Increment count for priority on that date
  });

  // Sort dates in ascending order
  const sortedDates = Object.keys(priorityCountsByDate).sort((a, b) => new Date(a) - new Date(b));

  // Prepare chart data from priority counts by date
  const chartData = {
    series: [
      { name: 'Low', data: [] },
      { name: 'Medium', data: [] },
      { name: 'High', data: [] }
    ],
    options: {
      chart: {
        type: 'bar',
      },
      xaxis: {
        categories: sortedDates, // Sorted dates
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      colors: ['#00cc00', '#ffcc00', '#ff0000'],
    },
  };

  // Populate chart data with counts for each priority for each date
  sortedDates.forEach((date) => {
    chartData.series[0].data.push(priorityCountsByDate[date].Low);
    chartData.series[1].data.push(priorityCountsByDate[date].Medium);
    chartData.series[2].data.push(priorityCountsByDate[date].High);
  });

  return (
    <div className="card">
      <div className="filter">
      </div>
      <div className="card-body">
        <h6 className="card-title">
          Priority <span>/ Tickets</span>
        </h6>
        <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
      </div>
    </div>
  );
};

export default Reports;