import React, { useState, Fragment } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_BOOKINGS, CANCEL_BOOKING } from './../../queries'
import Spinner from './../../components/spinner'
import BookingsList from './../../components/bookings/bookinglist'
import BookingChart from './../../components/bookings/bookingchart'
import BookingControl from './../../components/bookings/bookingcontrol'

export default function Index() {

    const [bookings, setBooking] = useState([]),
        [outputType, setOutPutType] = useState('List'),
        { client, loading } = useQuery(GET_BOOKINGS),
        [cancelBooking] = useMutation(CANCEL_BOOKING)

    client.query({ query: GET_BOOKINGS })
        .then(result => {
            setBooking(result.data.bookings)
        })

    const deleteBookingHandler = bookingId => {
        cancelBooking({
            variables: {
                bookingId: bookingId
            }, refetchQueries: ["getBookings"]
        })
    }

    const changeOutputTypeHandler = outputType => {
        if (outputType === 'List') {
            setOutPutType('List')
        } else {
            setOutPutType('chart')
        }
    }

    let content = <Spinner />
    if (!loading) {
        content = (
            <Fragment>
                <BookingControl changeOutputTypeHandler={changeOutputTypeHandler} activeOutputType={outputType}/>
                <div>
                    {
                        outputType === 'List' ? <BookingsList bookings={bookings} onDelete={deleteBookingHandler} /> : <BookingChart bookings={bookings} />
                    }
                </div>
            </Fragment>
        )
    }
    if (loading) return content
    return (
        <Fragment>
            {content}
        </Fragment>
    )
}
