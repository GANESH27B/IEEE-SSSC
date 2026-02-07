"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Save, X, ArrowLeft, Mic, Globe, Linkedin, Upload } from "lucide-react";
import Link from "next/link";

export default function MemberLecturesPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [memberData, setMemberData] = useState<any>(null);
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
        const data = localStorage.getItem("memberData");
        if (!data) {
            router.push("/login");
        } else {
            const parsed = JSON.parse(data);
            setMemberData(parsed);
            setIsAuthenticated(true);
            fetchLectures(parsed.email);
        }
    }, [router]);

    const fetchLectures = async (email: string) => {
        try {
            const res = await fetch('/api/lectures');
            const data = await res.json();
            if (data.success) {
                setLectures(data.data);
            }
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
                topics: form.topics.split(',').map((t: string) => t.trim()).filter((t: string) => t),
                createdBy: memberData.email
            };
            const res = await fetch('/api/lectures', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                alert('Lecture proposal submitted successfully!');
                setIsAdding(false);
                resetForm();
                fetchLectures(memberData.email);
            }
        } catch (error) {
            alert('Failed to submit lecture proposal');
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
                fetchLectures(memberData.email);
            }
        } catch (error) {
            alert('Failed to update lecture');
        }
    };

    const handleDelete = async (lecture: any) => {
        if (confirm('Are you sure you want to delete this lecture proposal?')) {
            try {
                const res = await fetch(`/api/lectures/${lecture._id}`, { method: 'DELETE' });
                if (res.ok) {
                    alert('Lecture deleted successfully!');
                    fetchLectures(memberData.email);
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
                        <Link href="/member" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-4 transition-all">
                            <ArrowLeft size={18} />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-white font-[var(--font-orbitron)] tracking-tight text-glow">
                            GUEST <span className="text-cyan-400">LECTURES</span>
                        </h1>
                        <p className="text-white/40 mt-2">Nominate and manage expert lecture sessions</p>
                    </div>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-black px-8 py-3 rounded-xl font-black transition-all shadow-lg shadow-yellow-500/20 active:scale-95 uppercase tracking-tighter"
                    >
                        <Plus size={20} />
                        Propose Speaker
                    </button>
                </div>

                {/* Add/Edit Form */}
                {(isAdding || editingId) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-[#12121e] to-black rounded-3xl p-10 mb-12 border border-white/5 shadow-2xl relative overflow-hidden ring-1 ring-white/10"
                    >
                        <h2 className="text-2xl font-bold text-white mb-8 font-[var(--font-orbitron)] flex items-center gap-3">
                            <Mic size={24} className="text-yellow-500" />
                            {editingId ? 'Edit Nomination' : 'Nominate a Speaker'}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-yellow-500/60 text-[10px] uppercase font-black tracking-widest ml-1">Lecture Topic / Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter proposed title"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all font-bold placeholder-white/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-1">Speaker Full Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Dr. John Doe"
                                    value={form.speaker}
                                    onChange={(e) => setForm({ ...form, speaker: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-1">Designation</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Senior Researcher"
                                    value={form.designation}
                                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-1">Company / University</label>
                                <input
                                    type="text"
                                    placeholder="e.g. MIT, Google, ISRO"
                                    value={form.company}
                                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-1">Speaker Type</label>
                                <select
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    className="w-full bg-[#12121e] border border-white/10 rounded-2xl px-5 py-4 text-white appearance-none"
                                >
                                    <option value="Industry Expert">Industry Expert</option>
                                    <option value="Academic">Academic Researcher</option>
                                    <option value="Entrepreneur">Entrepreneur</option>
                                    <option value="Alumni">Alumni Success</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-1">Proposed Date</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Late June"
                                    value={form.date}
                                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-1">Short Bio / Background</label>
                                <textarea
                                    placeholder="Brief background of the speaker..."
                                    value={form.bio}
                                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white h-24 resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-1">LinkedIn Profile</label>
                                <div className="relative">
                                    <Linkedin className="absolute left-4 top-4 text-yellow-500/40" size={18} />
                                    <input
                                        type="text"
                                        placeholder="URL"
                                        value={form.linkedin}
                                        onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-1">Personal Website</label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-4 text-yellow-500/40" size={18} />
                                    <input
                                        type="text"
                                        placeholder="URL"
                                        value={form.website}
                                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-4">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-1">Speaker Photo</label>
                                <div className="flex flex-col md:flex-row gap-8 items-start">
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
                                            className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-4 rounded-2xl font-bold transition-all disabled:opacity-50"
                                        >
                                            <Upload size={20} />
                                            {isUploading ? 'Uploading...' : 'Upload Speaker Image'}
                                        </button>
                                        <p className="text-white/40 text-[10px] mt-4 ml-1 uppercase tracking-widest font-bold">Or paste image URL:</p>
                                        <input
                                            type="text"
                                            placeholder="https://example.com/image.jpg"
                                            value={form.image}
                                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none mt-2"
                                        />
                                    </div>
                                    {form.image && (
                                        <div className="relative w-full md:w-48 h-48 rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl ring-1 ring-yellow-500/20">
                                            <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setForm({ ...form, image: "" })}
                                                className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-all backdrop-blur-sm"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-12 pt-6 border-t border-white/5">
                            <button
                                onClick={editingId ? handleUpdate : handleAdd}
                                className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-black px-6 py-4 rounded-2xl font-black transition-all shadow-xl shadow-yellow-500/10 active:scale-[0.98]"
                            >
                                {editingId ? 'SAVE CHANGES' : 'SUBMIT NOMINATION'}
                            </button>
                            <button
                                onClick={() => {
                                    setIsAdding(false);
                                    setEditingId(null);
                                    resetForm();
                                }}
                                className="px-10 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all"
                            >
                                CANCEL
                            </button>
                        </div>
                    </motion.div>
                )}

                <div className="space-y-8">
                    {lectures.map((lecture) => (
                        <motion.div
                            key={lecture._id}
                            layout
                            className="bg-black/40 rounded-3xl p-8 border border-white/5 hover:bg-white/[0.02] transition-all relative overflow-hidden"
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center text-yellow-500 border border-yellow-500/10 shrink-0">
                                    <Mic size={32} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        <span className="bg-yellow-500 text-black text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">{lecture.type}</span>
                                        <span className="text-white/20 text-[10px] font-black uppercase ml-2 tracking-widest">Nominated on {lecture.date}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 font-[var(--font-orbitron)]">{lecture.title}</h3>
                                    <p className="text-yellow-500 font-black text-sm mb-1 uppercase tracking-tight">{lecture.speaker}</p>
                                    <p className="text-white/40 text-sm mb-6 font-medium">{lecture.designation} @ {lecture.company}</p>

                                    <div className="flex flex-wrap gap-4">
                                        {lecture.linkedin && <a href={lecture.linkedin} target="_blank" className="text-white/40 hover:text-white transition-all"><Linkedin size={18} /></a>}
                                        {lecture.website && <a href={lecture.website} target="_blank" className="text-white/40 hover:text-white transition-all"><Globe size={18} /></a>}
                                    </div>
                                </div>
                                <div className="flex gap-2 self-end md:self-start">
                                    <button onClick={() => handleEdit(lecture)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/40 hover:text-yellow-500 transition-all border border-white/5"><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(lecture)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/40 hover:text-red-500 transition-all border border-white/5"><Trash2 size={18} /></button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {lectures.length === 0 && (
                    <div className="mt-12 p-32 text-center rounded-[3rem] border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mic size={24} className="text-white/10" />
                        </div>
                        <p className="text-white/20 font-bold uppercase tracking-[0.3em] text-xs">No nominations submitted yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
