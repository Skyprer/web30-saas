"use client";
import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import FloatingCart from '@/components/ui/FloatingCart';

export const CatalogV5 = ({ products, nomorWa, namaToko }: any) => {
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
    if (qty === 0) { const newCart = { ...cart }; delete newCart[product.id]; setCart(newCart); } 
    else { setCart(prev => ({ ...prev, [product.id]: { ...product, qty, finalPrice: getFinalPrice(product) } })); }
  };

  const cartItems = Object.values(cart).filter(item => typeof item.qty === 'number' && item.qty > 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.finalPrice * item.qty), 0);

  return (
    <section id="katalog" className="py-20 max-w-7xl mx-auto px-4 md:px-8 bg-stone-100 relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-950 mb-3">Koleksi Terpilih</h2>
        <div className="w-16 h-[2px] bg-amber-900 mx-auto"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-24">
        {products?.map((p: any) => {
          const isHabis = p.is_sold_out || p.stok < 1;
          const hasDiscount = p.badge_type === 'discount' && p.discount_percentage > 0;
          const hargaDiskon = getFinalPrice(p);
          const currentQty = cart[p.id]?.qty || 0;

          return (
            <div key={p.id} className="bg-stone-50 rounded-sm border border-amber-900/20 overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-shadow">
              
              <div className="relative aspect-square overflow-hidden bg-stone-200 border-b border-amber-900/20 p-2">
                <img src={p.foto_url || '/placeholder.png'} alt={p.nama_produk} className={`w-full h-full object-cover rounded-sm ${isHabis ? 'sepia opacity-60' : ''}`} />
                {!isHabis && p.badge_type === 'best_seller' && <div className="absolute top-4 left-4 bg-amber-900 text-stone-100 text-[10px] font-serif px-3 py-1 shadow-md z-10">TERFAVORIT</div>}
                {!isHabis && hasDiscount && <div className="absolute top-4 right-4 bg-red-800 text-stone-100 text-[10px] font-serif px-3 py-1 shadow-md z-10">{p.discount_percentage}% OFF</div>}
              </div>
              
              <div className="p-4 md:p-5 flex flex-col flex-grow text-center">
                {/* Judul Produk */}
                <h3 className="font-serif font-bold text-amber-950 text-lg mb-1">{p.nama_produk}</h3>
                
                {/* DESKRIPSI PRODUK (DITAMBAHKAN DI SINI) */}
                {p.deskripsi && (
                  <p className="text-xs text-amber-900/80 line-clamp-2 mb-4 font-serif">
                    {p.deskripsi}
                  </p>
                )}
                
                <div className="mb-5 mt-auto">
                  {hasDiscount ? (
                    <div className="flex flex-col">
                      <span className="text-xs text-amber-900/60 line-through">Rp {p.harga.toLocaleString('id-ID')}</span>
                      <span className="text-amber-700 font-bold text-lg">Rp {hargaDiskon.toLocaleString('id-ID')}</span>
                    </div>
                  ) : (
                    <span className="text-amber-950 font-bold text-lg">Rp {p.harga.toLocaleString('id-ID')}</span>
                  )}
                </div>
                
                {!isHabis ? (
                  currentQty > 0 ? (
                    <div className="flex items-center justify-between border border-amber-900 p-1 rounded-sm bg-stone-100">
                      <button onClick={() => updateCart(p, currentQty - 1)} className="w-8 h-8 flex items-center justify-center text-amber-950 hover:bg-amber-200"><Minus className="w-4 h-4"/></button>
                      <input type="number" value={currentQty} onChange={(e) => updateCart(p, e.target.value)} className="w-10 text-center font-serif text-amber-950 bg-transparent outline-none" />
                      <button onClick={() => updateCart(p, currentQty + 1)} className="w-8 h-8 flex items-center justify-center text-amber-950 hover:bg-amber-200"><Plus className="w-4 h-4"/></button>
                    </div>
                  ) : (
                    <button onClick={() => updateCart(p, 1)} className="w-full py-2 border border-amber-900 text-amber-950 font-serif text-sm hover:bg-amber-900 hover:text-stone-100 transition-colors">
                      Pesan Sekarang
                    </button>
                  )
                ) : (
                  <button disabled className="w-full py-2 border border-stone-300 text-stone-400 font-serif text-sm cursor-not-allowed">Habis</button>
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