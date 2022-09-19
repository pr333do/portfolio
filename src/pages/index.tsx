import GSAP from 'gsap'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

import useIntersectionObserver from 'hooks/useIntersectionObserver'

import Status from 'components/Status'
import WebGLExperience from 'components/WebGLExperience'
import InfiniteTunnel from 'components/WebGLExperience/InfiniteTunnel'

export default function Home() {
  const ref = useRef(null)
  const entry = useIntersectionObserver(ref, {
    threshold: 0.9,
  })

  const isVisible = !!entry?.isIntersecting

  useEffect(() => {
    const timeline = GSAP.timeline()

    timeline.pause()

    timeline.fromTo(
      '.home__hero',
      {
        scale: 1,
        borderRadius: '0rem',
        filter: 'brightness(1)',
      },
      {
        scale: 0.95,
        borderRadius: '1.2rem',
        filter: 'brightness(0.2)',
        ease: 'power5',
        duration: 0.3,
      },
    )

    function showHero() {
      timeline.reverse()
    }

    function hideHero() {
      timeline.play()
    }

    function onScroll() {
      const scrollTop = document.scrollingElement.scrollTop

      if (scrollTop === 0) {
        showHero()
      } else {
        hideHero()
      }
    }

    document.addEventListener('scroll', onScroll)

    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      <Head>
        <title>pr333do | Creative Developer</title>
        <meta name="description" content="Pedro Soares portfolio." />
      </Head>

      <main className="home" data-scroll-section>
        <div className="home__wrapper">
          <div className="home__hero">
            <WebGLExperience frameloop={isVisible ? 'never' : 'always'}>
              <InfiniteTunnel />
            </WebGLExperience>

            <Status />

            <section className="home__main">
              <h1 className="home__title">
                <span className="sr-only">pr333do</span>
                <span aria-hidden="true">pr</span>
                <span className="pixel" aria-hidden="true">
                  333
                </span>
                <span aria-hidden="true">dq</span>
              </h1>
              <h2 className="home__subtitle">creative developer</h2>
            </section>

            <div className="home__footer">
              <a href="mailto:pr333do@gmail.com" className="home__link">
                Open for work
              </a>
            </div>
          </div>

          <div className="horizontal">
            <section ref={ref} className="home__about">
              <h1 className="home__about__title">About Me </h1>
              <span className="home__about__decoration">***</span>
              <p className="home__about__paragraph">
                Hey there! I&apos;m Pedro Soares, I&apos;m Creative Developer
                based in Rio de Janeiro, Brazil and I help businesses look
                unique on the web. <br />
                <br /> My truly passion in software development is creating
                experiences that inspire and shapes the future of the internet.
                <br />
                <br /> I&apos;ve had over 4 years of experience, from working
                with startups, agencies and international clientes. <br />
                <br />
              </p>
              <div className="home__about__img">
                <Image
                  src="/images/about.jpg"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </section>
            <section className="home__about">
              <h1 className="home__about__title">About Me </h1>
              <span className="home__about__decoration">***</span>
              <p className="home__about__paragraph">
                Hey there! I&apos;m Pedro Soares, I&apos;m Creative Developer
                based in Rio de Janeiro, Brazil and I help businesses look
                unique on the web. <br />
                <br /> My truly passion in software development is creating
                experiences that inspire and shapes the future of the internet.
                <br />
                <br /> I&apos;ve had over 4 years of experience, from working
                with startups, agencies and international clientes. <br />
                <br />
              </p>
              <div className="home__about__img">
                <Image
                  src="/images/about.jpg"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
