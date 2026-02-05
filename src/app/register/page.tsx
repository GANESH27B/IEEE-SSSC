"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Lock, Mail, ArrowRight, Loader2, ChevronLeft } from "lucide-react";
import { EarthCanvas } from "@/components/ui/EarthCanvas";

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock registration delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsLoading(false);
        // In a real app, handle registration logic here
        router.push("/login");
    };

    return (
        <div className="min-h-screen flex font-sans bg-[#020617]">

            {/* LEFT SIDE: Animation / Visuals */}
            <div className="hidden md:flex flex-1 relative bg-black items-center justify-center overflow-hidden border-r border-white/10">
                {/* Background Video */}
                <div className="absolute inset-0 z-0">
                    <EarthCanvas />
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-60 z-10"
                        poster="/images/login-poster.jpg"
                    >
                        <source src="https://cdn.pixabay.com/video/2023/10/22/186120-877174623_large.mp4" type="video/mp4" />
                    </video>
                    {/* Overlay gradient to blend video with theme */}
                    <div className="absolute inset-0 bg-cyan-950/30 mix-blend-overlay z-20" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none z-30" />

                <div className="relative z-40 text-center p-12 space-y-4">
                    <h2 className="text-5xl lg:text-7xl font-black text-white font-[var(--font-orbitron)] tracking-tighter opacity-90 select-none drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                        JOIN US
                    </h2>
                    <h3 className="text-xl lg:text-3xl font-bold text-cyan-400 font-[var(--font-orbitron)] tracking-[0.5em] uppercase drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                        Future
                    </h3>
                    <p className="text-white/60 text-sm tracking-widest uppercase mt-4 border-t border-white/20 pt-4 max-w-xs mx-auto">
                        Be Part of the Innovation
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE: Register Form */}
            <div className="w-full md:w-[600px] flex flex-col justify-center p-8 md:p-12 lg:p-16 relative bg-[#050505]">

                {/* Back Button */}
                <Link
                    href="/"
                    className="absolute top-8 left-8 text-white/50 hover:text-cyan-400 transition-colors flex items-center gap-2 group mb-8"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-[var(--font-orbitron)] tracking-widest text-xs">BACK TO HOME</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-md mx-auto"
                >
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-white mb-3 font-[var(--font-orbitron)] tracking-wider">
                            CREATE <span className="text-cyan-400">ACCOUNT</span>
                        </h1>
                        <p className="text-white/50 text-base tracking-wide leading-relaxed">
                            Join IEEE SSCS KARE to unlock exclusive resources and events.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-cyan-500 tracking-[0.2em] uppercase ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-cyan-400 transition-colors" size={20} />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500 focus:bg-cyan-950/10 transition-all font-medium"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-cyan-500 tracking-[0.2em] uppercase ml-1">Email <Address></Address></label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-cyan-400 transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500 focus:bg-cyan-950/10 transition-all font-medium"
                                    placeholder="member@ieee.org"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-cyan-500 tracking-[0.2em] uppercase ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-cyan-400 transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500 focus:bg-cyan-950/10 transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-5 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 group tracking-[0.2em] font-[var(--font-orbitron)] uppercase mt-4"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    Register
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-white/5 pt-6">
                        <p className="text-white/40 text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors tracking-wide">
                                SIGN IN
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
