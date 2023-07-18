import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "react-three-fiber";

export function House(props) {
  const { nodes, materials } = useGLTF("/house.gltf");
  const group = useRef();

  // Ajusta la posición inicial del modelo en los ejes X, Y y Z
  
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01; // Controla la rotación en el eje Y
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.defaultMaterial.geometry}
          material={materials.NikeShoe}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/house.gltf");
