import axios from 'axios'

// Create an axios instance
const api = axios.create({
  baseURL: 'https://secure-chamber-81112.herokuapp.com/'
})

// Add the bearer token to the axios instance
// Axios will then add this to the HTTP header with every subsequent request
const setJwt = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export { api, setJwt }
