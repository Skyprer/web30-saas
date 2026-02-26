import React from 'react';

export const HeroV5 = ({ namaToko, tagline }: { namaToko: string, tagline: string }) => {
  return (
    <section className="bg-amber-900 text-stone-100 pt-24 pb-28 px-6 text-center border-b-[6px] border-amber-950 relative">
      {/* Pattern sederhana ala anyaman/batik */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #f5f5f4 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <p className="font-serif italic text-amber-200 text-lg mb-4">Sugeng Rawuh di</p>
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-stone-50 drop-shadow-lg">
          {namaToko}
        </h1>
        <div className="w-32 h-1 bg-amber-500 mx-auto mb-8 rounded-full"></div>
        <p className="text-lg font-serif text-amber-100 mb-10 max-w-xl mx-auto leading-relaxed">
          {tagline || "Warisan tradisi dalam setiap sentuhan. Kami menyajikan kualitas nusantara terbaik untuk Anda dan keluarga."}
        </p>
        <a href="#katalog" className="inline-block bg-stone-100 hover:bg-stone-200 text-amber-950 font-serif font-bold text-lg px-8 py-3 rounded-sm transition-all shadow-lg">
          Lihat Karya Kami
        </a>
      </div>
    </section>
  );
};