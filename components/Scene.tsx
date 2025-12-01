"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

export default function Scene({ children }: { children: React.ReactNode }) {
    return (
        <div className="absolute inset-0 -z-10">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    {children}
                    <Environment preset="city" />
                    {/* <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} /> */}
                </Suspense>
            </Canvas>
        </div>
    );
}
