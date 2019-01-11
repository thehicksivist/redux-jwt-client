import React, { Component, Fragment } from 'react';
import './App.css';
import decodeJWT from 'jwt-decode'
import { api, setJwt } from './api/init'
import Bookmark from './components/Bookmark'
import SignIn from './components/SignIn'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import store from './config/store'
import { setBookmarksAction, setLoginErrorAction, setLoggedInAction } from './config/actions'

class App extends Component {

  get token() {
    return localStorage.getItem('token')
  }

  set token(value) {
    localStorage.setItem('token', value)
  }

  handleSignIn = async (event) => {
    try {
      event.preventDefault()
      const form = event.target
      const response = await api.post('/auth/login', {
        email: form.elements.email.value,
        password: form.elements.password.value
      })
      this.token = response.data.token
      setJwt(response.data.token)
      store.dispatch(setLoggedInAction(true))
      this.fetchBookmarks()
    } catch (error) {
      store.dispatch(setLoginErrorAction(error.message))
    }
  }

  handleSignOut = (event) => {
    api.get('/auth/logout').then(() => {
      localStorage.removeItem('token')
      store.dispatch(setLoggedInAction(false))
      store.dispatch(setBookmarksAction([]))
    })
  }

  remove = (id) => {
    api.delete(`/bookmarks/${id}`)
    const index = store.getState().bookmarks.findIndex(bookmark => bookmark._id === id)
    if (index >= 0) {
      const newBookmarks = [...store.getState().bookmarks]
      newBookmarks.splice(index, 1)
      store.dispatch(setBookmarksAction(newBookmarks))
    }

  }

  render() {
    const tokenDetails = this.token && decodeJWT(this.token)
    const { bookmarks } = store.getState()
    return (
      <div className="App">
        {
          <Router>
            <Fragment>
              <Route exact path="/" render={(props) => (
                <Redirect to="/login" />
              )} />
              <Route exact path="/login" render={(props) => {
                if (this.token) {
                  return (<Redirect to="/bookmarks" />)
                } else {
                  return (<SignIn loginError={store.getState().loginError} handleSignIn={this.handleSignIn} />)
                }
              }} />
              <Route exact path="/bookmarks" render={() => (
                this.token ? (
                  <Fragment>
                    <h4>Welcome {tokenDetails.email}!</h4>
                    <p>You logged in at: {new Date(tokenDetails.iat * 1000).toLocaleString()}</p>
                    <p>Your token expires at: {new Date(tokenDetails.exp * 1000).toLocaleString()}</p>
                    <button onClick={this.handleSignOut}>Logout</button>
                    <h1>Bookmarks</h1>
                    <ul>
                      {
                        bookmarks.map(
                          bookmark => <Bookmark key={bookmark._id} {...bookmark} remove={this.remove} />
                        )
                      }
                    </ul>
                  </Fragment>
                ) : (
                    <Redirect to="/login" />
                  )
              )} />
            </Fragment>
          </Router>
        }
      </div>
    );
  }

  componentDidMount() {
    if (this.token) {
      setJwt(this.token)
      this.fetchBookmarks()
    }
  }

  async fetchBookmarks() {
    try {
      const bookmarks = await api.get('/bookmarks')
      store.dispatch(setBookmarksAction(bookmarks.data))
    }
    catch (error) {
      alert('Can\'t get bookmarks!')
    }
  }
}


export default App;
