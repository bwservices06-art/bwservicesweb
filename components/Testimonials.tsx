"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
}

const initialTestimonials: Testimonial[] = [
    {
        id: "rahul-sharma",
        name: "Rahul Sharma",
        role: "Founder, TechSolutions India",
        content: "BW Services delivered our e-commerce platform well within the deadline. The UI is smooth and the backend is robust. Highly recommended!",
        rating: 5,
    },
    {
        id: "priya-patel",
        name: "Priya Patel",
        role: "Marketing Head, DigitalGrowth",
        content: "The team helped us with our company website and SEO. We saw a 40% increase in traffic within the first month. Excellent service.",
        rating: 5,
    },
    {
        id: "amit-verma",
        name: "Amit Verma",
        role: "Student, Pune University",
        content: "I was struggling with my final year Android project. Sham and his team guided me through the entire process and I scored an A+.",
        rating: 5,
    },
];

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

    useEffect(() => {
        const testimonialsRef = ref(db, "testimonials");
        onValue(testimonialsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const fetchedTestimonials = Object.entries(data).map(([k, v]: [string, any]) => ({ id: k, ...v }));
                setTestimonials([...initialTestimonials, ...fetchedTestimonials]);
            }
        });
    }, []);

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
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Client Stories</h2>
                    <p className="text-foreground/60 max-w-2xl mx-auto">
                        Trusted by businesses and students across India. Here's what they have to say.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10, scale: 1.02, rotateX: 2, rotateY: 2 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="glass-card p-8 rounded-2xl relative border border-white/5 hover:border-primary/30 shadow-lg hover:shadow-primary/10 transition-all duration-300"
                        >
                            <div className="flex gap-1 mb-6 text-yellow-500">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-lg mb-6 leading-relaxed">"{testimonial.content}"</p>
                            <div>
                                <p className="font-bold">{testimonial.name}</p>
                                <p className="text-sm text-foreground/60">{testimonial.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
