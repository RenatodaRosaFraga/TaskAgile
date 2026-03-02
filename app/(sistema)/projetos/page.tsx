import React from 'react';

export default function Projetos() {
  const projetos = [
    { id: 1, nome: "Redesign do App", prazo: "20/12/2026" },
    { id: 2, nome: "Campanha de Natal", prazo: "25/12/2026" },
    { id: 3, nome: "Migração de Banco", prazo: "05/01/2027" },
  ];

  return (
    <div className="p-8 bg-[#FDFDFD] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black tracking-tighter text-slate-950">Meus Projetos</h1>
        <button className="bg-slate-950 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-slate-950/20">
          + Novo Projeto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projetos.map((projeto) => (
          <div key={projeto.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            {/* Indicador Visual do Projeto */}
            <div className="h-2 w-10 bg-slate-950 rounded-full mb-4" />
            
            <h2 className="text-xl font-bold text-slate-950 mb-2">{projeto.nome}</h2>
            
            <div className="flex items-center gap-2 text-slate-500">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Prazo:</span>
              <span className="text-sm font-medium">{projeto.prazo}</span>
            </div>

            <button className="mt-6 w-full text-center text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-950 transition-colors">
              Ver Detalhes →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}