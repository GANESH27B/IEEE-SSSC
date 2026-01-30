"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const teamMembers = [
    {
        name: "Dr. Sarah Mitchell",
        role: "Faculty Advisor",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        bio: "Professor of Computer Science & Engineering, guiding the next generation of innovators.",
        socials: { linkedin: "#", mail: "mailto:sarah@example.com" }
    },
    {
        name: "James Anderson",
        role: "Chairperson",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
        bio: "Leading the student branch with a vision for technological excellence and community growth.",
        socials: { linkedin: "#", github: "#", mail: "mailto:james@example.com" }
    },
    {
        name: "Emily Chen",
        role: "Vice Chairperson",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        bio: "Orchestrating technical workshops and ensuring seamless execution of all club activities.",
        socials: { linkedin: "#", github: "#" }
    },
    {
        name: "Michael Ross",
        role: "Technical Head",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        bio: "Full-stack developer and cloud enthusiast, overseeing all technical projects and hackathons.",
        socials: { linkedin: "#", github: "#", mail: "mailto:michael@example.com" }
    },
    {
        name: "Priya Patel",
        role: "Event Coordinator",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
        bio: "Creative mind behind our flagship events, ensuring engaging and memorable experiences.",
        socials: { linkedin: "#", mail: "mailto:priya@example.com" }
    },
    {
        name: "David Kim",
        role: "Treasurer",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        bio: "Managing finances and sponsorships to fuel our ambitious projects and events.",
        socials: { linkedin: "#", mail: "mailto:david@example.com" }
    }
];

export function Team() {
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/40 to-blue-600/40 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />

                            <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 flex flex-col items-center text-center">
                                {/* Hexagon Profile Container - simulating tech feel */}
                                <div className="relative w-32 h-32 mb-6">
                                    <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500" />
                                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cyan-500/50 group-hover:border-yellow-400 group-hover:border-4 transition-all duration-300">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                <h4 className="text-xl font-bold text-white font-[var(--font-orbitron)] mb-1 group-hover:text-cyan-400 transition-colors">
                                    {member.name}
                                </h4>
                                <p className="text-yellow-500 text-xs font-bold tracking-widest uppercase mb-4">
                                    {member.role}
                                </p>
                                <p className="text-white/60 text-sm mb-6 line-clamp-2">
                                    {member.bio}
                                </p>

                                <div className="mt-auto flex gap-4">
                                    {member.socials.linkedin && (
                                        <Link href={member.socials.linkedin} className="text-white/40 hover:text-cyan-400 transition-colors">
                                            <Linkedin size={18} />
                                        </Link>
                                    )}
                                    {member.socials.github && (
                                        <Link href={member.socials.github} className="text-white/40 hover:text-white transition-colors">
                                            <Github size={18} />
                                        </Link>
                                    )}
                                    {member.socials.mail && (
                                        <Link href={member.socials.mail} className="text-white/40 hover:text-yellow-400 transition-colors">
                                            <Mail size={18} />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

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
