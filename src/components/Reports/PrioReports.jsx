import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const PrioReports = () => {
  // Retrieve the authenticated user and tickets from the Redux store
  const { user } = useSelector((state) => state.authReducer.authData);
  let { tickets } = useSelector((state) => state.ticketReducer);

  // If the user is a regular user, filter the tickets to only include
  // the ones associated with the user
  if (user.role === 'User') {
    tickets = tickets.filter((ticket) => ticket.userId === user._id);
  }

  // Initialize an object to store the number of tickets by date and priority
  const priorityCountsByDate = {};

  // Iterate over each ticket
  tickets.forEach((ticket) => {
    // Get the date the ticket was created and format it as a string
    const date = new Date(ticket.createdAt).toLocaleDateString();

    // If the date has not been encountered before, initialize an object
    // to store the number of tickets by priority for that date
    if (!priorityCountsByDate[date]) {
      priorityCountsByDate[date] = { Low: 0, Medium: 0, High: 0 };
    }

    // Increment the count of tickets by priority for the current date
    priorityCountsByDate[date][ticket.priority]++;
  });

  // Sort the dates in ascending order
  const sortedDates = Object.keys(priorityCountsByDate).sort((a, b) => new Date(a) - new Date(b));

  // Initialize the data structure for the chart
  const chartData = {
    series: [
      { name: 'Low', data: [] },
      { name: 'Medium', data: [] },
      { name: 'High', data: [] }
    ],
    options: {
      chart: {
        type: 'bar' // Create a bar chart
      },
      xaxis: {
        categories: sortedDates // Set the x-axis categories to the sorted dates
      },
      plotOptions: {
        bar: {
          horizontal: true // Display the bars horizontally
        }
      },
      colors: ['#00cc00', '#ffcc00', '#ff0000'] // Set the color scheme for the bars
    }
  };

  // Populate the data for each bar in the chart
  sortedDates.forEach((date) => {
    chartData.series[0].data.push(priorityCountsByDate[date].Low); // Add the count of low-priority tickets for the current date
    chartData.series[1].data.push(priorityCountsByDate[date].Medium); // Add the count of medium-priority tickets for the current date
    chartData.series[2].data.push(priorityCountsByDate[date].High); // Add the count of high-priority tickets for the current date
  });

  // Render the chart component with the chart data
  return (
    <div className="card">
      <div className="filter"></div>
      <div className="card-body">
        <h6 className="card-title">
          Priority <span>/ Tickets</span>
        </h6>
        <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
      </div>
    </div>
  );
};

export default PrioReports;