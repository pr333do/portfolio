import { Effect } from 'postprocessing'
import React, { forwardRef, useMemo } from 'react'
import { Uniform } from 'three'

const fragmentShader = `some_shader_code`

let _uParam

// Effect implementation
class UnrealBloomEffectImpl extends Effect {
  constructor({ param = 0.1 } = {}) {
    super('MyCustomEffect', fragmentShader, {
      uniforms: new Map([['param', new Uniform(param)]]),
    })

    _uParam = param
  }

  update(renderer, inputBuffer, deltaTime) {
    this.uniforms.get('param').value = _uParam
  }
}

const UnrealBloomC = ({ param }, ref) => {
  const effect = useMemo(() => new UnrealBloomEffectImpl(param), [param])
  return <primitive ref={ref} object={effect} dispose={null} />
}

// Effect component
export const UnrealBloom = forwardRef(UnrealBloomC)
