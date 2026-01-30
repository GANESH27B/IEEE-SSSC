import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black py-12 md:py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">IEEE<span className="text-primary">.Club</span></h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Empowering students to build, innovate, and lead through technology and collaboration.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-white/60">
                            <li><Link href="/events" className="hover:text-primary transition-colors">Upcoming Events</Link></li>
                            <li><Link href="/gallery" className="hover:text-primary transition-colors">Photo Gallery</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">Our Team</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Join Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6">Contact</h4>
                        <ul className="space-y-3 text-sm text-white/60">
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="text-primary" />
                                <span>contact@ieee.club</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin size={16} className="text-primary" />
                                <span>Engineering Block, University Campus</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6">Socials</h4>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-white/40">
                    © {new Date().getFullYear()} IEEE Student Branch. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
