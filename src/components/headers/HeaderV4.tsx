import React from 'react';
import { Smile, Send } from 'lucide-react';

export const HeaderV4 = ({ namaToko, nomorWa }: { namaToko: string, nomorWa: string }) => {
  return (
    <header className="bg-sky-300 sticky top-0 z-50 border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-300 p-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Smile className="h-7 w-7 text-black" strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black text-black tracking-tight">{namaToko}</span>
        </div>
        
        <a 
          href={`https://wa.me/${nomorWa}?text=Halo%20Kak%20Admin%20${namaToko}!%20Aku%20mau%20tanya%20dong.`} 
          target="_blank" 
          rel="noreferrer"
          className="hidden md:flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-black font-black px-5 py-2.5 rounded-2xl transition-transform hover:-translate-y-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <Send className="h-5 w-5" strokeWidth={2.5} /> Chat Kakak Admin
        </a>
      </div>
    </header>
  );
};