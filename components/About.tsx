"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";

interface Developer {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
}

const initialDevelopers: Developer[] = [];

export default function About() {
    const [developers, setDevelopers] = useState<Developer[]>(initialDevelopers);

    useEffect(() => {
        const developersRef = ref(db, "developers");
        onValue(developersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Create a map of existing developers for easy lookup/replacement
                const devMap = new Map(initialDevelopers.map(d => [d.id, d]));

                // Update or add new developers from Firebase
                Object.entries(data).forEach(([k, v]: [string, any]) => {
                    devMap.set(k, { id: k, ...v });
                });

                setDevelopers(Array.from(devMap.values()));
            }
        });
    }, []);

    return (
        <section id="about" className="py-24">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Meet the Developers</h2>
                    <p className="text-foreground/60 max-w-2xl mx-auto">
                        We are a team of passionate developers and designers dedicated to building exceptional digital experiences.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {developers.map((dev, index) => (
                        <motion.div
                            key={dev.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10, scale: 1.02, rotateX: 2, rotateY: -2 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="glass-card p-8 rounded-2xl flex flex-col items-center text-center border border-white/5 hover:border-primary/30 shadow-lg hover:shadow-primary/10 transition-all duration-300"
                        >
                            <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-primary/20">
                                <Image
                                    src={dev.image}
                                    alt={dev.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{dev.name}</h3>
                            <p className="text-primary font-medium mb-4">{dev.role}</p>
                            <p className="text-foreground/60 leading-relaxed">
                                {dev.bio}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
