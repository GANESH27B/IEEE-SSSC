"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Eye, X } from "lucide-react";
import { BalloonsBackground } from "@/components/ui/BalloonsBackground";

export default function GalleryPage() {
    const [galleryItems, setGalleryItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<any | null>(null);

    useEffect(() => {
        fetchGalleryItems();
    }, []);

    const fetchGalleryItems = async () => {
        try {
            const res = await fetch('/api/gallery');
            const data = await res.json();
            if (data.success) {
                setGalleryItems(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch gallery items:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-black pt-32 pb-20 overflow-hidden">
            <BalloonsBackground />
            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 font-[var(--font-orbitron)] tracking-wider">
                        EVENT <span className="text-cyan-400">GALLERY</span>
                    </h1>
                    <p className="text-white text-lg max-w-2xl mx-auto opacity-80">
                        Explore highlights from our workshops, competitions, and technical events
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                        <p className="text-white/60 mt-4">Loading gallery...</p>
                    </div>
                ) : galleryItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-white/60">No gallery items yet. Check back soon!</p>
                    </div>
                ) : (
                    /* Gallery Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleryItems.map((item, index) => {
                            // Determine color scheme based on category
                            let colors = {
                                border: "hover:border-cyan-500/50",
                                text: "text-cyan-400",
                                groupText: "group-hover:text-cyan-400",
                                dot: "bg-cyan-500",
                                button: "bg-cyan-500",
                                borderFrame: "group-hover:border-cyan-500/50"
                            };

                            if (item.category === "Workshop") {
                                colors = {
                                    border: "hover:border-purple-500/50",
                                    text: "text-purple-400",
                                    groupText: "group-hover:text-purple-400",
                                    dot: "bg-purple-500",
                                    button: "bg-purple-500",
                                    borderFrame: "group-hover:border-purple-500/50"
                                };
                            } else if (item.category === "Competition") {
                                colors = {
                                    border: "hover:border-yellow-500/50",
                                    text: "text-yellow-400",
                                    groupText: "group-hover:text-yellow-400",
                                    dot: "bg-yellow-500",
                                    button: "bg-yellow-500",
                                    borderFrame: "group-hover:border-yellow-500/50"
                                };
                            } else if (item.category === "Lecture") {
                                colors = {
                                    border: "hover:border-emerald-500/50",
                                    text: "text-emerald-400",
                                    groupText: "group-hover:text-emerald-400",
                                    dot: "bg-emerald-500",
                                    button: "bg-emerald-500",
                                    borderFrame: "group-hover:border-emerald-500/50"
                                };
                            }

                            return (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="group h-full"
                                >
                                    <div className={`
                                        h-full flex flex-col
                                        relative bg-white/5 backdrop-blur-md 
                                        rounded-3xl overflow-hidden 
                                        border border-white/10 ${colors.border}
                                        hover:bg-white/10 
                                        transition-all duration-500 ease-out
                                        hover:shadow-2xl hover:shadow-${colors.dot.split('-')[1]}-500/20
                                        hover:-translate-y-2
                                    `}>
                                        {/* Image Container */}
                                        <div className="relative h-64 overflow-hidden">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    unoptimized
                                                />
                                            ) : (
                                                <div className={`absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center`}>
                                                    <div className={`w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10`}>
                                                        <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                            {/* Category Badge (Floating) */}
                                            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-black/50 backdrop-blur-md border border-white/10 ${colors.text} ${colors.border}`}>
                                                {item.category}
                                            </div>

                                            {/* View Button (Centered) */}
                                            <button
                                                onClick={() => setSelectedImage(item)}
                                                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 ${colors.button} text-black rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-black/50`}
                                            >
                                                <Eye size={24} />
                                            </button>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-grow flex flex-col justify-between">
                                            <div>
                                                <h3 className={`text-xl font-bold text-white mb-2 font-[var(--font-orbitron)] leading-tight ${colors.groupText} transition-colors`}>
                                                    {item.title}
                                                </h3>
                                                <p className="text-white/60 text-sm line-clamp-2 leading-relaxed font-light">
                                                    {item.description}
                                                </p>
                                            </div>
                                            
                                            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40 font-mono">
                                                <span>IEEE SSCS</span>
                                                <span className={`${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`}>View Details →</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={32} />
                    </button>

                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="max-w-4xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                            <div className="relative h-96 bg-gradient-to-br from-gray-800 to-gray-900">
                                {selectedImage.image ? (
                                    <Image
                                        src={selectedImage.image}
                                        alt={selectedImage.title}
                                        fill
                                        className="object-contain"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="w-32 h-32 border-4 border-white/10 rounded-lg flex items-center justify-center">
                                            <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-8">
                                <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                                    {selectedImage.category}
                                </span>
                                <h2 className="text-3xl font-bold text-white mt-2 mb-4 font-[var(--font-orbitron)]">
                                    {selectedImage.title}
                                </h2>
                                <p className="text-white opacity-80">
                                    {selectedImage.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
