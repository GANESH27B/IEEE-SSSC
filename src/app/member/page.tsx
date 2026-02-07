"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Image as ImageIcon,
    Users,
    LogOut,
    Plus,
    Save,
    X,
    User,
    Upload,
    MessageCircle,
    Edit,
    Trash2
} from "lucide-react";
import { ContactMessages } from "@/components/ui/ContactMessages";

type Tab = "gallery" | "team" | "messages";

export default function MemberDashboard() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [memberData, setMemberData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<Tab>("gallery");
    const [isAddingGallery, setIsAddingGallery] = useState(false);
    const [isAddingTeam, setIsAddingTeam] = useState(false);
    const [galleryItems, setGalleryItems] = useState<any[]>([]);
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    const [isUploadingGalleryImage, setIsUploadingGalleryImage] = useState(false);
    const [isUploadingTeamImage, setIsUploadingTeamImage] = useState(false);
    const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
    const [editingTeamId, setEditingTeamId] = useState<string | null>(null);

    // Gallery form state
    const [galleryForm, setGalleryForm] = useState({
        title: "",
        description: "",
        image: "",
        category: "Workshop"
    });

    // Team form state
    const [teamForm, setTeamForm] = useState({
        name: "",
        role: "",
        department: "",
        year: "",
        image: ""
    });

    // Check authentication on mount
    useEffect(() => {
        const memberDataStr = localStorage.getItem("memberData");
        if (!memberDataStr) {
            router.push("/login");
        } else {
            const data = JSON.parse(memberDataStr);
            setMemberData(data);
            setIsAuthenticated(true);
            fetchGalleryItems();
            fetchTeamMembers();
        }
    }, [router]);

    const fetchGalleryItems = async () => {
        try {
            const res = await fetch('/api/gallery');
            const data = await res.json();
            if (data.success) {
                setGalleryItems(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch gallery items:', error);
        }
    };

    const fetchTeamMembers = async () => {
        try {
            const res = await fetch('/api/team');
            const data = await res.json();
            if (data.success) {
                setTeamMembers(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch team members:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("memberData");
        router.push("/login");
    };

    // Gallery functions
    const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingGalleryImage(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (data.success) {
                setGalleryForm({ ...galleryForm, image: data.url });
            } else {
                alert('Failed to upload image');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        } finally {
            setIsUploadingGalleryImage(false);
        }
    };

    const handleAddGallery = async () => {
        try {
            const res = await fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(galleryForm),
            });
            const data = await res.json();
            if (data.success) {
                setGalleryItems([data.data, ...galleryItems]);
                setGalleryForm({ title: "", description: "", image: "", category: "Workshop" });
                setIsAddingGallery(false);
            }
        } catch (error) {
            console.error('Failed to add gallery item:', error);
        }
    };

    const handleEditGallery = (item: any) => {
        setEditingGalleryId(item._id);
        setGalleryForm({
            title: item.title,
            description: item.description,
            image: item.image,
            category: item.category
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdateGallery = async () => {
        try {
            const res = await fetch(`/api/gallery/${editingGalleryId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(galleryForm),
            });
            const data = await res.json();
            if (data.success) {
                setGalleryItems(galleryItems.map(item => item._id === editingGalleryId ? data.data : item));
                setGalleryForm({ title: "", description: "", image: "", category: "Workshop" });
                setEditingGalleryId(null);
            }
        } catch (error) {
            console.error('Failed to update gallery item:', error);
        }
    };

    const handleDeleteGallery = async (id: string) => {
        if (!confirm('Are you sure you want to delete this gallery item?')) return;
        try {
            const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setGalleryItems(galleryItems.filter(item => item._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete gallery item:', error);
        }
    };

    // Team functions
    const handleTeamImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingTeamImage(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (data.success) {
                setTeamForm({ ...teamForm, image: data.url });
            } else {
                alert('Failed to upload image');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        } finally {
            setIsUploadingTeamImage(false);
        }
    };

    const handleAddTeam = async () => {
        try {
            const res = await fetch('/api/team', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(teamForm),
            });
            const data = await res.json();
            if (data.success) {
                setTeamMembers([data.data, ...teamMembers]);
                setTeamForm({ name: "", role: "", department: "", year: "", image: "" });
                setIsAddingTeam(false);
            }
        } catch (error) {
            console.error('Failed to add team member:', error);
        }
    };

    const handleEditTeam = (item: any) => {
        setEditingTeamId(item._id);
        setTeamForm({
            name: item.name,
            role: item.role,
            department: item.department,
            year: item.year || "",
            image: item.image
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdateTeam = async () => {
        try {
            const res = await fetch(`/api/team/${editingTeamId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(teamForm),
            });
            const data = await res.json();
            if (data.success) {
                setTeamMembers(teamMembers.map(item => item._id === editingTeamId ? data.data : item));
                setTeamForm({ name: "", role: "", department: "", year: "", image: "" });
                setEditingTeamId(null);
            }
        } catch (error) {
            console.error('Failed to update team member:', error);
        }
    };

    const handleDeleteTeam = async (id: string) => {
        if (!confirm('Are you sure you want to delete this team member?')) return;
        try {
            const res = await fetch(`/api/team/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setTeamMembers(teamMembers.filter(item => item._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete team member:', error);
        }
    };

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl animate-pulse">Syncing user credentials...</div>
            </div>
        );
    }

    const navItems = [
        { id: "gallery" as Tab, label: "Add Gallery", icon: <ImageIcon size={20} /> },
        { id: "team" as Tab, label: "Add Team", icon: <Users size={20} /> },
        { id: "messages" as Tab, label: "Transmissions", icon: <MessageCircle size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-black flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white/5 border-b border-white/10 sticky top-0 z-50 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <User size={16} className="text-cyan-400" />
                    </div>
                    <span className="font-black text-white font-[var(--font-orbitron)] tracking-tighter text-xs uppercase">Terminal <span className="text-cyan-400">01</span></span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-white/60 hover:text-white"
                >
                    {isMobileMenuOpen ? <X size={24} /> : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`
                fixed inset-0 z-40 md:relative md:flex w-full md:w-64 bg-black md:bg-white/5 border-r border-white/10 p-6 flex-col transform transition-transform duration-300
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}>
                <div className="hidden md:block mb-8">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center ring-2 ring-cyan-500/20">
                            <User className="text-cyan-400" size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <h3 className="text-white font-black text-sm truncate">{memberData?.name}</h3>
                            <p className="text-cyan-400/60 text-[10px] uppercase font-bold tracking-widest">{memberData?.role}</p>
                        </div>
                    </div>
                </div>

                <nav className="space-y-1 flex-1">
                    <p className="text-white/30 text-[10px] uppercase font-black tracking-widest px-4 mb-4">Operations</p>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === item.id
                                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                                : "text-white/50 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            {item.icon}
                            <span className="font-bold">{item.label}</span>
                        </button>
                    ))}

                    <div className="border-t border-white/10 my-6 mx-2"></div>
                    <p className="text-white/30 text-[10px] uppercase font-black tracking-widest px-4 mb-4">Submission Nodes</p>

                    <Link
                        href="/member/workshops"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-white/50 hover:bg-white/5 hover:text-cyan-400"
                    >
                        <Plus size={18} className="opacity-50" />
                        <span className="font-bold">Workshops</span>
                    </Link>

                    <Link
                        href="/member/sessions"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-white/50 hover:bg-white/5 hover:text-cyan-400"
                    >
                        <Plus size={18} className="opacity-50" />
                        <span className="font-bold">Sessions</span>
                    </Link>

                    <Link
                        href="/member/lectures"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-white/50 hover:bg-white/5 hover:text-cyan-400"
                    >
                        <Plus size={18} className="opacity-50" />
                        <span className="font-bold">Lectures</span>
                    </Link>
                </nav>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500/50 hover:bg-red-500/10 hover:text-red-400 transition-all mt-6 border border-transparent hover:border-red-500/20"
                >
                    <LogOut size={20} />
                    <span className="font-bold text-sm">Disconnect</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-10 overflow-x-hidden">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-5xl font-black text-white font-[var(--font-orbitron)] leading-tight mb-3">
                        MEMBER <span className="text-cyan-400">TERMINAL</span>
                    </h1>
                    <div className="flex items-center gap-3 text-sm">
                        <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <p className="text-white/40 font-light italic">
                            {activeTab === "gallery" && "Ready for visual data ingestion."}
                            {activeTab === "team" && "Operational team registry active."}
                            {activeTab === "messages" && "Monitoring encrypted transmissions."}
                        </p>
                    </div>
                </div>

                {/* Gallery Tab */}
                {activeTab === "gallery" && (
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 border border-cyan-500/30 rounded-xl p-6 shadow-[0_0_20px_rgba(34,211,238,0.05)]"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <ImageIcon className="text-cyan-400" size={20} />
                                    {editingGalleryId ? 'Update Gallery Item' : 'Add New Gallery Item'}
                                </h3>
                                {editingGalleryId && (
                                    <button
                                        onClick={() => {
                                            setEditingGalleryId(null);
                                            setGalleryForm({ title: "", description: "", image: "", category: "Workshop" });
                                        }}
                                        className="text-white/40 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-cyan-400 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={galleryForm.title}
                                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                        placeholder="Event title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-cyan-400 mb-2">Category</label>
                                    <select
                                        value={galleryForm.category}
                                        onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                                        className="w-full bg-gradient-to-r from-gray-900 to-gray-800 border-2 border-cyan-500/30 hover:border-cyan-500/60 focus:border-cyan-500 rounded-lg px-4 py-3 text-white focus:outline-none transition-all cursor-pointer"
                                    >
                                        <option value="Workshop" className="bg-gray-900">Workshop</option>
                                        <option value="Competition" className="bg-gray-900">Competition</option>
                                        <option value="Event" className="bg-gray-900">Event</option>
                                        <option value="Lecture" className="bg-gray-900">Lecture</option>
                                    </select>
                                </div>

                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-bold text-cyan-400 mb-2">Description</label>
                                    <textarea
                                        value={galleryForm.description}
                                        onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                        rows={3}
                                        placeholder="Event description"
                                    />
                                </div>

                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-bold text-cyan-400 mb-2">Event Photo</label>
                                    <div className="flex items-center gap-4 mb-3">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleGalleryImageUpload}
                                            className="hidden"
                                            id="gallery-photo-upload"
                                            disabled={isUploadingGalleryImage}
                                        />
                                        <label
                                            htmlFor="gallery-photo-upload"
                                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors cursor-pointer ${isUploadingGalleryImage
                                                ? 'bg-gray-600 cursor-not-allowed'
                                                : 'bg-cyan-600 hover:bg-cyan-500'
                                                } text-white`}
                                        >
                                            <Upload size={20} />
                                            {isUploadingGalleryImage ? 'Uploading...' : 'Choose Photo'}
                                        </label>

                                        {galleryForm.image && (
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={galleryForm.image}
                                                    alt="Preview"
                                                    className="w-16 h-16 rounded-lg object-cover border-2 border-cyan-500"
                                                />
                                                <button
                                                    onClick={() => setGalleryForm({ ...galleryForm, image: "" })}
                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                    type="button"
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        value={galleryForm.image}
                                        onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
                                        placeholder="Or paste image URL"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={editingGalleryId ? handleUpdateGallery : handleAddGallery}
                                className="mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 active:scale-95 w-full md:w-auto"
                            >
                                {editingGalleryId ? <Save size={20} /> : <Plus size={20} />}
                                {editingGalleryId ? 'Update Item' : 'Add Gallery Item'}
                            </button>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {galleryItems.map((item) => (
                                <div key={item._id} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden relative">
                                    <div className="h-48 relative overflow-hidden">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-900 flex items-center justify-center"><ImageIcon className="text-white/10" size={48} /></div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                        
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                            <button onClick={() => handleEditGallery(item)} className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all border border-white/10 shadow-xl"><Edit size={16} /></button>
                                            <button onClick={() => handleDeleteGallery(item._id)} className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-all border border-white/10 shadow-xl"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400/60">{item.category}</span>
                                        <h4 className="text-white font-bold text-lg mt-1">{item.title}</h4>
                                        <p className="text-white/40 text-xs mt-2 line-clamp-2">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Team Tab */}
                {activeTab === "team" && (
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 border border-cyan-500/30 rounded-xl p-6 shadow-[0_0_20px_rgba(34,211,238,0.05)]"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Users className="text-cyan-400" size={20} />
                                    {editingTeamId ? 'Update Team Member' : 'Add New Team Member'}
                                </h3>
                                {editingTeamId && (
                                    <button
                                        onClick={() => {
                                            setEditingTeamId(null);
                                            setTeamForm({ name: "", role: "", department: "", year: "", image: "" });
                                        }}
                                        className="text-white/40 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-cyan-400 mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={teamForm.name}
                                        onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                        placeholder="Full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-cyan-400 mb-2">Role</label>
                                    <input
                                        type="text"
                                        value={teamForm.role}
                                        onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                        placeholder="e.g. Technical Lead"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-cyan-400 mb-2">Department</label>
                                    <input
                                        type="text"
                                        value={teamForm.department}
                                        onChange={(e) => setTeamForm({ ...teamForm, department: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                        placeholder="e.g. ECE"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-cyan-400 mb-2">Year</label>
                                    <input
                                        type="text"
                                        value={teamForm.year}
                                        onChange={(e) => setTeamForm({ ...teamForm, year: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                        placeholder="e.g. Third Year"
                                    />
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-bold text-cyan-400 mb-2">Profile Photo</label>
                                    <div className="flex items-center gap-4 mb-3">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleTeamImageUpload}
                                            className="hidden"
                                            id="team-photo-upload"
                                            disabled={isUploadingTeamImage}
                                        />
                                        <label
                                            htmlFor="team-photo-upload"
                                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors cursor-pointer ${isUploadingTeamImage ? 'bg-gray-600 pointer-events-none' : 'bg-cyan-600 hover:bg-cyan-500'} text-white`}
                                        >
                                            <Upload size={20} />
                                            {isUploadingTeamImage ? 'Uploading...' : 'Choose Photo'}
                                        </label>
                                        {teamForm.image && (
                                            <div className="flex items-center gap-3">
                                                <img src={teamForm.image} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-cyan-500" />
                                                <button onClick={() => setTeamForm({ ...teamForm, image: "" })} className="text-red-400 hover:text-red-300"><X size={18} /></button>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        value={teamForm.image}
                                        onChange={(e) => setTeamForm({ ...teamForm, image: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
                                        placeholder="Or paste image URL"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={editingTeamId ? handleUpdateTeam : handleAddTeam}
                                className="mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 active:scale-95 w-full md:w-auto"
                            >
                                {editingTeamId ? <Save size={20} /> : <Plus size={20} />}
                                {editingTeamId ? 'Update Member' : 'Add Team Member'}
                            </button>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {teamMembers.map((member) => (
                                <div key={member._id} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden relative">
                                    <div className="h-56 relative overflow-hidden">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-900 flex items-center justify-center"><Users className="text-white/10" size={48} /></div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                        
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                            <button onClick={() => handleEditTeam(member)} className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all border border-white/10 shadow-xl"><Edit size={16} /></button>
                                            <button onClick={() => handleDeleteTeam(member._id)} className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-all border border-white/10 shadow-xl"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="text-white font-bold text-lg">{member.name}</h4>
                                        <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mt-1">{member.role}</p>
                                        <p className="text-white/40 text-[10px] mt-2 font-bold uppercase tracking-tighter">{member.department} • {member.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Messages Tab */}
                {activeTab === "messages" && <ContactMessages />}
            </div>
        </div>
    );
}
