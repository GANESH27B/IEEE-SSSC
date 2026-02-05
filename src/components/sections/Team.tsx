"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Team() {
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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
    const groupedTeam = teamMembers.reduce((acc: any, member: any) => {
        const role = member.role || 'Other';
        if (!acc[role]) {
            acc[role] = [];
        }
        acc[role].push(member);
        return acc;
    }, {});

    // Define role order for display
    const roleOrder = [
        'Chairperson',
        'Vice Chairperson',
        'Secretary',
        'Treasurer',
        'Technical Head',
        'Event Coordinator',
        'Web Development Lead',
        'Core Team Member',
        'Public Relations',
        'Research Coordinator',
        'Design Head',
        'Marketing Head'
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
        <section id="team" className="py-24 relative bg-[#020617] overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyan-900/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-900/10 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-cyan-400 font-bold tracking-[0.2em] font-[var(--font-orbitron)] uppercase"
                    >
                        Our Leaders
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-white font-[var(--font-orbitron)] uppercase"
                    >
                        Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Team</span>
                    </motion.h3>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                        <p className="text-white/60 mt-4">Loading team members...</p>
                    </div>
                ) : teamMembers.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-white/60">No team members yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {roles.map((role: string, roleIndex: number) => (
                            <motion.div
                                key={role}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: roleIndex * 0.2 }}
                            >
                                {/* Role Header */}
                                <div className="mb-8">
                                    <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 font-[var(--font-orbitron)] uppercase tracking-wider relative inline-block">
                                        {role}
                                        <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-transparent"></div>
                                    </h3>
                                </div>

                                {/* Team Members Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {groupedTeam[role].map((member: any, index: number) => (
                                        <motion.div
                                            key={member._id}
                                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{
                                                duration: 0.5,
                                                delay: index * 0.1,
                                                type: "spring",
                                                stiffness: 100
                                            }}
                                            whileHover={{
                                                y: -10,
                                                transition: { duration: 0.2 }
                                            }}
                                            className="group relative"
                                        >
                                            {/* Hexagonal Card Container */}
                                            <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-lg overflow-hidden">
                                                {/* Animated Border */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/50 via-blue-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

                                                {/* Corner Accents */}
                                                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors"></div>
                                                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors"></div>
                                                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors"></div>
                                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors"></div>

                                                {/* Content */}
                                                <div className="relative p-6 flex flex-col items-center text-center">
                                                    {/* Profile Image with Glow */}
                                                    <div className="relative mb-4">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500"></div>
                                                        <div className="relative w-40 h-40 rounded-lg overflow-hidden border-2 border-cyan-500/30 group-hover:border-cyan-400 transition-all duration-300">
                                                            {/* Diagonal cut effect */}
                                                            <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-cyan-500/20 border-l-[40px] border-l-transparent group-hover:border-t-cyan-400/40 transition-all"></div>

                                                            {member.image ? (
                                                                <Image
                                                                    src={member.image}
                                                                    alt={member.name}
                                                                    fill
                                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                                                    <span className="text-5xl font-bold text-cyan-400">
                                                                        {member.name.charAt(0)}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Name */}
                                                    <h4 className="text-xl font-bold text-white font-[var(--font-orbitron)] mb-2 uppercase tracking-wide group-hover:text-cyan-400 transition-colors">
                                                        {member.name}
                                                    </h4>

                                                    {/* Role */}
                                                    <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-3 group-hover:text-yellow-400 transition-colors">
                                                        {member.role}
                                                    </p>

                                                    {/* Year Info */}
                                                    <div className="w-full px-4 py-2 bg-black/30 rounded border border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors mb-4">
                                                        <p className="text-white/60 text-xs uppercase tracking-wider">
                                                            {member.year}
                                                        </p>
                                                    </div>

                                                    {/* Contact Info (if available) */}
                                                    {member.email && (
                                                        <div className="w-full space-y-1">
                                                            <p className="text-cyan-300 text-xs font-mono">
                                                                {member.email}
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* Social Links - Always Show */}
                                                    <div className="flex gap-3 mt-4">
                                                        {member.linkedin ? (
                                                            <a
                                                                href={member.linkedin}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400 text-cyan-400 transition-all"
                                                                title="LinkedIn Profile"
                                                            >
                                                                <Linkedin size={18} />
                                                            </a>
                                                        ) : (
                                                            <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg text-white/30 cursor-not-allowed" title="LinkedIn not available">
                                                                <Linkedin size={18} />
                                                            </div>
                                                        )}
                                                        {member.github ? (
                                                            <a
                                                                href={member.github}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400 text-cyan-400 transition-all"
                                                                title="GitHub Profile"
                                                            >
                                                                <Github size={18} />
                                                            </a>
                                                        ) : (
                                                            <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg text-white/30 cursor-not-allowed" title="GitHub not available">
                                                                <Github size={18} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Scan Line Effect */}
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none"></div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="mt-16 text-center">
                    <Link
                        href="/team"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 text-white font-[var(--font-orbitron)] tracking-widest text-sm rounded-full transition-all group"
                    >
                        VIEW FULL TEAM
                        <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
