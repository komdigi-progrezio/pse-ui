import axios from 'axios'

const defaultOptions = {
  baseURL: process.env.VUE_APP_BASE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

let instance = axios.create(defaultOptions)

export default instance
