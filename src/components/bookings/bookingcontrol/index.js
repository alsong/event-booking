import React from 'react'
import './styles.css'

export default function Index({ changeOutputTypeHandler, activeOutputType }) {
    return (
        <div className="bookings-control">
            <button className={activeOutputType === 'List' ? 'active' : ''} onClick={changeOutputTypeHandler.bind(this, 'List')}>List</button>
            <button className={activeOutputType === 'chart' ? 'active' : ''} onClick={changeOutputTypeHandler.bind(this, 'chart')}>Chart</button>
        </div>
    )
}
