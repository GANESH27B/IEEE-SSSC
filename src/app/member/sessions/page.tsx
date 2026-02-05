"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Save, X, ArrowLeft, Video, Users as UsersIcon, Upload } from "lucide-react";
import Link from "next/link";

export default function MemberSessionsPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [memberData, setMemberData] = useState<any>(null);
    const [sessions, setSessions] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        mode: "Online",
        host: "",
        participants: 0,
        type: "Workshop",
        tools: "",
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
            fetchSessions(parsed.email);
        }
    }, [router]);

    const fetchSessions = async (email: string) => {
        try {
            const res = await fetch('/api/sessions');
            const data = await res.json();
            if (data.success) {
                setSessions(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch sessions:', error);
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
                tools: form.tools.split(',').map((t: string) => t.trim()).filter((t: string) => t),
                createdBy: memberData.email
            };
            const res = await fetch('/api/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                alert('Session submitted successfully!');
                setIsAdding(false);
                resetForm();
                fetchSessions(memberData.email);
            }
        } catch (error) {
            alert('Failed to submit session');
        }
    };

    const handleEdit = (session: any) => {
        if (session.createdBy !== memberData.email && memberData.role !== 'admin') {
            alert('You can only edit your own submissions');
            return;
        }
        setEditingId(session._id);
        setForm({
            title: session.title,
            description: session.description,
            date: session.date,
            time: session.time,
            location: session.location,
            mode: session.mode,
            host: session.host,
            participants: session.participants,
            type: session.type,
            tools: session.tools?.join(', ') || '',
            image: session.image || ""
        });
    };

    const handleUpdate = async () => {
        try {
            const payload = {
                ...form,
                tools: form.tools.split(',').map((t: string) => t.trim()).filter((t: string) => t)
            };
            const res = await fetch(`/api/sessions/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                alert('Session updated successfully!');
                setEditingId(null);
                resetForm();
                fetchSessions(memberData.email);
            }
        } catch (error) {
            alert('Failed to update session');
        }
    };

    const handleDelete = async (session: any) => {
        if (session.createdBy !== memberData.email && memberData.role !== 'admin') {
            alert('You can only delete your own submissions');
            return;
        }
        if (confirm('Are you sure you want to delete this session?')) {
            try {
                const res = await fetch(`/api/sessions/${session._id}`, { method: 'DELETE' });
                if (res.ok) {
                    alert('Session deleted successfully!');
                    fetchSessions(memberData.email);
                }
            } catch (error) {
                alert('Failed to delete session');
            }
        }
    };

    const resetForm = () => {
        setForm({
            title: "", description: "", date: "", time: "", location: "",
            mode: "Online", host: "", participants: 0, type: "Workshop",
            tools: "", image: ""
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
                        <h1 className="text-4xl md:text-5xl font-black text-white font-[var(--font-orbitron)] tracking-tight">
                            INTERACTIVE <span className="text-cyan-400">SESSIONS</span>
                        </h1>
                        <p className="text-white/40 mt-2">Create and manage your community sessions</p>
                    </div>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                        <Plus size={20} />
                        New Session
                    </button>
                </div>

                {/* Add/Edit Form */}
                {(isAdding || editingId) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#0a0a0f] rounded-3xl p-10 mb-12 border border-white/10 shadow-2xl relative overflow-hidden"
                    >
                        <h2 className="text-2xl font-bold text-white mb-8 font-[var(--font-orbitron)] flex items-center gap-3">
                            <Video className="text-cyan-400" />
                            {editingId ? 'Edit Session' : 'Setup New Session'}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-2">Session Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter title"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-2">Host / Lead</label>
                                <input
                                    type="text"
                                    placeholder="Who is hosting?"
                                    value={form.host}
                                    onChange={(e) => setForm({ ...form, host: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-2">Description</label>
                                <textarea
                                    placeholder="Short summary of what will happen..."
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white h-28 resize-none focus:outline-none focus:border-cyan-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-2">Date</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Wed, May 15"
                                    value={form.date}
                                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-2">Time</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 7 PM onwards"
                                    value={form.time}
                                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-2">Mode</label>
                                <select
                                    value={form.mode}
                                    onChange={(e) => setForm({ ...form, mode: e.target.value })}
                                    className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-4 text-white appearance-none cursor-pointer"
                                >
                                    <option value="Online">Online / Virtual</option>
                                    <option value="In-Person">In-Person</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-2">Session Type</label>
                                <select
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-4 text-white appearance-none cursor-pointer"
                                >
                                    <option value="Live Coding">Live Coding</option>
                                    <option value="Q&A Session">Q&A Session</option>
                                    <option value="Project Demo">Project Demo</option>
                                    <option value="Tech Talk">Tech Talk</option>
                                    <option value="Hack Sprint">Hack Sprint</option>
                                </select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-2">Tools / Stack (Comma separated)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Zoom, Discord, VS Code, Figma"
                                    value={form.tools}
                                    onChange={(e) => setForm({ ...form, tools: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-4">
                                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-2">Session Preview Image</label>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="flex-1 w-full">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="session-image-upload"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById('session-image-upload')?.click()}
                                            disabled={isUploading}
                                            className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-4 rounded-xl font-bold transition-all disabled:opacity-50"
                                        >
                                            <Upload size={20} />
                                            {isUploading ? 'Uploading...' : 'Upload Image'}
                                        </button>
                                        <p className="text-white/40 text-[10px] mt-4 ml-1 uppercase tracking-widest font-bold">Or paste image URL:</p>
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

                        <div className="flex gap-4 mt-10">
                            <button
                                onClick={editingId ? handleUpdate : handleAdd}
                                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-xl shadow-cyan-500/20"
                            >
                                {editingId ? 'Update Session' : 'Create Session'}
                            </button>
                            <button
                                onClick={() => {
                                    setIsAdding(false);
                                    setEditingId(null);
                                    resetForm();
                                }}
                                className="px-8 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Sessions List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sessions.filter(s => s.createdBy === memberData?.email).map((session) => (
                        <motion.div
                            key={session._id}
                            layout
                            className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5 hover:border-cyan-500/30 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-black rounded uppercase tracking-widest">{session.mode}</span>
                                    <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-[10px] font-black rounded uppercase tracking-widest">{session.type}</span>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(session)} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-cyan-400 transition-all"><Edit size={14} /></button>
                                    <button onClick={() => handleDelete(session)} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-red-400 transition-all"><Trash2 size={14} /></button>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 font-[var(--font-orbitron)]">{session.title}</h3>
                            <p className="text-white/40 text-sm mb-6 line-clamp-2">{session.description}</p>

                            <div className="flex items-center gap-4 text-[11px] text-white/60 font-bold mb-4">
                                <div className="flex items-center gap-1"><Video size={12} className="text-cyan-400" /> {session.date}</div>
                                <div className="flex items-center gap-1"><UsersIcon size={12} className="text-cyan-400" /> {session.participants} exp.</div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {session.tools?.map((tool: string, i: number) => (
                                    <span key={i} className="px-2 py-1 bg-white/5 text-white/40 text-[9px] rounded-md border border-white/5">{tool}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {sessions.filter(s => s.createdBy === memberData?.email).length === 0 && (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 mt-10">
                        <p className="text-white/40 font-bold uppercase tracking-widest text-xs">No active sessions created by you</p>
                    </div>
                )}
            </div>
        </div>
    );
}
