import axios from 'axios'
import { IStatus } from 'pages/api/status'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
  minute: '2-digit',
  hour: '2-digit',
  hour12: true,
  hourCycle: 'h11',
})

const useStatus = () => {
  const [time, setTime] = useState<Date>(new Date())

  const { data } = useSWR<IStatus>(
    'status',
    async () => {
      const { data } = await axios.get<IStatus>('/api/status')

      setTime(new Date(data.dt))

      return data
    },
    {
      refreshInterval: 0,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  )

  const isLoading = !data

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(state => new Date(state.getTime() + 1000))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const timeFormatted = timeFormatter.format(time)

  const lastUpdateDate = !isLoading ? data.lastUpdateDate : ''
  const temperature = !isLoading ? data.main.temp.toFixed(0) : null

  return { isLoading, timeFormatted, lastUpdateDate, temperature }
}

export default useStatus
