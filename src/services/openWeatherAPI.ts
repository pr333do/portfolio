import axios from 'axios'

export interface IOpenWeatherAPIResponse {
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  main: {
    temp: number
  }
  dt: number
  timezone: number
  sys: {
    country: string
  }
  name: string
}

const openWeatherAPI = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
})

export default openWeatherAPI
