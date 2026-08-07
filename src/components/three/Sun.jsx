import React from 'react';


const Sun = () => {
  return (
    <mesh>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial 
        emissive="#ffcc00" 
        emissiveIntensity={2} 
        color="#ffcc00" 
      />
      <pointLight intensity={2} distance={100} color="#ffcc00" />
    </mesh>
  );
};

export default Sun;
