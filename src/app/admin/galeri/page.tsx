"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { UploadCloud, Trash2, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';

export default function GaleriPage() {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [merchant, setMerchant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const fetchMyData = async () => {
    setIsLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    
    const { data: myStore } = await supabase.from('merchants').select('*').eq('user_id', session.user.id).single();

    if (myStore) {
      setMerchant(myStore);
      const { data: myGalleries } = await supabase.from('galleries').select('*').eq('merchant_id', myStore.id).order('created_at', { ascending: false });
      if (myGalleries) setGalleries(myGalleries);
    }
    setIsLoading(false);
  };

  useEffect(() => { fetchMyData(); }, []);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFotoFile(e.target.files[0]);
      setFotoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fotoFile || !merchant) return;
    setIsUploading(true);

    try {
      const fileExt = fotoFile.name.split('.').pop();
      const fileName = `gallery-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${merchant.id}/${fileName}`; 

      // Kita pinjam laci 'product-images' agar tidak perlu buat laci baru
      const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, fotoFile);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);

      await supabase.from('galleries').insert([{
        merchant_id: merchant.id,
        foto_url: data.publicUrl,
        is_visible: true
      }]);

      setFotoFile(null);
      setFotoPreview('');
      fetchMyData();
    } catch (error: any) {
      alert("Gagal mengunggah: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const toggleVisibility = async (id: string, currentStatus: boolean) => {
    await supabase.from('galleries').update({ is_visible: !currentStatus }).eq('id', id);
    fetchMyData();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Hapus foto ini dari galeri?")) return;
    await supabase.from('galleries').delete().eq('id', id);
    fetchMyData();
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500">Memuat Galeri...</div>;
  if (!merchant) return <div className="p-8 text-center font-bold text-red-600">Toko tidak ditemukan.</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fade-in pb-24">
      <div className="mb-8 border-b-2 border-slate-200 pb-4">
        <h1 className="text-3xl font-black text-slate-900 mb-2">📸 Galeri Visual</h1>
        <p className="text-slate-600 font-medium">Unggah foto suasana toko, sertifikat, atau spanduk promo.</p>
      </div>

      {/* Form Upload */}
      <form onSubmit={handleUpload} className="bg-white rounded-2xl shadow-sm border-2 border-slate-200 p-6 md:p-8 mb-10">
        <label className="block text-sm font-black text-slate-900 mb-4 flex items-center gap-2"><UploadCloud className="w-5 h-5 text-blue-600"/> Tambah Foto Baru</label>
        
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {fotoPreview ? (
            <div className="relative w-full md:w-48 aspect-video rounded-xl overflow-hidden border-2 border-slate-200 shadow-sm flex-shrink-0">
              <img src={fotoPreview} alt="Preview" className="w-full h-full object-cover" />
              <button type="button" onClick={() => { setFotoPreview(''); setFotoFile(null); }} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 w-8 h-8 flex items-center justify-center font-bold">X</button>
            </div>
          ) : (
            <div className="w-full md:w-48 aspect-video bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center flex-shrink-0">
              <ImageIcon className="text-slate-300 h-10 w-10" />
            </div>
          )}
          
          <div className="flex-1 w-full space-y-4">
            <input type="file" accept="image/*" required onChange={handleFotoChange} className="w-full text-sm font-bold text-slate-600 file:mr-3 file:py-3 file:px-5 file:rounded-xl file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
            <button type="submit" disabled={isUploading || !fotoFile} className={`w-full md:w-auto py-3 px-8 rounded-xl text-white font-black transition-all shadow-md ${isUploading || !fotoFile ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]'}`}>
              {isUploading ? 'Mengunggah...' : 'Upload ke Galeri'}
            </button>
          </div>
        </div>
      </form>

      {/* Grid Galeri */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {galleries.map((g) => (
          <div key={g.id} className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden group transition-all ${!g.is_visible ? 'border-slate-200 opacity-60' : 'border-slate-100 hover:border-blue-300 hover:shadow-xl'}`}>
            <div className="aspect-square relative overflow-hidden bg-slate-100">
              <img src={g.foto_url} alt="Galeri" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              {!g.is_visible && (
                <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                  <span className="bg-slate-800 text-white text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1"><EyeOff className="w-4 h-4"/> Disembunyikan</span>
                </div>
              )}
            </div>
            <div className="p-3 flex justify-between items-center bg-white border-t-2 border-slate-50">
              <button onClick={() => toggleVisibility(g.id, g.is_visible)} className={`p-2 rounded-lg transition-colors ${g.is_visible ? 'text-slate-400 hover:bg-slate-100' : 'text-blue-600 hover:bg-blue-50'}`} title={g.is_visible ? "Sembunyikan" : "Tampilkan"}>
                {g.is_visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
              <button onClick={() => handleDelete(g.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}