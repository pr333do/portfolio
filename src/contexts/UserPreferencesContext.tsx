import {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
  useMemo,
  useEffect,
} from 'react'
import uaParser, { IResult } from 'ua-parser-js'

type PrefersColorScheme = 'no-preference' | 'dark' | 'light'
type PrefersReducedMotion = 'no-preference' | 'reduce' | 'no-reduce'

interface IUserPreferencesContextData {
  userAgent: IResult
  prefersColorScheme: PrefersColorScheme
  prefersReducedMotion: PrefersReducedMotion
}

const UserPreferencesContext = createContext<IUserPreferencesContextData>(
  {} as IUserPreferencesContextData,
)

interface IUserPreferencesProvider {
  children: ReactNode
}

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export const UserPreferencesProvider = ({
  children,
}: IUserPreferencesProvider): ReactElement => {
  const [userAgent] = useState<IResult>(() => {
    if (typeof window !== 'undefined') {
      const data = uaParser(window.navigator.userAgent)

      return data
    } else {
      return null
    }
  })

  const [prefersColorScheme] = useState<PrefersColorScheme>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(COLOR_SCHEME_QUERY).matches ? 'dark' : 'light'
    } else {
      return 'no-preference'
    }
  })

  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<PrefersReducedMotion>(() => {
      if (typeof window !== 'undefined') {
        return window.matchMedia(REDUCED_MOTION_QUERY).matches
          ? 'reduce'
          : 'no-reduce'
      } else {
        return 'no-preference'
      }
    })

  useEffect(() => {
    const motionMediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY)

    const motionListener = event => {
      setPrefersReducedMotion(event.matches ? 'reduce' : 'no-reduce')
    }

    motionMediaQueryList.addEventListener('change', motionListener)

    return () => {
      motionMediaQueryList.removeEventListener('change', motionListener)
    }
  }, [])

  const values = useMemo(
    () => ({ userAgent, prefersColorScheme, prefersReducedMotion }),
    [userAgent, prefersColorScheme, prefersReducedMotion],
  )

  return (
    <UserPreferencesContext.Provider value={values}>
      {children}
    </UserPreferencesContext.Provider>
  )
}

export function useUserPreferences(): IUserPreferencesContextData {
  const context = useContext(UserPreferencesContext)

  if (!context) {
    throw new Error(
      'useUserPreferences must be used within a UserPreferencesProvider',
    )
  } else {
    return context
  }
}
