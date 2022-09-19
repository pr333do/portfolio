import axios from 'axios'

const worldtimeAPI = axios.create({
  baseURL: 'https://worldtimeapi.org/api/timezone/',
})

export default worldtimeAPI
