import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";

import * as THREE from "three";
import gsap from "gsap";
import { motion } from "framer-motion";

function Tunnel() {
    const tunnelRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (tunnelRef.current) {
            // Glow lines rocket towards camera much faster
            const time = state.clock.getElapsedTime();
            (tunnelRef.current.material as THREE.MeshStandardMaterial).map?.offset.set(0, -time * 15);
        }
    });

    return (
        // Tunnel is centered at z = 150, length 300 (goes from z=300 to z=0)
        <mesh ref={tunnelRef} position={[0, 0, 150]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[6, 6, 300, 32, 200, true]} />
            <meshStandardMaterial
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={5}
                wireframe={true}
                transparent
                opacity={0.25}
                toneMapped={false}
            />
        </mesh>
    );
}

function Chip() {
    return (
        <group position={[0, -2, -20]}>
            {/* Main Body */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[6, 0.5, 6]} />
                <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* STM32 central core area */}
            <mesh position={[0, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[3.5, 3.5]} />
                <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Glowing Pins */}
            {Array.from({ length: 40 }).map((_, i) => {
                const sideIndex = Math.floor(i / 10);
                const pinIndex = i % 10;
                const offset = (pinIndex - 4.5) * 0.5;

                let pos: [number, number, number] = [0, 0, 0];
                let rot: [number, number, number] = [0, 0, 0];

                if (sideIndex === 0) { pos = [3.1, 0, offset]; rot = [0, 0, Math.PI / 2]; }
                if (sideIndex === 1) { pos = [-3.1, 0, offset]; rot = [0, 0, Math.PI / 2]; }
                if (sideIndex === 2) { pos = [offset, 0, 3.1]; rot = [Math.PI / 2, 0, 0]; }
                if (sideIndex === 3) { pos = [offset, 0, -3.1]; rot = [Math.PI / 2, 0, 0]; }

                return (
                    <mesh key={i} position={pos} rotation={rot}>
                        <cylinderGeometry args={[0.08, 0.08, 0.5]} />
                        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={12} toneMapped={false} />
                    </mesh>
                );
            })}
        </group>
    );
}

function MagneticRings({ locked }: { locked: boolean }) {
    const ringsRef = useRef<THREE.Group>(null);
    const ring1Ref = useRef<THREE.Mesh>(null);
    const ring2Ref = useRef<THREE.Mesh>(null);
    const ring3Ref = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (!locked) {
            if (ring1Ref.current) ring1Ref.current.rotation.x += delta * 3;
            if (ring2Ref.current) ring2Ref.current.rotation.y += delta * 4;
            if (ring3Ref.current) ring3Ref.current.rotation.z += delta * 5;
        } else {
            // Snap to place if locked
            if (ring1Ref.current) ring1Ref.current.rotation.x = THREE.MathUtils.lerp(ring1Ref.current.rotation.x, 0, 0.2);
            if (ring2Ref.current) ring2Ref.current.rotation.y = THREE.MathUtils.lerp(ring2Ref.current.rotation.y, Math.PI / 2, 0.2);
            if (ring3Ref.current) ring3Ref.current.rotation.z = THREE.MathUtils.lerp(ring3Ref.current.rotation.z, Math.PI / 4, 0.2);
        }
    });

    return (
        <group ref={ringsRef} position={[0, -2, -20]}>
            <mesh ref={ring1Ref}>
                <torusGeometry args={[7, 0.07, 16, 100]} />
                <meshStandardMaterial color="#ff5500" emissive="#ff5500" emissiveIntensity={8} toneMapped={false} />
            </mesh>
            <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[8.5, 0.07, 16, 100]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={7} toneMapped={false} />
            </mesh>
            <mesh ref={ring3Ref} rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[10, 0.07, 16, 100]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={6} toneMapped={false} />
            </mesh>
            <Sparkles count={locked ? 80 : 300} scale={20} size={4} color="#00ffff" speed={locked ? 0.2 : 3} noise={2} />
        </group>
    );
}

