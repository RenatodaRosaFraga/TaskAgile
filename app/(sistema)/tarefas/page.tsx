"use client"; // Esta linha resolve o erro de Event Handlers

import React from 'react';

// Tipagem para garantir a consistência dos dados
interface Tarefa {
  id: number;
  titulo: string;
  projeto: string;
  responsavel: string;
  prioridade: "Baixa" | "Alta" | "Urgente";
  status: "Pendente" | "Em Andamento" | "Concluído";
}

export default function TarefasPage() {
  const tarefas: Tarefa[] = [
    { 
      id: 1, 
      titulo: "Refatorar API de Autenticação", 
      projeto: "Redesign do App", 
      responsavel: "Carlos Oliveira", 
      prioridade: "Alta", 
      status: "Em Andamento" 
    },
    { 
      id: 2, 
      titulo: "Corrigir vazamento de memória", 
      projeto: "Migração de Banco", 
      responsavel: "Bruno Lima", 
      prioridade: "Urgente", 
      status: "Pendente" 
    },
    { 
      id: 3, 
      titulo: "Criar assets para redes sociais", 
      projeto: "Campanha de Natal", 
      responsavel: "Ana Souza", 
      prioridade: "Baixa", 
      status: "Concluído" 
    },
  ];

  // Regra de Negócio: Sistema de alerta para tarefas Urgentes
  const handleCriarTarefa = () => {
    const prioridadeNovaTarefa = "Urgente"; 

    if (prioridadeNovaTarefa === "Urgente") {
      alert("🚨 ALERTA DE SISTEMA: Uma tarefa URGENTE foi detectada e registrada no Workspace!");
    } else {
      console.log("Tarefa comum criada com sucesso.");
    }
  };

  return (
    <div className="p-8 bg-[#FDFDFD] min-h-screen">
      {/* Cabeçalho da Página */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-950">Lista de Tarefas</h1>
          <p className="text-slate-500 text-sm font-medium">Gerenciamento centralizado de demandas.</p>
        </div>
        
        <button 
          onClick={handleCriarTarefa}
          className="bg-slate-950 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-slate-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          + Nova Tarefa
        </button>
      </div>

      {/* Container da Tabela */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Demanda</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Projeto</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Responsável</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Prioridade</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {tarefas.map((tarefa) => (
              <tr key={tarefa.id} className="hover:bg-slate-50/30 transition-colors group">
                <td className="p-6">
                  <p className="font-bold text-slate-950">{tarefa.titulo}</p>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    {tarefa.status}
                  </span>
                </td>
                
                <td className="p-6">
                  <span className="text-sm font-semibold text-slate-600">{tarefa.projeto}</span>
                </td>

                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-black text-slate-600 border border-slate-200">
                      {tarefa.responsavel.charAt(0)}
                    </div>
                    <span className="text-sm font-bold text-slate-800">{tarefa.responsavel}</span>
                  </div>
                </td>

                <td className="p-6">
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                    tarefa.prioridade === 'Urgente' 
                      ? 'bg-red-50 text-red-600 border-red-100' 
                      : tarefa.prioridade === 'Alta'
                      ? 'bg-orange-50 text-orange-600 border-orange-100'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    {tarefa.prioridade}
                  </span>
                </td>

                <td className="p-6 text-right">
                  <button className="text-slate-300 hover:text-slate-950 transition-colors font-black text-[10px] uppercase tracking-[0.15em]">
                    Gerenciar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer da Página */}
      <div className="mt-8 flex justify-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
          TaskAgile • Sistema de Gestão Interna
        </p>
      </div>
    </div>
  );
}