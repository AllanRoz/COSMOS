import React from 'react';
import * as THREE from 'three';

const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial(
  {
    emissive: "#ffcc00",
    emissiveIntensity: 2,
    color: "#ffcc00",
  }
);
const sunLight = new THREE.PointLight(
  "#ffcc00",
  2,
  100
);

const Sun = () => {
  return (
    <group>
      <mesh geometry={sunGeometry} material={sunMaterial} />
      <pointLight intensity={2} distance={100} color="#ffcc00" />
    </group>
  );
};

export default Sun;
