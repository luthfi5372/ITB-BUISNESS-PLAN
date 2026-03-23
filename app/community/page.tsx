"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Heart, Share, MapPin, User, Plus, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

interface Post {
  id: string;
  content: string;
  location?: string;
  isAnon: boolean;
  createdAt: string;
  user: {
    name?: string;
    image?: string;
  };
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [isAnon, setIsAnon] = useState(false);
  const [location, setLocation] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error("Failed to fetch posts");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newPost,
          location: location || undefined,
          isAnon,
        }),
      });

      if (res.ok) {
        setNewPost("");
        setLocation("");
        setShowForm(false);
        fetchPosts();
      }
    } catch (err) {
      console.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-700 mb-4 inline-block">
            ← Kembali ke Dashboard
          </Link>
          <h1 className="text-4xl font-black tracking-tight">Komunitas Dukungan</h1>
          <p className="text-slate-400 mt-2">Berbagi pengalaman dan saling mendukung dalam perjalanan kesehatan mental.</p>
        </header>

        {/* Create Post Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center gap-2"
          >
            <Plus size={20} />
            Bagikan Cerita
          </button>
        </div>

        {/* Create Post Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm mb-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Bagikan pengalamanmu hari ini..."
                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={4}
                required
              />

              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Lokasi (opsional)"
                  className="flex-1 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnon}
                    onChange={(e) => setIsAnon(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium">Anonim</span>
                  {isAnon ? <EyeOff size={16} /> : <Eye size={16} />}
                </label>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading ? "Mengirim..." : "Bagikan"}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">Belum ada postingan. Jadilah yang pertama berbagi!</p>
            </div>
          ) : (
            posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {post.isAnon ? (
                      <User size={20} className="text-indigo-600" />
                    ) : (
                      post.user.image ? (
                        <img src={post.user.image} alt="Avatar" className="w-10 h-10 rounded-full" />
                      ) : (
                        <User size={20} className="text-indigo-600" />
                      )
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold">
                        {post.isAnon ? "Anonim" : (post.user.name || "Pengguna")}
                      </span>
                      {post.location && (
                        <div className="flex items-center gap-1 text-slate-500 text-sm">
                          <MapPin size={12} />
                          {post.location}
                        </div>
                      )}
                      <span className="text-slate-400 text-sm">
                        {new Date(post.createdAt).toLocaleDateString("id-ID")}
                      </span>
                    </div>

                    <p className="text-slate-800 leading-relaxed mb-4">{post.content}</p>

                    <div className="flex items-center gap-6 text-slate-500">
                      <button className="flex items-center gap-2 hover:text-red-500 transition">
                        <Heart size={16} />
                        <span className="text-sm">Suka</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-blue-500 transition">
                        <MessageSquare size={16} />
                        <span className="text-sm">Komentar</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-green-500 transition">
                        <Share size={16} />
                        <span className="text-sm">Bagikan</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}