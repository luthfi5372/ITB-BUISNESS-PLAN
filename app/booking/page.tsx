"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, CheckCircle, X } from "lucide-react";
import Link from "next/link";

interface Appointment {
  id: string;
  doctorName: string;
  date: string;
  status: string;
}

export default function BookingPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    doctorName: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments");
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      }
    } catch (err) {
      console.error("Failed to fetch appointments");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dateTime = new Date(`${formData.date}T${formData.time}`);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorName: formData.doctorName,
          date: dateTime.toISOString(),
        }),
      });

      if (res.ok) {
        setShowForm(false);
        setFormData({ doctorName: "", date: "", time: "" });
        fetchAppointments();
      }
    } catch (err) {
      console.error("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  const doctors = [
    "Dr. Sari Wulandari, M.Psi - Psikolog Klinis",
    "Dr. Ahmad Rahman, Sp.KJ - Psikiater",
    "Dr. Maya Sari, M.Psi - Konselor",
    "Dr. Budi Santoso, M.Psi - Terapis CBT",
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFE] p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Link href="/dashboard" className="text-theme-primary hover:text-theme-primary mb-4 inline-block">
            ← Kembali ke Dashboard
          </Link>
          <h1 className="text-4xl font-black tracking-tight">Booking Konsultasi</h1>
          <p className="text-slate-400 mt-2">Jadwalkan sesi dengan psikolog atau dokter terverifikasi.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Buat Janji Baru</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-theme-primary text-white px-4 py-2 rounded-xl font-bold hover:bg-theme-primary transition"
              >
                {showForm ? "Batal" : "Booking Baru"}
              </button>
            </div>

            {showForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Pilih Dokter</label>
                  <select
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-theme-primary"
                    required
                  >
                    <option value="">Pilih dokter...</option>
                    {doctors.map((doctor) => (
                      <option key={doctor} value={doctor}>{doctor}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Tanggal</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-theme-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Waktu</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-theme-primary"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-theme-primary text-white py-3 rounded-xl font-bold hover:bg-theme-primary transition disabled:opacity-50"
                >
                  {loading ? "Memproses..." : "Konfirmasi Booking"}
                </button>
              </motion.form>
            )}
          </div>

          {/* Appointments List */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Janji Temu Saya</h2>
            {appointments.length === 0 ? (
              <p className="text-slate-500">Belum ada janji temu.</p>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-bold">{apt.doctorName}</p>
                      <p className="text-sm text-slate-500">
                        {new Date(apt.date).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      apt.status === "COMPLETED" ? "bg-green-100 text-green-600" :
                      apt.status === "CANCELLED" ? "bg-red-100 text-red-600" :
                      "bg-blue-100 text-blue-600"
                    }`}>
                      {apt.status === "SCHEDULED" ? "Terjadwal" :
                       apt.status === "COMPLETED" ? "Selesai" : "Dibatalkan"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}