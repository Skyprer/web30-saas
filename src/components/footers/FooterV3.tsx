import React from 'react';
import Link from 'next/link';
import { Diamond } from 'lucide-react';

export const FooterV3 = ({ namaToko }: { namaToko: string }) => {
  return (
    <footer className="bg-zinc-950 pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Diamond className="h-6 w-6 text-amber-600 mx-auto mb-6" strokeWidth={1} />
        <h3 className="font-light text-zinc-100 text-2xl tracking-[0.3em] uppercase mb-6">{namaToko}</h3>
        
        <p className="text-zinc-500 font-light text-xs tracking-widest mb-16 leading-relaxed">
          KUALITAS TANPA KOMPROMI. TERIMA KASIH TELAH MEMILIH KAMI.
        </p>
        
        <div className="pt-8 flex flex-col items-center justify-center">
          <Link href="/" target="_blank" className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 hover:text-amber-600 transition-colors duration-500">
            Powered by Web30
          </Link>
        </div>
      </div>
    </footer>
  );
};