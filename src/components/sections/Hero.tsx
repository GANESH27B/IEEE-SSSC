"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { NetworkBackground } from "@/components/ui/NetworkBackground";
import { useState } from "react";

export function Hero() {
    const [kareClickCount, setKareClickCount] = useState(0);

    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden -mt-20 pt-20">
            <NetworkBackground />

            {/* Dark overlay to ensure text legibility if needed, though background is dark already */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-0 pointer-events-none" />

            <div className="container z-10 px-6 text-center space-y-8 mt-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >


                    <h1 className="text-6xl md:text-8xl lg:text-7xl font-black tracking-tighter text-white font-[var(--font-orbitron)] uppercase leading-none select-none">
                        IEEE SOLID STATE CIRCUITS SOCIETY
                    </h1>

                    <motion.h2
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-widest text-yellow-400 font-[var(--font-orbitron)] mt-2 uppercase select-none drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] cursor-pointer inline-block"
                        animate={kareClickCount > 0 ? {
                            scale: [1, 1.2, 0.9, 1.1, 1],
                            rotate: [0, 5, -5, 3, 0],
                            color: ["#facc15", "#22d3ee", "#facc15"], // Flash cyan
                            textShadow: [
                                "0 0 15px rgba(250,204,21,0.5)",
                                "0 0 40px rgba(34,211,238,0.8)",
                                "0 0 15px rgba(250,204,21,0.5)"
                            ]
                        } : {}}
                        onClick={() => setKareClickCount(p => p + 1)}
                        whileHover={{ scale: 1.05 }}
                    >
                        KARE
                    </motion.h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl mx-auto pt-8"
                >
                    <p className="text-cyan-200 tracking-[0.2em] text-sm md:text-base font-bold uppercase mb-2">
                        Student Chapter
                    </p>
                    <p className="text-blue-500 tracking-[0.1em] text-xs md:text-sm font-bold uppercase">
                        OUR TEAM
                    </p>
                </motion.div>
            </div>



            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cyan-500 animate-bounce cursor-pointer z-10"
                onClick={() => {
                    const teamSection = document.getElementById("team");
                    if (teamSection) {
                        teamSection.scrollIntoView({ behavior: "smooth" });
                    }
                }}
            >
                <ChevronDown size={32} />
            </motion.div>
        </section>
    );
}
