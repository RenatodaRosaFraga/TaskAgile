'use client';

import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { FavoritoProvider } from "@/app/context/FavoritoContext"; 
import { AuthProvider, useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { usuario, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!usuario || !token) {
      router.push('/login');
    }
  }, [usuario, token, router]);

  if (!usuario || !token) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-950 mx-auto mb-4"></div>
          <p className="text-slate-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function SistemaLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <FavoritoProvider>
        <AuthGuard>
          <div className="relative min-h-screen bg-slate-50">
            <Sidebar />

            <div className="flex flex-col min-h-screen md:pl-64 transition-all duration-300">
              <Header />

              <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {children}
                </div>
              </main>

              <Footer />
            </div>
          </div>
        </AuthGuard>
      </FavoritoProvider>
    </AuthProvider>
  );
}