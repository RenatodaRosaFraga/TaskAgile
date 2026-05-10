'use client';

import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { FavoritoProvider } from "@/app/context/FavoritoContext"; 
import { AuthProvider, useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { usuario, token } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!usuario || !token) {
      router.push('/login');
    }
  }, [usuario, token, router]);

  if (!isMounted) {
    return null;
  }

  if (!usuario || !token) {
    return null;
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