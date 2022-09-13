import { Canvas } from '@react-three/fiber'
import { memo, ReactNode } from 'react'

interface IWebGLExperienceProps {
  children: ReactNode
}

const WebGLExperience = ({ children }: IWebGLExperienceProps) => {
  return (
    <div className="web-gl-experience">
      <Canvas
        linear
        gl={{
          antialias: false,
          alpha: false,
          precision: 'highp',
          powerPreference: 'low-power',
          failIfMajorPerformanceCaveat: true,
        }}
      >
        {children}
      </Canvas>
    </div>
  )
}

export default memo(WebGLExperience)
