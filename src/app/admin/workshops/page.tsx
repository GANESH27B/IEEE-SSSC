"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Edit, Trash2, Save, X, ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

export default function AdminWorkshopsPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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
        const isAdmin = localStorage.getItem("isAdmin");
        if (isAdmin !== "true") {
            router.push("/login");
        } else {
            setIsAuthenticated(true);
            fetchWorkshops();
        }
    }, [router]);

    const fetchWorkshops = async () => {
        try {
            const res = await fetch('/api/workshops');
            const data = await res.json();
            if (data.success) setWorkshops(data.data);
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
                topics: form.topics.split(',').map((t: string) => t.trim()).filter((t: string) => t)
            };
            const res = await fetch('/api/workshops', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                alert('Workshop added successfully!');
                setIsAdding(false);
                resetForm();
                fetchWorkshops();
            }
        } catch (error) {
            alert('Failed to add workshop');
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
                fetchWorkshops();
            }
        } catch (error) {
            alert('Failed to update workshop');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this workshop?')) {
            try {
                const res = await fetch(`/api/workshops/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    alert('Workshop deleted successfully!');
                    fetchWorkshops();
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
                        <Link href="/admin" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-4">
                            <ArrowLeft size={20} />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-white font-[var(--font-orbitron)]">
                            MANAGE <span className="text-cyan-400">WORKSHOPS</span>
                        </h1>
                    </div>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                    >
                        <Plus size={20} />
                        Add Workshop
                    </button>
                </div>

                {/* Add/Edit Form */}
                {(isAdding || editingId) && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl p-8 mb-8 border border-cyan-500/30"
                    >
                        <h2 className="text-2xl font-bold text-cyan-400 mb-6 font-[var(--font-orbitron)]">
                            {editingId ? 'Edit Workshop' : 'Add New Workshop'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40"
                            />
                            <input
                                type="text"
                                placeholder="Instructor"
                                value={form.instructor}
                                onChange={(e) => setForm({ ...form, instructor: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40"
                            />
                            <textarea
                                placeholder="Description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 md:col-span-2"
                                rows={3}
                            />
                            <input
                                type="text"
                                placeholder="Date (e.g., March 15, 2024)"
                                value={form.date}
                                onChange={(e) => setForm({ ...form, date: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40"
                            />
                            <input
                                type="text"
                                placeholder="Time (e.g., 10:00 AM - 4:00 PM)"
                                value={form.time}
                                onChange={(e) => setForm({ ...form, time: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40"
                            />
                            <input
                                type="text"
                                placeholder="Location"
                                value={form.location}
                                onChange={(e) => setForm({ ...form, location: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40"
                            />
                            <input
                                type="number"
                                placeholder="Seats"
                                value={form.seats}
                                onChange={(e) => setForm({ ...form, seats: parseInt(e.target.value) || 0 })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40"
                            />
                            <select
                                value={form.level}
                                onChange={(e) => setForm({ ...form, level: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Duration (e.g., 6 hours)"
                                value={form.duration}
                                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40"
                            />
                            <input
                                type="text"
                                placeholder="Topics (comma-separated)"
                                value={form.topics}
                                onChange={(e) => setForm({ ...form, topics: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 md:col-span-2"
                            />
                            <div className="md:col-span-2 space-y-4">
                                <label className="block text-sm font-bold text-cyan-400">Workshop Image</label>
                                <div className="flex flex-col md:flex-row gap-4 items-start">
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
                                            className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
                                        >
                                            <Upload size={20} />
                                            {isUploading ? 'Uploading...' : 'Upload Workshop Image'}
                                        </button>
                                        <p className="text-white/40 text-xs mt-2">Or paste image URL below:</p>
                                        <input
                                            type="text"
                                            placeholder="https://example.com/image.jpg"
                                            value={form.image}
                                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 mt-2 text-sm focus:outline-none focus:border-cyan-500"
                                        />
                                    </div>
                                    {form.image && (
                                        <div className="relative w-full md:w-48 h-28 rounded-xl overflow-hidden border border-cyan-500/30 bg-black">
                                            <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setForm({ ...form, image: "" })}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={editingId ? handleUpdate : handleAdd}
                                className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                            >
                                <Save size={20} />
                                {editingId ? 'Update' : 'Add'} Workshop
                            </button>
                            <button
                                onClick={() => {
                                    setIsAdding(false);
                                    setEditingId(null);
                                    resetForm();
                                }}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                            >
                                <X size={20} />
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Workshops List */}
                <div className="grid grid-cols-1 gap-4">
                    {workshops.map((workshop) => (
                        <motion.div
                            key={workshop._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-white font-[var(--font-orbitron)]">
                                            {workshop.title}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${workshop.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                                            workshop.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-red-500/20 text-red-400'
                                            }`}>
                                            {workshop.level}
                                        </span>
                                    </div>
                                    <p className="text-white/60 text-sm mb-3">{workshop.description}</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                        <div>
                                            <span className="text-cyan-400 font-bold">Date:</span>
                                            <span className="text-white/80 ml-2">{workshop.date}</span>
                                        </div>
                                        <div>
                                            <span className="text-cyan-400 font-bold">Time:</span>
                                            <span className="text-white/80 ml-2">{workshop.time}</span>
                                        </div>
                                        <div>
                                            <span className="text-cyan-400 font-bold">Location:</span>
                                            <span className="text-white/80 ml-2">{workshop.location}</span>
                                        </div>
                                        <div>
                                            <span className="text-cyan-400 font-bold">Seats:</span>
                                            <span className="text-white/80 ml-2">{workshop.seats}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(workshop)}
                                        className="p-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg transition-colors"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(workshop._id)}
                                        className="p-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {workshops.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-white/60">No workshops yet. Add your first workshop!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
