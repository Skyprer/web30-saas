"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Edit2, Trash2, Package, Check, UploadCloud, ShieldAlert, Tag, Percent, Info } from 'lucide-react';

export default function KatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [merchant, setMerchant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // State Form (Baku & Konsisten)
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [namaProduk, setNamaProduk] = useState('');
  const [harga, setHarga] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [stok, setStok] = useState('');
  
  // State Toggle
  const [isAvailable, setIsAvailable] = useState(true); // Tampil/Sembunyi dari Web
  const [isSoldOut, setIsSoldOut] = useState(false);    // Label Habis
  
  // State Label Spesial
  const [badgeType, setBadgeType] = useState('none'); 
  const [discountPercentage, setDiscountPercentage] = useState('');
  
  // State Foto
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
      const { data: myProducts } = await supabase.from('products').select('*').eq('merchant_id', myStore.id).order('created_at', { ascending: false });
      if (myProducts) setProducts(myProducts);
    }
    setIsLoading(false);
  };

  useEffect(() => { fetchMyData(); }, []);

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${merchant.id}/${fileName}`; 

    const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, file);
    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchant) return alert("Toko belum ditemukan!");
    setIsUploading(true);

    try {
      let finalFotoUrl = fotoPreview; 
      if (fotoFile) finalFotoUrl = await uploadImage(fotoFile);

      const productData = {
        merchant_id: merchant.id,
        nama_produk: namaProduk,
        harga: parseFloat(harga),
        deskripsi: deskripsi,
        stok: parseInt(stok) || 0,
        is_sold_out: isSoldOut,
        is_available: isAvailable,
        foto_url: finalFotoUrl,
        badge_type: badgeType,
        discount_percentage: badgeType === 'discount' ? (parseInt(discountPercentage) || 0) : 0,
      };

      if (isEditing && editId) {
        await supabase.from('products').update(productData).eq('id', editId);
        alert("Produk berhasil diubah!");
      } else {
        await supabase.from('products').insert([productData]);
        alert("Produk berhasil ditambahkan!");
      }

      resetForm();
      fetchMyData();
    } catch (error: any) {
      alert("Terjadi kesalahan: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus produk ini permanen?")) return;
    await supabase.from('products').delete().eq('id', id);
    fetchMyData();
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFotoFile(e.target.files[0]);
      setFotoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleEditClick = (p: any) => {
    setIsEditing(true); setEditId(p.id); 
    setNamaProduk(p.nama_produk);
    setHarga(p.harga.toString()); 
    setDeskripsi(p.deskripsi || '');
    setStok(p.stok?.toString() || '0');
    setIsSoldOut(p.is_sold_out || false);
    setIsAvailable(p.is_available);
    setFotoPreview(p.foto_url || ''); setFotoFile(null); 
    setBadgeType(p.badge_type || 'none');
    setDiscountPercentage(p.discount_percentage?.toString() || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setIsEditing(false); setEditId(null); 
    setNamaProduk(''); setHarga(''); setDeskripsi(''); setStok('');
    setIsSoldOut(false); setIsAvailable(true);
    setFotoPreview(''); setFotoFile(null); 
    setBadgeType('none'); setDiscountPercentage('');
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500">Memuat Katalog...</div>;
  if (!merchant) return <div className="p-8 text-center font-bold text-red-600">Akses Ditolak: Toko tidak ditemukan.</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fade-in pb-24">
      <div className="mb-8 border-b-2 border-slate-200 pb-4">
        <h1 className="text-3xl font-black text-slate-900 mb-2">📦 Kelola Katalog Produk</h1>
        <p className="text-slate-600 font-medium">Atur etalase toko <strong>{merchant.nama_toko}</strong> di sini.</p>
      </div>
      
      {/* FORM INPUT PRODUK (HIGH CONTRAST & KONSISTEN) */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6 md:p-8 mb-12">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 border-b-2 border-slate-100 pb-4">
          <Package className="h-6 w-6 text-blue-600" /> 
          {isEditing ? 'Ubah Detail Produk' : 'Tambah Produk Baru'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* KOLOM KIRI: Identitas Utama */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-black text-slate-900 mb-2">Nama Produk <span className="text-red-500">*</span></label>
              <input type="text" value={namaProduk} onChange={(e) => setNamaProduk(e.target.value)} required placeholder="Misal: Kopi Susu Aren" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-900 focus:border-blue-600 focus:bg-blue-50 outline-none transition-colors" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-black text-slate-900 mb-2">Harga (Rp) <span className="text-red-500">*</span></label>
                <input type="number" value={harga} onChange={(e) => setHarga(e.target.value)} required min="0" placeholder="15000" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-900 focus:border-blue-600 focus:bg-blue-50 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-black text-slate-900 mb-2">Stok Barang</label>
                <input type="number" value={stok} onChange={(e) => setStok(e.target.value)} min="0" placeholder="0" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-900 focus:border-blue-600 focus:bg-blue-50 outline-none transition-colors" />
              </div>
            </div>

            {/* Edukasi Stok */}
            <div className="bg-blue-50 text-blue-800 p-3 rounded-lg flex gap-2 text-xs font-semibold border border-blue-200">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>Stok tidak berkurang otomatis. Kurangi stok secara manual setelah pembeli mentransfer pembayaran via WhatsApp.</p>
            </div>

            <div>
              <label className="block text-sm font-black text-slate-900 mb-2">Deskripsi Produk</label>
              <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} rows={3} placeholder="Jelaskan detail bahan, rasa, atau ukuran..." className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-900 focus:border-blue-600 focus:bg-blue-50 outline-none transition-colors resize-none"></textarea>
            </div>
          </div>
          
          {/* KOLOM KANAN: Visual & Label */}
          <div className="space-y-6">
            
            {/* Upload Foto */}
            <div className="border-2 border-dashed border-slate-300 p-5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <label className="block text-sm font-black text-slate-900 mb-4 flex items-center gap-2"><UploadCloud className="h-5 w-5 text-blue-600"/> Foto Produk <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-4">
                {fotoPreview ? (
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-slate-200 shadow-sm">
                    <img src={fotoPreview} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => { setFotoPreview(''); setFotoFile(null); }} className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 w-7 h-7 flex items-center justify-center text-xs font-bold transition-colors">X</button>
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
                    <UploadCloud className="text-slate-300 h-8 w-8" />
                  </div>
                )}
                <div className="flex-1">
                  <input type="file" accept="image/*" onChange={handleFotoChange} className="w-full text-sm font-bold text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Label Spesial */}
            <div className="border-2 border-blue-100 p-5 rounded-xl bg-blue-50/50">
              <label className="block text-sm font-black text-blue-900 mb-3 flex items-center gap-2"><Tag className="h-5 w-5"/> Label Promosi (Opsional)</label>
              <div className="flex flex-col gap-3">
                <select value={badgeType} onChange={(e) => setBadgeType(e.target.value)} className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl font-bold text-blue-900 focus:border-blue-600 focus:bg-white outline-none cursor-pointer">
                  <option value="none">-- Tanpa Label --</option>
                  <option value="best_seller">🔥 Best Seller</option>
                  <option value="new">✨ Produk Baru</option>
                  <option value="discount">💸 Sedang Diskon (%)</option>
                </select>
                
                {badgeType === 'discount' && (
                  <div className="flex items-center gap-3 animate-fade-in bg-white p-2 rounded-xl border-2 border-blue-200">
                    <Percent className="h-5 w-5 text-red-500 ml-2" />
                    <input type="number" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} min="1" max="99" placeholder="Potongan (1-99)" className="w-full px-2 py-1 font-black text-red-600 text-lg outline-none" />
                    <span className="font-black text-slate-400 mr-3">% OFF</span>
                  </div>
                )}
              </div>
            </div>

            {/* Toggle Status Visibilitas */}
            <div className="bg-slate-50 p-4 rounded-xl border-2 border-slate-200 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} className="w-6 h-6 text-blue-600 rounded-md border-2 border-slate-300 focus:ring-blue-500" />
                <span className="text-sm font-black text-slate-700 group-hover:text-blue-600 transition-colors">Tampilkan Produk di Toko</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={isSoldOut} onChange={(e) => setIsSoldOut(e.target.checked)} className="w-6 h-6 text-red-600 rounded-md border-2 border-slate-300 accent-red-600 focus:ring-red-500" />
                <span className="text-sm font-black text-red-600 flex items-center gap-1 group-hover:text-red-700 transition-colors"><ShieldAlert className="w-4 h-4"/> Tandai Habis (Sold Out)</span>
              </label>
            </div>

          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-4 pt-4 border-t-2 border-slate-100">
          <button type="submit" disabled={isUploading} className={`flex-1 text-white font-black text-lg py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex justify-center items-center gap-2 ${isUploading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.01]'}`}>
            {isUploading ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah Produk Sekarang')}
          </button>
          {isEditing && (
            <button type="button" onClick={resetForm} className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-black py-4 px-8 rounded-xl transition-all border-2 border-slate-300">
              Batal
            </button>
          )}
        </div>
      </form>

      {/* DAFTAR PRODUK */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">Daftar Produk</h2>
        <span className="bg-slate-900 text-white font-bold px-4 py-1.5 rounded-full text-sm">{products.length} Produk</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border-2 border-slate-200 overflow-hidden">
        {products.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-bold text-lg">Belum ada produk. Silakan tambah produk pertama Anda di atas.</div>
        ) : (
          <div className="divide-y-2 divide-slate-100">
            {products.map((p) => (
              <div key={p.id} className={`p-5 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${p.is_sold_out ? 'bg-slate-50/80' : 'hover:bg-slate-50'}`}>
                
                <div className="flex items-center gap-5 w-full md:w-auto relative">
                  {/* Gambar List Produk */}
                  <div className="relative w-20 h-20 bg-white border-2 border-slate-200 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                    {p.foto_url ? (
                      <img src={p.foto_url} alt={p.nama_produk} className={`w-full h-full object-cover ${p.is_sold_out ? 'grayscale opacity-50' : ''}`} />
                    ) : (
                      <Package className="w-8 h-8 m-6 text-slate-300" />
                    )}
                    
                    
                    {/* Badge Mini CSS */}
                    {p.badge_type !== 'none' && p.badge_type && (
                      <div className={`absolute top-0 right-0 text-[9px] font-black px-2 py-1 rounded-bl-lg text-white shadow-md
                        ${p.badge_type === 'best_seller' ? 'bg-orange-500' : ''}
                        ${p.badge_type === 'new' ? 'bg-green-500' : ''}
                        ${p.badge_type === 'discount' ? 'bg-red-600' : ''}
                      `}>
                        {p.badge_type === 'best_seller' && 'BEST SELLER'}
                        {p.badge_type === 'new' && 'NEW'}
                        {p.badge_type === 'discount' && `${p.discount_percentage}% OFF`}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className={`font-black text-lg mb-1 ${p.is_sold_out ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{p.nama_produk}</h3>
                    <p className={`${p.is_sold_out ? 'text-slate-400' : 'text-blue-600'} font-black text-xl mb-2`}>Rp {p.harga.toLocaleString('id-ID')}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-black px-3 py-1 rounded-lg border-2 border-slate-200 bg-white text-slate-700">Stok: {p.stok || 0}</span>
                      {p.is_sold_out && <span className="text-xs font-black px-3 py-1 rounded-lg border-2 border-red-200 bg-red-50 text-red-600">HABIS (SOLD OUT)</span>}
                      {!p.is_available && <span className="text-xs font-black px-3 py-1 rounded-lg border-2 border-orange-200 bg-orange-50 text-orange-600">Disembunyikan</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 w-full md:w-auto justify-end">
                  <button onClick={() => handleEditClick(p)} className="p-3 text-blue-600 bg-blue-50 hover:bg-blue-100 border-2 border-blue-100 hover:border-blue-300 rounded-xl transition-all font-bold flex items-center gap-2">
                    <Edit2 className="h-5 w-5" /> <span className="hidden md:inline">Edit</span>
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-3 text-red-600 bg-red-50 hover:bg-red-100 border-2 border-red-100 hover:border-red-300 rounded-xl transition-all font-bold">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}