import React from 'react';
import { Store, MessageCircle } from 'lucide-react';

export const HeaderV1 = ({ namaToko, nomorWa }: { namaToko: string, nomorWa: string }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b-2 border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-md">
            <Store className="h-6 w-6" />
          </div>
          <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{namaToko}</span>
        </div>
        
        <a 
          href={`https://wa.me/${nomorWa}?text=Halo%20Admin%20${namaToko},%20saya%20ingin%20bertanya.`} 
          target="_blank" 
          rel="noreferrer"
          className="hidden md:flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 font-bold px-4 py-2 rounded-xl transition-colors border-2 border-green-200"
        >
          <MessageCircle className="h-5 w-5" /> Chat Admin
        </a>
      </div>
    </header>
  );
};