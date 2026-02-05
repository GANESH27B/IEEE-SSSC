"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Save, X, ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

export default function AdminLecturesPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [lectures, setLectures] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        speaker: "",
        designation: "",
        company: "",
        bio: "",
        date: "",
        time: "",
        location: "",
        attendees: 0,
        topics: "",
        linkedin: "",
        website: "",
        image: "",
        type: "Industry Expert"
    });

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");
        if (isAdmin !== "true") {
            router.push("/login");
        } else {
            setIsAuthenticated(true);
            fetchLectures();
        }
    }, [router]);

    const fetchLectures = async () => {
        try {
            const res = await fetch('/api/lectures');
            const data = await res.json();
            if (data.success) setLectures(data.data);
        } catch (error) {
            console.error('Failed to fetch lectures:', error);
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
            const res = await fetch('/api/lectures', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                alert('Lecture added successfully!');
                setIsAdding(false);
                resetForm();
                fetchLectures();
            }
        } catch (error) {
            alert('Failed to add lecture');
        }
    };

    const handleEdit = (lecture: any) => {
        setEditingId(lecture._id);
        setForm({
            title: lecture.title,
            speaker: lecture.speaker,
            designation: lecture.designation,
            company: lecture.company,
            bio: lecture.bio,
            date: lecture.date,
            time: lecture.time,
            location: lecture.location,
            attendees: lecture.attendees,
            topics: lecture.topics?.join(', ') || '',
            linkedin: lecture.linkedin || "",
            website: lecture.website || "",
            image: lecture.image || "",
            type: lecture.type
        });
    };

    const handleUpdate = async () => {
        try {
            const payload = {
                ...form,
                topics: form.topics.split(',').map((t: string) => t.trim()).filter((t: string) => t)
            };
            const res = await fetch(`/api/lectures/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                alert('Lecture updated successfully!');
                setEditingId(null);
                resetForm();
                fetchLectures();
            }
        } catch (error) {
            alert('Failed to update lecture');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this lecture?')) {
            try {
                const res = await fetch(`/api/lectures/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    alert('Lecture deleted successfully!');
                    fetchLectures();
                }
            } catch (error) {
                alert('Failed to delete lecture');
            }
        }
    };

    const resetForm = () => {
        setForm({
            title: "", speaker: "", designation: "", company: "", bio: "",
            date: "", time: "", location: "", attendees: 0, topics: "",
            linkedin: "", website: "", image: "", type: "Industry Expert"
        });
    };

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-black pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <Link href="/admin" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-4">
                            <ArrowLeft size={20} />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-white font-[var(--font-orbitron)]">
                            MANAGE <span className="text-cyan-400">LECTURES</span>
                        </h1>
                    </div>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                    >
                        <Plus size={20} />
                        Add Lecture
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
                            {editingId ? 'Edit Lecture' : 'Add New Lecture'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Lecture Title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 md:col-span-2"
                            />
                            <input
                                type="text"
                                placeholder="Speaker Name"
                                value={form.speaker}
                                onChange={(e) => setForm({ ...form, speaker: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40"
                            />
                            <input
                                type="text"
                                placeholder="Designation"
                                value={form.designation}
                                onChange={(e) => setForm({ ...form, designation: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40"
                            />
                            <input
                                type="text"
                                placeholder="Company/Institution"
                                value={form.company}
                                onChange={(e) => setForm({ ...form, company: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 md:col-span-2"
                            />
                            <textarea
                                placeholder="Speaker Bio"
                                value={form.bio}
                                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 md:col-span-2"
                                rows={3}
                            />
                            <input
                                type="text"
                                placeholder="Date (e.g., March 20, 2024)"
                                value={form.date}
                                onChange={(e) => setForm({ ...form, date: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40"
                            />
                            <input
                                type="text"
                                placeholder="Time (e.g., 5:00 PM - 6:30 PM)"
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
                                placeholder="Expected Attendees"
                                value={form.attendees}
                                onChange={(e) => setForm({ ...form, attendees: parseInt(e.target.value) || 0 })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40"
                            />
                            <select
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white md:col-span-2"
                            >
                                <option value="Industry Expert">Industry Expert</option>
                                <option value="Academic">Academic</option>
                                <option value="Researcher">Researcher</option>
                                <option value="Entrepreneur">Entrepreneur</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Topics (comma-separated)"
                                value={form.topics}
                                onChange={(e) => setForm({ ...form, topics: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 md:col-span-2"
                            />
                            <input
                                type="text"
                                placeholder="LinkedIn URL (optional)"
                                value={form.linkedin}
                                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40"
                            />
                            <input
                                type="text"
                                placeholder="Website URL (optional)"
                                value={form.website}
                                onChange={(e) => setForm({ ...form, website: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40"
                            />
                            <div className="md:col-span-2 space-y-4">
                                <label className="block text-sm font-bold text-cyan-400">Speaker Image</label>
                                <div className="flex flex-col md:flex-row gap-4 items-start">
                                    <div className="flex-1 w-full">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="lecture-image-upload"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById('lecture-image-upload')?.click()}
                                            disabled={isUploading}
                                            className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
                                        >
                                            <Upload size={20} />
                                            {isUploading ? 'Uploading...' : 'Upload Speaker Image'}
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
                                {editingId ? 'Update' : 'Add'} Lecture
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

                {/* Lectures List */}
                <div className="grid grid-cols-1 gap-4">
                    {lectures.map((lecture) => (
                        <motion.div
                            key={lecture._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-white font-[var(--font-orbitron)]">
                                            {lecture.title}
                                        </h3>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-400">
                                            {lecture.type}
                                        </span>
                                    </div>
                                    <p className="text-cyan-400 font-bold mb-1">{lecture.speaker}</p>
                                    <p className="text-white/60 text-sm mb-3">{lecture.designation} at {lecture.company}</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                        <div>
                                            <span className="text-cyan-400 font-bold">Date:</span>
                                            <span className="text-white/80 ml-2">{lecture.date}</span>
                                        </div>
                                        <div>
                                            <span className="text-cyan-400 font-bold">Time:</span>
                                            <span className="text-white/80 ml-2">{lecture.time}</span>
                                        </div>
                                        <div>
                                            <span className="text-cyan-400 font-bold">Location:</span>
                                            <span className="text-white/80 ml-2">{lecture.location}</span>
                                        </div>
                                        <div>
                                            <span className="text-cyan-400 font-bold">Attendees:</span>
                                            <span className="text-white/80 ml-2">{lecture.attendees}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(lecture)}
                                        className="p-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg transition-colors"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(lecture._id)}
                                        className="p-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {lectures.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-white/60">No lectures yet. Add your first lecture!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
