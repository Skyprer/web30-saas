import React from 'react';

export const HeroV3 = ({ namaToko, tagline }: { namaToko: string, tagline: string }) => {
  return (
    <section className="bg-zinc-950 text-zinc-100 py-32 px-6 text-center border-b border-zinc-900 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        <span className="text-amber-600 text-xs font-semibold tracking-[0.3em] uppercase mb-6">
          Koleksi Eksklusif
        </span>
        
        <h1 className="text-5xl md:text-7xl font-light text-white mb-8 tracking-widest uppercase leading-tight">
          {namaToko}
        </h1>
        
        <div className="w-12 h-[1px] bg-amber-600 mb-8"></div>
        
        <p className="text-sm md:text-base font-light text-zinc-400 mb-12 max-w-2xl mx-auto tracking-wider leading-loose">
          {tagline || "Kemewahan sejati terletak pada detail dan kualitas. Temukan mahakarya yang dirancang khusus untuk menyempurnakan gaya hidup Anda."}
        </p>
        
        <a href="#katalog" className="text-xs uppercase tracking-[0.2em] text-zinc-100 border-b border-amber-600 pb-2 hover:text-amber-600 transition-colors duration-300">
          Eksplorasi Koleksi
        </a>
      </div>
    </section>
  );
};