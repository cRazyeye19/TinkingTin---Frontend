import React from 'react'
import './reports.css'
import CardFilter from '../CardFilter/CardFilter'
import ReportCharts from '../ReportChart/ReportCharts'

const Reports = () => {
  return (
    <div className="card">
        <CardFilter />
        <div className="card-body">
            <h5 className='card-title'>
                Reports <span>/Today</span>
            </h5>
            <ReportCharts />
        </div>
    </div>
  )
}

export default Reports