"use client";
import React, { useState } from 'react';
import { ShoppingCart, PackageX, Tag, Plus, Minus, Send } from 'lucide-react';

export const CatalogV1 = ({ products, nomorWa, namaToko }: any) => {
  // State untuk menyimpan keranjang belanja { 'id_produk': { detail, qty } }
  const [cart, setCart] = useState<Record<string, any>>({});

  // Fungsi Hitung Harga Diskon
  const getFinalPrice = (p: any) => {
    const hasDiscount = p.badge_type === 'discount' && p.discount_percentage > 0;
    return hasDiscount ? p.harga - (p.harga * p.discount_percentage / 100) : p.harga;
  };

  // Fungsi Tambah / Kurang / Ketik Manual
  const updateCart = (product: any, newQty: number | string) => {
    let qty = typeof newQty === 'string' ? parseInt(newQty) : newQty;
    
    // Jika input kosong atau NaN (sedang diketik hapus), biarkan string kosong sementara
    if (typeof newQty === 'string' && newQty === '') {
      setCart(prev => ({ ...prev, [product.id]: { ...product, qty: '' } }));
      return;
    }

    if (isNaN(qty) || qty < 0) qty = 0;
    if (qty > product.stok) qty = product.stok; // Batasi maksimal stok

    if (qty === 0) {
      const newCart = { ...cart };
      delete newCart[product.id];
      setCart(newCart);
    } else {
      setCart(prev => ({ ...prev, [product.id]: { ...product, qty, finalPrice: getFinalPrice(product) } }));
    }
  };

  // Rekap Total
  const cartItems = Object.values(cart).filter(item => typeof item.qty === 'number' && item.qty > 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.finalPrice * item.qty), 0);

  // Checkout ke WhatsApp
  const handleCheckout = () => {
    if (totalItems === 0) return;
    let pesan = `Halo Admin *${namaToko}*, saya ingin memesan:\n\n`;
    
    cartItems.forEach((item: any) => {
      const subtotal = item.finalPrice * item.qty;
      pesan += `📦 *${item.nama_produk}*\n`;
      pesan += `   ${item.qty} x Rp ${item.finalPrice.toLocaleString('id-ID')} = Rp ${subtotal.toLocaleString('id-ID')}\n`;
    });

    pesan += `\n*Total Pesanan: Rp ${totalPrice.toLocaleString('id-ID')}*\n\nMohon info ketersediaan dan cara pembayarannya. Terima kasih!`;
    window.open(`https://wa.me/${nomorWa}?text=${encodeURIComponent(pesan)}`, '_blank');
  };

  if (!products || products.length === 0) {
    return (
      <div className="py-24 text-center border-t-2 border-slate-100 bg-white">
         <PackageX className="h-20 w-20 text-slate-200 mx-auto mb-6" />
         <h3 className="text-2xl font-black text-slate-800">Etalase Masih Kosong</h3>
      </div>
    );
  }

  return (
    <section id="katalog" className="py-16 max-w-7xl mx-auto px-4 md:px-8 relative">
      <div className="flex items-center gap-3 mb-10">
        <Tag className="w-8 h-8 text-blue-600" />
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Katalog Produk</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24">
        {products.map((p: any) => {
          const isHabis = p.is_sold_out || p.stok < 1;
          const hasDiscount = p.badge_type === 'discount' && p.discount_percentage > 0;
          const hargaDiskon = getFinalPrice(p);
          const currentQty = cart[p.id]?.qty || 0; // Cek jumlah di keranjang

          return (
            <div key={p.id} className={`bg-white rounded-2xl border-2 overflow-hidden flex flex-col transition-all ${currentQty > 0 ? 'border-blue-500 shadow-lg' : 'border-slate-200 hover:border-blue-300'}`}>
              
              {/* GAMBAR */}
              <div className="relative aspect-square overflow-hidden bg-slate-100 border-b-2 border-slate-100">
                <img src={p.foto_url || '/placeholder.png'} alt={p.nama_produk} className={`w-full h-full object-cover transition-transform duration-700 ${isHabis ? 'grayscale opacity-50' : 'hover:scale-110'}`} />
                {!isHabis && p.badge_type === 'best_seller' && <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg shadow-md z-10">🔥 BEST SELLER</div>}
                {!isHabis && hasDiscount && <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg animate-pulse z-10">{p.discount_percentage}% OFF</div>}
                {isHabis && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 bg-slate-900/20 backdrop-blur-[2px]">
                    <span className="bg-slate-900 text-white font-black px-4 py-2 rounded-xl border-2 border-slate-700 shadow-2xl tracking-widest uppercase transform -rotate-12">SOLD OUT</span>
                  </div>
                )}
              </div>

              {/* INFO */}
              <div className="p-4 md:p-5 flex flex-col flex-grow">
                <h3 className="font-black text-slate-900 text-base md:text-lg mb-2 line-clamp-2 leading-tight">{p.nama_produk}</h3>
                
                <div className="mb-4 mt-auto">
                  {hasDiscount ? (
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400 line-through font-bold">Rp {p.harga.toLocaleString('id-ID')}</span>
                      <span className="text-red-600 font-black text-xl">Rp {hargaDiskon.toLocaleString('id-ID')}</span>
                    </div>
                  ) : (
                    <span className="text-blue-600 font-black text-xl">Rp {p.harga.toLocaleString('id-ID')}</span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Sisa: {p.stok}</span>
                </div>

                {/* AREA KONTROL PESANAN */}
                {!isHabis ? (
                  currentQty > 0 ? (
                    <div className="flex items-center justify-between bg-blue-50 border-2 border-blue-200 rounded-xl p-1 animate-fade-in">
                      <button onClick={() => updateCart(p, currentQty - 1)} className="w-10 h-10 flex items-center justify-center bg-white text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg shadow-sm transition-colors border border-blue-100"><Minus className="w-5 h-5"/></button>
                      <input 
                        type="number" 
                        value={currentQty} 
                        onChange={(e) => updateCart(p, e.target.value)}
                        className="w-12 text-center font-black text-blue-900 bg-transparent outline-none"
                      />
                      <button onClick={() => updateCart(p, currentQty + 1)} className="w-10 h-10 flex items-center justify-center bg-white text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg shadow-sm transition-colors border border-blue-100"><Plus className="w-5 h-5"/></button>
                    </div>
                  ) : (
                    <button onClick={() => updateCart(p, 1)} className="w-full py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all bg-white text-slate-900 border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white shadow-sm">
                      <ShoppingCart className="w-4 h-4" /> Tambah
                    </button>
                  )
                ) : (
                  <button disabled className="w-full py-3.5 rounded-xl font-black text-sm text-slate-400 bg-slate-100 border-2 border-slate-200 cursor-not-allowed">Habis</button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FLOATING CART (BAR BAWAH) - Muncul HANYA jika ada pesanan */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-slate-200 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] z-[100] animate-slide-up">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-500">{totalItems} Produk Terpilih</p>
              <p className="text-2xl font-black text-blue-600 tracking-tight">Rp {totalPrice.toLocaleString('id-ID')}</p>
            </div>
            <button onClick={handleCheckout} className="bg-slate-900 hover:bg-blue-600 text-white font-black px-6 md:px-8 py-3.5 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              <span className="hidden md:inline">Kirim Pesanan</span> <Send className="w-5 h-5"/>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};