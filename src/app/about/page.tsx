"use client";

import { motion } from "framer-motion";
import { Cpu, Target, Globe, GraduationCap, Users, Rocket } from "lucide-react";
import { StarField } from "@/components/ui/StarField";

export default function AboutPage() {
    const aboutItems = [
        {
            icon: <Cpu className="w-8 h-8 text-cyan-400" />,
            title: "Main Areas of Focus",
            description: "SSCS covers analog, digital, mixed-signal, and RF integrated circuits, VLSI design, low-power and high-speed circuits, system-on-chip (SoC), semiconductor devices, and emerging hardware for AI and communication systems."
        },
        {
            icon: <Target className="w-8 h-8 text-purple-400" />,
            title: "What Does SSCS Do?",
            description: "SSCS promotes research, education, and professional growth by organizing technical events, publishing high-quality journals, supporting conferences, and connecting students with researchers and industry experts worldwide."
        },
        {
            icon: <Globe className="w-8 h-8 text-blue-400" />,
            title: "Conferences & Events",
            description: "SSCS sponsors leading international conferences such as the International Solid-State Circuits Conference (ISSCC), VLSI Symposium, and Asian Solid-State Circuits Conference (A-SSCC), providing platforms to present and learn about advanced IC technologies."
        },
        {
            icon: <GraduationCap className="w-8 h-8 text-pink-400" />,
            title: "Student Benefits",
            description: "Students gain access to technical workshops, expert lectures, research resources, networking opportunities, career guidance, and exposure to real-world integrated circuit design and semiconductor industry trends."
        },
        {
            icon: <Users className="w-8 h-8 text-yellow-400" />,
            title: "SSCS Student Chapters",
            description: "SSCS Student Chapters in colleges organize seminars, hands-on training, industrial talks, technical competitions, and collaborative activities that enhance students' technical skills and research interests."
        },
        {
            icon: <Rocket className="w-8 h-8 text-red-400" />,
            title: "Why Join SSCS?",
            description: "Joining SSCS helps students and professionals build strong foundations in IC design, stay updated with emerging technologies, connect with industry leaders, and prepare for careers in VLSI, embedded systems, and semiconductor industries."
        }
    ];

    return (
        <div className="relative min-h-screen bg-transparent pt-32 pb-20 overflow-hidden text-white perspective-[2000px]">
            {/* Space Background with Moving Stars */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <StarField />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Intro Section */}
                <div className="text-center mb-20 max-w-4xl mx-auto">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black text-white font-[var(--font-orbitron)] uppercase mb-8 leading-relaxed tracking-wide"
                    >
                        What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">IEEE Solid-State Circuits Society (SSCS)?</span>
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-white/70 leading-relaxed"
                    >
                        IEEE Solid-State Circuits Society (SSCS) is a technical society under IEEE that focuses on the design, development, and application of solid-state and integrated circuits. It supports innovation and knowledge sharing in microelectronics and semiconductor technologies.
                    </motion.p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {aboutItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all group h-full backdrop-blur-sm"
                        >
                            <div className="mb-6 p-4 rounded-xl bg-black/40 border border-white/5 w-fit group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4 font-[var(--font-orbitron)] group-hover:text-cyan-400 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
