"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, AlertTriangle, UserPlus, Shield, Heart, MessageSquare } from "lucide-react";
import Link from "next/link";

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  isPrimary: boolean;
}

export default function EmergencyPage() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    relation: "",
    isPrimary: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/emergency-contacts");
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (err) {
      console.error("Failed to fetch contacts");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/emergency-contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowForm(false);
        setFormData({ name: "", phone: "", relation: "", isPrimary: false });
        fetchContacts();
      }
    } catch (err) {
      console.error("Failed to add contact");
    } finally {
      setLoading(false);
    }
  };

  const callEmergency = (phone: string) => {
    window.open(`tel:${phone}`, "_self");
  };

  const hotlineNumbers = [
    { name: "Hotline Kesehatan Jiwa Nasional", number: "119", description: "Layanan 24 jam" },
    { name: "Sahabat Jiwa", number: "(021) 500454", description: "Pusat Krisis Kesehatan Jiwa" },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFE] p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Link href="/dashboard" className="text-theme-primary hover:text-theme-primary mb-4 inline-block">
            ← Kembali ke Dashboard
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-red-600">Dukungan Darurat</h1>
          <p className="text-slate-400 mt-2">Ketika kamu butuh bantuan segera, kami di sini untukmu.</p>
        </header>

        {/* Emergency Button */}
        <div className="bg-red-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-red-200 mb-8 text-center">
          <AlertTriangle size={48} className="mx-auto mb-4 text-yellow-300" />
          <h2 className="text-2xl font-bold mb-4">Butuh Bantuan Sekarang?</h2>
          <p className="text-red-100 mb-6">Tekan tombol di bawah jika kamu dalam situasi krisis atau membutuhkan bantuan segera.</p>
          <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-black text-lg hover:bg-red-50 transition-all shadow-lg">
            🚨 Hubungi Bantuan Darurat
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Shield size={24} className="text-green-600" />
                Kontak Darurat
              </h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-theme-primary text-white px-4 py-2 rounded-xl font-bold hover:bg-theme-primary transition flex items-center gap-2"
              >
                <UserPlus size={16} />
                Tambah
              </button>
            </div>

            {contacts.length === 0 ? (
              <p className="text-slate-500 mb-6">Belum ada kontak darurat. Tambahkan kontak terpercaya untuk situasi darurat.</p>
            ) : (
              <div className="space-y-4 mb-6">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-bold">{contact.name}</p>
                      <p className="text-sm text-slate-500">{contact.relation} • {contact.phone}</p>
                      {contact.isPrimary && (
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full font-bold mt-1">
                          Utama
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => callEmergency(contact.phone)}
                      className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition"
                    >
                      <Phone size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Contact Form */}
            {showForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4 border-t border-slate-200 pt-6"
              >
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Nama</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-theme-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Nomor Telepon</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-theme-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Hubungan</label>
                  <select
                    value={formData.relation}
                    onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-theme-primary"
                    required
                  >
                    <option value="">Pilih hubungan...</option>
                    <option value="Keluarga">Keluarga</option>
                    <option value="Teman">Teman</option>
                    <option value="Guru BK">Guru BK</option>
                    <option value="Konselor">Konselor</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPrimary}
                    onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm font-medium">Jadikan kontak utama</span>
                </label>

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
                    className="bg-theme-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-theme-primary transition disabled:opacity-50"
                  >
                    {loading ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </motion.form>
            )}
          </div>

          {/* Hotlines */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <Heart size={24} className="text-red-600" />
              Hotline Bantuan
            </h2>

            <div className="space-y-4 mb-8">
              {hotlineNumbers.map((hotline, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                  <div>
                    <p className="font-bold text-red-900">{hotline.name}</p>
                    <p className="text-sm text-red-700">{hotline.description}</p>
                  </div>
                  <button
                    onClick={() => callEmergency(hotline.number)}
                    className="bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 transition"
                  >
                    <Phone size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <MessageSquare size={20} />
                Chat dengan Mira
              </h3>
              <p className="text-sm text-blue-700 mb-4">Mira selalu siap mendengarkan kapan saja, 24/7.</p>
              <Link
                href="/mira"
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl font-bold hover:bg-blue-700 transition"
              >
                Chat Mira Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}