"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Store, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg('Email atau Password salah. Silakan coba lagi.');
      setIsLoading(false);
    } else {
      router.push('/admin/katalog');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 selection:bg-blue-500 selection:text-white">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border-t-8 border-blue-600 animate-fade-in">
        
        {/* Header Login */}
        <div className="bg-slate-50 p-8 text-center border-b-2 border-slate-100">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner border-2 border-blue-200">
            <Store className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Login Toko</h1>
          <p className="text-slate-600 font-bold text-sm">Masuk ke Dashboard Web30 Anda.</p>
        </div>

        {/* Form Login */}
        <div className="p-8">
          {errorMsg && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3 animate-bounce">
              <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
              <p className="font-bold text-sm">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-black text-slate-900 mb-2">Email Terdaftar</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="admin@tokosaya.com" 
                  className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl font-bold text-slate-900 focus:border-blue-600 focus:bg-blue-50 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-slate-900 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl font-bold text-slate-900 focus:border-blue-600 focus:bg-blue-50 outline-none transition-colors"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className={`w-full py-4 rounded-xl text-white font-black text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-4 ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]'}`}
            >
              {isLoading ? 'Memeriksa Kredensial...' : (
                <>Masuk Dashboard <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>
        </div>
      </div>
      
      <p className="mt-8 text-slate-500 font-bold text-sm text-center">
        Lupa password? Silakan hubungi Customer Service Web30.
      </p>
    </div>
  );
}