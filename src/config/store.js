import { createStore } from 'redux'

const initialState = {
  bookmarks: [],
  loggedIn: false,
  loginError: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_bookmarks':
      return { ...state, bookmarks: action.bookmarks }
    case 'set_loginError':
      return { ...state, loginError: action.loginError }
    case 'set_loggedIn':
      return { ...state, loggedIn: action.loggedIn }
    default:
      if (!action.type.match(/@@redux.*/)) {
        console.log(`Reducer: Unknown action ${action.type}`)
      }
      return state
  }
}

export default createStore(reducer, initialState)
