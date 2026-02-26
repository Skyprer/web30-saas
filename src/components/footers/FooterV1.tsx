import React from 'react';
import Link from 'next/link';

export const FooterV1 = ({ namaToko }: { namaToko: string }) => {
  return (
    <footer className="bg-emerald-900 pt-12 pb-6 mt-12 border-t-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="font-black text-amber-400 text-2xl mb-4">{namaToko}</h3>
        <p className="text-emerald-100 font-medium text-sm mb-8 max-w-md mx-auto">
          Terima kasih telah mempercayakan kebutuhan Anda kepada kami. Semoga Allah memberikan keberkahan untuk kita semua.
        </p>
        
        <div className="pt-6 border-t border-emerald-800 flex flex-col items-center justify-center">
          <p className="text-xs font-bold text-emerald-500 mb-1">Diberdayakan oleh</p>
          <Link href="/" target="_blank" className="inline-flex items-center gap-1 text-sm font-black text-emerald-400 hover:text-amber-400 transition-colors">
            🌙 Web30 Platform
          </Link>
        </div>
      </div>
    </footer>
  );
};