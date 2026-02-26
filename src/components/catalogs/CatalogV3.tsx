"use client";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import FloatingCart from '@/components/ui/FloatingCart';

export const CatalogV3 = ({ products, nomorWa, namaToko }: any) => {
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
      <div className="py-32 text-center bg-zinc-50">
         <p className="text-zinc-400 uppercase tracking-widest text-sm">Koleksi Belum Tersedia.</p>
      </div>
    );
  }

  return (
    <section id="katalog" className="py-24 max-w-7xl mx-auto px-4 md:px-8 bg-zinc-50">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 mb-24">
        {products.map((p: any) => {
          const isHabis = p.is_sold_out || p.stok < 1;
          const hasDiscount = p.badge_type === 'discount' && p.discount_percentage > 0;
          const hargaDiskon = getFinalPrice(p);
          const currentQty = cart[p.id]?.qty || 0;

          return (
            <div key={p.id} className="group flex flex-col">
              
              {/* GAMBAR (ASPECT RATIO 3:4 ALA MAJALAH) */}
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-200 mb-6">
                <img src={p.foto_url || '/placeholder.png'} alt={p.nama_produk} className={`w-full h-full object-cover transition-transform duration-1000 ${isHabis ? 'grayscale opacity-70' : 'group-hover:scale-105'}`} />
                
                {/* Overlay Premium */}
                <div className="absolute inset-0 bg-zinc-950/10 group-hover:bg-transparent transition-colors duration-500"></div>
                
                {!isHabis && p.badge_type === 'best_seller' && <div className="absolute top-0 left-0 bg-zinc-950 text-amber-500 text-[9px] px-3 py-2 uppercase tracking-[0.2em] z-10">Signature</div>}
                {!isHabis && hasDiscount && <div className="absolute top-0 right-0 bg-amber-600 text-zinc-50 text-[9px] px-3 py-2 uppercase tracking-[0.2em] z-10">{p.discount_percentage}% OFF</div>}
              </div>

              {/* INFO */}
              <div className="flex flex-col flex-grow text-center px-4">
                {/* Judul Produk */}
                <h3 className="font-light text-zinc-900 text-lg mb-1 uppercase tracking-wider">{p.nama_produk}</h3>
                
                {/* DESKRIPSI PRODUK (DITAMBAHKAN DI SINI) */}
                {p.deskripsi && (
                  <p className="text-xs font-light text-zinc-500 line-clamp-2 mb-4 tracking-wide">
                    {p.deskripsi}
                  </p>
                )}
                
                <div className="mb-6 mt-auto">
                  {hasDiscount ? (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-zinc-400 line-through tracking-widest">IDR {p.harga.toLocaleString('id-ID')}</span>
                      <span className="text-amber-700 font-medium text-lg tracking-widest">IDR {hargaDiskon.toLocaleString('id-ID')}</span>
                    </div>
                  ) : (
                    <span className="text-zinc-900 font-medium text-lg tracking-widest">IDR {p.harga.toLocaleString('id-ID')}</span>
                  )}
                </div>

                {!isHabis ? (
                  currentQty > 0 ? (
                    <div className="flex items-center justify-between border border-zinc-900 p-1">
                      <button onClick={() => updateCart(p, currentQty - 1)} className="w-10 h-10 flex items-center justify-center text-zinc-900 hover:bg-zinc-100 transition-colors"><Minus className="w-4 h-4" strokeWidth={1}/></button>
                      <input type="number" value={currentQty} onChange={(e) => updateCart(p, e.target.value)} className="w-12 text-center font-light text-zinc-900 bg-transparent outline-none tracking-widest" />
                      <button onClick={() => updateCart(p, currentQty + 1)} className="w-10 h-10 flex items-center justify-center text-zinc-900 hover:bg-zinc-100 transition-colors"><Plus className="w-4 h-4" strokeWidth={1}/></button>
                    </div>
                  ) : (
                    <button onClick={() => updateCart(p, 1)} className="w-full py-4 text-xs tracking-[0.2em] uppercase transition-all border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white">
                      Add to Cart
                    </button>
                  )
                ) : (
                  <button disabled className="w-full py-4 text-xs tracking-[0.2em] uppercase border border-zinc-300 text-zinc-400 cursor-not-allowed">
                    Out of Stock
                  </button>
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