import { ReactElement, useRef } from 'react'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'

import { UserPreferencesProvider } from 'contexts/UserPreferencesContext'

import 'styles/index.scss'

function MyApp({ Component, pageProps }): ReactElement {
  const containerRef = useRef(null)

  return (
    <>
      <LocomotiveScrollProvider
        options={{
          smooth: true,
        }}
        containerRef={containerRef}
      >
        <UserPreferencesProvider>
          <div className="noise" />
          <Component {...pageProps} data-scroll-container ref={containerRef} />
        </UserPreferencesProvider>
      </LocomotiveScrollProvider>
    </>
  )
}

export default MyApp
