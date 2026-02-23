import React from 'react';
import { ArrowRight, Sparkles, Store } from 'lucide-react';

export const HeroV2 = ({ namaToko, tagline }: { namaToko: string, tagline: string }) => {
  return (
    <section className="bg-slate-900 text-white pt-20 pb-28 px-6 overflow-hidden relative border-b-8 border-slate-800">
      
      {/* Efek Cahaya Dekoratif (Background Glow) */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
        
        {/* Konten Kiri */}
        <div className="flex-1 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-blue-400 font-bold text-xs md:text-sm mb-8 uppercase tracking-widest shadow-inner">
            <Sparkles className="h-4 w-4" /> Edisi Premium
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1]">
            Eksplorasi Gaya <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{namaToko}</span>
          </h1>
          
          <p className="text-lg md:text-xl font-medium text-slate-400 mb-10 max-w-lg leading-relaxed">
            {tagline || "Kualitas premium dan pelayanan terbaik untuk melengkapi kebutuhan gaya hidup Anda setiap hari."}
          </p>
          
          <a href="#katalog" className="inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-200 text-slate-900 font-black text-lg px-8 py-4 rounded-2xl transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] hover:scale-105">
            Lihat Koleksi <ArrowRight className="w-5 h-5" />
          </a>
        </div>
        
        {/* Visual Kanan (Abstrak Premium) */}
        <div className="flex-1 hidden md:flex justify-end">
          <div className="w-full max-w-md aspect-square bg-gradient-to-tr from-slate-800 to-slate-700 rounded-[3rem] border-2 border-slate-600 shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-slate-800 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <Store className="w-32 h-32 text-slate-500/50" />
          </div>
        </div>

      </div>
    </section>
  );
};