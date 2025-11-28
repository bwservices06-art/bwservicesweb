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

const initialProjects: Project[] = [
    {
        id: "arcwell",
        title: "ArcWell AI",
        description: "An AI-powered wellness platform offering personalized health insights and tracking.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
        link: "https://github.com/shampatil23",
        tags: "Next.js, AI, Tailwind"
    },
    {
        id: "ks-esports",
        title: "KS ESPORTS",
        description: "A dynamic esports tournament platform for gamers to compete and win prizes.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
        link: "https://github.com/shampatil23",
        tags: "React, Firebase, Gaming"
    },
    {
        id: "woshild",
        title: "Woshild",
        description: "A modern e-commerce solution for sustainable fashion brands.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
        link: "https://github.com/shampatil23",
        tags: "Shopify, Liquid, CSS"
    },
    {
        id: "greenroots",
        title: "GreenRoots",
        description: "An agricultural tech app connecting farmers directly with consumers.",
        image: "https://images.unsplash.com/photo-1625246333195-f8196812c850?q=80&w=2070&auto=format&fit=crop",
        link: "https://github.com/shampatil23",
        tags: "Flutter, Node.js, MongoDB"
    },
    {
        id: "fitness-tracker",
        title: "Fitness Tracker",
        description: "A comprehensive workout and diet tracking application.",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop",
        link: "https://github.com/shampatil23",
        tags: "React Native, Redux"
    },
    {
        id: "flashcard-quiz",
        title: "Flashcard Quiz App",
        description: "An interactive learning tool for students to create and study flashcards.",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop",
        link: "https://github.com/shampatil23",
        tags: "React, TypeScript"
    },
    {
        id: "random-quote",
        title: "Random Quote Generator",
        description: "A simple yet elegant app that serves daily inspirational quotes.",
        image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop",
        link: "https://github.com/shampatil23",
        tags: "JavaScript, API"
    }
];

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
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Selected Work</h2>
                        <p className="text-foreground/60 max-w-xl">
                            A showcase of our recent projects, featuring custom web applications, mobile apps, and design systems.
                        </p>
                    </div>
                    <Link
                        href="https://github.com/shampatil23"
                        target="_blank"
                        className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2"
                    >
                        <Github size={18} />
                        View All Projects
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface"
                        >
                            <Image
                                src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.split(",").map((tag, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium backdrop-blur-sm">
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                                <Link
                                    href={project.link}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 text-primary hover:text-blue-400 transition-colors font-medium"
                                >
                                    View Project <ExternalLink size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
