'use client';
import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Stars, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function RealisticEarth() {
  const earthRef = useRef();
  const cloudsRef = useRef();

  // Load public domain high-res Earth textures from three.js repo
  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.05;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.07;
      cloudsRef.current.rotation.z += delta * 0.01;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <group position={[0, -0.5, 0]}>
        {/* Earth Mesh */}
        <Sphere ref={earthRef} args={[2.5, 64, 64]}>
          <meshPhongMaterial
            map={colorMap}
            normalMap={normalMap}
            specularMap={specularMap}
            specular={new THREE.Color('grey')}
            shininess={10}
          />
        </Sphere>
        
        {/* Cloud Layer */}
        <Sphere ref={cloudsRef} args={[2.53, 64, 64]}>
          <meshPhongMaterial
            map={cloudsMap}
            transparent={true}
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </Sphere>
        
        {/* Atmosphere Glow */}
        <Sphere args={[2.65, 64, 64]}>
          <meshBasicMaterial 
            color="#4b9cd3" 
            transparent={true} 
            opacity={0.15} 
            blending={THREE.AdditiveBlending} 
            side={THREE.BackSide} 
          />
        </Sphere>
      </group>
    </Float>
  );
}

function FloatingGeometries() {
  const group = useRef();
  const { mouse, viewport } = useThree();

  const geometries = useMemo(() => {
    return Array.from({ length: 40 }, () => ({
      position: [
        (Math.random() - 0.5) * viewport.width * 2.5,
        (Math.random() - 0.5) * viewport.height * 2.5,
        (Math.random() - 0.5) * 20 - 5
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      scale: Math.random() * 0.15 + 0.05,
      type: Math.random() > 0.8 ? 'icosahedron' : 'sphere'
    }));
  }, [viewport]);

  useFrame(() => {
    const targetX = (mouse.x * viewport.width) / 10;
    const targetY = (mouse.y * viewport.height) / 10;
    
    group.current.position.x += (targetX - group.current.position.x) * 0.02;
    group.current.position.y += (targetY - group.current.position.y) * 0.02;
    
    const targetRotY = window.scrollY * 0.001;
    const targetRotX = window.scrollY * 0.0005;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotY, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotX, 0.05);
  });

  return (
    <group ref={group}>
      {geometries.map((geo, i) => (
        <Float key={i} speed={1} rotationIntensity={2} floatIntensity={2}>
          <mesh position={geo.position} rotation={geo.rotation} scale={geo.scale}>
            {geo.type === 'icosahedron' ? (
              <icosahedronGeometry args={[1, 0]} />
            ) : (
              <sphereGeometry args={[1, 16, 16]} />
            )}
            <meshStandardMaterial 
              color={i % 4 === 0 ? "#1A2FFB" : i % 4 === 1 ? "#C1FF00" : "#FFFFFF"} 
              emissive={i % 4 === 0 ? "#1A2FFB" : "#000000"}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Central Realistic Earth */}
      <Suspense fallback={null}>
        <RealisticEarth />
      </Suspense>
    </group>
  );
}

export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <color attach="background" args={['#000000']} />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#1A2FFB" />
      
      <FloatingGeometries />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.2} />
    </Canvas>
  );
}
