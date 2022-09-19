import { useFrame } from '@react-three/fiber'
import { EffectComposer, Grid, Bloom } from '@react-three/postprocessing'
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
  now: number
}

const InfiniteTunnel = () => {
  const animationConfig = useRef<IAnimationConfig>({
    normal: new THREE.Vector3(),
    binormal: new THREE.Vector3(),
    geometry: null,
    material: null,
    camera: null,
    light: null,
    now: Date.now(),
  })

  const uniforms = {
    uTime: { type: 'f', value: 0 },
    uPlayhead: { type: 'f', value: 0 },
    uAudioFrequency: { type: 'f', value: 0 },
    uCameraPosition: { type: 'v3', value: new THREE.Vector3() },
  }

  const path = new CustomSinCurve(10)

  useFrame(({ camera }) => {
    const { geometry, material, binormal, normal, now } =
      animationConfig.current

    const looptime = 40 * 1000
    const t = (now % looptime) / looptime
    const pos = geometry.parameters.path.getPoint(t)

    animationConfig.current.now += 10

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

  return (
    <>
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

      <EffectComposer multisampling={8}>
        <Grid scale={2} lineWidth={0.001} />
        <Bloom radius={0} luminanceThreshold={0} intensity={1.2} />
      </EffectComposer>
    </>
  )
}

export default memo(InfiniteTunnel)
