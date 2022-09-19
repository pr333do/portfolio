import { useEffect, useState } from 'react'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
})

const clockFormatter = new Intl.DateTimeFormat('en-US', {
  minute: '2-digit',
  hour: '2-digit',
  hour12: true,
  hourCycle: 'h11',
  second: '2-digit',
})

interface IUseTimeProps {
  start?: string
}

export function useTime({ start = null }: IUseTimeProps) {
  const [time, setTime] = useState(start ? new Date(start) : new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(state => new Date(state.getTime() + 1000))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const startDate = dateFormatter.format(new Date(start))
  const clock = clockFormatter.format(time)

  return { startDate, time, clock }
}
