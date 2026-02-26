import React from 'react';
import Link from 'next/link';

export const FooterV4 = ({ namaToko }: { namaToko: string }) => {
  return (
    <footer className="bg-pink-400 pt-16 pb-8 border-t-4 border-black text-black">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="font-black text-3xl mb-4 bg-white inline-block px-6 py-2 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">{namaToko}</h3>
        <p className="font-bold text-lg mb-10 max-w-md mx-auto mt-6">
          Makasih banyak udah mampir! Jangan lupa balik lagi yaaa~ 🥰
        </p>
        <div className="pt-8 flex flex-col items-center justify-center">
          <Link href="/" target="_blank" className="font-black text-sm bg-yellow-300 px-4 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-400 transition-colors">
            🚀 Bikin Toko Kayak Gini di Web30
          </Link>
        </div>
      </div>
    </footer>
  );
};