import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from './../../context/auth-context'
import './styles.css'

const index = ({ props }) => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <header className="main-navigation">
                    <div className="main-navigation_logo">
                        <h1>Easy Event</h1>
                    </div>
                    <nav className="main-navigation_item">
                        <ul>
                            {!context.token && (<li><NavLink to="/">Authenticate</NavLink></li>)}
                            <li><NavLink to="/events">Events</NavLink></li>
                            {context.token && (
                                <Fragment>
                                    <li><NavLink to="/bookings">Bookings</NavLink></li>
                                    <li><button onClick={context.logout}>Logout</button></li>
                                </Fragment>
                            )}
                        </ul>
                    </nav>
                </header>
            )
        }}
    </AuthContext.Consumer>
)

export default index