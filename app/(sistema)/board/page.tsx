import React from 'react';

export default function Board() {
  const tarefas = [
    { id: 1, titulo: "Configurar API", status: "Pendente", prioridade: "Urgente" },
    { id: 2, titulo: "Design do Logo", status: "Em Andamento", prioridade: "Alta" },
    { id: 3, titulo: "Login Social", status: "Concluído", prioridade: "Baixa" },
  ];

  const colunas = ["Pendente", "Em Andamento", "Concluído"];

  return (
    <div className="p-8 bg-[#FDFDFD] min-h-screen">
      <h1 className="text-3xl font-black mb-8">Quadro de Tarefas</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {colunas.map((coluna) => (
          <div key={coluna} className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 px-2">
              {coluna}
            </h2>

            <div className="flex flex-col gap-3">
              {tarefas
                .filter((t) => t.status === coluna)
                .map((tarefa) => (
                  <div key={tarefa.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                    <p className="font-bold text-slate-900">{tarefa.titulo}</p>
                    <span className={`text-[10px] font-black uppercase mt-2 inline-block ${
                      tarefa.prioridade === 'Urgente' ? 'text-red-500' : 'text-slate-400'
                    }`}>
                      {tarefa.prioridade}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}