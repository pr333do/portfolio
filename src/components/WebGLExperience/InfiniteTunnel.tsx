import { useFrame } from '@react-three/fiber'
import { EffectComposer, Grid } from '@react-three/postprocessing'
import { useRef, memo } from 'react'
import * as THREE from 'three'

import fragmentShader from 'assets/shaders/fragment.glsl'
import vertexShader from 'assets/shaders/vertex.glsl'

class CustomSinCurve extends THREE.Curve<THREE.Vector3> {
  scale: number

  constructor(scale = 1) {
    super()

    this.scale = scale
  }

  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    const tx = Math.cos(2 * Math.PI * t)
    const ty = Math.sin(2 * Math.PI * t)
    const tz = 0.12 * Math.sin(10 * Math.PI * t)

    return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale)
  }
}

interface IAnimationConfig {
  normal: THREE.Vector3
  binormal: THREE.Vector3
  geometry: THREE.TubeGeometry
  material: THREE.ShaderMaterial
  camera: THREE.PerspectiveCamera
  light: THREE.PointLight
}

const InfiniteTunnel = () => {
  const animationConfig = useRef<IAnimationConfig>({
    normal: new THREE.Vector3(),
    binormal: new THREE.Vector3(),
    geometry: null,
    material: null,
    camera: null,
    light: null,
  })

  const uniforms = {
    uTime: { type: 'f', value: 0 },
    uPlayhead: { type: 'f', value: 0 },
    uAudioFrequency: { type: 'f', value: 0 },
    uCameraPosition: { type: 'v3', value: new THREE.Vector3() },
  }

  useFrame(({ camera }) => {
    const { geometry, material, binormal, normal, light } =
      animationConfig.current

    const now = Date.now()
    const looptime = 40 * 1000
    const t = (now % looptime) / looptime
    const pos = geometry.parameters.path.getPoint(t)

    const segments = geometry.tangents.length
    const pickt = t * segments
    const pick = Math.floor(pickt)
    const pickNext = (pick + 1) % segments

    binormal.subVectors(geometry.binormals[pickNext], geometry.binormals[pick])
    binormal.multiplyScalar(pickt - pick).add(geometry.binormals[pick])

    const direction = geometry.parameters.path.getTangentAt(t)
    const offset = 0

    normal.copy(binormal).cross(direction)

    pos.add(normal.clone().multiplyScalar(offset))
    camera.position.copy(pos)
    light.position.copy(pos)

    const lookAtPos = geometry.parameters.path.getPoint(
      (t + 1 / geometry.parameters.path.getLength()) % 1,
    )

    camera.matrix.lookAt(camera.position, lookAtPos, normal)
    camera.rotation.setFromRotationMatrix(camera.matrix, camera.rotation.order)

    // Update Uniforms
    material.uniforms.uPlayhead.value = t
    material.uniforms.uTime.value = now
    material.uniforms.uCameraPosition.value = pos
  })

  const path = new CustomSinCurve(10)

  return (
    <>
      <pointLight
        ref={ref => (animationConfig.current.light = ref)}
        color="#ffffff"
        intensity={10}
      />
      <directionalLight color="#ffffff" intensity={1} position={[1, 1, 0]} />

      <mesh>
        <tubeGeometry
          ref={ref => (animationConfig.current.geometry = ref)}
          attach="geometry"
          args={[path, 200, 2, 64, true]}
        />
        <shaderMaterial
          ref={ref => (animationConfig.current.material = ref)}
          attach="material"
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
          side={THREE.DoubleSide}
          needsUpdate
          uniformsNeedUpdate
        />
      </mesh>

      <EffectComposer>
        <Grid scale={1.4} />
      </EffectComposer>
    </>
  )
}

export default memo(InfiniteTunnel)
