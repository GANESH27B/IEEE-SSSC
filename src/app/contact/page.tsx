"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, Send, CheckCircle, ArrowRight } from "lucide-react";
import { StarField } from "@/components/ui/StarField";

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (data.success) {
                setStatus("success");
                setForm({ name: "", email: "", phone: "", subject: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <div className="relative min-h-screen bg-transparent pt-32 pb-20 overflow-hidden text-white perspective-[2000px]">
            {/* Space Background with Moving Stars */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <StarField />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Contact Info */}
                    <div className="space-y-8 md:space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-[var(--font-orbitron)] tracking-tighter leading-none mb-6">
                                GET IN <span className="text-cyan-400">TOUCH</span>
                            </h1>
                            <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                                Have a project in mind or want to join our technical elite?
                                Drop us a secure transmission below.
                            </p>
                        </motion.div>

                        <div className="space-y-8">
                            {[
                                { icon: <Mail className="text-cyan-400" />, label: "Email", value: "ieee.sscs@kare.edu", sub: "Official Correspondence" },
                                { icon: <Phone className="text-emerald-400" />, label: "Pulse", value: "+91 98765 43210", sub: "Technical Support" },
                                { icon: <MessageSquare className="text-purple-400" />, label: "Discord", value: "IEEE_SSCS_KARE", sub: "Community Hub" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-cyan-500/30 transition-all"
                                >
                                    <div className="p-4 rounded-2xl bg-white/[0.03] group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black tracking-widest text-white/30 uppercase mb-1">{item.label}</p>
                                        <p className="text-lg font-bold text-white/80">{item.value}</p>
                                        <p className="text-xs text-white/40 italic">{item.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative p-10 rounded-[40px] bg-white/[0.02] border border-white/10 backdrop-blur-3xl"
                    >
                        {status === "success" ? (
                            <div className="text-center py-20 space-y-6">
                                <div className="inline-block p-6 rounded-full bg-cyan-500/20 text-cyan-400">
                                    <CheckCircle size={64} />
                                </div>
                                <h2 className="text-3xl font-black font-[var(--font-orbitron)]">TRANSMISSION RECEIVED</h2>
                                <p className="text-white/40">Our team will process your request shortly.</p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all font-bold"
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-widest text-white/30 uppercase ml-2">Your Identity</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Full Name"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-widest text-white/30 uppercase ml-2">Electronic Mail</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-widest text-white/30 uppercase ml-2">Communication Line</label>
                                        <input
                                            required
                                            type="tel"
                                            placeholder="Phone Number"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-widest text-white/30 uppercase ml-2">Subject Matter</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Topic"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all"
                                            value={form.subject}
                                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black tracking-widest text-white/30 uppercase ml-2">Detailed Payload</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Your message goes here..."
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all resize-none"
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    />
                                </div>

                                <button
                                    disabled={status === "loading"}
                                    type="submit"
                                    className="w-full group flex items-center justify-center gap-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 py-5 rounded-2xl font-black text-lg transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                                >
                                    {status === "loading" ? "UPLOADING..." : "INITIATE TRANSMISSION"}
                                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </button>

                                {status === "error" && (
                                    <p className="text-red-400 text-xs text-center">Transmission interrupted. Please retry.</p>
                                )}
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] -z-10" />
        </div>
    );
}

