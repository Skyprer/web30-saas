import React from 'react';
import { Flower, Phone } from 'lucide-react';

export const HeaderV5 = ({ namaToko, nomorWa }: { namaToko: string, nomorWa: string }) => {
  return (
    <header className="bg-stone-100 sticky top-0 z-50 border-b-[3px] border-amber-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Flower className="h-7 w-7 text-amber-900" />
          <span className="text-2xl font-serif font-bold text-amber-950 tracking-wide">{namaToko}</span>
        </div>
        <a 
          href={`https://wa.me/${nomorWa}?text=Selamat%20siang%20${namaToko},%20saya%20ingin%20memesan.`} 
          target="_blank" 
          rel="noreferrer"
          className="hidden md:flex items-center gap-2 bg-amber-900 hover:bg-amber-950 text-stone-100 font-serif px-5 py-2 rounded-md transition-colors border border-amber-950"
        >
          <Phone className="h-4 w-4" /> Hubungi Kami
        </a>
      </div>
    </header>
  );
};