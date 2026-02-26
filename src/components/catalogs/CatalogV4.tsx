"use client";
import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import FloatingCart from '@/components/ui/FloatingCart';

export const CatalogV4 = ({ products, nomorWa, namaToko }: any) => {
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
    <section id="katalog" className="py-16 max-w-7xl mx-auto px-4 md:px-8 relative bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-24">
        {products?.map((p: any) => {
          const isHabis = p.is_sold_out || p.stok < 1;
          const hasDiscount = p.badge_type === 'discount' && p.discount_percentage > 0;
          const hargaDiskon = getFinalPrice(p);
          const currentQty = cart[p.id]?.qty || 0;

          return (
            <div key={p.id} className="bg-white rounded-3xl border-4 border-black overflow-hidden flex flex-col shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform">
              <div className="relative aspect-square overflow-hidden bg-pink-100 border-b-4 border-black">
                <img src={p.foto_url || '/placeholder.png'} alt={p.nama_produk} className={`w-full h-full object-cover ${isHabis ? 'grayscale' : ''}`} />
                {!isHabis && p.badge_type === 'best_seller' && <div className="absolute top-3 left-3 bg-yellow-300 text-black text-xs font-black px-3 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10 transform -rotate-6">✨ HITS!</div>}
                {!isHabis && hasDiscount && <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-black px-3 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10 transform rotate-6">{p.discount_percentage}% OFF</div>}
              </div>
              <div className="p-4 md:p-5 flex flex-col flex-grow bg-white">
                <h3 className="font-black text-black text-lg mb-2 line-clamp-2">{p.nama_produk}</h3>
                {p.deskripsi && <p className="text-xs font-bold text-gray-600 line-clamp-2 mb-3">{p.deskripsi}</p>}
                <div className="mb-4 mt-auto">
                  {hasDiscount ? (
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 line-through font-bold">Rp {p.harga.toLocaleString('id-ID')}</span>
                      <span className="text-pink-600 font-black text-xl">Rp {hargaDiskon.toLocaleString('id-ID')}</span>
                    </div>
                  ) : (
                    <span className="text-sky-600 font-black text-xl">Rp {p.harga.toLocaleString('id-ID')}</span>
                  )}
                </div>
                {!isHabis ? (
                  currentQty > 0 ? (
                    <div className="flex items-center justify-between bg-yellow-100 border-2 border-black rounded-2xl p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <button onClick={() => updateCart(p, currentQty - 1)} className="w-8 h-8 flex items-center justify-center bg-white text-black border-2 border-black rounded-xl"><Minus className="w-4 h-4" strokeWidth={3}/></button>
                      <input type="number" value={currentQty} onChange={(e) => updateCart(p, e.target.value)} className="w-10 text-center font-black text-black bg-transparent outline-none" />
                      <button onClick={() => updateCart(p, currentQty + 1)} className="w-8 h-8 flex items-center justify-center bg-sky-300 text-black border-2 border-black rounded-xl"><Plus className="w-4 h-4" strokeWidth={3}/></button>
                    </div>
                  ) : (
                    <button onClick={() => updateCart(p, 1)} className="w-full py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 bg-yellow-300 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-400">
                      <ShoppingBag className="w-4 h-4" strokeWidth={2.5}/> Bungkus!
                    </button>
                  )
                ) : (
                  <button disabled className="w-full py-3 rounded-2xl font-black text-sm text-gray-500 bg-gray-200 border-2 border-gray-400 cursor-not-allowed">Yah Habis :(</button>
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