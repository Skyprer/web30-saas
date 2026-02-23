import React from 'react';
import { ShoppingBag } from 'lucide-react';

export const HeroV1 = ({ namaToko, tagline }: { namaToko: string, tagline: string }) => {
  return (
    <section className="bg-slate-50 border-b-2 border-slate-100 pt-16 pb-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-md border-2 border-slate-100 mb-8 transform -rotate-3">
          <ShoppingBag className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
          Selamat Datang di <br className="hidden md:block" />
          <span className="text-blue-600">{namaToko}</span>
        </h1>
        <p className="text-lg md:text-xl font-medium text-slate-600 mb-10 max-w-xl mx-auto leading-relaxed">
          {tagline || "Temukan produk terbaik kami dengan harga yang bersahabat dan kualitas terjamin."}
        </p>
        <a href="#katalog" className="inline-block bg-slate-900 hover:bg-blue-600 text-white font-black text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
          Lihat Katalog
        </a>
      </div>
    </section>
  );
};