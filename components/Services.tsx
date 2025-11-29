"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Smartphone, GraduationCap, FileText, BookOpen, Layout, Server, Database } from "lucide-react";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";

const iconMap: any = {
    Code2, Smartphone, GraduationCap, FileText, BookOpen, Layout, Server, Database
};

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
}

const initialServices: Service[] = [
    {
        id: "app-dev",
        title: "App Development",
        description: "Native and cross-platform mobile applications built with React Native and Flutter for seamless performance.",
        icon: "Smartphone"
    },
    {
        id: "full-stack",
        title: "Full Stack Development",
        description: "Scalable web applications using the MERN stack (MongoDB, Express, React, Node.js) and Next.js.",
        icon: "Code2"
    },
    {
        id: "college-projects",
        title: "College Projects",
        description: "Complete guidance and development support for final year engineering and computer science projects.",
        icon: "GraduationCap"
    },
    {
        id: "report-writing",
        title: "Report Writing",
        description: "Professional documentation, project reports, and thesis writing services adhering to academic standards.",
        icon: "FileText"
    },
    {
        id: "research-paper",
        title: "Research Paper",
        description: "Assistance with writing, formatting, and publishing research papers in IEEE, Springer, and other journals.",
        icon: "BookOpen"
    }
];

export default function Services() {
    const [services, setServices] = useState<Service[]>(initialServices);

    useEffect(() => {
        const servicesRef = ref(db, "services");
        onValue(servicesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const fetchedServices = Object.entries(data).map(([k, v]: [string, any]) => ({ id: k, ...v }));
                setServices([...initialServices, ...fetchedServices]);
            }
        });
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section id="services" className="py-24 bg-surface/50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Services</h2>
                    <p className="text-foreground/60 max-w-2xl mx-auto">
                        Comprehensive digital solutions tailored to your needs. From web development to academic assistance.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service, index) => {
                        const Icon = iconMap[service.icon] || Code2;
                        return (
                            <motion.div
                                key={service.id}
                                variants={item}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="glass-card p-8 rounded-2xl hover:bg-white/5 transition-colors group border border-white/5 hover:border-primary/30 shadow-lg hover:shadow-primary/10"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                                <p className="text-foreground/60 leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );

}
