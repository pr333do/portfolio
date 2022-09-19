import React from 'react'

import useStatus from 'hooks/useStatus'

const Status = () => {
  const { lastUpdateDate, timeFormatted, temperature } = useStatus()

  return (
    <div className="status">
      <p className="status__last-updated">
        <span>Last Updated</span>
        <span>{lastUpdateDate}</span>
      </p>

      <p className="status__weather">
        <span>Rio de Janeiro, BR</span>
        <span>{temperature}ºC</span>
        <span>{timeFormatted}</span>
      </p>
    </div>
  )
}

export default Status
