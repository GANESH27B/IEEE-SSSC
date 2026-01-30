"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CompetitionsPage() {
    const [filter, setFilter] = useState("ALL");

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-20">
            {/* Header Section with Split Background */}
            <div className="relative h-[400px] w-full overflow-hidden flex">

                {/* Left Background - Mandala/Gold Style */}
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#1a1205] to-[#2a1c05] border-r border-yellow-500/20">
                    <div className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: "radial-gradient(circle at center, transparent 0%, #000 100%), repeating-conic-gradient(#ffd700 0 15deg, transparent 15deg 30deg)",
                            backgroundSize: "50% 100%"
                        }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-black/50 to-black/80" />
                </div>

                {/* Right Background - Circuit/Blue Style */}
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#020617] to-[#0f172a]">
                    <div className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: "linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)",
                            backgroundSize: "40px 40px"
                        }}
                    />
                    {/* Circuit lines simulation */}
                    <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
                        <path d="M100 0 V100 H200 V200" stroke="#06b6d4" strokeWidth="2" fill="none" />
                        <path d="M500 400 V300 H400 V200" stroke="#06b6d4" strokeWidth="2" fill="none" />
                        <circle cx="200" cy="200" r="4" fill="#06b6d4" />
                        <circle cx="400" cy="200" r="4" fill="#06b6d4" />
                    </svg>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black/50 to-black/80" />
                </div>

                {/* Overlay Gradient that unifies them slightly in the center */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />

                {/* Content */}
                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center h-full">

                    {/* Back Button */}
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block">
                        <Link href="/" className="w-12 h-12 rounded-lg bg-black/40 border border-yellow-500/30 flex items-center justify-center text-yellow-500 hover:bg-yellow-500/10 transition-all group">
                            <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-8xl font-black tracking-widest text-[#FFE5B4] font-[var(--font-orbitron)] uppercase drop-shadow-[0_0_25px_rgba(255,215,0,0.3)] bg-clip-text"
                        style={{
                            textShadow: "0 4px 10px rgba(0,0,0,0.8), 0 0 20px rgba(255,200,0,0.3)"
                        }}
                    >
                        EVENTS
                    </motion.h1>

                    {/* Filter Dropdown */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 relative"
                    >
                        <button className="flex items-center gap-2 px-8 py-2 bg-[#1a1a1a] border border-yellow-500/20 rounded-md text-yellow-500/80 font-[var(--font-orbitron)] tracking-widest text-sm hover:border-yellow-500/50 transition-all uppercase">
                            {filter}
                            <ChevronDown size={14} />
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* List Section */}
            <div className="container mx-auto px-6 py-20 min-h-[400px] flex flex-col items-center justify-center">
                <p className="text-white/40 font-[var(--font-orbitron)] tracking-wider text-lg animate-pulse">
                    Failed to load events
                </p>
                <button className="mt-4 text-xs text-yellow-500 underline underline-offset-4 opacity-50 hover:opacity-100">
                    RETRY
                </button>
            </div>
        </div>
    );
}
