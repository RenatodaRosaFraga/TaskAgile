'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData: FormData) => {
    setLoading(true);
    // Aqui você pegaria os dados: formData.get("email")
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push("/home");
    setLoading(false);
  };

  return (
    // 1. Ocupa a tela toda e centraliza o quadrado no meio
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      
      {/* 2. O Quadrado (Card): Largura fixa em 380px para NÃO esticar */}
      <div className="w-full max-w-[380px] bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Entrar
        </h1>

        <form action={handleLogin} className="space-y-4">
          {/* Campo E-mail */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">E-mail</label>
            <input
              required
              name="email"
              type="email"
              placeholder="exemplo@email.com"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Campo Senha */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Senha</label>
            <input
              required
              name="senha"
              type="password"
              placeholder="••••••••"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* 3. O BOTÃO ENTRAR: Azul, visível e com feedback de clique */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50 mt-2"
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Esqueceu a senha?
          </a>
        </div>
      </div>
    </div>
  );
}