import React from 'react';
import Link from 'next/link';

export const FooterV5 = ({ namaToko }: { namaToko: string }) => {
  return (
    <footer className="bg-amber-950 pt-16 pb-8 border-t-[8px] border-amber-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="font-serif font-bold text-amber-200 text-3xl mb-6">{namaToko}</h3>
        <p className="font-serif text-stone-300 mb-12 max-w-md mx-auto">
          Matur nuwun atas kepercayaan Anda. Kami selalu bangga menyajikan yang terbaik dari hati.
        </p>
        <div className="pt-8 border-t border-amber-900 flex flex-col items-center justify-center">
          <Link href="/" target="_blank" className="font-serif text-xs text-amber-700 hover:text-amber-500 transition-colors tracking-widest uppercase">
            Platform Web30 Nusantara
          </Link>
        </div>
      </div>
    </footer>
  );
};