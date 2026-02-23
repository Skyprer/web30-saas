"use client";
import React, { useState } from 'react';
import { PackageX, Plus, Minus, ShoppingBag } from 'lucide-react';
import FloatingCart from '@/components/ui/FloatingCart';

export const CatalogV2 = ({ products, nomorWa, namaToko }: any) => {
  // State Keranjang Belanja
  const [cart, setCart] = useState<Record<string, any>>({});

  const getFinalPrice = (p: any) => {
    const hasDiscount = p.badge_type === 'discount' && p.discount_percentage > 0;
    return hasDiscount ? p.harga - (p.harga * p.discount_percentage / 100) : p.harga;
  };

  const updateCart = (product: any, newQty: number | string) => {
    let qty = typeof newQty === 'string' ? parseInt(newQty) : newQty;
    
    if (typeof newQty === 'string' && newQty === '') {
      setCart(prev => ({ ...prev, [product.id]: { ...product, qty: '' } }));
      return;
    }

    if (isNaN(qty) || qty < 0) qty = 0;
    if (qty > product.stok) qty = product.stok;

    if (qty === 0) {
      const newCart = { ...cart };
      delete newCart[product.id];
      setCart(newCart);
    } else {
      setCart(prev => ({ ...prev, [product.id]: { ...product, qty, finalPrice: getFinalPrice(product) } }));
    }
  };

  const cartItems = Object.values(cart).filter(item => typeof item.qty === 'number' && item.qty > 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.finalPrice * item.qty), 0);

  if (!products || products.length === 0) {
    return (
      <div className="py-24 text-center">
         <PackageX className="h-16 w-16 text-slate-300 mx-auto mb-4" />
         <p className="font-bold text-slate-400">Belum ada koleksi produk.</p>
      </div>
    );
  }

  return (
    <section id="katalog" className="py-20 max-w-7xl mx-auto px-4 md:px-8 bg-slate-50 rounded-[3rem] mt-10 relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Koleksi Pilihan</h2>
        <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {products.map((p: any) => {
          const isHabis = p.is_sold_out || p.stok < 1;
          const hasDiscount = p.badge_type === 'discount' && p.discount_percentage > 0;
          const hargaDiskon = getFinalPrice(p);
          const currentQty = cart[p.id]?.qty || 0;

          return (
            <div key={p.id} className={`bg-white rounded-[2.5rem] p-3 transition-all group flex flex-col border-2 ${currentQty > 0 ? 'border-blue-400 shadow-xl scale-[1.02]' : 'border-transparent shadow-sm hover:shadow-2xl hover:border-blue-50'}`}>
              
              {/* GAMBAR MELENGKUNG (PREMIUM) */}
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-100 mb-5">
                <img src={p.foto_url || '/placeholder.png'} alt={p.nama_produk} className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${isHabis ? 'grayscale opacity-40' : ''}`} />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {!isHabis && p.badge_type === 'best_seller' && <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-orange-600 text-[10px] font-black px-4 py-2 rounded-full shadow-lg z-10 uppercase tracking-widest border border-orange-100">Terlaris</div>}
                {!isHabis && p.badge_type === 'new' && <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-green-600 text-[10px] font-black px-4 py-2 rounded-full shadow-lg z-10 uppercase tracking-widest border border-green-100">Rilisan Baru</div>}
                {!isHabis && hasDiscount && <div className="absolute top-4 right-4 bg-red-600 text-white text-[12px] font-black px-4 py-2 rounded-full shadow-lg z-10">{p.discount_percentage}% OFF</div>}
                
                {isHabis && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm">
                    <span className="bg-white text-slate-900 font-black px-6 py-3 rounded-full shadow-xl uppercase tracking-widest text-sm border-2 border-slate-200">Tidak Tersedia</span>
                  </div>
                )}
              </div>

              {/* INFO (Tengah/Center) */}
              <div className="px-4 pb-4 flex flex-col flex-grow text-center">
                <h3 className="font-black text-slate-900 text-xl mb-2 line-clamp-2">{p.nama_produk}</h3>
                <p className="text-xs font-bold text-slate-400 mb-4 bg-slate-50 inline-block px-3 py-1 rounded-full border border-slate-100 self-center">Tersedia {p.stok} item</p>
                
                <div className="mb-6 mt-auto">
                  {hasDiscount ? (
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-slate-400 line-through font-bold mb-1">Rp {p.harga.toLocaleString('id-ID')}</span>
                      <span className="text-red-600 font-black text-2xl">Rp {hargaDiskon.toLocaleString('id-ID')}</span>
                    </div>
                  ) : (
                    <span className="text-slate-900 font-black text-2xl">Rp {p.harga.toLocaleString('id-ID')}</span>
                  )}
                </div>

                {/* KONTROL PESANAN (PREMIUM STYLE) */}
                {!isHabis ? (
                  currentQty > 0 ? (
                    <div className="flex items-center justify-between bg-blue-50 rounded-2xl p-1.5 animate-fade-in border border-blue-100">
                      <button onClick={() => updateCart(p, currentQty - 1)} className="w-12 h-12 flex items-center justify-center bg-white text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl shadow-sm transition-all"><Minus className="w-5 h-5"/></button>
                      <input 
                        type="number" 
                        value={currentQty} 
                        onChange={(e) => updateCart(p, e.target.value)}
                        className="w-16 text-center font-black text-xl text-blue-900 bg-transparent outline-none"
                      />
                      <button onClick={() => updateCart(p, currentQty + 1)} className="w-12 h-12 flex items-center justify-center bg-white text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl shadow-sm transition-all"><Plus className="w-5 h-5"/></button>
                    </div>
                  ) : (
                    <button onClick={() => updateCart(p, 1)} className="w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-600/30">
                      <ShoppingBag className="w-5 h-5" /> Tambah Pesanan
                    </button>
                  )
                ) : (
                  <button disabled className="w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all bg-slate-100 text-slate-400 cursor-not-allowed">
                    Habis Terjual
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MEMANGGIL FLOATING CART YANG SAMA! */}
      <FloatingCart 
        cartItems={cartItems} 
        totalItems={totalItems} 
        totalPrice={totalPrice} 
        nomorWa={nomorWa} 
        namaToko={namaToko} 
      />
    </section>
  );
};