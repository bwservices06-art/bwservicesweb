"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Shield, ShoppingCart, AlertCircle, FileText } from "lucide-react";

import Footer from "@/components/Footer";

export default function LegalPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto space-y-16"
                >
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            Legal & Guidelines
                        </h1>
                        <p className="text-xl text-foreground/60">
                            Everything you need to know about working with BW Services.
                        </p>
                    </div>

                    {/* Privacy Policy */}
                    <section id="privacy" className="glass-card p-8 md:p-12 rounded-3xl border border-white/10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                                <Shield size={32} />
                            </div>
                            <h2 className="text-3xl font-bold">Privacy Policy</h2>
                        </div>
                        <div className="space-y-6 text-foreground/80 leading-relaxed">
                            <p>
                                At BW Services, we value your privacy and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data.
                            </p>
                            <h3 className="text-xl font-semibold text-white mt-6">1. Information Collection</h3>
                            <p>
                                We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or communicate with us. This may include your name, email address, phone number, and project details.
                            </p>
                            <h3 className="text-xl font-semibold text-white mt-6">2. Use of Information</h3>
                            <p>
                                We use your information to:
                                <ul className="list-disc pl-6 mt-2 space-y-2">
                                    <li>Provide, maintain, and improve our services.</li>
                                    <li>Communicate with you about your projects and inquiries.</li>
                                    <li>Send you updates and relevant information (you can opt-out at any time).</li>
                                </ul>
                            </p>
                            <h3 className="text-xl font-semibold text-white mt-6">3. Data Protection</h3>
                            <p>
                                We implement security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
                            </p>
                        </div>
                    </section>

                    {/* How to Purchase */}
                    <section id="purchase" className="glass-card p-8 md:p-12 rounded-3xl border border-white/10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                                <ShoppingCart size={32} />
                            </div>
                            <h2 className="text-3xl font-bold">How to Purchase Services</h2>
                        </div>
                        <div className="space-y-6 text-foreground/80 leading-relaxed">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="bg-white/5 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold text-white mb-3">1. Consultation</h3>
                                    <p>Contact us via the form or email. We'll discuss your requirements, budget, and timeline to understand your vision.</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold text-white mb-3">2. Proposal & Agreement</h3>
                                    <p>We'll provide a detailed proposal outlining the scope, cost, and milestones. Once approved, we sign a service agreement.</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold text-white mb-3">3. Development & Review</h3>
                                    <p>Our team starts working. We provide regular updates and demos for your feedback to ensure we're on the right track.</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold text-white mb-3">4. Delivery & Support</h3>
                                    <p>Upon final approval, we deliver the project files or deploy the site. We also offer post-launch support as per the agreement.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Rules & Guidelines */}
                    <section id="rules" className="glass-card p-8 md:p-12 rounded-3xl border border-white/10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-xl bg-red-500/20 text-red-400">
                                <AlertCircle size={32} />
                            </div>
                            <h2 className="text-3xl font-bold">Rules & Guidelines</h2>
                        </div>
                        <div className="space-y-6 text-foreground/80 leading-relaxed">
                            <p>
                                To ensure a smooth collaboration, please keep the following in mind:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold">•</span>
                                    <span><strong>Clear Communication:</strong> Please provide clear and timely feedback during the review stages to avoid delays.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold">•</span>
                                    <span><strong>Scope Changes:</strong> Any changes to the agreed-upon scope may incur additional costs and timeline adjustments.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold">•</span>
                                    <span><strong>Payments:</strong> Adherence to the payment schedule is required to maintain project momentum.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold">•</span>
                                    <span><strong>Respect:</strong> We value professional and respectful interaction. We reserve the right to terminate services for abusive behavior.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                </motion.div>
            </div>
            <Footer />
        </main>
    );
}