function SceneDirector({ onLockIn, locked }: { onLockIn: () => void, locked: boolean }) {
    const { camera } = useThree();

    useEffect(() => {
        // Initial Position far back inside the tunnel
        camera.position.set(0, 0, 200);
        camera.rotation.set(0, 0, 0);

        // Sequence Animation
        const tl = gsap.timeline({
            onComplete: () => {
                onLockIn();
            }
        });

        // Phase 3: Warp Speed FOV and Rocket forward
        tl.to(camera.position, {
            z: 50, // Approach the end of the tunnel
            duration: 1.2,
            ease: "power2.in",
        }, 0);

        // Animate FOV (warp speed effect)
        tl.to((camera as THREE.PerspectiveCamera), {
            fov: 130,
            duration: 1.2,
            ease: "power2.in",
            onUpdate: () => (camera as THREE.PerspectiveCamera).updateProjectionMatrix(),
        }, 0);

        // Burst out of the tunnel (tunnel ends at 0) and spiral up towards the chip at -20
        tl.to(camera.position, {
            z: -5,
            y: 12,
            x: 15,
            duration: 1.5,
            ease: "power3.inOut"
        }, 1.2);

        tl.to(camera.rotation, {
            x: -Math.PI / 4,
            y: Math.PI / 6,
            z: Math.PI / 8,
            duration: 1.5,
            ease: "power3.inOut"
        }, 1.2);

        // Normalize FOV during the spiral breakout
        tl.to((camera as THREE.PerspectiveCamera), {
            fov: 60,
            duration: 1.5,
            ease: "power3.inOut",
            onUpdate: () => (camera as THREE.PerspectiveCamera).updateProjectionMatrix(),
        }, 1.2);

        // Phase 4: The Hero Lock-In (Snap tighter and immediate over the chip)
        tl.to(camera.position, {
            x: 12,
            y: 8,
            z: -8,
            duration: 0.5,
            ease: "power4.out"
        }, 2.8);

        tl.to(camera.rotation, {
            x: -Math.PI / 5,
            y: Math.PI / 4,
            z: 0,
            duration: 0.5,
            ease: "power4.out"
        }, 2.8);

        tl.to((camera as THREE.PerspectiveCamera), {
            fov: 45,
            duration: 0.5,
            ease: "power4.out",
            onUpdate: () => (camera as THREE.PerspectiveCamera).updateProjectionMatrix(),
        }, 2.8);

    }, [camera, onLockIn]);

    return null;
}

export default function ElectricalScene({ onLockIn }: { onLockIn?: () => void }) {
    const [locked, setLocked] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleLockIn = () => {
        setLocked(true);
        // Mechanical THUD: GSAP Screen shake
        if (containerRef.current) {
            gsap.fromTo(containerRef.current,
                { y: 30, rotation: 2 },
                { y: 0, rotation: 0, duration: 0.6, ease: "bounce.out" }
            );
        }
    };

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-[#020202] overflow-hidden">
            <Canvas
                shadows
                camera={{ position: [0, 0, 200], fov: 45 }}
                gl={{ antialias: false, powerPreference: "high-performance" }} // Antialias false is better for postprocessing
            >
                <color attach="background" args={["#010101"]} />
                <ambientLight intensity={0.2} />
                <spotLight position={[10, 30, 10]} intensity={5} color="#00ffff" penumbra={1} castShadow />
                <pointLight position={[-10, -5, -30]} intensity={3} color="#ff5500" />

                <Environment preset="night" />

                <Tunnel />
                <Chip />
                <MagneticRings locked={locked} />

                <SceneDirector onLockIn={handleLockIn} locked={locked} />


            </Canvas>

            {/* Phase 4 Hero Text Overlay */}
            {locked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                    <motion.div
                        initial={{ scale: 1.5, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                        className="relative flex flex-col items-center"
                    >
                        {/* The base text with a glowing drop shadow instead of heavy strokes */}
                        <h1
                            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white select-none uppercase tracking-tighter"
                            style={{ textShadow: "0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(0,255,255,0.3)" }}
                        >
                            ANUPRIYA D
                        </h1>

                        {/* Red Aberration */}
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#ff0000] absolute top-0 left-0 opacity-60 select-none uppercase tracking-tighter mix-blend-screen" style={{ transform: "translate(-5px, 3px)" }}>
                            ANUPRIYA D
                        </h1>

                        {/* Blue Aberration */}
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#00ffff] absolute top-0 left-0 opacity-60 select-none uppercase tracking-tighter mix-blend-screen" style={{ transform: "translate(5px, -3px)" }}>
                            ANUPRIYA D
                        </h1>

                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "100%" }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="h-1 bg-gradient-to-r from-transparent via-[#00ffff] to-transparent mt-4 max-w-lg w-full"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-center text-[#00ffff] font-mono mt-4 tracking-widest text-xs sm:text-sm md:text-base font-bold uppercase drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
                        >
                            Bridging Hardware & Code
                        </motion.p>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
