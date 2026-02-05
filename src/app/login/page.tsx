"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { User, Lock, ArrowRight, Loader2, ChevronLeft, Shield } from "lucide-react";
import { EarthCanvas } from "@/components/ui/EarthCanvas";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // Call login API
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                setError(data.error || 'Invalid credentials');
                setIsLoading(false);
                return;
            }

            // Store user data
            const userData = data.data;

            if (userData.role === 'admin') {
                // Admin login
                localStorage.setItem("isAdmin", "true");
                localStorage.setItem("adminEmail", userData.email);
                localStorage.setItem("adminData", JSON.stringify(userData));
                router.push("/admin");
            } else {
                // Member login
                localStorage.setItem("memberData", JSON.stringify(userData));
                router.push("/member");
            }
        } catch (error) {
            setError('Login failed. Please try again.');
            setIsLoading(false);
        }
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
                    <div className="absolute inset-0 bg-cyan-950/30 mix-blend-overlay" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none z-10" />

                <div className="relative z-20 text-center p-12 space-y-4">
                    <h2 className="text-5xl lg:text-7xl font-black text-white font-[var(--font-orbitron)] tracking-tighter opacity-90 select-none drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                        IEEE
                    </h2>
                    <h3 className="text-xl lg:text-3xl font-bold text-cyan-400 font-[var(--font-orbitron)] tracking-[0.5em] uppercase drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                        Innovation
                    </h3>
                    <p className="text-white/60 text-sm tracking-widest uppercase mt-4 border-t border-white/20 pt-4 max-w-xs mx-auto">
                        Advancing Technology for Humanity
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE: Login Form */}
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
                    {/* Login Type Toggle */}
                    <div className="flex gap-2 mb-8 bg-white/5 p-1 rounded-lg">
                        <button
                            onClick={() => setIsAdmin(false)}
                            className={`flex-1 py-3 rounded-lg font-bold transition-all ${!isAdmin
                                ? "bg-cyan-600 text-white"
                                : "text-white/60 hover:text-white"
                                }`}
                        >
                            User Login
                        </button>
                        <button
                            onClick={() => setIsAdmin(true)}
                            className={`flex-1 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${isAdmin
                                ? "bg-cyan-600 text-white"
                                : "text-white/60 hover:text-white"
                                }`}
                        >
                            <Shield size={16} />
                            Admin
                        </button>
                    </div>

                    <div className="mb-12">
                        <h1 className="text-4xl font-black text-white mb-3 font-[var(--font-orbitron)] tracking-wider">
                            {isAdmin ? (
                                <>ADMIN <span className="text-cyan-400">LOGIN</span></>
                            ) : (
                                <>WELCOME <span className="text-cyan-400">BACK</span></>
                            )}
                        </h1>
                        <p className="text-white/50 text-base tracking-wide leading-relaxed">
                            {isAdmin
                                ? "Access the admin dashboard to manage content and members."
                                : "Sign in to access your IEEE dashboard, manage events, and connect with the community."}
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    {isAdmin && (
                        <div className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/50 rounded-lg text-cyan-400 text-sm">
                            <p className="font-bold mb-1">Demo Admin Credentials:</p>
                            <p>Email: admin@ieee.org</p>
                            <p>Password: admin123</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-cyan-500 tracking-[0.2em] uppercase ml-1">Email Address</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-cyan-400 transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500 focus:bg-cyan-950/10 transition-all font-medium"
                                    placeholder={isAdmin ? "admin@ieee.org" : "member@ieee.org"}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-bold text-cyan-500 tracking-[0.2em] uppercase">Password</label>
                                {!isAdmin && (
                                    <Link href="#" className="text-xs text-white/40 hover:text-white transition-colors tracking-wide underline underline-offset-4">Forgot Password?</Link>
                                )}
                            </div>
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
                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-5 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 group tracking-[0.2em] font-[var(--font-orbitron)] uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    {isAdmin ? "Access Dashboard" : "Sign In"}
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {!isAdmin && (
                        <div className="mt-10 text-center border-t border-white/5 pt-8">
                            <p className="text-white/40 text-sm">
                                Don't have an account?{" "}
                                <Link href="/register" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors tracking-wide">
                                    APPLY NOW
                                </Link>
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
