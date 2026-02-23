import React from 'react';
import { supabase } from '@/lib/supabase';

// IMPORT KOMPONEN HIGH CONTRAST
import { HeaderV1 } from '@/components/headers/HeaderV1';
import { HeaderV2 } from '@/components/headers/HeaderV2';
import { HeroV1 } from '@/components/heros/HeroV1';
import { HeroV2 } from '@/components/heros/HeroV2';
import { CatalogV1 } from '@/components/catalogs/CatalogV1';
import { CatalogV2 } from '@/components/catalogs/CatalogV2';
import { FooterV1 } from '@/components/footers/FooterV1';
import { FooterV2 } from '@/components/footers/FooterV2';

// IMPORT FITUR SPESIAL
import FloatingCart from '@/components/ui/FloatingCart';

// KAMUS TEMPLATE (Mix & Match)
const templates = {
  header: { v1: HeaderV1, v2: HeaderV2 },
  hero:   { v1: HeroV1,   v2: HeroV2 },
  catalog:{ v1: CatalogV1,v2: CatalogV2 },
  footer: { v1: FooterV1, v2: FooterV2 },
};

// FITUR 1: Next.js 15 - Params adalah Promise
export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  
  // Tunggu params selesai dimuat
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Ambil data toko berdasarkan slug
  const { data: merchant, error: merchantError } = await supabase
    .from('merchants')
    .select('*')
    .eq('slug', slug)
    .single();

  // FITUR 2: LAYAR DETEKTIF (Debugging Mode)
  if (merchantError || !merchant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6 selection:bg-red-500">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center border-t-8 border-red-600">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🕵️‍♂️</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Toko Tidak Ditemukan</h1>
          <p className="text-slate-600 font-bold mb-6">Sistem Web30 mendeteksi anomali pada URL.</p>
          
          <div className="bg-slate-50 p-5 rounded-xl text-left text-sm mb-6 border-2 border-slate-200 font-mono break-all space-y-3">
            <div>
              <span className="block text-xs font-black text-slate-400 uppercase tracking-widest">Slug Dicari:</span>
              <span className="font-bold text-red-600 text-lg">/{slug}</span>
            </div>
            <div>
              <span className="block text-xs font-black text-slate-400 uppercase tracking-widest">Pesan Error Database:</span>
              <span className="font-bold text-slate-700">{merchantError?.message || "Data kosong (Row tidak ditemukan di tabel merchants)"}</span>
            </div>
          </div>
          <p className="text-sm font-bold text-slate-400">
            Pastikan nama URL sudah didaftarkan melalui Mesin Pabrik Web30.
          </p>
        </div>
      </div>
    );
  }

  // Ambil data produk (Hanya yang is_available = true)
  const { data: dbProducts } = await supabase
    .from('products')
    .select('*')
    .eq('merchant_id', merchant.id)
    .eq('is_available', true)
    .order('created_at', { ascending: false });

  // RACIKAN TEMA DARI DATABASE
  const themeConfig = merchant.theme_config || { header: 'v1', hero: 'v1', catalog: 'v1', footer: 'v1' };

  const ActiveHeader  = templates.header[themeConfig.header as keyof typeof templates.header]   || templates.header.v1;
  const ActiveHero    = templates.hero[themeConfig.hero as keyof typeof templates.hero]       || templates.hero.v1;
  const ActiveCatalog = templates.catalog[themeConfig.catalog as keyof typeof templates.catalog] || templates.catalog.v1;
  const ActiveFooter  = templates.footer[themeConfig.footer as keyof typeof templates.footer]   || templates.footer.v1;

  // RENDER WEBSITE FINAL
  return (
    <main className={`min-h-screen flex flex-col relative pb-24 selection:bg-blue-200 ${themeConfig.header === 'v2' ? 'bg-slate-900' : 'bg-slate-50'}`}>
      
      <ActiveHeader 
        namaToko={merchant.nama_toko} 
        nomorWa={merchant.nomor_whatsapp} 
       
      />
      
      <ActiveHero 
        namaToko={merchant.nama_toko} 
        tagline={merchant.tagline_hero} 
      />
      
      <div className="flex-grow">
        <ActiveCatalog 
          products={dbProducts || []} 
          nomorWa={merchant.nomor_whatsapp} 
          namaToko={merchant.nama_toko} 
        />
      </div>
      
      <ActiveFooter 
        namaToko={merchant.nama_toko} 
       
      />
      
      
      
    </main>
  );
}