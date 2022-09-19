import { Canvas } from '@react-three/fiber'
import { memo, ReactNode } from 'react'

interface IWebGLExperienceProps {
  children: ReactNode
  frameloop?: 'never' | 'always' | 'demand'
}

const WebGLExperience = ({
  children,
  frameloop = 'always',
}: IWebGLExperienceProps) => {
  return (
    <div className="web-gl-experience">
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
        id="canvas"
        frameloop={frameloop}
      >
        {children}
      </Canvas>
    </div>
  )
}

export default memo(WebGLExperience)
