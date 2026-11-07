import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function Dots() {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors, sizes } = useMemo(() => {
    const N = 1800;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const sz = new Float32Array(N);
    // India approx: lat 22N, lon 78E
    const indiaLat = (22 * Math.PI) / 180;
    const indiaLon = (78 * Math.PI) / 180;
    for (let i = 0; i < N; i++) {
      // Fibonacci sphere
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Distance to India point on unit sphere
      const ix = Math.cos(indiaLat) * Math.cos(indiaLon);
      const iy = Math.sin(indiaLat);
      const iz = Math.cos(indiaLat) * Math.sin(indiaLon);
      const d = Math.acos(Math.min(1, x * ix + y * iy + z * iz));
      if (d < 0.18) {
        col[i * 3] = 1; col[i * 3 + 1] = 0.45; col[i * 3 + 2] = 0.7;
        sz[i] = 0.045;
      } else {
        col[i * 3] = 0.55; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 1;
        sz[i] = 0.018;
      }
    }
    return { positions: pos, colors: col, sizes: sz };
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.25;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial vertexColors size={0.025} sizeAttenuation transparent opacity={0.95} />
    </points>
  );
}

function GlowSphere() {
  return (
    <mesh>
      <sphereGeometry args={[0.98, 64, 64]} />
      <meshBasicMaterial color="#0b1220" />
    </mesh>
  );
}

export default function Globe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <GlowSphere />
        <Dots />
      </Suspense>
    </Canvas>
  );
}
