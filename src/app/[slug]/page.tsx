import React from 'react';
import { supabase } from '@/lib/supabase';

// 1. IMPORT SEMUA KOMPONEN (V1 sampai V5)
import { HeaderV1 } from '@/components/headers/HeaderV1';
import { HeaderV2 } from '@/components/headers/HeaderV2';
import { HeaderV3 } from '@/components/headers/HeaderV3';
import { HeaderV4 } from '@/components/headers/HeaderV4';
import { HeaderV5 } from '@/components/headers/HeaderV5';

import { HeroV1 } from '@/components/heros/HeroV1';
import { HeroV2 } from '@/components/heros/HeroV2';
import { HeroV3 } from '@/components/heros/HeroV3';
import { HeroV4 } from '@/components/heros/HeroV4';
import { HeroV5 } from '@/components/heros/HeroV5';

import { CatalogV1 } from '@/components/catalogs/CatalogV1';
import { CatalogV2 } from '@/components/catalogs/CatalogV2';
import { CatalogV3 } from '@/components/catalogs/CatalogV3';
import { CatalogV4 } from '@/components/catalogs/CatalogV4';
import { CatalogV5 } from '@/components/catalogs/CatalogV5';

import { FooterV1 } from '@/components/footers/FooterV1';
import { FooterV2 } from '@/components/footers/FooterV2';
import { FooterV3 } from '@/components/footers/FooterV3';
import { FooterV4 } from '@/components/footers/FooterV4';
import { FooterV5 } from '@/components/footers/FooterV5';

// 2. KAMUS TEMPLATE (Sekarang mendukung 5 Tema)
const templates = {
  header: { v1: HeaderV1, v2: HeaderV2, v3: HeaderV3, v4: HeaderV4, v5: HeaderV5 },
  hero:   { v1: HeroV1,   v2: HeroV2,   v3: HeroV3,   v4: HeroV4,   v5: HeroV5 },
  catalog:{ v1: CatalogV1,v2: CatalogV2,v3: CatalogV3,v4: CatalogV4,v5: CatalogV5 },
  footer: { v1: FooterV1, v2: FooterV2, v3: FooterV3, v4: FooterV4, v5: FooterV5 },
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

  // 3. RACIKAN TEMA DARI DATABASE
  const themeConfig = merchant.theme_config || { header: 'v1', hero: 'v1', catalog: 'v1', footer: 'v1' };

  const ActiveHeader  = templates.header[themeConfig.header as keyof typeof templates.header]   || templates.header.v1;
  const ActiveHero    = templates.hero[themeConfig.hero as keyof typeof templates.hero]       || templates.hero.v1;
  const ActiveCatalog = templates.catalog[themeConfig.catalog as keyof typeof templates.catalog] || templates.catalog.v1;
  const ActiveFooter  = templates.footer[themeConfig.footer as keyof typeof templates.footer]   || templates.footer.v1;

  // 4. LOGIKA WARNA BACKGROUND (Agar menyatu dengan Tema)
  let bgClass = "bg-slate-50"; // Default V1 (Ramadhan)
  if (themeConfig.header === 'v2') bgClass = "bg-slate-900"; // V2 Dark
  if (themeConfig.header === 'v3') bgClass = "bg-zinc-950";  // V3 Luxury
  if (themeConfig.header === 'v4') bgClass = "bg-white";     // V4 Kartun
  if (themeConfig.header === 'v5') bgClass = "bg-stone-100"; // V5 Kultur

  // RENDER WEBSITE FINAL
  return (
    <main className={`min-h-screen flex flex-col relative pb-0 selection:bg-blue-200 ${bgClass}`}>
      
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