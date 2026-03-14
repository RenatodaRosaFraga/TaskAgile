'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Projeto, projetoMock } from '@/app/mock/equipes';
import { useRouter } from 'next/navigation';

export default function Projetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();

  // Função isolada para buscar dados
  const carregarProjetos = async () => {
    setCarregando(true);
    const dados = await projetoMock.listarTodos();
    setProjetos(dados);
    setCarregando(false);
  };

  // Carrega ao montar a página
  useEffect(() => {
    carregarProjetos();
  }, []);

  return (
    <div className="p-8 bg-[#FDFDFD] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-slate-950">Meus Projetos</h1>
          <p className="text-sm text-slate-500 font-medium">Gerencie suas frentes de trabalho</p>
        </div>
        
        <Link 
          href="/projetos/novo" 
          className="bg-slate-950 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-slate-950/20 active:scale-95 hover:bg-slate-800 transition-all flex items-center gap-2"
        >
          <span className="text-lg">+</span> Novo Projeto
        </Link>
      </div>

      {carregando ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-50 h-48 rounded-2xl border border-slate-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projetos.map((projeto) => (
            <div key={projeto.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all group">
              {/* Indicador Visual com cor dinâmica baseada no ID */}
              <div className={`h-2 w-10 rounded-full mb-4 ${projeto.id % 2 === 0 ? 'bg-indigo-500' : 'bg-slate-950'}`} />
              
              <h2 className="text-xl font-bold text-slate-950 mb-2 group-hover:text-indigo-600 transition-colors">
                {projeto.nome}
              </h2>
              
              <div className="flex items-center gap-2 text-slate-500">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Prazo:</span>
                <span className="text-sm font-medium">
                  {projeto.prazo.includes('-') 
                    ? projeto.prazo.split('-').reverse().join('/') 
                    : projeto.prazo}
                </span>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
                <button className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-950 transition-colors">
                  Ver Detalhes →
                </button>
                
                {/* Badge de Status Fictício */}
                <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                  Ativo
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!carregando && projetos.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center gap-4">
           <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-2xl">📁</div>
           <p className="text-slate-400 font-medium max-w-xs">
             Sua lista de projetos está vazia. Que tal começar um agora?
           </p>
           <Link href="/projetos/novo" className="text-indigo-600 font-bold text-sm hover:underline">
             Criar primeiro projeto
           </Link>
        </div>
      )}
    </div>
  );
}