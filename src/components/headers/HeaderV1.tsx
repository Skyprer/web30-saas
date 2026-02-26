import React from 'react';
import { MessageCircle, Moon } from 'lucide-react';

export const HeaderV1 = ({ namaToko, nomorWa }: { namaToko: string, nomorWa: string }) => {
  return (
    <header className="bg-emerald-800 sticky top-0 z-50 border-b-4 border-amber-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-amber-400 p-2.5 rounded-full text-emerald-900 shadow-inner">
            <Moon className="h-6 w-6" />
          </div>
          <span className="text-xl md:text-2xl font-black text-white tracking-wide">{namaToko}</span>
        </div>
        
        <a 
          href={`https://wa.me/${nomorWa}?text=Assalamu'alaikum%20Admin%20${namaToko},%20saya%20ingin%20bertanya.`} 
          target="_blank" 
          rel="noreferrer"
          className="hidden md:flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-amber-300 font-bold px-4 py-2 rounded-full transition-colors border border-emerald-600 shadow-sm"
        >
          <MessageCircle className="h-5 w-5" /> Chat Admin
        </a>
      </div>
    </header>
  );
};