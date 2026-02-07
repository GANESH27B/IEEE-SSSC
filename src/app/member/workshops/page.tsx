"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Edit, Trash2, Save, X, ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

export default function MemberWorkshopsPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [memberData, setMemberData] = useState<any>(null);
    const [workshops, setWorkshops] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        instructor: "",
        seats: 0,
        level: "Beginner",
        duration: "",
        topics: "",
        image: ""
    });

    useEffect(() => {
        const data = localStorage.getItem("memberData");
        if (!data) {
            router.push("/login");
        } else {
            const parsed = JSON.parse(data);
            setMemberData(parsed);
            setIsAuthenticated(true);
            fetchWorkshops(parsed.email);
        }
    }, [router]);

    const fetchWorkshops = async (email: string) => {
        try {
            const res = await fetch('/api/workshops');
            const data = await res.json();
            if (data.success) {
                // For members, we might want to show all or just theirs. 
                // Let's show all but only allow them to edit/delete theirs.
                setWorkshops(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch workshops:', error);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (data.success) {
                setForm({ ...form, image: data.url });
            } else {
                alert('Failed to upload image');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    const handleAdd = async () => {
        try {
            const payload = {
                ...form,
                topics: form.topics.split(',').map((t: string) => t.trim()).filter((t: string) => t),
                createdBy: memberData.email
            };
            const res = await fetch('/api/workshops', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                alert('Workshop submitted successfully!');
                setIsAdding(false);
                resetForm();
                fetchWorkshops(memberData.email);
            }
        } catch (error) {
            alert('Failed to submit workshop');
        }
    };

    const handleEdit = (workshop: any) => {
        setEditingId(workshop._id);
        setForm({
            title: workshop.title,
            description: workshop.description,
            date: workshop.date,
            time: workshop.time,
            location: workshop.location,
            instructor: workshop.instructor,
            seats: workshop.seats,
            level: workshop.level,
            duration: workshop.duration,
            topics: workshop.topics?.join(', ') || '',
            image: workshop.image || ""
        });
    };

    const handleUpdate = async () => {
        try {
            const payload = {
                ...form,
                topics: form.topics.split(',').map((t: string) => t.trim()).filter((t: string) => t)
            };
            const res = await fetch(`/api/workshops/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                alert('Workshop updated successfully!');
                setEditingId(null);
                resetForm();
                fetchWorkshops(memberData.email);
            }
        } catch (error) {
            alert('Failed to update workshop');
        }
    };

    const handleDelete = async (workshop: any) => {
        if (confirm('Are you sure you want to delete this submission?')) {
            try {
                const res = await fetch(`/api/workshops/${workshop._id}`, { method: 'DELETE' });
                if (res.ok) {
                    alert('Workshop deleted successfully!');
                    fetchWorkshops(memberData.email);
                }
            } catch (error) {
                alert('Failed to delete workshop');
            }
        }
    };

    const resetForm = () => {
        setForm({
            title: "", description: "", date: "", time: "", location: "",
            instructor: "", seats: 0, level: "Beginner", duration: "",
            topics: "", image: ""
        });
    };

    if (!isAuthenticated) return null;

    return (
        <div className="relative min-h-screen bg-black pt-32 pb-20 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/images/workshop-bg.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <Link href="/member" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-4 transition-all">
                            <ArrowLeft size={18} />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-white font-[var(--font-orbitron)] tracking-tight">
                            WORKSHOP <span className="text-cyan-400">CONTRIBUTIONS</span>
                        </h1>
                        <p className="text-white/40 mt-2">Manage your workshop proposals and sessions</p>
                    </div>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                    >
                        <Plus size={20} />
                        Propose Workshop
                    </button>
                </div>

                {/* Add/Edit Form */}
                {(isAdding || editingId) && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-3xl p-10 mb-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl -z-10 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-cyan-400 mb-8 font-[var(--font-orbitron)] flex items-center gap-3">
                            {editingId ? <Edit size={24} /> : <Plus size={24} />}
                            {editingId ? 'Edit Workshop Detail' : 'Submit New Workshop Proposal'}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-white/60 text-xs font-bold uppercase ml-2">Workshop Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter title"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/60 text-xs font-bold uppercase ml-2">Lead Instructor</label>
                                <input
                                    type="text"
                                    placeholder="Name of instructor"
                                    value={form.instructor}
                                    onChange={(e) => setForm({ ...form, instructor: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-white/60 text-xs font-bold uppercase ml-2">Detailed Description</label>
                                <textarea
                                    placeholder="Describe the workshop objectives and content..."
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 transition-all h-32 resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/60 text-xs font-bold uppercase ml-2">Proposed Date</label>
                                <input
                                    type="text"
                                    placeholder="e.g., April 12, 2024"
                                    value={form.date}
                                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/60 text-xs font-bold uppercase ml-2">Timing</label>
                                <input
                                    type="text"
                                    placeholder="e.g., 2:00 PM - 5:00 PM"
                                    value={form.time}
                                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/60 text-xs font-bold uppercase ml-2">Venue/link</label>
                                <input
                                    type="text"
                                    placeholder="Location or online link"
                                    value={form.location}
                                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/60 text-xs font-bold uppercase ml-2">Available Seats</label>
                                <input
                                    type="number"
                                    placeholder="Max participants"
                                    value={form.seats}
                                    onChange={(e) => setForm({ ...form, seats: parseInt(e.target.value) || 0 })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/60 text-xs font-bold uppercase ml-2">Skill Level</label>
                                <select
                                    value={form.level}
                                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                                    className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="Beginner">Beginner Friendly</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced / Expert</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/60 text-xs font-bold uppercase ml-2">Approx. Duration</label>
                                <input
                                    type="text"
                                    placeholder="e.g., 3 hours"
                                    value={form.duration}
                                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-white/60 text-xs font-bold uppercase ml-2">Key Topics (separated by commas)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. React, NodeJS, API Design"
                                    value={form.topics}
                                    onChange={(e) => setForm({ ...form, topics: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-4">
                                <label className="text-white/60 text-xs font-bold uppercase ml-2">Workshop Preview Image</label>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="flex-1 w-full">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="workshop-image-upload"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById('workshop-image-upload')?.click()}
                                            disabled={isUploading}
                                            className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-4 rounded-xl font-bold transition-all disabled:opacity-50"
                                        >
                                            <Upload size={20} />
                                            {isUploading ? 'Uploading...' : 'Upload Image'}
                                        </button>
                                        <p className="text-white/40 text-xs mt-3 ml-1 uppercase tracking-widest font-bold">Or paste image URL:</p>
                                        <input
                                            type="text"
                                            placeholder="https://example.com/image.jpg"
                                            value={form.image}
                                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 transition-all mt-2"
                                        />
                                    </div>
                                    {form.image && (
                                        <div className="relative w-full md:w-64 h-40 rounded-2xl overflow-hidden border border-cyan-500/30 bg-black shadow-2xl">
                                            <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setForm({ ...form, image: "" })}
                                                className="absolute top-3 right-3 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-all backdrop-blur-sm"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-10">
                            <button
                                onClick={editingId ? handleUpdate : handleAdd}
                                className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-xl shadow-cyan-500/20 active:scale-95"
                            >
                                <Save size={20} />
                                {editingId ? 'Update Proposal' : 'Submit for Review'}
                            </button>
                            <button
                                onClick={() => {
                                    setIsAdding(false);
                                    setEditingId(null);
                                    resetForm();
                                }}
                                className="sm:w-32 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-4 rounded-xl font-bold transition-all border border-white/10"
                            >
                                <X size={20} />
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                )}

                <div className="space-y-6">
                    <h3 className="text-white/60 text-sm font-bold uppercase tracking-widest ml-1 mb-4">Operational Workshop Registry</h3>
                    <div className="grid grid-cols-1 gap-6">
                        {workshops.map((workshop) => (
                            <motion.div
                                key={workshop._id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="group bg-gradient-to-br from-[#1a1a2e]/50 to-black rounded-2xl p-8 border border-white/5 hover:border-cyan-500/40 transition-all relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-1 h-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <h3 className="text-2xl font-bold text-white font-[var(--font-orbitron)] leading-none">
                                                {workshop.title}
                                            </h3>
                                            <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${workshop.level === 'Beginner' ? 'bg-green-500/10 text-green-400' :
                                                workshop.level === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                                                    'bg-red-500/10 text-red-400'
                                                }`}>
                                                {workshop.level}
                                            </span>
                                            {workshop.createdBy === memberData?.email && (
                                                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold rounded-lg border border-cyan-500/20">
                                                    OWNER
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-white/50 text-base mb-6 max-w-4xl leading-relaxed">{workshop.description}</p>
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 text-sm">
                                            <div className="flex flex-col">
                                                <span className="text-white/30 text-[10px] uppercase font-bold mb-1">Schedule</span>
                                                <span className="text-white/80 font-medium">{workshop.date} | {workshop.time}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white/30 text-[10px] uppercase font-bold mb-1">Instructor</span>
                                                <span className="text-white/80 font-medium">{workshop.instructor}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white/30 text-[10px] uppercase font-bold mb-1">Location</span>
                                                <span className="text-white/80 font-medium">{workshop.location}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white/30 text-[10px] uppercase font-bold mb-1">Seats</span>
                                                <span className="text-white/80 font-medium">{workshop.seats} total</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 justify-end w-full lg:w-auto self-end lg:self-start">
                                        <button
                                            onClick={() => handleEdit(workshop)}
                                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl transition-all border border-blue-500/20 active:scale-95"
                                        >
                                            <Edit size={16} />
                                            <span className="text-sm font-bold uppercase tracking-tight">Edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(workshop)}
                                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white rounded-xl transition-all border border-red-500/20 active:scale-95"
                                        >
                                            <Trash2 size={16} />
                                            <span className="text-sm font-bold uppercase tracking-tight">Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {workshops.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32 bg-white/5 rounded-3xl border border-white/5 border-dashed"
                    >
                        <div className="bg-cyan-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Plus size={32} className="text-cyan-400" />
                        </div>
                        <p className="text-white font-bold text-xl mb-2 font-[var(--font-orbitron)]">NO PROPOSALS YET</p>
                        <p className="text-white/30 text-sm max-w-sm mx-auto">You haven't submitted any workshop proposals yet. Click the button above to start your first contribution.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
