// Actions
export function setBookmarksAction(bookmarks) {
  return {
    type: 'set_bookmarks',
    bookmarks
  }
}

export function setLoginErrorAction(loginError) {
  return {
    type: 'set_loginError',
    loginError
  }
}

export function setLoggedInAction(loggedIn) {
  return {
    type: 'set_loggedIn',
    loggedIn
  }
}


