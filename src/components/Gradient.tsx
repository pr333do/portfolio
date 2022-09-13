/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Script from 'next/script'

const Gradient = () => {
  function startGradient() {
    setTimeout(() => {
      window.Gradient.initGradient('#gradient-canvas')
    }, 10)
  }

  // useEffect(() => {
  //   if (typeof window.Gradient !== 'undefined') {
  //     window.Gradient.initGradient('#gradient-canvas')
  //   }
  // }, [])

  return (
    <div className="gradient">
      <Script
        src="/scripts/Gradient.js"
        beforeInteractive
        onLoad={startGradient}
      />
      <canvas
        className="gradient__canvas"
        id="gradient-canvas"
        data-transition-in
      />
    </div>
  )
}

export default Gradient
