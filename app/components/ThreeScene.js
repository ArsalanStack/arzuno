'use client';
import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Realistic Earth
function RealisticEarth() {
  const earthRef = useRef();
  const cloudsRef = useRef();

  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);

  useFrame((state, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.05;
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.07;
      cloudsRef.current.rotation.z += delta * 0.01;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <group position={[0, -0.5, 0]}>
        <Sphere ref={earthRef} args={[2.5, 64, 64]}>
          <meshPhongMaterial map={colorMap} normalMap={normalMap} specularMap={specularMap} specular={new THREE.Color('grey')} shininess={10} />
        </Sphere>
        <Sphere ref={cloudsRef} args={[2.53, 64, 64]}>
          <meshPhongMaterial map={cloudsMap} transparent opacity={0.8} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} depthWrite={false} />
        </Sphere>
        <Sphere args={[2.65, 64, 64]}>
          <meshBasicMaterial color="#4b9cd3" transparent opacity={0.15} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
        </Sphere>
        {/* Green orbital ring */}
        <mesh rotation={[Math.PI / 2.3, 0, 0]}>
          <torusGeometry args={[3.2, 0.012, 16, 200]} />
          <meshStandardMaterial color="#C1FF00" emissive="#C1FF00" emissiveIntensity={1.5} transparent opacity={0.7} />
        </mesh>
        {/* Blue orbital ring */}
        <mesh rotation={[Math.PI / 3, 0.5, 0]}>
          <torusGeometry args={[3.7, 0.008, 16, 200]} />
          <meshStandardMaterial color="#1A2FFB" emissive="#1A2FFB" emissiveIntensity={2} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

// Central glowing orb — the hero focal point
function PremiumOrb() {
  const orbRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (orbRef.current) {
      orbRef.current.rotation.y = t * 0.12;
      orbRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.25;
      ringRef.current.rotation.x = Math.PI / 2.3 + Math.sin(t * 0.2) * 0.05;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.15;
      ring2Ref.current.rotation.x = Math.PI / 3 + Math.cos(t * 0.18) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
      <group position={[0.5, 0, 0]}>
        {/* Core orb with animated distortion */}
        <Sphere ref={orbRef} args={[1.8, 128, 128]}>
          <MeshDistortMaterial
            color="#0a0a0a"
            emissive="#1A2FFB"
            emissiveIntensity={0.6}
            distort={0.35}
            speed={2}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>

        {/* Inner glow */}
        <Sphere args={[1.82, 64, 64]}>
          <meshBasicMaterial
            color="#C1FF00"
            transparent
            opacity={0.03}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Outer atmosphere glow */}
        <Sphere args={[2.2, 64, 64]}>
          <meshBasicMaterial
            color="#1A2FFB"
            transparent
            opacity={0.06}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>

        {/* Orbital ring 1 */}
        <mesh ref={ringRef} rotation={[Math.PI / 2.3, 0, 0]}>
          <torusGeometry args={[2.6, 0.012, 16, 200]} />
          <meshStandardMaterial
            color="#C1FF00"
            emissive="#C1FF00"
            emissiveIntensity={1.5}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Orbital ring 2 */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0.5, 0]}>
          <torusGeometry args={[3.1, 0.008, 16, 200]} />
          <meshStandardMaterial
            color="#1A2FFB"
            emissive="#1A2FFB"
            emissiveIntensity={2}
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Floating particles that react to mouse
function ParticleField() {
  const group = useRef();
  const { mouse, viewport } = useThree();

  const particles = useMemo(() => {
    return Array.from({ length: 55 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * viewport.width * 3,
        (Math.random() - 0.5) * viewport.height * 3,
        (Math.random() - 0.5) * 18 - 4
      ],
      scale: Math.random() * 0.06 + 0.02,
      color: i % 5 === 0 ? '#C1FF00' : i % 5 === 1 ? '#1A2FFB' : '#ffffff',
      emissive: i % 5 === 0 ? '#C1FF00' : i % 5 === 1 ? '#1A2FFB' : '#333333',
      speed: Math.random() * 1.5 + 0.5,
    }));
  }, [viewport]);

  useFrame((state) => {
    const targetX = (mouse.x * viewport.width) / 12;
    const targetY = (mouse.y * viewport.height) / 12;
    group.current.position.x += (targetX - group.current.position.x) * 0.025;
    group.current.position.y += (targetY - group.current.position.y) * 0.025;
  });

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <Float key={i} speed={p.speed} rotationIntensity={1} floatIntensity={1.5}>
          <mesh position={p.position} scale={p.scale}>
            {i % 3 === 0 ? (
              <octahedronGeometry args={[1, 0]} />
            ) : (
              <sphereGeometry args={[1, 8, 8]} />
            )}
            <meshStandardMaterial
              color={p.color}
              emissive={p.emissive}
              emissiveIntensity={1.2}
              roughness={0.1}
              metalness={1}
              transparent
              opacity={0.75}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <color attach="background" args={['#000000']} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#1A2FFB" />
      <pointLight position={[3, 2, 4]} intensity={2} color="#C1FF00" distance={10} decay={2} />

      <Suspense fallback={null}>
        <RealisticEarth />
      </Suspense>
      <ParticleField />

      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.2} />
    </Canvas>
  );
}
