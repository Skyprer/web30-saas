"use client";
import React, { useState } from 'react';
import { UserPlus, Mail, Lock, Store, Link as LinkIcon, CheckCircle, Palette, Shuffle, KeyRound } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// TUGAS 2.1: PIN RAHASIA SUPER ADMIN (Silakan ganti sesuai selera Anda)
const MASTER_PIN = "yvre5xw453s5785d676f87oguybtvr3423swdefrgh8our4c5678pvliyg"; 

export default function SuperAdminRegisterPage() {
  // State untuk Layar Gembok
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputPin, setInputPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // State Form Klien
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [namaToko, setNamaToko] = useState('');
  const [slug, setSlug] = useState('');
  
  // State Racikan Tema (JSON) Default ke V1
  const [themeHeader, setThemeHeader] = useState('v1');
  const [themeHero, setThemeHero] = useState('v1');
  const [themeCatalog, setThemeCatalog] = useState('v1');
  const [themeFooter, setThemeFooter] = useState('v1');
  
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Fungsi Buka Gembok
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPin === MASTER_PIN) {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
      setInputPin('');
    }
  };

  const handleNamaTokoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const teks = e.target.value;
    setNamaToko(teks);
    const urlSlug = teks.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setSlug(urlSlug);
  };

  // FUNGSI DI-UPGRADE: Mengacak dari 5 Tema!
  const handleRandomizeTheme = () => {
    const themes = ['v1', 'v2', 'v3', 'v4', 'v5'];
    const getRandom = () => themes[Math.floor(Math.random() * themes.length)];
    
    setThemeHeader(getRandom()); 
    setThemeHero(getRandom());
    setThemeCatalog(getRandom()); 
    setThemeFooter(getRandom());
  };

  const handleGenerateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setSuccessMsg('');

    // 1. Buat Akun (Langsung aktif karena fitur Confirm Email sudah kita matikan!)
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) { alert("Error Auth: " + authError.message); setIsLoading(false); return; }

    const userId = authData.user?.id;
    if (!userId) { alert("Gagal mendapatkan User ID"); setIsLoading(false); return; }

    const themeConfig = { header: themeHeader, hero: themeHero, catalog: themeCatalog, footer: themeFooter };

    // 2. Buat Toko di Database
    const { error: dbError } = await supabase.from('merchants').insert([{
      user_id: userId,
      nama_toko: namaToko,
      slug: slug,
      tagline_hero: 'Selamat Datang di ' + namaToko,
      nomor_whatsapp: '628000000000',
      theme_config: themeConfig 
    }]);

    setIsLoading(false);

    if (dbError) alert("Error merakit toko: " + dbError.message);
    else {
      setSuccessMsg(`Website /${slug} berhasil diciptakan!`);
      setEmail(''); setPassword(''); setNamaToko(''); setSlug('');
    }
  };

  // ==========================================
  // TAMPILAN 1: LAYAR GEMBOK (Jika PIN belum dimasukkan)
  // ==========================================
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center animate-fade-in border-t-8 border-blue-600">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <KeyRound className="h-10 w-10 text-slate-800" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Area Terbatas</h1>
          <p className="text-slate-600 mb-8 font-medium">Masukkan PIN Master Web30 untuk mengakses Mesin Pabrik.</p>
          
          <form onSubmit={handleUnlock} className="space-y-4">
            <input 
              type="password" 
              value={inputPin} 
              onChange={(e) => setInputPin(e.target.value)} 
              placeholder="PIN RAHASIA" 
              className={`w-full text-center tracking-widest text-2xl font-black px-4 py-4 border-2 rounded-xl outline-none transition-all ${pinError ? 'border-red-500 bg-red-50 text-red-900' : 'border-slate-300 bg-slate-50 text-slate-900 focus:border-blue-600'}`}
              autoFocus
            />
            {pinError && <p className="text-red-600 font-bold text-sm animate-bounce">PIN Salah! Akses Ditolak.</p>}
            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl">
              Buka Kunci
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // TAMPILAN 2: MESIN PABRIK (Jika PIN Benar)
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 py-10 animate-fade-in">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-slate-800 p-8 text-center border-b-4 border-blue-500 relative">
          <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Akses Master
          </div>
          <h1 className="text-3xl font-black text-white flex items-center justify-center gap-3">
            <UserPlus className="h-8 w-8 text-blue-400" /> Mesin Pabrik Web30
          </h1>
          <p className="text-slate-300 mt-2 font-medium">Sistem Super Admin Aktif. Cetak klien tanpa batas.</p>
        </div>

        <div className="p-8 bg-slate-50">
          {successMsg && (
            <div className="mb-6 bg-green-100 border-2 border-green-500 text-green-900 p-4 rounded-xl flex items-center gap-3 shadow-sm">
              <CheckCircle className="h-7 w-7 text-green-600 flex-shrink-0" />
              <p className="font-bold text-lg">{successMsg}</p>
            </div>
          )}

          <form onSubmit={handleGenerateClient} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* KOLOM 1: KUNCI AKSES */}
              <div className="space-y-4 bg-white p-6 rounded-xl border-2 border-slate-200 shadow-sm">
                <h3 className="font-black text-slate-900 border-b-2 border-slate-100 pb-2 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-blue-600"/> 1. Akun Klien
                </h3>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Klien</label>
                  <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Misal: budi@gmail.com" className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg text-slate-900 font-bold focus:border-blue-600 focus:bg-white outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Password Baru</label>
                  <input type="text" required value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Minimal 6 Karakter" className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg text-slate-900 font-bold focus:border-blue-600 focus:bg-white outline-none transition-all" />
                </div>
              </div>

              {/* KOLOM 2: IDENTITAS TOKO */}
              <div className="space-y-4 bg-white p-6 rounded-xl border-2 border-slate-200 shadow-sm">
                <h3 className="font-black text-slate-900 border-b-2 border-slate-100 pb-2 flex items-center gap-2">
                  <Store className="h-5 w-5 text-blue-600"/> 2. URL Website
                </h3>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nama Bisnis</label>
                  <input type="text" required value={namaToko} onChange={handleNamaTokoChange} placeholder="Misal: Kedai Kopi" className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg text-slate-900 font-bold focus:border-blue-600 focus:bg-white outline-none transition-all" />
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <span className="block text-xs font-bold text-blue-600 mb-1">Preview URL Toko:</span>
                  <span className="text-blue-900 font-black text-lg">/{slug || '...'}</span>
                </div>
              </div>
            </div>

            {/* AREA RACIKAN DESAIN */}
            <div className="bg-white p-6 rounded-xl border-2 border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6 border-b-2 border-slate-100 pb-4">
                <h3 className="font-black text-slate-900 flex items-center gap-2">
                  <Palette className="h-5 w-5 text-blue-600" /> 3. Racik Desain (Mix & Match)
                </h3>
                <button type="button" onClick={handleRandomizeTheme} className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-lg transition-all shadow-md hover:shadow-lg">
                  <Shuffle className="h-4 w-4" /> Acak Desain
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Gaya Header", val: themeHeader, set: setThemeHeader },
                  { label: "Gaya Banner", val: themeHero, set: setThemeHero },
                  { label: "Gaya Katalog", val: themeCatalog, set: setThemeCatalog },
                  { label: "Gaya Footer", val: themeFooter, set: setThemeFooter },
                ].map((item, idx) => (
                  <div key={idx}>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">{item.label}</label>
                    <select value={item.val} onChange={(e)=>item.set(e.target.value)} className="w-full px-3 py-3 border-2 border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold focus:border-blue-600 outline-none cursor-pointer">
                      <option value="v1">🌙 V1: Ramadhan</option>
                      <option value="v2">🖤 V2: Premium Dark</option>
                      <option value="v3">💎 V3: Luxury Elegance</option>
                      <option value="v4">🎈 V4: Kartun Ceria</option>
                      <option value="v5">🍂 V5: Kultur Klasik</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" disabled={isLoading} className={`w-full py-5 rounded-xl text-white font-black text-xl transition-all shadow-xl ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.01]'}`}>
              {isLoading ? 'Sedang Memproses Database...' : '🚀 Cetak Toko Sekarang'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}