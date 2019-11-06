import React, { Fragment, useState, createRef, useEffect, useContext } from 'react'
import Modal from '../../components/modal'
import { CREATE_EVENT, GET_EVENTS, BOOK_EVENT } from './../../queries'
import { useMutation, useQuery } from '@apollo/react-hooks'
import AuthContext from './../../context/auth-context'
import BackDrop from '../../components/backdrop'
import EventList from './../../components/events/eventlist'
import Spinner from './../../components/spinner'
import './styles.css'

const Index = () => {
    const [creating, setCreating] = useState(false),
        [selectedEvent, setSelectedEvent] = useState(null),
        [events, setEvents] = useState([]),
        titleRef = createRef(),
        priceRef = createRef(),
        descriptionRef = createRef(),
        { userId, token } = useContext(AuthContext),
        { client, loading } = useQuery(GET_EVENTS),
        [createEvent, { data: eventsData }] = useMutation(CREATE_EVENT),
        [bookEvent, { data: bookMutationData }] = useMutation(BOOK_EVENT)


    client.query({ query: GET_EVENTS })
        .then(result => {
            setEvents(result.data.events)
        })

    useEffect(() => {
        if (eventsData && eventsData.createEvent) {
            setCreating(false)
        }

        if (bookMutationData) {
            setSelectedEvent(null)
        }
    }, [eventsData, bookMutationData])



    const showDetailHandler = eventId => {
        setSelectedEvent(events.find(e => e._id === eventId))
    }

    const bookEventHandler = () => {
        if (!token) {
            setSelectedEvent(null)
            return
        }
        bookEvent({
            variables: {
                eventId: selectedEvent._id
            }
        })
    }

    const onConfirmHandler = () => {
        const title = titleRef.current.value,
            price = +priceRef.current.value,
            description = descriptionRef.current.value

        if (title.trim().length === 0 || description.trim().length === 0) {
            return
        }

        createEvent({
            variables: {
                userId,
                title,
                price,
                description
            }, refetchQueries: ["getEvents"]
        })

    }

    const onCancelHandler = () => {
        setCreating(false)
        setSelectedEvent(null)
    }
    if (loading) return <Spinner/>
    return (
        <Fragment>
            {(creating || selectedEvent) && (<BackDrop />)}
            {creating && <Modal title="Add Event"
                canCancel
                canConfirm
                onCancel={onCancelHandler}
                confirmText="Confirm"
                onConfirm={onConfirmHandler}>
                <form>
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" ref={titleRef} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" ref={priceRef} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" rows="4" ref={descriptionRef} />
                    </div>
                </form>
            </Modal>}
            {selectedEvent && <Modal title={selectedEvent.title}
                canCancel
                canConfirm
                onCancel={onCancelHandler}
                confirmText={token ? 'Book' : 'Confirm'}
                onConfirm={bookEventHandler}>
                <h1>{selectedEvent.title}</h1>
                <h2>
                    ${selectedEvent.price} - {new Date(selectedEvent.createdAt).toLocaleDateString()}
                </h2>
                <p>{selectedEvent.description}</p>
            </Modal>}
            {token && (<div className="events-control">
                <p>Share your own Events!</p>
                <button className="btn" onClick={() => setCreating(true)}>Create Event</button>
            </div>)}
            <EventList events={events} authUserId={userId} onViewDetail={showDetailHandler} />
        </Fragment>
    )
}

export default Index
