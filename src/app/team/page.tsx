"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Mail, ExternalLink, ChevronLeft, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TeamPage() {
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const fetchTeamMembers = async () => {
        try {
            const res = await fetch('/api/team');
            const data = await res.json();
            if (data.success) {
                setTeamMembers(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch team members:', error);
        } finally {
            setLoading(false);
        }
    };

    // Group team members by role
    const filteredMembers = teamMembers.filter(member =>
        (member.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (member.role?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (member.department?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );

    const groupedTeam = filteredMembers.reduce((acc: any, member: any) => {
        const role = member.role || 'Other';
        if (!acc[role]) {
            acc[role] = [];
        }
        acc[role].push(member);
        return acc;
    }, {});

    // Sort members within each group: Core > Lead > Regular
    Object.keys(groupedTeam).forEach(role => {
        groupedTeam[role].sort((a: any, b: any) => {
            const scoreA = (a.isCore ? 2 : 0) + (a.isLead ? 1 : 0);
            const scoreB = (b.isCore ? 2 : 0) + (b.isLead ? 1 : 0);
            return scoreB - scoreA;
        });
    });

    const roleOrder = [
        'Chapter advisor',
        'Chairperson',
        'Vice Chairperson',
        'Secretary',
        'Technical Head',
        'Event Coordinator',
        'Web Development Lead',
        'Core Team Member',
        'Public Relations',
        'Research Coordinator',
        'Design Head'
    ];

    const roles = Object.keys(groupedTeam).sort((a, b) => {
        const indexA = roleOrder.indexOf(a);
        const indexB = roleOrder.indexOf(b);
        if (indexA === -1 && indexB === -1) return a.localeCompare(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-24 pb-16">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                    <div className="space-y-4 text-center md:text-left">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold tracking-widest text-xs uppercase transition-colors"
                        >
                            <ChevronLeft size={16} />
                            Back to Home
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-black font-[var(--font-orbitron)] text-white uppercase tracking-tighter">
                            ALL <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">TEAMS</span>
                        </h1>
                        <p className="text-white/50 font-mono tracking-widest uppercase text-sm">
                            United for Innovation and Excellence
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-cyan-400">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="SEARCH AGENTS..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border-2 border-white/10 rounded-xl py-4 pl-12 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all font-[var(--font-orbitron)] tracking-widest"
                        />
                        <div className="absolute inset-0 bg-cyan-400/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="relative w-20 h-20">
                            <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full" />
                            <div className="absolute inset-0 border-4 border-t-cyan-500 rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                        </div>
                        <p className="mt-8 text-cyan-400 font-[var(--font-orbitron)] tracking-[0.3em] uppercase animate-pulse">
                            Syncing Neural Records...
                        </p>
                    </div>
                ) : filteredMembers.length === 0 ? (
                    <div className="text-center py-24 border-2 border-dashed border-white/10 rounded-2xl">
                        <p className="text-white/40 font-[var(--font-orbitron)] tracking-widest text-lg">
                            NO RECORDS FOUND FOR "<span className="text-red-500">{searchQuery.toUpperCase()}</span>"
                        </p>
                    </div>
                ) : (
                    <div className="space-y-24">
                        {roles.map((role) => (
                            <div key={role} className="space-y-12">
                                {/* Role Header with Glitch Effect on Hover */}
                                <div className="relative">
                                    <h2 className="text-3xl md:text-4xl font-black text-white font-[var(--font-orbitron)] uppercase tracking-widest flex items-center gap-4">
                                        <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-transparent" />
                                        {role}
                                        <span className="text-white/20 text-xs ml-4">[{groupedTeam[role].length} DATA SETS]</span>
                                    </h2>
                                </div>

                                {/* Members Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {groupedTeam[role].map((member: any, index: number) => (
                                        <motion.div
                                            key={member._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="group"
                                        >
                                            <div className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 h-full
                                                ${member.isCore
                                                    ? "bg-[#1a1033] border-purple-500/30 hover:border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.1)]"
                                                    : member.isLead
                                                        ? "bg-[#1e1e0f] border-yellow-500/30 hover:border-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.1)]"
                                                        : "bg-white/5 border-white/10 hover:border-cyan-500/50"
                                                }
                                            `}>
                                                {/* Header Badges */}
                                                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                                                    {member.isCore && (
                                                        <div className="bg-purple-600/20 border border-purple-500/50 text-purple-400 text-[8px] font-black px-2 py-1 rounded tracking-tighter uppercase">
                                                            CORE AGENT
                                                        </div>
                                                    )}
                                                    {member.isLead && (
                                                        <div className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 text-[8px] font-black px-2 py-1 rounded tracking-tighter uppercase">
                                                            SECTOR LEAD
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="p-6">
                                                    {/* Avatar & Info */}
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-xl border-2 border-white/10 group-hover:border-cyan-500/50 transition-colors bg-black">
                                                            {member.image ? (
                                                                <Image
                                                                    src={member.image}
                                                                    alt={member.name}
                                                                    fill
                                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-4xl font-black text-cyan-400/50">
                                                                    {member.name.charAt(0)}
                                                                </div>
                                                            )}
                                                            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </div>
                                                        <div className="overflow-hidden">
                                                            <h3 className="text-xl font-bold text-white font-[var(--font-orbitron)] leading-tight group-hover:text-cyan-400 transition-colors truncate">
                                                                {member.name}
                                                            </h3>
                                                            <p className="text-cyan-500 text-xs font-black tracking-widest uppercase mt-1 truncate">
                                                                {member.role}
                                                            </p>
                                                            <p className="text-white/30 text-[10px] font-mono mt-2 truncate">
                                                                {member.department || "KARE STUDENT"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Contact & Social */}
                                                    <div className="space-y-4">
                                                        {member.email && (
                                                            <div className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                                                                <Mail size={14} className="text-cyan-500" />
                                                                <span className="text-[10px] font-mono truncate">{member.email}</span>
                                                            </div>
                                                        )}

                                                        <div className="flex gap-2 pt-2 border-t border-white/5">
                                                            {member.linkedin ? (
                                                                <a
                                                                    href={member.linkedin}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex-1 bg-white/5 hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-500/50 p-2.5 rounded-lg text-white/40 hover:text-cyan-400 transition-all flex justify-center"
                                                                >
                                                                    <Linkedin size={16} />
                                                                </a>
                                                            ) : (
                                                                <div className="flex-1 bg-white/5 border border-white/5 p-2.5 rounded-lg text-white/10 flex justify-center cursor-not-allowed">
                                                                    <Linkedin size={16} />
                                                                </div>
                                                            )}
                                                            {member.github ? (
                                                                <a
                                                                    href={member.github}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex-1 bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/50 p-2.5 rounded-lg text-white/40 hover:text-blue-400 transition-all flex justify-center"
                                                                >
                                                                    <Github size={16} />
                                                                </a>
                                                            ) : (
                                                                <div className="flex-1 bg-white/5 border border-white/5 p-2.5 rounded-lg text-white/10 flex justify-center cursor-not-allowed">
                                                                    <Github size={16} />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Scanline Effect */}
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[1.5s] pointer-events-none" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
