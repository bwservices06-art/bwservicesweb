"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
    tags: string;
}

const initialProjects: Project[] = [];

export default function Work() {
    const [projects, setProjects] = useState<Project[]>(initialProjects);

    useEffect(() => {
        const projectsRef = ref(db, "projects");
        onValue(projectsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const fetchedProjects = Object.entries(data).map(([k, v]: [string, any]) => ({ id: k, ...v }));
                setProjects([...initialProjects, ...fetchedProjects]);
            }
        });
    }, []);

    return (
        <section id="work" className="py-24">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6"
                >
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Work</h2>
                        <p className="text-foreground/60 max-w-xl">
                            A showcase of our recent projects, featuring custom web applications, mobile apps, and design systems.
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface border border-white/5 shadow-2xl"
                        >
                            <Image
                                src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-100 transition-all duration-500 p-8 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                                <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.split(",").map((tag, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium backdrop-blur-sm border border-primary/10">
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                                <Link
                                    href={project.link}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors font-medium group/link"
                                >
                                    View Project <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
