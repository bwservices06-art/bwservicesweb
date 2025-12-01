"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Scene from "./Scene";
import { Float, Stars, Sparkles, PerspectiveCamera, Text3D, Center, useMatcapTexture, Wireframe } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DigitalGrid() {
    const gridRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (gridRef.current) {
            gridRef.current.rotation.x = Math.PI / 2.5;
            gridRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
            gridRef.current.position.y = -2;
        }
    });

    return (
        <group ref={gridRef}>
            <gridHelper args={[50, 50, 0x3b82f6, 0x1e3a8a]} />
        </group>
    );
}

function CodeParticle({ position }: { position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Float speed={2} rotationIntensity={2} floatIntensity={2}>
            <mesh
                ref={meshRef}
                position={position}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <icosahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial color={hovered ? "#ffffff" : "#3b82f6"} wireframe />
            </mesh>
        </Float>
    );
}

function FloatingCode() {
    const particles = Array.from({ length: 20 }).map((_, i) => ({
        position: [
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5
        ] as [number, number, number]
    }));

    return (
        <group>
            {particles.map((p, i) => (
                <CodeParticle key={i} position={p.position} />
            ))}
        </group>
    );
}

export default function Hero3D() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-60">
                <Scene>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                    <color attach="background" args={["#000000"]} />
                    <fog attach="fog" args={["#000000", 5, 20]} />

                    <DigitalGrid />
                    <FloatingCode />

                    <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
                    <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.5} color="#8b5cf6" />

                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
                </Scene>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 z-0 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 z-0 pointer-events-none" />

            <div className="container mx-auto px-6 text-center z-10 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="pointer-events-auto"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-block px-6 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-primary mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                    >
                        🚀 Transforming Ideas into Digital Reality
                    </motion.span>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 drop-shadow-2xl">
                        We Build <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 animate-gradient-x">
                            Future-Ready
                        </span> <br />
                        Experiences.
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md">
                        BW Services is a premium creative agency specializing in 3D web experiences, robust applications, and strategic digital growth.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="#contact"
                            className="group relative px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all flex items-center gap-2 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Start a Project
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                        </Link>

                        <Link
                            href="#work"
                            className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-semibold text-lg hover:bg-white/10 transition-colors backdrop-blur-sm hover:border-white/20"
                        >
                            View Our Work
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
