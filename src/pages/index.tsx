import Head from 'next/head'

import { useTime } from 'hooks/useTime'

import WebGLExperience from 'components/WebGLExperience'
import InfiniteTunnel from 'components/WebGLExperience/InfiniteTunnel'

export default function Home() {
  const { hhmm } = useTime()

  return (
    <>
      <Head>
        <title>pr333do | Creative Developer</title>
        <meta name="description" content="Pedro Soares portfolio." />
      </Head>

      <main className="home">
        <div className="home__wrapper">
          <WebGLExperience>
            <InfiniteTunnel />
          </WebGLExperience>

          <div className="home__header">
            <p className="home__last-updated">
              <span>Last Updated</span>
              <span>Sep, 12 2022</span>
            </p>

            <p className="home__status">
              <span>Rio de Janeiro, BR </span>
              <span>{hhmm} AM</span>
            </p>
          </div>

          <div className="home__main">
            <h1 className="home__title">
              <span className="sr-only">pr333do</span>
              <span aria-hidden="true">pr</span>
              <span className="pixel" aria-hidden="true">
                333
              </span>
              <span aria-hidden="true">dq</span>
            </h1>
            <h2 className="home__subtitle">creative developer</h2>
          </div>

          <div className="home__footer">
            <a href="mailto:pr333do@gmail.com" className="home__link">
              Open for work
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
