"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { db } from "@/lib/firebase";
import { ref, onValue, push } from "firebase/database";

interface Plan {
    id: string;
    name: string;
    price: string;
    description: string;
    features: string | string[];
    popular: boolean;
}

const initialPlans: Plan[] = [];

export default function Pricing() {
    const [plans, setPlans] = useState<Plan[]>(initialPlans);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const pricingRef = ref(db, "pricing");
        onValue(pricingRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const fetchedPlans = Object.entries(data).map(([k, v]: [string, any]) => ({ id: k, ...v }));
                setPlans([...initialPlans, ...fetchedPlans]);
            }
        });
    }, []);

    const handleGetStarted = (plan: Plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await push(ref(db, "orders"), {
                ...formData,
                plan: selectedPlan?.name,
                timestamp: Date.now()
            });
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setIsModalOpen(false);
                setFormData({ name: "", email: "", phone: "", message: "" });
            }, 2000);
        } catch (error) {
            console.error("Error submitting order:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="pricing" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Transparent Pricing</h2>
                    <p className="text-foreground/60 max-w-2xl mx-auto">
                        Competitive rates tailored to the Indian market. No hidden fees, just quality work.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => {
                        const featuresList = Array.isArray(plan.features)
                            ? plan.features
                            : (plan.features as string)?.split(",") || [];

                        return (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={`glass-card p-8 rounded-2xl relative flex flex-col ${plan.popular ? "border-primary/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]" : ""
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                                        Most Popular
                                    </div>
                                )}

                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <div className="text-4xl font-bold mb-4 text-gradient">{plan.price}</div>
                                <p className="text-foreground/60 mb-8">{plan.description}</p>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {featuresList.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                                            {feature.trim()}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleGetStarted(plan)}
                                    className={`w-full py-3 rounded-lg font-bold transition-all ${plan.popular
                                        ? "bg-primary text-white hover:bg-blue-600 shadow-lg hover:shadow-primary/25"
                                        : "bg-white/5 hover:bg-white/10 border border-white/10"
                                        }`}
                                >
                                    Get Started
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Order Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-surface border border-white/10 p-8 rounded-2xl w-full max-w-md relative"
                        >
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-foreground/60 hover:text-white">
                                <X size={24} />
                            </button>

                            <h3 className="text-2xl font-bold mb-2">Get Started</h3>
                            <p className="text-foreground/60 mb-6">You selected the <span className="text-primary font-bold">{selectedPlan?.name}</span> plan.</p>

                            {isSubmitted ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check size={32} />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2">Request Sent!</h4>
                                    <p className="text-foreground/60">We'll get back to you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-foreground/60">Name</label>
                                        <input required className="w-full bg-white/5 border border-white/10 rounded-lg p-3" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-foreground/60">Email</label>
                                        <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-foreground/60">Phone</label>
                                        <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg p-3" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-foreground/60">Message (Optional)</label>
                                        <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-3" rows={3} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                                    </div>
                                    <button disabled={isSubmitting} className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50">
                                        {isSubmitting ? "Sending..." : "Submit Request"}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
