"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Store, Phone, MapPin, CheckCircle, Type } from 'lucide-react';

export default function PengaturanPage() {
  const [merchant, setMerchant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [namaToko, setNamaToko] = useState('');
  const [nomorWa, setNomorWa] = useState('');
  const [tagline, setTagline] = useState('');
  const [alamat, setAlamat] = useState('');

  useEffect(() => {
    const fetchMerchant = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const { data } = await supabase.from('merchants').select('*').eq('user_id', session.user.id).single();
      if (data) {
        setMerchant(data);
        setNamaToko(data.nama_toko || '');
        setNomorWa(data.nomor_whatsapp || '');
        setTagline(data.tagline_hero || '');
        setAlamat(data.alamat_lengkap || '');
      }
      setIsLoading(false);
    };
    fetchMerchant();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true); setSuccessMsg('');

    // Format nomor WA otomatis (hapus angka 0 di depan, ganti dengan 62)
    let formattedWa = nomorWa.replace(/\D/g, ''); 
    if (formattedWa.startsWith('0')) formattedWa = '62' + formattedWa.substring(1);

    const { error } = await supabase.from('merchants').update({
      nama_toko: namaToko,
      nomor_whatsapp: formattedWa,
      tagline_hero: tagline,
      alamat_lengkap: alamat
    }).eq('id', merchant.id);

    setIsSaving(false);
    
    if (error) alert("Gagal menyimpan: " + error.message);
    else {
      setNomorWa(formattedWa); // Update UI dengan format yang benar
      setSuccessMsg("Pengaturan toko berhasil diperbarui!");
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500">Memuat Pengaturan...</div>;
  if (!merchant) return <div className="p-8 text-center font-bold text-red-600">Toko tidak ditemukan.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in pb-24">
      <div className="mb-8 border-b-2 border-slate-200 pb-4">
        <h1 className="text-3xl font-black text-slate-900 mb-2">⚙️ Pengaturan Toko</h1>
        <p className="text-slate-600 font-medium">Ubah identitas dan kontak WhatsApp toko Anda.</p>
      </div>

      {successMsg && (
        <div className="mb-6 bg-green-50 border-2 border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-3 animate-fade-in shadow-sm">
          <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
          <p className="font-bold">{successMsg}</p>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm border-2 border-slate-200 p-6 md:p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-black text-slate-900 mb-2 flex items-center gap-2"><Store className="w-4 h-4 text-blue-600"/> Nama Toko</label>
            <input type="text" value={namaToko} onChange={(e) => setNamaToko(e.target.value)} required className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-900 focus:border-blue-600 focus:bg-blue-50 outline-none transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-black text-slate-900 mb-2 flex items-center gap-2"><Phone className="w-4 h-4 text-blue-600"/> Nomor WhatsApp (Penerima Pesanan)</label>
            <input type="text" value={nomorWa} onChange={(e) => setNomorWa(e.target.value)} required placeholder="Misal: 081234567890" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-900 focus:border-blue-600 focus:bg-blue-50 outline-none transition-colors" />
            <p className="text-xs font-bold text-slate-400 mt-2">Pastikan nomor aktif. Pesanan dari website akan otomatis dikirim ke nomor ini.</p>
          </div>

          <div>
            <label className="block text-sm font-black text-slate-900 mb-2 flex items-center gap-2"><Type className="w-4 h-4 text-blue-600"/> Tagline / Slogan Banner Depan</label>
            <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Misal: Kopi nikmat harga bersahabat!" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-900 focus:border-blue-600 focus:bg-blue-50 outline-none transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-black text-slate-900 mb-2 flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-600"/> Alamat Lengkap Toko</label>
            <textarea value={alamat} onChange={(e) => setAlamat(e.target.value)} rows={3} placeholder="Jalan Raya No. 123..." className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-900 focus:border-blue-600 focus:bg-blue-50 outline-none transition-colors resize-none"></textarea>
          </div>
        </div>

        <button type="submit" disabled={isSaving} className={`mt-8 w-full py-4 rounded-xl text-white font-black text-lg transition-all shadow-lg hover:shadow-xl ${isSaving ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.01]'}`}>
          {isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </button>
      </form>
    </div>
  );
}