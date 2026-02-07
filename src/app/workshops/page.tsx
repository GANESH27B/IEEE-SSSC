"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, MapPin, Users, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { TechBackground } from "@/components/ui/TechBackground";

export default function WorkshopsPage() {
    const [workshops, setWorkshops] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedWorkshop, setSelectedWorkshop] = useState<any | null>(null);

    useEffect(() => {
        fetchWorkshops();
    }, []);

    const fetchWorkshops = async () => {
        try {
            const res = await fetch('/api/workshops');
            const data = await res.json();
            if (data.success) {
                setWorkshops(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch workshops:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-transparent pt-32 pb-20 overflow-hidden">
            {/* Animated Tech Background */}
            <div className="fixed inset-0 z-0">
                <TechBackground />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 font-[var(--font-orbitron)] tracking-wider">
                        TECHNICAL <span className="text-cyan-400">WORKSHOPS</span>
                    </h1>
                    <p className="text-white/60 text-lg max-w-3xl mx-auto">
                        Hands-on learning experiences designed to enhance your technical skills.
                        From IoT to VLSI, explore cutting-edge technologies with industry experts.
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                        <p className="text-white/60 mt-4">Loading workshops...</p>
                    </div>
                ) : workshops.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-white/60">No workshops available yet. Check back soon!</p>
                    </div>
                ) : (
                    /* Workshops Grid */
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {workshops.map((workshop: any, index: number) => (
                            <motion.div
                                key={workshop._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-300"
                            >
                                {/* Corner Accents */}
                                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors z-20"></div>
                                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors z-20"></div>

                                {/* Workshop Image Header */}
                                {workshop.image && (
                                    <div className="relative w-full h-48 overflow-hidden">
                                        <img
                                            src={workshop.image}
                                            alt={workshop.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent opacity-60" />
                                    </div>
                                )}

                                <div className="p-8">
                                    {/* Level Badge */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${workshop.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                                            workshop.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-red-500/20 text-red-400'
                                            }`}>
                                            {workshop.level}
                                        </span>
                                        <span className="text-cyan-400 text-sm font-bold">{workshop.duration}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-white mb-3 font-[var(--font-orbitron)] group-hover:text-cyan-400 transition-colors">
                                        {workshop.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-white/60 text-sm mb-6 line-clamp-2">
                                        {workshop.description}
                                    </p>

                                    {/* Details */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-3 text-white/80">
                                            <Calendar size={16} className="text-cyan-400" />
                                            <span className="text-sm">{workshop.date}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-white/80">
                                            <Clock size={16} className="text-cyan-400" />
                                            <span className="text-sm">{workshop.time}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-white/80">
                                            <MapPin size={16} className="text-cyan-400" />
                                            <span className="text-sm">{workshop.location}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-white/80">
                                            <Users size={16} className="text-cyan-400" />
                                            <span className="text-sm">{workshop.seats} seats available</span>
                                        </div>
                                    </div>

                                    {/* Topics */}
                                    <div className="mb-6">
                                        <p className="text-cyan-400 text-xs font-bold mb-2 uppercase tracking-wider">Topics Covered:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {workshop.topics?.map((topic: string, i: number) => (
                                                <span key={i} className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs text-cyan-300">
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Instructor */}
                                    <div className="mb-6 pb-6 border-b border-white/10">
                                        <p className="text-white/40 text-xs mb-1">Instructor</p>
                                        <p className="text-white font-bold">{workshop.instructor}</p>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={() => setSelectedWorkshop(workshop)}
                                        className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold transition-all group-hover:shadow-lg group-hover:shadow-cyan-500/50"
                                    >
                                        Register Now
                                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>

                                {/* Scan Line Effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none"></div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Registration Modal */}
                {selectedWorkshop && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setSelectedWorkshop(null)}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl p-8 max-w-md w-full border-2 border-cyan-500/50"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-bold text-cyan-400 mb-4 font-[var(--font-orbitron)]">
                                Registration
                            </h3>
                            <p className="text-white/80 mb-6">
                                To register for <span className="text-cyan-400 font-bold">{selectedWorkshop.title}</span>,
                                please contact the IEEE student branch or visit our registration desk.
                            </p>
                            <div className="space-y-3 mb-6">
                                <p className="text-white/60 text-sm">
                                    <span className="text-cyan-400 font-bold">Email:</span> ieee@college.edu
                                </p>
                                <p className="text-white/60 text-sm">
                                    <span className="text-cyan-400 font-bold">Phone:</span> +91 1234567890
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedWorkshop(null)}
                                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}
