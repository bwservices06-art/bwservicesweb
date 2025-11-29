"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
    {
        icon: <Search className="w-6 h-6" />,
        title: "Discovery",
        description: "We start by understanding your goals, target audience, and project requirements to build a solid foundation.",
    },
    {
        icon: <PenTool className="w-6 h-6" />,
        title: "Design",
        description: "Our designers create intuitive, stunning interfaces that align with your brand identity and user needs.",
    },
    {
        icon: <Code2 className="w-6 h-6" />,
        title: "Development",
        description: "We bring designs to life using clean, scalable code and the latest technologies for optimal performance.",
    },
    {
        icon: <Rocket className="w-6 h-6" />,
        title: "Launch",
        description: "After rigorous testing, we deploy your project and provide ongoing support to ensure long-term success.",
    },
];

export default function Process() {
    return (
        <section className="py-24 bg-surface/30">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Process</h2>
                    <p className="text-foreground/60 max-w-2xl mx-auto">
                        A proven workflow that ensures transparency, efficiency, and exceptional results.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    {/* Connecting Line (Desktop) */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-y-1/2 z-0 origin-left"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-background border border-primary/30 flex items-center justify-center text-primary mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-foreground/60 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
