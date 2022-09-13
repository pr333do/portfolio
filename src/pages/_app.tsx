import { ReactElement } from 'react'

import { UserPreferencesProvider } from 'contexts/UserPreferencesContext'

import 'styles/index.scss'

function MyApp({ Component, pageProps }): ReactElement {
  return (
    <>
      <UserPreferencesProvider>
        <div className="noise" />
        <Component {...pageProps} />
      </UserPreferencesProvider>
    </>
  )
}

export default MyApp
