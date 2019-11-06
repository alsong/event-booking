import React, { useState } from 'react'
import './App.css'
import { ApolloProvider } from '@apollo/react-hooks'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthPage from './pages/auth'
import EventPage from './pages/events'
import BookingPage from './pages/bookings'
import NavBar from './components/navbar'
import AuthContext from './context/auth-context'

function App() {
  const [token, setToken] = useState(null),
    [userId, setUserId] = useState(null),
    login = (token, userId, tokenExpiration) => {
      setToken(token)
      setUserId(userId)
    },
    logout = () => {
      setToken(null)
      setUserId(null)
    }

    const httpLink = createHttpLink({
      uri: 'http://localhost:5000/graphql',
    })

    const authLink = setContext((_, { headers }) => {
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    })

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    })

  return (
    <ApolloProvider client={client}>
      <React.Fragment>
        <AuthContext.Provider value={{ token: token, userId: userId, loginUser: login, logout: logout }}>
          <NavBar />
          <main className="main-content">
            <Switch>
              {token && (<Redirect from="/" to="/events" exact />)}
              {token && (<Redirect from="/auth" to="/events" exact />)}
              {!token && (<Route path="/auth" component={AuthPage} />)}
              <Route path="/events" component={EventPage} />
              {token && (<Route path="/bookings" component={BookingPage} />)}
              {!token && (<Redirect  to="/auth" exact />)}
            </Switch>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </ApolloProvider>
  );
}

export default App;
