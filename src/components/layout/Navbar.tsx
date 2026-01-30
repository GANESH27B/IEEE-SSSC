"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" },
    {
        name: "ACTIVITIES",
        href: "#",
        subLinks: [
            { name: "COMPETITIONS", href: "/activities/competitions" },
            { name: "WORKSHOPS", href: "/activities/workshops" },
        ]
    },
    {
        name: "INNOVATION",
        href: "#",
        subLinks: [
            { name: "INTERACTIVE SESSIONS", href: "/innovation/sessions" },

            { name: "GUEST LECTURES", href: "/innovation/lectures" },
        ]
    },
    { name: "GALLERY", href: "/gallery" },
    { name: "CONTACT US", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                scrolled ? "glass-nav py-4" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex flex-col group -space-y-1">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl md:text-3xl font-black tracking-widest text-white group-hover:text-cyan-400 transition-colors uppercase font-[var(--font-orbitron)]">
                            IEEE SSSC   KARE
                        </span>
                        <span className="text-xl md:text-2xl font-bold text-red-600 font-[var(--font-orbitron)]">

                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden xl:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative group/menu"
                            onMouseEnter={() => setHoveredLink(link.name)}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <Link
                                href={link.href}
                                className={cn(
                                    "text-[11px] font-bold tracking-[0.1em] transition-colors uppercase flex items-center gap-1 font-[var(--font-orbitron)] py-2",
                                    hoveredLink === link.name ? "text-yellow-400" : "text-white/90 hover:text-yellow-400"
                                )}
                            >
                                {link.name}
                                {link.subLinks && <ChevronDown size={12} className="ml-0.5" />}
                            </Link>

                            {/* Dropdown */}
                            {link.subLinks && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-56 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 transform translate-y-2 group-hover/menu:translate-y-0">
                                    <div className="glass-nav rounded-lg overflow-hidden flex flex-col p-1 bg-[#050505]/95 shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/10">
                                        {link.subLinks.map(sub => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                className="block px-4 py-3 text-[10px] text-white/70 hover:text-cyan-400 hover:bg-white/5 transition-all font-[var(--font-orbitron)] tracking-wider border-b border-white/5 last:border-0"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="w-px h-6 bg-white/20 mx-2"></div>

                    <Link
                        href="/login"
                        className="text-[11px] font-bold tracking-[0.1em] text-white hover:text-cyan-400 transition-colors uppercase font-[var(--font-orbitron)]"
                    >
                        LOG IN
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="xl:hidden text-white hover:text-cyan-400 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full glass border-b border-white/10 xl:hidden flex flex-col items-center py-8 space-y-6 bg-black/95 backdrop-blur-xl max-h-[90vh] overflow-y-auto"
                    >
                        {navLinks.map((link) => (
                            <div key={link.name} className="flex flex-col items-center space-y-2 w-full">
                                <Link
                                    href={link.href}
                                    onClick={() => !link.subLinks && setIsOpen(false)}
                                    className="text-lg font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors text-white font-[var(--font-orbitron)]"
                                >
                                    {link.name}
                                </Link>
                                {link.subLinks && (
                                    <div className="flex flex-col items-center space-y-2 pb-2">
                                        {link.subLinks.map(sub => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                onClick={() => setIsOpen(false)}
                                                className="text-sm text-white/60 hover:text-cyan-400 uppercase tracking-widest font-[var(--font-orbitron)]"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-bold uppercase tracking-widest text-cyan-400 hover:text-white transition-colors font-[var(--font-orbitron)] pt-4"
                        >
                            LOG IN
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
