"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-surface border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-2xl font-bold tracking-tighter mb-4 block">
                            BW Services
                        </Link>
                        <p className="text-foreground/60 max-w-sm">
                            Transforming ideas into digital reality with cutting-edge 3D web experiences and robust applications.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-foreground/60">
                            <li><Link href="/#services" className="hover:text-primary transition-colors">Services</Link></li>
                            <li><Link href="/#work" className="hover:text-primary transition-colors">Work</Link></li>
                            <li><Link href="/#about" className="hover:text-primary transition-colors">About</Link></li>
                            <li><Link href="/#contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold mb-4">Legal & Info</h4>
                        <ul className="space-y-2 text-foreground/60">
                            <li><Link href="/legal#privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/legal#purchase" className="hover:text-primary transition-colors">How to Purchase</Link></li>
                            <li><Link href="/legal#rules" className="hover:text-primary transition-colors">Rules & Guidelines</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div />
                    <div className="flex items-center gap-6 text-foreground/60">
                        <a href="#" className="hover:text-primary transition-colors"><Github size={20} /></a>
                        <a href="#" className="hover:text-primary transition-colors"><Linkedin size={20} /></a>
                        <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
