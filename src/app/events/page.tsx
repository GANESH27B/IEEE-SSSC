import { Calendar } from "lucide-react";

export default function EventsPage() {
    return (
        <div className="container mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Events</h1>
                <p className="text-white/60 text-lg">Discover our upcoming workshops, seminars, and hackathons.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Placeholder Event 1 */}
                <div className="p-6 rounded-2xl glass border border-white/10 hover:border-primary/50 transition-all group">
                    <div className="h-48 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl mb-6 flex items-center justify-center text-white/20 group-hover:scale-[1.02] transition-transform">
                        Event Poster
                    </div>
                    <div className="flex items-center gap-2 text-primary text-sm mb-3">
                        <Calendar size={16} />
                        <span>Oct 15, 2026</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Tech Talk: AI Futures</h3>
                    <p className="text-white/60 mb-6 line-clamp-2">Join us for an insightful session on the future of Artificial Intelligence with industry experts.</p>
                    <button className="w-full py-3 bg-white/5 hover:bg-primary hover:text-white border border-white/10 hover:border-primary rounded-lg transition-all font-medium">Register Now</button>
                </div>

                {/* Placeholder Event 2 */}
                <div className="p-6 rounded-2xl glass border border-white/10 hover:border-primary/50 transition-all group">
                    <div className="h-48 bg-gradient-to-br from-emerald-900/50 to-teal-900/50 rounded-xl mb-6 flex items-center justify-center text-white/20 group-hover:scale-[1.02] transition-transform">
                        Event Poster
                    </div>
                    <div className="flex items-center gap-2 text-primary text-sm mb-3">
                        <Calendar size={16} />
                        <span>Nov 02, 2026</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Hackathon 2026</h3>
                    <p className="text-white/60 mb-6 line-clamp-2">24-hour coding challenge to solve real-world problems. Great prizes await!</p>
                    <button className="w-full py-3 bg-white/5 hover:bg-primary hover:text-white border border-white/10 hover:border-primary rounded-lg transition-all font-medium">Register Now</button>
                </div>
            </div>
        </div>
    );
}
