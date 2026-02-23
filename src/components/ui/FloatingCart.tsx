"use client";
import React from 'react';
import { Send } from 'lucide-react';

interface FloatingCartProps {
  cartItems: any[];
  totalItems: number;
  totalPrice: number;
  nomorWa: string;
  namaToko: string;
}

export default function FloatingCart({ cartItems, totalItems, totalPrice, nomorWa, namaToko }: FloatingCartProps) {
  
  // Jika keranjang kosong, sembunyikan bar ini
  if (totalItems === 0) return null;

  // Fungsi Merakit Pesanan ke WhatsApp
  const handleCheckout = () => {
    let pesan = `Halo Admin *${namaToko}*, saya ingin memesan:\n\n`;
    
    cartItems.forEach((item: any) => {
      const subtotal = item.finalPrice * item.qty;
      pesan += `📦 *${item.nama_produk}*\n`;
      pesan += `   ${item.qty} x Rp ${item.finalPrice.toLocaleString('id-ID')} = Rp ${subtotal.toLocaleString('id-ID')}\n`;
    });

    pesan += `\n*Total Pesanan: Rp ${totalPrice.toLocaleString('id-ID')}*\n\nMohon info ketersediaan dan cara pembayarannya. Terima kasih!`;
    
    // Buka WhatsApp
    window.open(`https://wa.me/${nomorWa}?text=${encodeURIComponent(pesan)}`, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-slate-200 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] z-[100] animate-slide-up">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Ringkasan Belanja */}
        <div>
          <p className="text-sm font-bold text-slate-500">{totalItems} Produk Terpilih</p>
          <p className="text-2xl font-black text-blue-600 tracking-tight">
            Rp {totalPrice.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Tombol Checkout */}
        <button 
          onClick={handleCheckout} 
          className="bg-slate-900 hover:bg-blue-600 text-white font-black px-6 md:px-8 py-3.5 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          <span className="hidden md:inline">Kirim Pesanan</span> <Send className="w-5 h-5"/>
        </button>
        
      </div>
    </div>
  );
}