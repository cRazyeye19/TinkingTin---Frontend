import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const PrioChart = () => {
  // Retrieve the authenticated user from Redux store
  const { user } = useSelector((state) => state.authReducer.authData);

  // Retrieve all tickets from Redux store
  let { tickets } = useSelector((state) => state.ticketReducer);

  // Filter tickets that are assigned to the authenticated user
  const filteredTickets = tickets.filter((ticket) =>
    ticket.assignee.some((assignee) => assignee === user.username)
  );

  // Extract the priorities of the filtered tickets
  const priorities = filteredTickets.map((ticket) => ticket.priority);

  // Count the occurrences of each priority
  const priorityCounts = priorities.reduce((acc, priority) => {
    acc[priority] = (acc[priority] || 0) + 1; // If priority is not in the accumulator, initialize it to 0 and increment it by 1
    return acc;
  }, {});

  // Prepare the data for the chart
  const chartData = {
    series: Object.values(priorityCounts), // Values of the priority counts
    labels: Object.keys(priorityCounts), // Keys of the priority counts
  };

  // Render the chart component
  return (
    <div className="card">
      <div className="filter"></div>
      <div className="card-body">
        <h6 className="card-title">
          Reports <span>{'/ Today'}</span>
        </h6>
        {/* Render the chart using the ApexCharts library */}
        <Chart
          options={{ labels: chartData.labels }} // Set the labels for the chart
          series={chartData.series} // Set the data for the chart
          type="pie" // Set the type of chart (pie chart)
          height={350} // Set the height of the chart
        />
      </div>
    </div>
  );

};

export default PrioChart;