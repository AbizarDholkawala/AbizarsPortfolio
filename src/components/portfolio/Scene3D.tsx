import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function DistortedOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere ref={ref} args={[1.1, 64, 64]} position={[-1.6, 0.2, 0]}>
        <MeshDistortMaterial
          color="#7c3aed"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.15}
          metalness={0.85}
          emissive="#22d3ee"
          emissiveIntensity={0.25}
        />
      </Sphere>
    </Float>
  );
}

function FloatingShape({ position, color, geometry }: { position: [number, number, number]; color: string; geometry: "box" | "tetra" | "torus" }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.4;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={ref} position={position} scale={0.35} castShadow receiveShadow>
        {geometry === "box" && <boxGeometry />}
        {geometry === "tetra" && <tetrahedronGeometry />}
        {geometry === "torus" && <torusGeometry args={[1, 0.35, 16, 32]} />}
        <meshPhysicalMaterial
          color={color}
          metalness={0.95}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.05}
          reflectivity={1}
          emissive={color}
          emissiveIntensity={0.45}
          envMapIntensity={1.6}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ powerPreference: "high-performance", antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} color="#22d3ee" />
        <directionalLight position={[-5, -3, 2]} intensity={1} color="#a855f7" />
        <pointLight position={[0, 3, 4]} intensity={1.2} color="#f472b6" />
        <spotLight position={[3, 4, 2]} intensity={1.5} angle={0.5} penumbra={1} color="#ffffff" />
        <Stars radius={50} depth={50} count={1000} factor={3} fade speed={0.5} />
        <DistortedOrb />
        <FloatingShape position={[-2.8, 1.6, 0]} color="#22d3ee" geometry="tetra" />
        <FloatingShape position={[2.6, -1.6, 0.5]} color="#a855f7" geometry="torus" />
        <FloatingShape position={[-2.6, -1.4, 0.5]} color="#f472b6" geometry="box" />
        <FloatingShape position={[2.8, 1.4, -0.5]} color="#22d3ee" geometry="box" />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
