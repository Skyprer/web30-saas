"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Store, Package, Image as ImageIcon, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!isMounted) return;

      setIsAuthenticated(!!session);
      setIsChecking(false);

      // Logika Pindah Halaman yang Halus
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else if (session && pathname === '/admin/login') {
        router.push('/admin');
      }
    };

    checkSession();

    return () => {
      isMounted = false;
    };
  }, [pathname, router]); // Awasi perubahan path saja

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  // 1. Layar Loading
  if (isChecking) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">Memuat Dashboard...</div>;
  }

  // 2. Jika belum login dan sedang di halaman login, tampilkan halamannya (Tanpa Sidebar)
  if (!isAuthenticated && pathname === '/admin/login') {
    return <>{children}</>;
  }

  // 3. Jika sudah login, tampilkan UI Admin lengkap
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
        <div className="p-6">
          <h2 className="text-2xl font-extrabold text-blue-600 mb-8">Web30 Admin</h2>
          <nav className="space-y-2">
            <Link href="/admin/pengaturan" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"><Store className="h-5 w-5" /><span className="font-medium">Pengaturan Toko</span></Link>
            <Link href="/admin/katalog" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"><Package className="h-5 w-5" /><span className="font-medium">Kelola Katalog</span></Link>
          </nav>
        </div>
        <div className="p-6 border-t border-gray-100">
           <button onClick={handleLogout} className="flex items-center gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 font-medium w-full px-4 py-3 rounded-lg"><LogOut className="h-5 w-5" /> Keluar</button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}