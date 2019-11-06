import React from 'react'
import './styles.css'
import EventItem from './../eventitem'
const eventList = ({events, authUserId, onViewDetail}) => {
    const event = events.map(event => {
        return (
            <EventItem 
            key={event._id} 
            title={event.title} 
            eventId={event._id}
            price={event.price} 
            authUserId={authUserId} 
            date ={event.createdAt}
            onDetail = {onViewDetail}
            creatorId={event.creator._id}/>
        )
    })
    return (<ul className="event__list">{event}</ul>)
}

export default eventList