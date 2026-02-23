import React from 'react';
import { Store, Send } from 'lucide-react';

export const HeaderV2 = ({ namaToko, nomorWa }: { namaToko: string, nomorWa: string }) => {
  return (
    <header className="bg-slate-900 sticky top-0 z-50 border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Identitas Kiri */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 rounded-xl text-white shadow-lg border border-slate-700">
            <Store className="h-6 w-6" />
          </div>
          <span className="text-xl md:text-2xl font-black text-white tracking-wide">{namaToko}</span>
        </div>
        
        {/* Tombol Kanan */}
        <a 
          href={`https://wa.me/${nomorWa}?text=Halo%20Admin%20${namaToko},%20saya%20butuh%20bantuan.`} 
          target="_blank" 
          rel="noreferrer"
          className="hidden md:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-5 py-2.5 rounded-xl transition-colors border border-slate-700 shadow-sm"
        >
          <Send className="h-4 w-4" /> Hubungi Kami
        </a>
      </div>
    </header>
  );
};