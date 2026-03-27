'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Projeto } from '@/app/mock/projeto'; 
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useFavoritos } from '@/app/context/FavoritoContext'; 

export default function Projetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();
  
  const { alternarFavorito, isFavorito } = useFavoritos();

  const carregarProjetos = async () => {
    try {
      setCarregando(true);
      const response = await axios.get<Projeto[]>('http://localhost:8080/projetos');
      if (response.status === 200) {
        setProjetos(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarProjetos();
  }, []);

  return (
    <div className="p-8 bg-[#FDFDFD] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-slate-950 uppercase">Meus Projetos</h1>
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
            <div key={i} className="bg-slate-100 h-48 rounded-[2rem] border border-slate-200" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projetos.map((projeto) => (
            <div key={projeto.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all group overflow-hidden">
              
              {/* TOPO DO CARD: Barra e Estrela lado a lado */}
              <div className="flex items-center justify-between mb-4 gap-4">
                {/* Indicador Visual (Barrinha) - flex-1 faz ela ocupar o espaço restante */}
                <div className={`h-1.5 flex-1 rounded-full ${projeto.id % 2 === 0 ? 'bg-indigo-500' : 'bg-slate-950'}`} />
                
                {/* Botão de Favorito - flex-shrink-0 impede que ele seja esmagado */}
                <button 
                  onClick={() => alternarFavorito(projeto)}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-amber-50 transition-all active:scale-125 shadow-sm flex-shrink-0"
                  title={isFavorito(projeto.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                  {isFavorito(projeto.id) ? (
                    <span className="text-xl leading-none block">⭐</span>
                  ) : (
                    <span className="text-xl text-slate-300 hover:text-amber-400 transition-colors leading-none block">☆</span>
                  )}
                </button>
              </div>
              
              {/* TÍTULO - Agora livre de qualquer sobreposição */}
              <h2 className="text-xl font-bold text-slate-950 mb-2 group-hover:text-indigo-600 transition-colors">
                {projeto.nome}
              </h2>
              
              <div className="flex items-center gap-2 text-slate-500">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Prazo</span>
                <span className="text-sm font-bold text-slate-600">
                  {projeto.prazo.includes('-') 
                    ? projeto.prazo.split('-').reverse().join('/') 
                    : projeto.prazo}
                </span>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-50 flex justify-between items-center">
                <Link 
                  href={`/projetos/${projeto.id}/editar`}
                  className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
                  </svg>
                  Editar
                </Link>

                <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-slate-50 text-slate-400 rounded-lg border border-slate-100">
                  #{projeto.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Estado Vazio */}
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