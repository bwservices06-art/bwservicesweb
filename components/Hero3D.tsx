"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Scene from "./Scene";
import { Float, Stars, Sparkles, PerspectiveCamera, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AnimatedBackground() {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <group ref={meshRef}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.5} color="#3b82f6" />
            <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.5} color="#8b5cf6" />
        </group>
    );
}

function FloatingElements() {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            {/* Trending Liquid Sphere Effect */}
            <Sphere args={[1, 64, 64]} position={[4, 1, -5]}>
                <MeshDistortMaterial
                    color="#3b82f6"
                    attach="material"
                    distort={0.5}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>

            {/* Abstract geometric shapes */}
            <mesh position={[-4, -2, -5]} rotation={[0.5, 0.5, 0]}>
                <octahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial color="#8b5cf6" wireframe />
            </mesh>
            <mesh position={[3, -3, -2]} rotation={[0.2, 0.2, 0.2]}>
                <torusGeometry args={[0.5, 0.2, 16, 32]} />
                <meshStandardMaterial color="#06b6d4" />
            </mesh>
        </Float>
    );
}

export default function Hero3D() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Scene>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                    <AnimatedBackground />
                    <FloatingElements />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
                </Scene>
            </div>

            {/* Overlay Gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 z-0 pointer-events-none" />

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
                        HireCoders is a premium creative agency specializing in 3D web experiences, robust applications, and strategic digital growth.
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

            {/* Scroll Indicator */}

        </section>
    );
}
