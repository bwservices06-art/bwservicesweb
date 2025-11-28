"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "What services do you offer?",
        answer: "We offer a full range of digital services including Custom Web Development, Mobile App Development (iOS & Android), UI/UX Design, SEO Optimization, and Technical Consulting.",
    },
    {
        question: "How much does a typical project cost?",
        answer: "Project costs vary depending on complexity, scope, and timeline. We offer custom quotes after a detailed discovery session. Contact us for a free consultation.",
    },
    {
        question: "How long does it take to build a website?",
        answer: "A standard brochure website typically takes 2-4 weeks, while complex web applications can take 8-12 weeks or more. We provide a detailed timeline during the proposal phase.",
    },
    {
        question: "Do you provide maintenance and support?",
        answer: "Yes, we offer ongoing maintenance packages to ensure your website remains secure, up-to-date, and performing optimally after launch.",
    },
    {
        question: "Can you help with college projects or research papers?",
        answer: "Absolutely! We have a dedicated team for academic assistance, helping students with final year projects, thesis writing, and research paper publication.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-6 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
                    <p className="text-foreground/60">
                        Everything you need to know about our services and process.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="glass-card rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-medium text-lg">{faq.question}</span>
                                {openIndex === index ? (
                                    <Minus className="text-primary flex-shrink-0" />
                                ) : (
                                    <Plus className="text-foreground/40 flex-shrink-0" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-foreground/60 leading-relaxed border-t border-white/5">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
