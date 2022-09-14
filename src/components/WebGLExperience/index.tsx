import { AdaptiveDpr } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { memo, ReactNode, Suspense } from 'react'

interface IWebGLExperienceProps {
  children: ReactNode
}

const WebGLExperience = ({ children }: IWebGLExperienceProps) => {
  return (
    <div className="web-gl-experience">
      <Suspense
        fallback={
          <div className="web-gl-experience__loader">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur
            nobis distinctio tenetur modi dolores? Qui dolor tempora labore
            quaerat officia! Velit adipisci, voluptates est laudantium iste modi
            ipsa animi ad? Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Aspernatur nobis distinctio tenetur modi dolores? Qui dolor
            tempora labore quaerat officia! Velit adipisci, voluptates est
            laudantium iste modi ipsa animi ad? Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Aspernatur nobis distinctio tenetur
            modi dolores? Qui dolor tempora labore quaerat officia! Velit
            adipisci, voluptates est laudantium iste modi ipsa animi ad?
          </div>
        }
      >
        <Canvas
          linear
          dpr={1}
          gl={{
            antialias: false,
            alpha: false,
            precision: 'highp',
            powerPreference: 'low-power',
            failIfMajorPerformanceCaveat: true,
          }}
        >
          {children}
          <AdaptiveDpr pixelated />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default memo(WebGLExperience)
