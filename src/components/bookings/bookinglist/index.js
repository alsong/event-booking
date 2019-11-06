import React from 'react'
import './styles.css'

const bookingList = ({ bookings, onDelete }) => (
    <ul className="bookings_list">
        {
            bookings.map(book => {
                return <li key={book._id} className="bookings_list_item">
                    <div>
                        {book.event.title} - {new Date(book.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                        <button className="btn" onClick={onDelete.bind(this, book._id)}>Cancel</button>
                    </div>
                </li>
            })
        }
    </ul>
)

export default bookingList