import React from 'react'
import './styles.css'
const eventItem = ({ title, price, authUserId, creatorId, date, onDetail, eventId }) => (
    <li className="events__list-item" >
        <div>
            <h1>{title}</h1>
            <h2>{price} - {new Date(date).toLocaleDateString()}</h2>
        </div>
        <div>
            {
                authUserId === creatorId ? (
                    <p>Your the owner of the event</p>
                ) : (
                        <button className="btn" onClick={onDetail.bind(this,eventId)}>View Details</button>
                    )
            }

        </div>
    </li>
)

export default eventItem