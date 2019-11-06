import { createContext } from 'react'

export default createContext({
    token: '',
    userId: '',
    loginUser: (token, userId, tokenExpiration) => { },
    logout: () => { }
})