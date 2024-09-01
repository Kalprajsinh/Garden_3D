/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 .\Garlic_GLTF.gltf 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/Immunity_plant/Garlic_GLTF.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes['Node_#0'].geometry} material={nodes['Node_#0'].material} />
    </group>
  )
}

useGLTF.preload('/Immunity_plant/Garlic_GLTF.gltf')
