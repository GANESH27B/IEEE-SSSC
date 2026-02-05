"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, MapPin, Users, Award, Briefcase, GraduationCap, ChevronRight, Linkedin, Globe, Sparkles } from "lucide-react";

export default function GuestLecturesPage() {
    const [lectures, setLectures] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLecture, setSelectedLecture] = useState<any | null>(null);

    // Mouse Tracking Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const bgX = useTransform(springX, [0, 1920], [-15, 15]);
    const bgY = useTransform(springY, [0, 1080], [-15, 15]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const res = await fetch('/api/lectures');
                const data = await res.json();
                if (data.success) {
                    setLectures(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch lectures:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLectures();
    }, []);

    return (
        <div className="relative min-h-screen bg-black pt-32 pb-20 overflow-hidden text-white">
            {/* Clear Interactive Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    style={{ x: bgX, y: bgY, scale: 1.05 }}
                    className="relative w-full h-full"
                >
                    <Image
                        src="/images/lectures-bg.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                </motion.div>

                {/* Advanced Light Overlays for Clarity */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 font-[var(--font-orbitron)] tracking-wider">
                        GUEST <span className="text-cyan-400">LECTURES</span>
                    </h1>
                    <p className="text-white/60 text-lg max-w-3xl mx-auto">
                        Learn from industry leaders, renowned researchers, and successful entrepreneurs.
                        Gain insights that go beyond textbooks.
                    </p>
                </motion.div>

                {/* Lectures Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {lectures.map((lecture, index) => (
                        <motion.div
                            key={lecture.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-300"
                        >
                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors z-20"></div>
                            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors z-20"></div>

                            {/* Lecture Image Header */}
                            {lecture.eventImage && (
                                <div className="relative w-full h-48 overflow-hidden">
                                    <img
                                        src={lecture.eventImage}
                                        alt={lecture.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent opacity-60" />
                                </div>
                            )}

                            <div className="p-8">
                                {/* Type Badge */}
                                <div className="flex items-center justify-between mb-6">
                                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                        {lecture.type === "Industry Expert" && <Briefcase size={14} />}
                                        {lecture.type === "Academic" && <GraduationCap size={14} />}
                                        {lecture.type === "Researcher" && <Award size={14} />}
                                        {lecture.type === "Entrepreneur" && <Briefcase size={14} />}
                                        {lecture.type}
                                    </span>
                                </div>

                                {/* Speaker Info */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors flex-shrink-0">
                                        <img
                                            src={lecture.image}
                                            alt={lecture.speaker}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-1 font-[var(--font-orbitron)]">
                                            {lecture.speaker}
                                        </h3>
                                        <p className="text-cyan-400 text-sm font-bold mb-1">{lecture.designation}</p>
                                        <p className="text-white/60 text-sm">{lecture.company}</p>
                                    </div>
                                </div>

                                {/* Title */}
                                <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                                    {lecture.title}
                                </h4>

                                {/* Bio */}
                                <p className="text-white/60 text-sm mb-6 line-clamp-2">
                                    {lecture.bio}
                                </p>

                                {/* Details */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-white/80">
                                        <Calendar size={16} className="text-cyan-400" />
                                        <span className="text-sm">{lecture.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/80">
                                        <Clock size={16} className="text-cyan-400" />
                                        <span className="text-sm">{lecture.time}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/80">
                                        <MapPin size={16} className="text-cyan-400" />
                                        <span className="text-sm">{lecture.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/80">
                                        <Users size={16} className="text-cyan-400" />
                                        <span className="text-sm">{lecture.attendees} expected attendees</span>
                                    </div>
                                </div>

                                {/* Topics */}
                                <div className="mb-6">
                                    <p className="text-cyan-400 text-xs font-bold mb-2 uppercase tracking-wider">Key Topics:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {lecture.topics.map((topic: string, i: number) => (
                                            <span key={i} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-300">
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                                    <a href={lecture.linkedin} className="text-cyan-400 hover:text-cyan-300 transition-colors">
                                        <Linkedin size={20} />
                                    </a>
                                    <a href={lecture.website} className="text-cyan-400 hover:text-cyan-300 transition-colors">
                                        <Globe size={20} />
                                    </a>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => setSelectedLecture(lecture)}
                                    className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold transition-all group-hover:shadow-lg group-hover:shadow-cyan-500/50"
                                >
                                    Reserve Seat
                                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Scan Line Effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none"></div>
                        </motion.div>
                    ))}
                </div>

                {/* Reservation Modal */}
                {selectedLecture && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setSelectedLecture(null)}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl p-8 max-w-md w-full border-2 border-cyan-500/50"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-bold text-cyan-400 mb-4 font-[var(--font-orbitron)]">
                                Reserve Your Seat
                            </h3>
                            <p className="text-white/80 mb-6">
                                To reserve a seat for <span className="text-cyan-400 font-bold">{selectedLecture.speaker}'s</span> lecture on
                                <span className="text-cyan-400 font-bold"> "{selectedLecture.title}"</span>,
                                please register through the IEEE portal or contact us.
                            </p>
                            <div className="space-y-3 mb-6">
                                <p className="text-white/60 text-sm">
                                    <span className="text-cyan-400 font-bold">Email:</span> ieee@college.edu
                                </p>
                                <p className="text-white/60 text-sm">
                                    <span className="text-cyan-400 font-bold">Phone:</span> +91 1234567890
                                </p>
                                <p className="text-white/60 text-sm">
                                    <span className="text-cyan-400 font-bold">Seats Available:</span> {selectedLecture.attendees}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedLecture(null)}
                                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}
