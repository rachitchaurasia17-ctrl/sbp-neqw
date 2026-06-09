import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Image, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import type { Project } from '../../data/projects';

interface Props {
  projects: Project[];
  active: number;
  setActive: (i: number) => void;
  onOpen: (slug: string) => void;
}

export default function Projects3DStack({ projects, active, setActive, onOpen }: Props) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const scaleMultiplier = isMobile ? 0.7 : 1.2;

  // Wheel / scroll event to change active card
  useEffect(() => {
    const handleWheel = () => {
      // Prevent scrolling if user is hovered over the canvas, or just let them scroll normally?
      // Since it's a section, maybe we don't want to hijack the entire window wheel.
      // We will rely on UI buttons or clicking the cards to change them, as hijacking scroll can be annoying.
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [active, projects.length]);

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      
      <group position={isMobile ? [0, 0, 0] : [viewport.width / 4, 0, 0]}>
        {projects.map((p, i) => (
          <ProjectCard 
            key={p.slug} 
            url={p.cover} 
            index={i} 
            activeIndex={active} 
            onClick={() => {
              if (active === i) {
                onOpen(p.slug);
              } else {
                setActive(i);
              }
            }}
            scaleMultiplier={scaleMultiplier}
          />
        ))}
      </group>
      
      {/* Dynamic shadows */}
      <ContactShadows 
        position={[0, -2.5, 0]} 
        opacity={0.4} 
        scale={20} 
        blur={2} 
        far={4.5} 
        color="#000000" 
      />
    </>
  );
}

function ProjectCard({ url, index, activeIndex, onClick, scaleMultiplier }: any) {
  const ref = useRef<any>(null);
  const [hovered, setHover] = useState(false);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    
    const diff = index - activeIndex;
    const isPast = diff < 0;
    
    // Smooth interpolations
    const targetX = isPast ? -8 : diff * 0.6;
    const targetY = isPast ? 0 : -diff * 0.3;
    const targetZ = isPast ? 4 : -diff * 2;
    const targetRotY = isPast ? -Math.PI / 2 : diff * 0.1;
    const targetRotZ = isPast ? -0.2 : -diff * 0.05;

    const targetOpacity = isPast ? 0 : 1 - diff * 0.2;
    const targetScale = isPast ? 1 : 1 - diff * 0.05;

    ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, targetX, 5, delta);
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, targetY, 5, delta);
    ref.current.position.z = THREE.MathUtils.damp(ref.current.position.z, targetZ, 5, delta);
    
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, targetRotY, 5, delta);
    ref.current.rotation.z = THREE.MathUtils.damp(ref.current.rotation.z, targetRotZ, 5, delta);
    
    const finalScale = (targetScale + (hovered && diff === 0 ? 0.05 : 0)) * scaleMultiplier;
    ref.current.scale.setScalar(THREE.MathUtils.damp(ref.current.scale.x, finalScale, 5, delta));
    
    ref.current.material.opacity = THREE.MathUtils.damp(ref.current.material.opacity, targetOpacity, 5, delta);
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, diff === 0 ? (hovered ? 0 : 0.1) : 0.7, 5, delta);
  });

  return (
    <Image
      ref={ref}
      url={url}
      scale={[16/3, 9/3]}
      transparent
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
    />
  );
}
