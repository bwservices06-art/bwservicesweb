"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, onValue, push, remove, update, set } from "firebase/database";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Mail, Plus, Trash2, Edit2, X, LayoutGrid, Briefcase, MessageSquare, Tag, Users, Settings, ShoppingCart, HelpCircle, GitBranch } from "lucide-react";

// Types
interface Inquiry { id: string; name: string; email: string; subject: string; message: string; timestamp: number; }
interface Service { id: string; title: string; description: string; icon: string; }
interface Project { id: string; title: string; description: string; image: string; link: string; tags: string; }
interface Testimonial { id: string; name: string; role: string; content: string; rating: number; }
interface Plan { id: string; name: string; price: string; description: string; features: string; popular: boolean; }
interface Developer { id: string; name: string; role: string; bio: string; image: string; linkedin?: string; }
interface Order { id: string; name: string; email: string; phone: string; plan: string; message: string; timestamp: number; }
interface FAQ { id: string; question: string; answer: string; }
interface ProcessStep { id: string; title: string; description: string; icon: string; }

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("inquiries");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Data States
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [developers, setDevelopers] = useState<Developer[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [process, setProcess] = useState<ProcessStep[]>([]);
    const [websiteName, setWebsiteName] = useState("BW Services");

    // Form States
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>({});
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) router.push("/admin/login");
            else fetchData();
        });
        return () => unsubscribe();
    }, [router]);

    const fetchData = () => {
        const refs = [
            { key: "inquiries", setter: setInquiries },
            { key: "services", setter: setServices },
            { key: "projects", setter: setProjects },
            { key: "testimonials", setter: setTestimonials },
            { key: "pricing", setter: setPlans },
            { key: "developers", setter: setDevelopers },
            { key: "orders", setter: setOrders },
            { key: "faqs", setter: setFaqs },
            { key: "process", setter: setProcess },
        ];

        refs.forEach(({ key, setter }) => {
            onValue(ref(db, key), (snapshot) => {
                const data = snapshot.val();
                setter(data ? Object.entries(data).map(([k, v]: [string, any]) => ({ id: k, ...v })).sort((a: any, b: any) => (b.timestamp || 0) - (a.timestamp || 0)) : []);
            });
        });

        onValue(ref(db, "settings"), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setWebsiteName(data.websiteName || "BW Services");
                // Pre-fill edit form with current settings
                setEditForm((prev: any) => ({ ...prev, ...data }));
            }
        });

        onValue(ref(db, "hero"), (snapshot) => {
            if (snapshot.exists()) {
                setEditForm((prev: any) => ({ ...prev, ...snapshot.val() }));
            }
        });

        setLoading(false);
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/admin/login");
    };

    const handleDelete = async (path: string, id: string) => {
        if (confirm("Are you sure you want to delete this item?")) {
            await remove(ref(db, `${path}/${id}`));
        }
    };

    const handleSave = async (path: string) => {
        if (path === "settings") {
            await update(ref(db, "settings"), {
                websiteName: editForm.websiteName,
                contactEmail: editForm.contactEmail,
                contactPhone: editForm.contactPhone,
                contactLocation: editForm.contactLocation,
                socialYoutube: editForm.socialYoutube,
                socialInstagram: editForm.socialInstagram,
                socialLinkedin: editForm.socialLinkedin,
                socialWhatsapp: editForm.socialWhatsapp,
                socialTelegram: editForm.socialTelegram,
            });
        } else if (path === "hero") {
            await update(ref(db, "hero"), editForm);
        } else if (isEditing) {
            await update(ref(db, `${path}/${isEditing}`), editForm);
            setIsEditing(null);
        } else {
            await push(ref(db, path), editForm);
            setIsAdding(false);
        }
        setEditForm({});
    };

    const openEdit = (item: any) => {
        setEditForm(item);
        setIsEditing(item.id);
        setIsAdding(false);
    };

    const openAdd = () => {
        setEditForm({});
        setIsEditing(null);
        setIsAdding(true);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 bg-surface border-r border-white/10 p-6 flex flex-col overflow-y-auto">
                <h1 className="text-2xl font-bold mb-8">{websiteName} Admin</h1>
                <nav className="space-y-2 flex-1">
                    {[
                        { id: "inquiries", icon: Mail, label: "Inquiries" },
                        { id: "orders", icon: ShoppingCart, label: "Orders" },
                        { id: "services", icon: LayoutGrid, label: "Services" },
                        { id: "projects", icon: Briefcase, label: "Projects" },
                        { id: "testimonials", icon: MessageSquare, label: "Testimonials" },
                        { id: "pricing", icon: Tag, label: "Pricing" },
                        { id: "developers", icon: Users, label: "Developers" },
                        { id: "faqs", icon: HelpCircle, label: "FAQs" },
                        { id: "process", icon: GitBranch, label: "Process" },
                        { id: "hero", icon: LayoutGrid, label: "Hero Section" },
                        { id: "settings", icon: Settings, label: "Settings" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id ? "bg-primary text-white" : "text-foreground/60 hover:bg-white/5"
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </nav>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-400 mt-8">
                    <LogOut size={18} /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto h-screen">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold capitalize">{activeTab}</h2>
                    {activeTab !== "inquiries" && activeTab !== "orders" && activeTab !== "settings" && (
                        <button onClick={openAdd} className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg hover:bg-blue-600">
                            <Plus size={18} /> Add New
                        </button>
                    )}
                </div>

                {/* Content Area */}
                <div className="space-y-4 pb-12">
                    {/* Inquiries Tab */}
                    {activeTab === "inquiries" && (
                        <div className="grid gap-4">
                            {inquiries.map((inquiry) => (
                                <div key={inquiry.id} className="glass-card p-6 rounded-xl">
                                    <div className="flex justify-between mb-2">
                                        <h3 className="font-bold">{inquiry.name}</h3>
                                        <span className="text-sm text-foreground/40">{new Date(inquiry.timestamp).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-sm text-primary mb-2">{inquiry.subject}</p>
                                    <p className="text-foreground/80">{inquiry.message}</p>
                                    <p className="text-sm text-foreground/40 mt-4">{inquiry.email}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === "orders" && (
                        <div className="grid gap-4">
                            {orders.map((order) => (
                                <div key={order.id} className="glass-card p-6 rounded-xl border border-primary/20">
                                    <div className="flex justify-between mb-2">
                                        <h3 className="font-bold text-lg">{order.plan}</h3>
                                        <span className="text-sm text-foreground/40">{new Date(order.timestamp).toLocaleDateString()}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-foreground/40">Client</p>
                                            <p className="font-medium">{order.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-foreground/40">Contact</p>
                                            <p className="text-sm">{order.email}</p>
                                            <p className="text-sm">{order.phone}</p>
                                        </div>
                                    </div>
                                    {order.message && (
                                        <div className="bg-white/5 p-3 rounded-lg">
                                            <p className="text-sm text-foreground/40 mb-1">Message</p>
                                            <p className="text-foreground/80">{order.message}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Services Tab */}
                    {activeTab === "services" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {services.map((service) => (
                                <div key={service.id} className="glass-card p-6 rounded-xl relative group">
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openEdit(service)} className="p-2 bg-blue-500/20 text-blue-500 rounded-lg"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete("services", service.id)} className="p-2 bg-red-500/20 text-red-500 rounded-lg"><Trash2 size={16} /></button>
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                                    <p className="text-foreground/60">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Projects Tab */}
                    {activeTab === "projects" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map((project) => (
                                <div key={project.id} className="glass-card p-6 rounded-xl relative group">
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openEdit(project)} className="p-2 bg-blue-500/20 text-blue-500 rounded-lg"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete("projects", project.id)} className="p-2 bg-red-500/20 text-red-500 rounded-lg"><Trash2 size={16} /></button>
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                                    <p className="text-foreground/60 mb-2">{project.description}</p>
                                    <div className="flex gap-2 flex-wrap">
                                        {project.tags?.split(",").map((tag, i) => (
                                            <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded">{tag.trim()}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Testimonials Tab */}
                    {activeTab === "testimonials" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {testimonials.map((t) => (
                                <div key={t.id} className="glass-card p-6 rounded-xl relative group">
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openEdit(t)} className="p-2 bg-blue-500/20 text-blue-500 rounded-lg"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete("testimonials", t.id)} className="p-2 bg-red-500/20 text-red-500 rounded-lg"><Trash2 size={16} /></button>
                                    </div>
                                    <p className="italic mb-4">"{t.content}"</p>
                                    <p className="font-bold">{t.name}</p>
                                    <p className="text-sm text-foreground/60">{t.role}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pricing Tab */}
                    {activeTab === "pricing" && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {plans.map((plan) => (
                                <div key={plan.id} className="glass-card p-6 rounded-xl relative group">
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openEdit(plan)} className="p-2 bg-blue-500/20 text-blue-500 rounded-lg"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete("pricing", plan.id)} className="p-2 bg-red-500/20 text-red-500 rounded-lg"><Trash2 size={16} /></button>
                                    </div>
                                    <h3 className="font-bold text-xl">{plan.name}</h3>
                                    <div className="text-2xl font-bold text-primary my-2">{plan.price}</div>
                                    <p className="text-sm text-foreground/60 mb-4">{plan.description}</p>
                                    <ul className="text-sm list-disc list-inside">
                                        {plan.features?.split(",").map((f, i) => <li key={i}>{f.trim()}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Developers Tab */}
                    {activeTab === "developers" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {developers.map((dev) => (
                                <div key={dev.id} className="glass-card p-6 rounded-xl relative group flex gap-4 items-center">
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openEdit(dev)} className="p-2 bg-blue-500/20 text-blue-500 rounded-lg"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete("developers", dev.id)} className="p-2 bg-red-500/20 text-red-500 rounded-lg"><Trash2 size={16} /></button>
                                    </div>
                                    <div className="w-16 h-16 rounded-full bg-white/10 overflow-hidden flex-shrink-0">
                                        <img src={dev.image || "https://via.placeholder.com/150"} alt={dev.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{dev.name}</h3>
                                        <p className="text-primary text-sm">{dev.role}</p>
                                        <p className="text-foreground/60 text-sm mt-1 line-clamp-2">{dev.bio}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    )}

                    {/* FAQs Tab */}
                    {activeTab === "faqs" && (
                        <div className="grid gap-4">
                            {faqs.map((faq) => (
                                <div key={faq.id} className="glass-card p-6 rounded-xl relative group">
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openEdit(faq)} className="p-2 bg-blue-500/20 text-blue-500 rounded-lg"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete("faqs", faq.id)} className="p-2 bg-red-500/20 text-red-500 rounded-lg"><Trash2 size={16} /></button>
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                                    <p className="text-foreground/60">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Process Tab */}
                    {activeTab === "process" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {process.map((step) => (
                                <div key={step.id} className="glass-card p-6 rounded-xl relative group">
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openEdit(step)} className="p-2 bg-blue-500/20 text-blue-500 rounded-lg"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete("process", step.id)} className="p-2 bg-red-500/20 text-red-500 rounded-lg"><Trash2 size={16} /></button>
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                                    <p className="text-foreground/60 mb-2">{step.description}</p>
                                    <p className="text-xs text-primary bg-primary/10 px-2 py-1 rounded inline-block">{step.icon}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Hero Tab */}
                    {activeTab === "hero" && (
                        <div className="glass-card p-8 rounded-xl max-w-lg">
                            <h3 className="text-xl font-bold mb-6">Edit Hero Section</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-foreground/60">Badge Text</label>
                                    <input
                                        className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                        value={editForm.badge ?? ""}
                                        onChange={e => setEditForm({ ...editForm, badge: e.target.value })}
                                        placeholder="🚀 Transforming Ideas..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-foreground/60">Title Line 1</label>
                                    <input
                                        className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                        value={editForm.title1 ?? ""}
                                        onChange={e => setEditForm({ ...editForm, title1: e.target.value })}
                                        placeholder="We Build"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-foreground/60">Title Line 2 (Gradient)</label>
                                    <input
                                        className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                        value={editForm.title2 ?? ""}
                                        onChange={e => setEditForm({ ...editForm, title2: e.target.value })}
                                        placeholder="Future-Ready"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-foreground/60">Title Line 3</label>
                                    <input
                                        className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                        value={editForm.title3 ?? ""}
                                        onChange={e => setEditForm({ ...editForm, title3: e.target.value })}
                                        placeholder="Experiences."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-foreground/60">Subtitle</label>
                                    <textarea
                                        className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                        value={editForm.subtitle ?? ""}
                                        onChange={e => setEditForm({ ...editForm, subtitle: e.target.value })}
                                        placeholder="Description..."
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-foreground/60">Button 1 Text</label>
                                        <input
                                            className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                            value={editForm.btn1Text ?? ""}
                                            onChange={e => setEditForm({ ...editForm, btn1Text: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-foreground/60">Button 1 Link</label>
                                        <input
                                            className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                            value={editForm.btn1Link ?? ""}
                                            onChange={e => setEditForm({ ...editForm, btn1Link: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-foreground/60">Button 2 Text</label>
                                        <input
                                            className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                            value={editForm.btn2Text ?? ""}
                                            onChange={e => setEditForm({ ...editForm, btn2Text: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-foreground/60">Button 2 Link</label>
                                        <input
                                            className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                            value={editForm.btn2Link ?? ""}
                                            onChange={e => setEditForm({ ...editForm, btn2Link: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleSave("hero")}
                                    className="w-full bg-primary py-3 rounded-lg font-bold hover:bg-blue-600 mt-6"
                                >
                                    Save Hero Section
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === "settings" && (
                        <div className="glass-card p-8 rounded-xl max-w-lg">
                            <h3 className="text-xl font-bold mb-6">General Settings</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-foreground/60">Website Name</label>
                                    <input
                                        className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                        value={editForm.websiteName ?? websiteName}
                                        onChange={e => setEditForm({ ...editForm, websiteName: e.target.value })}
                                    />
                                </div>

                                <h4 className="text-lg font-bold mt-6 mb-4">Contact Information</h4>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-foreground/60">Contact Email</label>
                                    <input
                                        className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                        value={editForm.contactEmail ?? ""}
                                        onChange={e => setEditForm({ ...editForm, contactEmail: e.target.value })}
                                        placeholder="hello@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-foreground/60">Phone Number</label>
                                    <input
                                        className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                        value={editForm.contactPhone ?? ""}
                                        onChange={e => setEditForm({ ...editForm, contactPhone: e.target.value })}
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-foreground/60">Location</label>
                                    <input
                                        className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                        value={editForm.contactLocation ?? ""}
                                        onChange={e => setEditForm({ ...editForm, contactLocation: e.target.value })}
                                        placeholder="City, Country"
                                    />
                                </div>

                                <h4 className="text-lg font-bold mt-6 mb-4">Social Links</h4>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-foreground/60">YouTube URL</label>
                                    <input
                                        className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                        value={editForm.socialYoutube ?? ""}
                                        onChange={e => setEditForm({ ...editForm, socialYoutube: e.target.value })}
                                        placeholder="https://youtube.com/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-foreground/60">Instagram URL</label>
                                    <input
                                        className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                        value={editForm.socialInstagram ?? ""}
                                        onChange={e => setEditForm({ ...editForm, socialInstagram: e.target.value })}
                                        placeholder="https://instagram.com/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-foreground/60">LinkedIn URL</label>
                                    <input
                                        className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                        value={editForm.socialLinkedin ?? ""}
                                        onChange={e => setEditForm({ ...editForm, socialLinkedin: e.target.value })}
                                        placeholder="https://linkedin.com/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-foreground/60">WhatsApp Channel URL</label>
                                    <input
                                        className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                        value={editForm.socialWhatsapp ?? ""}
                                        onChange={e => setEditForm({ ...editForm, socialWhatsapp: e.target.value })}
                                        placeholder="https://whatsapp.com/channel/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-foreground/60">Telegram URL</label>
                                    <input
                                        className="w-full bg-white/5 p-3 rounded-lg border border-white/10"
                                        value={editForm.socialTelegram ?? ""}
                                        onChange={e => setEditForm({ ...editForm, socialTelegram: e.target.value })}
                                        placeholder="https://t.me/..."
                                    />
                                </div>

                                <button
                                    onClick={() => handleSave("settings")}
                                    className="w-full bg-primary py-3 rounded-lg font-bold hover:bg-blue-600 mt-6"
                                >
                                    Save Settings
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main >

            {/* Edit/Add Modal */}
            <AnimatePresence>
                {
                    (isEditing || isAdding) && activeTab !== "settings" && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-surface border border-white/10 p-8 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold">{isAdding ? "Add New" : "Edit Item"}</h3>
                                    <button onClick={() => { setIsEditing(null); setIsAdding(false); }}><X /></button>
                                </div>

                                <div className="space-y-4">
                                    {activeTab === "services" && (
                                        <>
                                            <input placeholder="Title" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.title || ""} onChange={e => setEditForm({ ...editForm, title: e.target.value })} />
                                            <textarea placeholder="Description" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.description || ""} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
                                            <input placeholder="Icon Name (Lucide)" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.icon || ""} onChange={e => setEditForm({ ...editForm, icon: e.target.value })} />
                                        </>
                                    )}
                                    {activeTab === "projects" && (
                                        <>
                                            <input placeholder="Title" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.title || ""} onChange={e => setEditForm({ ...editForm, title: e.target.value })} />
                                            <textarea placeholder="Description" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.description || ""} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
                                            <input placeholder="Image URL" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.image || ""} onChange={e => setEditForm({ ...editForm, image: e.target.value })} />
                                            <input placeholder="Project Link" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.link || ""} onChange={e => setEditForm({ ...editForm, link: e.target.value })} />
                                            <input placeholder="Tags (comma separated)" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.tags || ""} onChange={e => setEditForm({ ...editForm, tags: e.target.value })} />
                                        </>
                                    )}
                                    {activeTab === "testimonials" && (
                                        <>
                                            <input placeholder="Name" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.name || ""} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                                            <input placeholder="Role" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.role || ""} onChange={e => setEditForm({ ...editForm, role: e.target.value })} />
                                            <textarea placeholder="Content" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.content || ""} onChange={e => setEditForm({ ...editForm, content: e.target.value })} />
                                            <input type="number" placeholder="Rating (1-5)" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.rating || ""} onChange={e => setEditForm({ ...editForm, rating: Number(e.target.value) })} />
                                        </>
                                    )}
                                    {activeTab === "pricing" && (
                                        <>
                                            <input placeholder="Plan Name" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.name || ""} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                                            <input placeholder="Price" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.price || ""} onChange={e => setEditForm({ ...editForm, price: e.target.value })} />
                                            <textarea placeholder="Description" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.description || ""} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
                                            <textarea placeholder="Features (comma separated)" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.features || ""} onChange={e => setEditForm({ ...editForm, features: e.target.value })} />
                                            <label className="flex items-center gap-2">
                                                <input type="checkbox" checked={editForm.popular || false} onChange={e => setEditForm({ ...editForm, popular: e.target.checked })} />
                                                Most Popular
                                            </label>
                                        </>
                                    )}
                                    {activeTab === "developers" && (
                                        <>
                                            <input placeholder="Name" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.name || ""} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                                            <input placeholder="Role" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.role || ""} onChange={e => setEditForm({ ...editForm, role: e.target.value })} />
                                            <textarea placeholder="Bio" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.bio || ""} onChange={e => setEditForm({ ...editForm, bio: e.target.value })} />
                                            <input placeholder="Image URL" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.image || ""} onChange={e => setEditForm({ ...editForm, image: e.target.value })} />
                                            <input placeholder="LinkedIn URL" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.linkedin || ""} onChange={e => setEditForm({ ...editForm, linkedin: e.target.value })} />
                                        </>
                                    )}
                                    {activeTab === "faqs" && (
                                        <>
                                            <input placeholder="Question" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.question || ""} onChange={e => setEditForm({ ...editForm, question: e.target.value })} />
                                            <textarea placeholder="Answer" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.answer || ""} onChange={e => setEditForm({ ...editForm, answer: e.target.value })} />
                                        </>
                                    )}
                                    {activeTab === "process" && (
                                        <>
                                            <input placeholder="Title" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.title || ""} onChange={e => setEditForm({ ...editForm, title: e.target.value })} />
                                            <textarea placeholder="Description" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.description || ""} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
                                            <input placeholder="Icon Name (Lucide)" className="w-full bg-white/5 p-3 rounded-lg" value={editForm.icon || ""} onChange={e => setEditForm({ ...editForm, icon: e.target.value })} />
                                        </>
                                    )}

                                    <button onClick={() => handleSave(activeTab)} className="w-full bg-primary py-3 rounded-lg font-bold hover:bg-blue-600">Save Changes</button>
                                </div>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence >
        </div >
    );
}
