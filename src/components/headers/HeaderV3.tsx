import React from 'react';
import { Diamond } from 'lucide-react';

export const HeaderV3 = ({ namaToko, nomorWa }: { namaToko: string, nomorWa: string }) => {
  return (
    <header className="bg-zinc-950 sticky top-0 z-50 border-b border-zinc-800 uppercase tracking-widest">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        
        {/* Identitas Kiri (Minimalis) */}
        <div className="flex items-center gap-4">
          <Diamond className="h-6 w-6 text-amber-600" strokeWidth={1.5} />
          <span className="text-xl font-light text-zinc-100 tracking-[0.2em]">{namaToko}</span>
        </div>
        
        {/* Tombol Kanan (Tegas) */}
        <a 
          href={`https://wa.me/${nomorWa}?text=Halo%20${namaToko},%20saya%20tertarik%20dengan%20koleksi%20eksklusif%20Anda.`} 
          target="_blank" 
          rel="noreferrer"
          className="hidden md:block text-xs text-amber-600 border border-amber-600 hover:bg-amber-600 hover:text-zinc-950 px-6 py-3 transition-colors duration-500 font-medium"
        >
          CONCIERGE WA
        </a>
      </div>
    </header>
  );
};