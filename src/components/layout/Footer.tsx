import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, ExternalLink } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative z-50 border-t border-cyan-500/20 bg-gradient-to-b from-[#0a0a1a] to-black py-16 md:py-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-black font-[var(--font-orbitron)] tracking-tight">
                            IEEE <span className="text-cyan-400">SSCS</span>
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            IEEE Solid-State Circuits Society Student Chapter at KARE. Empowering students through innovation in integrated circuits and semiconductor technology.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <a href="#" className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400 text-cyan-400 transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400 text-cyan-400 transition-all">
                                <Linkedin size={18} />
                            </a>
                            <a href="#" className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400 text-cyan-400 transition-all">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-cyan-400 mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-white/60">
                            <li><Link href="/workshops" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ExternalLink size={12} />Workshops</Link></li>
                            <li><Link href="/lectures" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ExternalLink size={12} />Guest Lectures</Link></li>
                            <li><Link href="/sessions" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ExternalLink size={12} />Interactive Sessions</Link></li>
                            <li><Link href="/gallery" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ExternalLink size={12} />Photo Gallery</Link></li>
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h4 className="font-bold text-cyan-400 mb-6 uppercase tracking-wider text-sm">About</h4>
                        <ul className="space-y-3 text-sm text-white/60">
                            <li><Link href="/about" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ExternalLink size={12} />Our Team</Link></li>
                            <li><Link href="/contact" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ExternalLink size={12} />Contact Us</Link></li>
                            <li><Link href="/login" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ExternalLink size={12} />Member Login</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-cyan-400 mb-6 uppercase tracking-wider text-sm">Contact</h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li className="flex items-start gap-3">
                                <Mail size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                                <span>sscs@kare.edu.in</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                                <span>Kalasalingam Academy of Research and Education, Krishnankoil, Tamil Nadu</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/40">
                        © {new Date().getFullYear()} IEEE SSCS Student Chapter, KARE. All rights reserved.
                    </p>
                    <p className="text-xs text-white/30">
                        Designed with 💙 by the IEEE SSCS Team
                    </p>
                </div>
            </div>
        </footer>
    );
}
