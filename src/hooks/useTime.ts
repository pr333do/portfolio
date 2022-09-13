import { useEffect, useMemo, useState } from 'react'

export function useTime() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date())
    }, 1)

    return () => clearInterval(intervalId)
  }, [])

  const hhmm = useMemo(() => {
    return `${time.getHours().toString().padStart(2, '0')}:${time
      .getMinutes()
      .toString()
      .padStart(2, '0')}`
  }, [time])

  return { time, hhmm }
}
