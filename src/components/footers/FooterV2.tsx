import React from 'react';
import Link from 'next/link';

export const FooterV2 = ({ namaToko }: { namaToko: string }) => {
  return (
    <footer className="bg-slate-900 pt-12 pb-8 mt-16 rounded-t-3xl">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="font-black text-white text-2xl mb-4">{namaToko}</h3>
        <p className="text-slate-400 font-medium text-sm mb-10 max-w-md mx-auto">
          Kualitas premium, pelayanan terbaik. Pesan sekarang dan nikmati pengalaman belanja yang mudah.
        </p>
        
        {/* CREDIT SAAS WEB30 */}
        <div className="pt-8 border-t border-slate-800 flex flex-col items-center justify-center">
          <Link href="/" target="_blank" className="group flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full transition-colors">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Powered By</span>
            <span className="text-sm font-black text-white group-hover:text-blue-400 transition-colors">Web30</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};