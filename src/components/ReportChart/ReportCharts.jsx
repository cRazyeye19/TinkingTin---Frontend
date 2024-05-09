import React, { useState } from 'react'
import Chart from 'react-apexcharts'

const ReportCharts = () => {
    const [data, setData] = useState({
        series: [
            {
                name: 'series-1',
                data: [30, 40, 45, 50, 49, 60, 70],
            },
            {
                name: 'series-2',
                data: [11, 32, 45, 50, 49, 60, 91],
            },
            {
                name: 'series-3',
                data: [15, 11, 32, 50, 49, 60, 70],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: false
                },
            },
            markers: {
                size: 4,
            },
            colors: ['#4154f1', '#2eca6a', '#ff771d'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 90, 100]
                }
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            xaxis: {
                type: 'datetime',
                categories: [
                    '2018-09-19T00:00:00.000Z', 
                    '2018-09-19T01:30:00.000Z', 
                    '2018-09-19T02:30:00.000Z', 
                    '2018-09-19T03:30:00.000Z', 
                    '2018-09-19T04:30:00.000Z', 
                    '2018-09-19T05:30:00.000Z', 
                    '2018-09-19T06:30:00.000Z',
                ],
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm',
                },
            },
        },
    });

    return (
        <Chart
            options={data.options}
            series={data.series}
            type={data.options.chart.type}
            height={data.options.chart.height}
        />
    )
}

export default ReportCharts