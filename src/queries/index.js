import { gql } from 'apollo-boost'

const LOG_IN = gql`
    query LoginUser($email: String!,$password: String!) {
    login(email:$email,password:$password){
        userId
        token
        tokenExpiration
    }
  }
`
const CREATE_USER = gql`
    mutation CreateUser($email: String!,$password: String!) {
      createUser(input:{email:$email,password:$password}){
      _id
      email
    }
  }
`

const CREATE_EVENT = gql`
    mutation CreateEvent($userId:ID!,$title: String!,$description: String!,$price: Float!) {
      createEvent(input:{userId:$userId,title:$title,description:$description,price:$price}){
      _id
      title
      description
      price
      createdAt
    }
  }
`

const GET_EVENTS = gql`
    query getEvents {
    events{
    _id
    title
    description
    price
    creator{
      _id
      email
    }
    createdAt
    }
  }
`

const BOOK_EVENT = gql`
   mutation BookEvent($eventId: ID!) {
      bookEvent(eventId:$eventId){
      _id
      createdAt
      updatedAt
    }
  }
`

const GET_BOOKINGS = gql`
  query getBookings {
        bookings{
        _id
        createdAt
        event{
          _id
          title
          description
          price
          createdAt
      }
    }
}
`
const CANCEL_BOOKING =gql`
     mutation BookEvent($bookingId: ID!) {
      cancelBooking(bookingId:$bookingId){
      _id
      title
    }
  }
`

export { LOG_IN, CREATE_USER, CREATE_EVENT,GET_EVENTS, BOOK_EVENT,GET_BOOKINGS,CANCEL_BOOKING}