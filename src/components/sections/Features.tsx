"use client";

import { Calendar, Users, Zap, Award } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: <Calendar className="w-8 h-8 text-primary" />,
        title: "Weekly Events",
        description: "Workshops, seminars, and coding hackathons to boost your skills."
    },
    {
        icon: <Users className="w-8 h-8 text-secondary" />,
        title: "Strong Community",
        description: "Network with like-minded individuals and industry experts."
    },
    {
        icon: <Zap className="w-8 h-8 text-pink-500" />,
        title: "Hands-on Projects",
        description: "Get your hands dirty with real-world technical projects."
    },
    {
        icon: <Award className="w-8 h-8 text-emerald-400" />,
        title: "Competitions",
        description: "Showcase your talents and win exciting prizes and recognition."
    }
];

export function Features() {
    return (
        <section className="py-24 relative bg-black/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Join Us?</h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        We provide the perfect platform for you to grow, learn, and lead in your technical journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="p-8 rounded-2xl glass hover:bg-white/5 transition-all border border-white/5 group"
                        >
                            <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
