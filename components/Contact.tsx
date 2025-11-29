"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Send, Youtube, Instagram, MessageCircle } from "lucide-react";
import { db } from "@/lib/firebase";
import { ref, push, onValue } from "firebase/database";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "Web Design",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [settings, setSettings] = useState<any>({});

    useEffect(() => {
        const settingsRef = ref(db, "settings");
        onValue(settingsRef, (snapshot) => {
            if (snapshot.exists()) {
                setSettings(snapshot.val());
            }
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const inquiriesRef = ref(db, "inquiries");
            await push(inquiriesRef, {
                ...formData,
                timestamp: Date.now()
            });
            setIsSubmitted(true);
            setFormData({ name: "", email: "", subject: "Web Design", message: "" });
            setTimeout(() => setIsSubmitted(false), 3000);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer id="contact" className="bg-surface pt-24 pb-12 relative overflow-hidden">
            {/* Floating Background Elements */}
            <motion.div
                animate={{
                    y: [0, -50, 0],
                    rotate: 360,
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"
            />
            <motion.div
                animate={{
                    y: [0, 50, 0],
                    rotate: -360,
                    scale: [1, 1.5, 1]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl -z-10"
            />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's work together</h2>
                        <p className="text-foreground/60 text-lg mb-10 max-w-md">
                            Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-foreground/80">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-foreground/40">Email</p>
                                    <p className="font-medium">{settings.contactEmail || "hello@hirecoders.dev"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-foreground/80">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-secondary">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-foreground/40">Phone</p>
                                    <p className="font-medium">{settings.contactPhone || "+1 (555) 123-4567"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-foreground/80">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-accent">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-foreground/40">Location</p>
                                    <p className="font-medium">{settings.contactLocation || "Pune, India"}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-8 rounded-2xl space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground/60">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground/60">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground/60">Subject</label>
                            <select
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground/60"
                            >
                                <option>Web Design</option>
                                <option>Development</option>
                                <option>SEO & Marketing</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground/60">Message</label>
                            <textarea
                                rows={4}
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>

                        <button
                            disabled={isSubmitting}
                            className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isSubmitting ? "Sending..." : isSubmitted ? "Message Sent!" : "Send Message"}
                            {!isSubmitting && !isSubmitted && <Send size={18} />}
                        </button>
                    </motion.form>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-foreground/40 text-sm">
                        © 2024 HireCoders. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {settings.socialYoutube && (
                            <a href={settings.socialYoutube} target="_blank" className="text-foreground/40 hover:text-red-500 transition-colors"><Youtube size={20} /></a>
                        )}
                        {settings.socialInstagram && (
                            <a href={settings.socialInstagram} target="_blank" className="text-foreground/40 hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
                        )}
                        {settings.socialLinkedin && (
                            <a href={settings.socialLinkedin} target="_blank" className="text-foreground/40 hover:text-blue-500 transition-colors"><Linkedin size={20} /></a>
                        )}
                        {settings.socialWhatsapp && (
                            <a href={settings.socialWhatsapp} target="_blank" className="text-foreground/40 hover:text-green-500 transition-colors"><MessageCircle size={20} /></a>
                        )}
                        {settings.socialTelegram && (
                            <a href={settings.socialTelegram} target="_blank" className="text-foreground/40 hover:text-blue-400 transition-colors"><Send size={20} /></a>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
