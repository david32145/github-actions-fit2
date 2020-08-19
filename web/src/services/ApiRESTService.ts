import axios from 'axios'

const ApiRestService = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

export default ApiRestService
