import React, { createRef, useEffect, useContext } from 'react'
import { LOG_IN } from '../../queries'
import { useLazyQuery } from '@apollo/react-hooks'
import AuthContext from './../../context/auth-context'
import './styles.css'
const Index = () => {
    const emailRef = createRef(),
        passwordRef = createRef(),
        { loginUser } = useContext(AuthContext),
        [login, { data }] = useLazyQuery(LOG_IN)

    useEffect(() => {
        if (data && data.login) {
            if (data.login.token) {
                loginUser(data.login.token, data.login.userId, data.login.tokenExpiration)
            }
        }
    }, [data, loginUser])

    const submitHanlder = event => {
        event.preventDefault()
        const password = passwordRef.current.value,
            email = emailRef.current.value
        if (email.trim().length === 0 || password.trim().length === 0) {
            return
        }

        login({
            variables: {
                email,
                password
            }
        })
    }

    return (
        <div>
            <form className="auth-form" onSubmit={submitHanlder}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" ref={emailRef} />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={passwordRef} />
                </div>
                <div className="form-action">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Index