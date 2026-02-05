"use client";

import { motion } from "framer-motion";
import { Shield, Target, Users, Globe, Cpu, Zap } from "lucide-react";
import { RotatingBlocks } from "@/components/ui/RotatingBlocks";

export default function AboutPage() {
    return (
        <div className="relative min-h-screen bg-black pt-32 pb-20 overflow-hidden text-white perspective-[2000px]">
            {/* 3D Background Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
                <RotatingBlocks />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Hero Header */}
                <div className="max-w-4xl mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-cyan-400 font-bold tracking-[0.4em] text-[10px] uppercase mb-6 flex items-center gap-3"
                    >
                        <Shield size={14} />
                        Architecting Innovation Since inception
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black text-white font-[var(--font-orbitron)] leading-none mb-10 tracking-tighter"
                    >
                        THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-white/40">GENESIS</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-white text-xl font-light leading-relaxed max-w-2xl opacity-80"
                    >
                        The IEEE Solid-State Circuits Society Student Chapter is a bastion of technical excellence, dedicated to the mastery of integrated circuits and semiconductor technology.
                    </motion.p>
                </div>

                {/* Core Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                    {[
                        {
                            icon: <Target className="text-cyan-400" size={32} />,
                            title: "OUR MISSION",
                            content: "To empower students with deep technical knowledge in chip design and analog/digital circuits through rigorous hands-on experimentation."
                        },
                        {
                            icon: <Globe className="text-emerald-400" size={32} />,
                            title: "OUR VISION",
                            content: "Leading the global student community in SSCS by bridging the gap between theoretical physics and practical silicon implementations."
                        },
                        {
                            icon: <Users className="text-purple-400" size={32} />,
                            title: "OUR COMMUNITY",
                            content: "A high-performance network of engineers, researchers, and innovators committed to mutual growth and industry-standard expertise."
                        }
                    ].map((pillar, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all group"
                        >
                            <div className="mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                                {pillar.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4 font-[var(--font-orbitron)] tracking-widest text-white/80 group-hover:text-white transition-colors">
                                {pillar.title}
                            </h3>
                            <p className="text-sm text-white font-light leading-relaxed italic opacity-80">
                                "{pillar.content}"
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Technical Heritage */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative p-12 rounded-[60px] bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent border border-white/5 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8">
                            <Cpu className="text-cyan-400/20 w-32 h-32" />
                        </div>
                        <h2 className="text-4xl font-black mb-8 font-[var(--font-orbitron)]">TECHNICAL <span className="text-cyan-400">FOUNDRY</span></h2>
                        <ul className="space-y-6">
                            {[
                                "Advanced CMOS VLSI Design Workshops",
                                "Analog Integrated Circuit Analysis",
                                "Digital System Verification Laboratory",
                                "Semiconductor Device Physics Research",
                                "Industrial Grade EDA Tool Training"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-white font-light opacity-80">
                                    <Zap size={14} className="text-cyan-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <div className="space-y-8">
                        <h2 className="text-5xl font-black font-[var(--font-orbitron)] tracking-tighter">WHY WE <span className="text-emerald-500">EXCEL</span></h2>
                        <p className="text-white leading-relaxed font-light text-lg opacity-80">
                            We don't just study circuits; we architect the future. Our chapter is built on the philosophy that true understanding comes from building. From initial schematics to finalized layouts, our members are equipped with the precision and discipline required by the global semiconductor industry.
                        </p>
                        <div className="flex gap-4">
                            <div className="px-6 py-2 rounded-full border border-cyan-500/30 text-[10px] font-black tracking-widest uppercase text-white">Industry Standard</div>
                            <div className="px-6 py-2 rounded-full border border-cyan-500/30 text-[10px] font-black tracking-widest uppercase text-white">Hands-on Mastery</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        </div>
    );
}

