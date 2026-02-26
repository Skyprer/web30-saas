import React from 'react';
import { MoonStar } from 'lucide-react';

export const HeroV1 = ({ namaToko, tagline }: { namaToko: string, tagline: string }) => {
  return (
    <section className="bg-emerald-900 text-amber-50 pt-20 pb-28 px-6 text-center relative overflow-hidden border-b-8 border-amber-500">
      {/* Ornamen Latar Belakang */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-800 rounded-full shadow-[0_0_30px_rgba(251,191,36,0.3)] border-2 border-amber-400 mb-8">
          <MoonStar className="w-10 h-10 text-amber-400" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
          Berkah Belanja di <br className="hidden md:block" />
          <span className="text-amber-400">{namaToko}</span>
        </h1>
        <p className="text-lg md:text-xl font-medium text-emerald-200 mb-10 max-w-xl mx-auto leading-relaxed">
          {tagline || "Sambut bulan suci dengan koleksi terbaik kami. Insya Allah amanah dan membawa berkah untuk semua."}
        </p>
        <a href="#katalog" className="inline-block bg-amber-400 hover:bg-amber-500 text-emerald-900 font-black text-lg px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
          Lihat Koleksi Berkah
        </a>
      </div>
    </section>
  );
};