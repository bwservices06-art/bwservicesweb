"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";

interface ProcessStep {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export default function Process() {
    const [steps, setSteps] = useState<ProcessStep[]>([]);

    useEffect(() => {
        const processRef = ref(db, "process");
        onValue(processRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const fetchedSteps = Object.entries(data).map(([k, v]: [string, any]) => ({ id: k, ...v }));
                setSteps(fetchedSteps);
            }
        });
    }, []);

    const renderIcon = (iconName: string) => {
        const Icon = (LucideIcons as any)[iconName];
        return Icon ? <Icon className="w-6 h-6" /> : <LucideIcons.Circle className="w-6 h-6" />;
    };

    return (
        <section className="py-24 bg-surface/30 overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Process</h2>
                    <p className="text-foreground/60 max-w-2xl mx-auto">
                        A proven workflow that ensures transparency, efficiency, and exceptional results.
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Central Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent -translate-x-1/2 hidden md:block" />

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                            >
                                {/* Content Side */}
                                <div className={`flex-1 text-center ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                                    <h3 className="text-2xl font-bold mb-4 text-primary">{step.title}</h3>
                                    <p className="text-foreground/70 leading-relaxed max-w-md mx-auto md:mx-0 inline-block">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Center Node */}
                                <div className="relative z-10 flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-surface border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(59,130,246,0.2)] group hover:scale-110 transition-transform duration-300">
                                        {renderIcon(step.icon)}
                                    </div>
                                </div>

                                {/* Spacer Side */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
