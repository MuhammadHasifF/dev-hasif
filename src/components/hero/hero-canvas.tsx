"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

function Particles({ count = 1200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color("#7c5cff");
    const c2 = new THREE.Color("#00d4ff");
    const c3 = new THREE.Color("#ff6b9d");
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const mix = Math.random();
      const c = mix < 0.5 ? c1.clone().lerp(c2, mix * 2) : c2.clone().lerp(c3, (mix - 0.5) * 2);
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.06 + pointer.x * 0.3;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.2 + pointer.y * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function DistortSphere() {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const baseGeo = useMemo(() => new THREE.IcosahedronGeometry(1.6, 24), []);
  const original = useMemo(() => {
    const a = baseGeo.attributes.position.array as Float32Array;
    return new Float32Array(a);
  }, [baseGeo]);

  useFrame(({ clock, pointer }) => {
    if (!mesh.current || !group.current) return;
    const t = clock.getElapsedTime();
    const geo = mesh.current.geometry as THREE.BufferGeometry;
    const pos = geo.attributes.position.array as Float32Array;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.length; i += 3) {
      v.set(original[i], original[i + 1], original[i + 2]);
      const n = noise3(v.x * 0.9 + t * 0.4, v.y * 0.9, v.z * 0.9 - t * 0.3);
      const f = 1 + n * 0.18 + Math.sin(t + v.x) * 0.02;
      pos[i] = original[i] * f;
      pos[i + 1] = original[i + 1] * f;
      pos[i + 2] = original[i + 2] * f;
    }
    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();

    group.current.rotation.y = t * 0.15 + pointer.x * 0.4;
    group.current.rotation.x = Math.sin(t * 0.12) * 0.08 + pointer.y * 0.2;
  });

  return (
    <group ref={group}>
      <mesh ref={mesh} geometry={baseGeo}>
        <meshPhysicalMaterial
          color="#7c5cff"
          roughness={0.25}
          metalness={0.4}
          transmission={0.35}
          thickness={1.4}
          ior={1.3}
          clearcoat={1}
          clearcoatRoughness={0.2}
          emissive="#00d4ff"
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh scale={1.06} geometry={baseGeo}>
        <meshBasicMaterial
          color="#7c5cff"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Cheap deterministic value noise — no external deps
function noise3(x: number, y: number, z: number) {
  const s = Math.sin(x * 1.9 + y * 2.3 + z * 1.5);
  const c = Math.cos(x * 2.7 - y * 1.1 + z * 2.9);
  return (s + c) * 0.35;
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        className="!h-full !w-full"
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#0a0a0b"]} />
          <fog attach="fog" args={["#0a0a0b", 6, 14]} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 5, 3]} intensity={1.6} color="#00d4ff" />
          <directionalLight position={[-4, -3, -2]} intensity={0.9} color="#ff6b9d" />
          <DistortSphere />
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
}
