"use client";

import { motion } from "framer-motion";

const technologies = [
    "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Three.js",
    "Framer Motion", "Firebase", "MongoDB", "PostgreSQL", "GraphQL", "Docker",
    "AWS", "Figma", "Adobe XD", "Blender"
];

export default function TechStack() {
    return (
        <section className="py-12 border-y border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex flex-shrink-0 gap-8 md:gap-12 whitespace-nowrap px-6"
                >
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="text-xl md:text-3xl font-bold text-foreground/20 uppercase tracking-widest hover:text-primary transition-colors cursor-default"
                        >
                            {tech}
                        </span>
                    ))}
                </motion.div>
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex flex-shrink-0 gap-8 md:gap-12 whitespace-nowrap px-6"
                >
                    {technologies.map((tech, index) => (
                        <span
                            key={`duplicate-${index}`}
                            className="text-xl md:text-3xl font-bold text-foreground/20 uppercase tracking-widest hover:text-primary transition-colors cursor-default"
                        >
                            {tech}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
