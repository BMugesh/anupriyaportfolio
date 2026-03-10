import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// PCB Board component
const PCBBoard = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.x = -0.3 + Math.sin(t * 0.2) * 0.02;
    groupRef.current.rotation.y = 0.4 + t * 0.05;
    // Exploded view effect on scroll
    groupRef.current.position.y = scrollProgress * -2;
  });

  return (
    <group ref={groupRef}>
      {/* Main board */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 0.1, 3]} />
        <meshStandardMaterial color="#0a2a2a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* IC Chip center */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[1, 0.15, 1]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Chip pins */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`pin-x-${i}`} position={[-0.6 + i * 0.15, 0.08, 0.6]}>
          <boxGeometry args={[0.05, 0.02, 0.15]} />
          <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.1} />
        </mesh>
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`pin-x2-${i}`} position={[-0.6 + i * 0.15, 0.08, -0.6]}>
          <boxGeometry args={[0.05, 0.02, 0.15]} />
          <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.1} />
        </mesh>
      ))}

      {/* Capacitors */}
      {[[-1.2, 0.15, 0.8], [1.3, 0.15, -0.5], [-0.8, 0.15, -1]].map((pos, i) => (
        <mesh key={`cap-${i}`} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.08, 0.08, 0.2, 8]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* Copper traces */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 0.6;
        return (
          <mesh key={`trace-${i}`} position={[Math.cos(angle) * r, 0.06, Math.sin(angle) * r]} rotation={[0, angle, 0]}>
            <boxGeometry args={[0.8, 0.005, 0.02]} />
            <meshStandardMaterial color="#ffb000" emissive="#ffb000" emissiveIntensity={0.3} metalness={1} roughness={0.2} />
          </mesh>
        );
      })}

      {/* Neon trace lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`neon-${i}`} position={[-1.8 + i * 0.7, 0.06, 1.2 - (i % 2) * 2.4]}>
          <boxGeometry args={[0.5, 0.005, 0.015]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

// Floating particles
const Particles = () => {
  const count = 80;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 12;
      arr[i + 1] = (Math.random() - 0.5) * 8;
      arr[i + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#00f3ff" size={0.03} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
};

// Camera animator
const CameraAnimator = ({ phase }: { phase: "macro" | "surge" | "reveal" | "locked" }) => {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (phase === "macro") {
      camera.position.lerp(new THREE.Vector3(0.5, 0.3, 1.5), 0.02);
      camera.lookAt(0, 0, 0);
    } else if (phase === "surge") {
      camera.position.lerp(new THREE.Vector3(Math.sin(t * 0.5) * 2, 0.5, 2.5), 0.03);
      camera.lookAt(0, 0, 0);
    } else if (phase === "reveal" || phase === "locked") {
      camera.position.lerp(new THREE.Vector3(3, 2.5, 4), 0.02);
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
};

// Cursor light
const CursorLight = () => {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!lightRef.current) return;
      const x = ((e.clientX / window.innerWidth) * 2 - 1) * viewport.width * 0.5;
      const y = (-(e.clientY / window.innerHeight) * 2 + 1) * viewport.height * 0.5;
      lightRef.current.position.set(x, y, 3);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [viewport]);

  return <pointLight ref={lightRef} color="#00f3ff" intensity={2} distance={8} />;
};

const HeroScene3D = ({ scrollProgress = 0 }: { scrollProgress?: number }) => {
  const [cameraPhase, setCameraPhase] = useState<"macro" | "surge" | "reveal" | "locked">("macro");

  useEffect(() => {
    const t1 = setTimeout(() => setCameraPhase("surge"), 1500);
    const t2 = setTimeout(() => setCameraPhase("reveal"), 3000);
    const t3 = setTimeout(() => setCameraPhase("locked"), 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0.5, 0.3, 1.5], fov: 50 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#ffffff" />
      <pointLight position={[-3, 2, -3]} intensity={0.5} color="#00f3ff" />
      <pointLight position={[3, 1, 3]} intensity={0.3} color="#ffb000" />

      <CursorLight />
      <CameraAnimator phase={cameraPhase} />
      <PCBBoard scrollProgress={scrollProgress} />
      <Particles />
    </Canvas>
  );
};

export default HeroScene3D;
