"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, MessageCircle, User, ShieldAlert, Trash2 } from "lucide-react";

export function ContactMessages() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/contact");
            const data = await res.json();
            if (data.success) {
                setMessages(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this transmission permanently?")) return;
        try {
            const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setMessages(prev => prev.filter(m => m._id !== id));
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/contact/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            const data = await res.json();
            if (data.success) {
                setMessages(prev => prev.map(m => m._id === id ? { ...m, status: data.data.status } : m));
            }
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    if (loading) return <div className="text-white/40 animate-pulse">Scanning frequencies...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
                <ShieldAlert className="text-cyan-400" />
                <h2 className="text-3xl font-black font-[var(--font-orbitron)] text-white">INCOMING <span className="text-cyan-400">TRANSMISSIONS</span></h2>
            </div>

            {messages.length === 0 ? (
                <div className="p-10 rounded-3xl border border-white/5 bg-white/[0.02] text-center text-white/40">
                    No active transmissions detected.
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {messages.map((msg, i) => (
                        <motion.div
                            key={msg._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-[40px] bg-white/[0.02] border border-white/10 relative overflow-hidden group hover:border-cyan-500/30 transition-all"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-6 relative z-10">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-1">{msg.name}</h3>
                                                <p className="text-xs text-white/40 flex items-center gap-2">
                                                    <Clock size={12} className="text-purple-500" />
                                                    {new Date(msg.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <select
                                                value={msg.status}
                                                onChange={(e) => handleStatusUpdate(msg._id, e.target.value)}
                                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer outline-none ${msg.status === 'Resolved' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                                                    msg.status === 'Reviewed' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' :
                                                        'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                                                    }`}
                                            >
                                                <option value="Pending" className="bg-gray-900">PENDING</option>
                                                <option value="Reviewed" className="bg-gray-900">REVIEWED</option>
                                                <option value="Resolved" className="bg-gray-900">RESOLVED</option>
                                            </select>

                                            <button
                                                onClick={() => handleDelete(msg._id)}
                                                className="p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all group/del"
                                                title="Purge Transmission"
                                            >
                                                <Trash2 size={16} className="group-hover/del:scale-110" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-6 text-sm text-white/60 py-2">
                                        <div className="flex items-center gap-2 group/icon">
                                            <div className="p-1.5 rounded-lg bg-white/5 group-hover/icon:bg-cyan-500/10 transition-colors">
                                                <Mail size={14} className="text-cyan-500" />
                                            </div>
                                            {msg.email}
                                        </div>
                                        <div className="flex items-center gap-2 group/icon">
                                            <div className="p-1.5 rounded-lg bg-white/5 group-hover/icon:bg-emerald-500/10 transition-colors">
                                                <Phone size={14} className="text-emerald-500" />
                                            </div>
                                            {msg.phone}
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/30" />
                                        <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3 opacity-60">Subject: {msg.subject}</p>
                                        <p className="text-white/80 font-light text-sm italic">"{msg.message}"</p>
                                    </div>
                                </div>
                            </div>

                            {/* Accent Decoration */}
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <MessageCircle size={80} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
