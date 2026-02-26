"use client";
import React, { useState } from 'react';
import { PackageX, Plus, Minus, HeartHandshake } from 'lucide-react';
import FloatingCart from '@/components/ui/FloatingCart';

export const CatalogV1 = ({ products, nomorWa, namaToko }: any) => {
  const [cart, setCart] = useState<Record<string, any>>({});

  const getFinalPrice = (p: any) => {
    const hasDiscount = p.badge_type === 'discount' && p.discount_percentage > 0;
    return hasDiscount ? p.harga - (p.harga * p.discount_percentage / 100) : p.harga;
  };

  const updateCart = (product: any, newQty: number | string) => {
    let qty = typeof newQty === 'string' ? parseInt(newQty) : newQty;
    if (typeof newQty === 'string' && newQty === '') { setCart(prev => ({ ...prev, [product.id]: { ...product, qty: '' } })); return; }
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
      <div className="py-24 text-center bg-emerald-50">
         <PackageX className="h-20 w-20 text-emerald-200 mx-auto mb-6" />
         <h3 className="text-2xl font-black text-emerald-800">Etalase Masih Kosong</h3>
      </div>
    );
  }

  return (
    <section id="katalog" className="py-16 max-w-7xl mx-auto px-4 md:px-8 relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-emerald-900 tracking-tight">Katalog Spesial, Buat Orang Spesial!</h2>
        <div className="w-24 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24">
        {products.map((p: any) => {
          const isHabis = p.is_sold_out || p.stok < 1;
          const hasDiscount = p.badge_type === 'discount' && p.discount_percentage > 0;
          const hargaDiskon = getFinalPrice(p);
          const currentQty = cart[p.id]?.qty || 0;

          return (
            <div key={p.id} className={`bg-white rounded-t-full rounded-b-2xl border-4 overflow-hidden flex flex-col transition-all shadow-sm ${currentQty > 0 ? 'border-amber-400 shadow-amber-100' : 'border-emerald-50 hover:border-emerald-200'}`}>
              
              <div className="relative aspect-square overflow-hidden bg-emerald-50 p-2 rounded-t-full">
                <img src={p.foto_url || '/placeholder.png'} alt={p.nama_produk} className={`w-full h-full object-cover rounded-t-full transition-transform duration-700 ${isHabis ? 'grayscale opacity-50' : 'hover:scale-105'}`} />
                {!isHabis && p.badge_type === 'best_seller' && <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-amber-400 text-emerald-900 text-[10px] font-black px-4 py-1.5 rounded-full shadow-md z-10 whitespace-nowrap">TERLARIS</div>}
                {!isHabis && hasDiscount && <div className="absolute top-1/2 right-2 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg z-10">{p.discount_percentage}% OFF</div>}
              </div>

              <div className="p-4 flex flex-col flex-grow text-center">
                <h3 className="font-bold text-emerald-900 text-base md:text-lg mb-2 line-clamp-2">{p.nama_produk}</h3>
                {p.deskripsi && <p className="text-xs text-emerald-700/80 line-clamp-2 mb-3">{p.deskripsi}</p>} 
                
                <div className="mb-4 mt-auto">
                  {hasDiscount ? (
                    <div className="flex flex-col">
                      <span className="text-xs text-emerald-400 line-through">Rp {p.harga.toLocaleString('id-ID')}</span>
                      <span className="text-amber-600 font-black text-xl">Rp {hargaDiskon.toLocaleString('id-ID')}</span>
                    </div>
                  ) : (
                    <span className="text-emerald-700 font-black text-xl">Rp {p.harga.toLocaleString('id-ID')}</span>
                  )}
                </div>

                {!isHabis ? (
                  currentQty > 0 ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-full p-1">
                      <button onClick={() => updateCart(p, currentQty - 1)} className="w-8 h-8 flex items-center justify-center bg-white text-emerald-600 rounded-full shadow-sm"><Minus className="w-4 h-4"/></button>
                      <input type="number" value={currentQty} onChange={(e) => updateCart(p, e.target.value)} className="w-10 text-center font-black text-emerald-900 bg-transparent outline-none" />
                      <button onClick={() => updateCart(p, currentQty + 1)} className="w-8 h-8 flex items-center justify-center bg-emerald-600 text-white rounded-full shadow-sm"><Plus className="w-4 h-4"/></button>
                    </div>
                  ) : (
                    <button onClick={() => updateCart(p, 1)} className="w-full py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all bg-emerald-100 text-emerald-800 hover:bg-emerald-600 hover:text-white">
                      <HeartHandshake className="w-4 h-4" /> Beli Produk
                    </button>
                  )
                ) : (
                  <button disabled className="w-full py-3 rounded-full font-bold text-sm text-slate-400 bg-slate-100 cursor-not-allowed">Habis Terjual</button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <FloatingCart cartItems={cartItems} totalItems={totalItems} totalPrice={totalPrice} nomorWa={nomorWa} namaToko={namaToko} />
    </section>
  );
};