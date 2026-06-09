import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

export default function Hero3DOverlay() {
  const { viewport } = useThree();
  const mouse = useRef(new THREE.Vector2());

  // Track mouse movements
  useFrame((state) => {
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x * 2, 0.1);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y * 2, 0.1);
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#c9a14a" />
      
      {/* Abstract floating shapes resembling architecture / luxury glass */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        <AbstractShape 
          position={[-viewport.width / 4, 1, -5]} 
          mouse={mouse}
          scale={2}
          color="#c9a14a"
          distort={0.4}
        />
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <AbstractShape 
          position={[viewport.width / 3, -1, -3]} 
          mouse={mouse}
          scale={1.5}
          color="#ffffff"
          distort={0.2}
          metalness={0.8}
        />
      </Float>

      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
         <Box args={[1, 3, 1]} position={[viewport.width / 4, 2, -4]} rotation={[0.5, 0.5, 0]}>
           <meshPhysicalMaterial 
             color="#1a1a1a" 
             metalness={0.9} 
             roughness={0.1} 
             clearcoat={1} 
             clearcoatRoughness={0.1} 
           />
         </Box>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
         <Box args={[0.5, 2, 0.5]} position={[-viewport.width / 3, -2, -2]} rotation={[-0.5, 0.5, 0]}>
           <meshPhysicalMaterial 
             color="#c9a14a" 
             metalness={0.8} 
             roughness={0.2} 
           />
         </Box>
      </Float>
    </>
  );
}

function AbstractShape({ position, mouse, scale, color, distort, metalness = 0.5 }: any) {
  const ref = useRef<any>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x += (mouse.current.x * 0.5 - ref.current.position.x) * 0.05;
      ref.current.position.y += (mouse.current.y * 0.5 - ref.current.position.y) * 0.05;
    }
  });

  return (
    <group position={position}>
      <Sphere ref={ref} args={[1, 64, 64]} scale={scale}>
        <MeshDistortMaterial
          color={color}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={metalness}
          roughness={0.1}
          distort={distort}
          speed={2}
        />
      </Sphere>
    </group>
  );
}
