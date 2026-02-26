import React from 'react';
import { Sparkles } from 'lucide-react';

export const HeroV4 = ({ namaToko, tagline }: { namaToko: string, tagline: string }) => {
  return (
    <section className="bg-yellow-300 text-black pt-20 pb-24 px-6 text-center border-b-4 border-black overflow-hidden relative">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border-4 border-black font-black text-sm mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
          <Sparkles className="h-5 w-5 text-pink-500" /> Yeay! Selamat Datang!
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
          Belanja Seru di <br />
          <span className="text-pink-500 underline decoration-black decoration-8 underline-offset-8">{namaToko}</span>
        </h1>
        <p className="text-lg md:text-xl font-bold text-gray-800 mb-10 max-w-xl mx-auto border-2 border-black bg-white p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {tagline || "Temukan barang-barang lucu dan keren di sini. Dijamin bikin harimu makin hepi dan berwarna!"}
        </p>
        <a href="#katalog" className="inline-block bg-sky-400 hover:bg-sky-500 text-black font-black text-xl px-10 py-4 rounded-2xl transition-transform hover:-translate-y-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          Let's Go Belanja! 🚀
        </a>
      </div>
    </section>
  );
};