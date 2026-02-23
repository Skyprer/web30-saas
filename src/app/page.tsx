import React from 'react';
import Link from 'next/link';
import { Store, Zap, Smartphone, ArrowRight, CheckCircle2, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function Web30LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b-2 border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-sm">
              <Store className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">Web30</span>
          </div>
          <Link href="/admin/login" className="hidden md:inline-flex items-center font-black text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-5 py-2.5 rounded-lg border-2 border-transparent hover:border-blue-200 transition-all">
            Login Admin <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-100 border-2 border-blue-200 text-blue-800 font-black text-sm mb-8">
          <Zap className="h-4 w-4 text-blue-600" /> Platform Website UMKM #1 di Indonesia
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
          Website Toko Cerdas, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Langsung Masuk WA.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
          Tinggalkan cara manual. Kami buatkan website estetik untuk tokomu, lengkap dengan manajemen stok, label diskon, dan checkout WhatsApp otomatis. Terima beres!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://wa.me/6281234567890?text=Halo%20Admin%20Web30,%20saya%20ingin%20membuat%20website!" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 border-b-4 border-blue-800">
            Buat Website Sekarang
          </a>
          <Link href="/admin/login" className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-300 hover:border-slate-800 hover:text-slate-900 text-slate-600 font-black text-lg rounded-xl transition-all flex items-center justify-center gap-2">
            Login ke Dashboard
          </Link>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="py-24 bg-white border-y-2 border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Fitur Kelas Enterprise, Harga UMKM</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-blue-400 transition-colors">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 border-2 border-blue-200">
                <Smartphone className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Estetik di Semua Layar</h3>
              <p className="text-slate-600 font-medium leading-relaxed">Desain responsif otomatis. Pengunjung bebas melihat katalog produk Anda dengan nyaman dari HP maupun laptop.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-green-400 transition-colors">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6 border-2 border-green-200">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Checkout WhatsApp</h3>
              <p className="text-slate-600 font-medium leading-relaxed">Pesanan dirangkum otomatis oleh sistem dan dikirimkan langsung ke nomor WA Anda. Tanpa potongan komisi!</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-purple-400 transition-colors">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 border-2 border-purple-200">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Katalog Anti-Ribet</h3>
              <p className="text-slate-600 font-medium leading-relaxed">Atur sisa stok, pasang label diskon, atau tandai barang habis (Sold Out) semudah mengupdate status sosial media.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 py-12 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 text-white font-black text-2xl mb-6">
            <Store className="h-7 w-7 text-blue-500" /> Web30
          </div>
          <p className="text-slate-400 font-medium">© {new Date().getFullYear()} Web30 Platform. Semua hak cipta dilindungi.</p>
        </div>
      </footer>

    </div>
  );
}