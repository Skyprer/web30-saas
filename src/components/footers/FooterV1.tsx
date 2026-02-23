import React from 'react';
import Link from 'next/link';

export const FooterV1 = ({ namaToko }: { namaToko: string }) => {
  return (
    <footer className="bg-white border-t-2 border-slate-100 pt-10 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="font-black text-slate-900 text-xl mb-4">{namaToko}</h3>
        <p className="text-slate-500 font-medium text-sm mb-8">
          Terima kasih telah berbelanja di toko kami. Kepuasan Anda adalah prioritas kami.
        </p>
        
        {/* CREDIT SAAS WEB30 (VIRAL LOOP) */}
        <div className="pt-6 border-t border-slate-100 flex flex-col items-center justify-center">
          <p className="text-xs font-bold text-slate-400 mb-1">Diberdayakan oleh</p>
          <Link href="/" target="_blank" className="inline-flex items-center gap-1 text-sm font-black text-slate-300 hover:text-blue-600 transition-colors">
            ⚡ Web30 Platform
          </Link>
        </div>
      </div>
    </footer>
  );
};