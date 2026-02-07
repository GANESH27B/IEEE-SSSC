"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, MapPin, Users, Video, Code, Zap, ChevronRight, Sparkles } from "lucide-react";
import { InteractiveSessionBg } from "@/components/ui/InteractiveSessionBg";

export default function InteractiveSessionsPage() {
    const [sessions, setSessions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("All");
    const types = ["All", "Live Coding", "Workshop", "Demo", "Challenge"];

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const res = await fetch('/api/sessions');
                const data = await res.json();
                if (data.success) {
                    setSessions(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch sessions:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, []);

    const filteredSessions = filter === "All"
        ? sessions
        : sessions.filter((s: any) => s.type === filter);

    return (
        <div className="relative min-h-screen bg-transparent pt-32 pb-20 overflow-hidden text-white">
            {/* Interactive Animated Background */}
            <div className="fixed inset-0 z-0">
                <InteractiveSessionBg />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 font-[var(--font-orbitron)] tracking-wider">
                        INTERACTIVE <span className="text-cyan-400">SESSIONS</span>
                    </h1>
                    <p className="text-white/60 text-lg max-w-3xl mx-auto mb-8">
                        Engage with technology through live coding, demos, and hands-on challenges.
                        Learn by doing, not just watching.
                    </p>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {types.map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${filter === type
                                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Sessions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSessions.map((session, index) => (
                        <motion.div
                            key={session.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-300"
                        >
                            {/* Type Badge */}
                            <div className="absolute top-4 right-4 z-10">
                                <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/90 rounded-full">
                                    {session.type === "Live Coding" && <Code size={14} />}
                                    {session.type === "Demo" && <Video size={14} />}
                                    {session.type === "Challenge" && <Zap size={14} />}
                                    <span className="text-xs font-bold text-white">{session.type}</span>
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors z-20"></div>
                            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors z-20"></div>

                            {/* Session Image Header */}
                            {session.image && (
                                <div className="relative w-full h-40 overflow-hidden">
                                    <img
                                        src={session.image}
                                        alt={session.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent opacity-60" />
                                </div>
                            )}

                            <div className="p-6">
                                {/* Title */}
                                <h3 className="text-xl font-bold text-white mb-3 font-[var(--font-orbitron)] group-hover:text-cyan-400 transition-colors line-clamp-2">
                                    {session.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/60 text-sm mb-4 line-clamp-3">
                                    {session.description}
                                </p>

                                {/* Details */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-white/70 text-xs">
                                        <Calendar size={14} className="text-cyan-400" />
                                        <span>{session.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/70 text-xs">
                                        <Clock size={14} className="text-cyan-400" />
                                        <span>{session.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/70 text-xs">
                                        <MapPin size={14} className="text-cyan-400" />
                                        <span>{session.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/70 text-xs">
                                        <Users size={14} className="text-cyan-400" />
                                        <span>{session.participants} participants</span>
                                    </div>
                                </div>

                                {/* Mode Badge */}
                                <div className="mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${session.mode === 'Online' ? 'bg-blue-500/20 text-blue-400' :
                                        session.mode === 'Hybrid' ? 'bg-purple-500/20 text-purple-400' :
                                            'bg-green-500/20 text-green-400'
                                        }`}>
                                        {session.mode}
                                    </span>
                                </div>

                                {/* Tools */}
                                <div className="mb-4">
                                    <p className="text-cyan-400 text-xs font-bold mb-2">Tools & Topics:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {session.tools.slice(0, 3).map((tool: string, i: number) => (
                                            <span key={i} className="px-2 py-1 bg-cyan-500/10 rounded text-xs text-cyan-300">
                                                {tool}
                                            </span>
                                        ))}
                                        {session.tools.length > 3 && (
                                            <span className="px-2 py-1 bg-cyan-500/10 rounded text-xs text-cyan-300">
                                                +{session.tools.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Host */}
                                <div className="mb-4 pb-4 border-b border-white/10">
                                    <p className="text-white/40 text-xs mb-1">Host</p>
                                    <p className="text-white text-sm font-bold">{session.host}</p>
                                </div>

                                {/* Action Button */}
                                <button className="w-full flex items-center justify-center gap-2 bg-cyan-600/20 hover:bg-cyan-600 border border-cyan-500/50 hover:border-cyan-400 text-cyan-400 hover:text-white px-4 py-2 rounded-lg font-bold text-sm transition-all">
                                    Join Session
                                    <ChevronRight size={16} />
                                </button>
                            </div>

                            {/* Scan Line */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none"></div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredSessions.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-white/60 text-lg">No sessions found for this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
