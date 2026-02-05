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
                        {galleryItems.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                                className="group relative"
                            >
                                {/* Technical Clipped Shape Container */}
                                <div
                                    className="relative bg-white/[0.02] backdrop-blur-xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500"
                                    style={{
                                        clipPath: "polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)"
                                    }}
                                >
                                    {/* Image Container */}
                                    <div className="relative h-72 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-20 h-20 border-4 border-white/10 rounded-lg flex items-center justify-center">
                                                    <svg className="w-10 h-10 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}

                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* View Badge */}
                                        <button
                                            onClick={() => setSelectedImage(item)}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-cyan-500 text-black rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100"
                                        >
                                            <Eye size={24} />
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                                            <span className="text-[10px] font-black text-cyan-400 tracking-[0.2em] uppercase">
                                                {item.category}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3 font-[var(--font-orbitron)] leading-tight group-hover:text-cyan-400 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-white text-sm mb-4 line-clamp-2 leading-relaxed font-light opacity-80">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Glowing Shape Border (The "Frame") */}
                                <div
                                    className="absolute inset-0 border border-cyan-500/0 group-hover:border-cyan-500/50 transition-all duration-500 pointer-events-none -z-10"
                                    style={{
                                        clipPath: "polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)",
                                        padding: "1px"
                                    }}
                                />
                            </motion.div>
                        ))}
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
