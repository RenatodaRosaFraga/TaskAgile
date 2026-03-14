'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
// 1. IMPORTANTE: Importe o mesmo Mock que a listagem usa
import { projetoMock } from "@/app/mock/equipes"; 

export default function ProjetoForm() {
    const router = useRouter();
    const [projeto, setProjeto] = useState({
        nome: '',
        prazo: ''
    });

    const handlerChange = (campo: string, valor: string) => {
        setProjeto(prev => ({ ...prev, [campo]: valor }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // 2. CORREÇÃO: Chama o mock para salvar o projeto na memória
        await projetoMock.salvar({
            nome: projeto.nome,
            prazo: projeto.prazo
        });

        alert("Projeto criado com sucesso!");
        
        // 3. Redireciona e força a atualização da tela de listagem
        router.push("/projetos");
        router.refresh(); 
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                
                {/* Campo: Nome do Projeto */}
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                        Nome do Projeto
                    </label>
                    <input
                        required
                        value={projeto.nome}
                        onChange={(e) => handlerChange('nome', e.target.value)}
                        placeholder="Ex: Redesign do App Mobile"
                        className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all placeholder:text-slate-400 text-sm font-medium"
                    />
                </div>

                {/* Campo: Prazo de Entrega */}
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                        Prazo de Entrega
                    </label>
                    <input
                        required
                        type="date"
                        min="2024-01-01"
                        max="2099-12-31"
                        value={projeto.prazo}
                        onChange={(e) => handlerChange('prazo', e.target.value)}
                        className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all text-sm font-medium"
                    />
                </div>

                {/* Ações */}
                <div className="flex items-center gap-4 pt-4">
                    <button
                        type="submit"
                        className="flex-1 py-4 bg-slate-950 hover:bg-slate-800 text-white font-black rounded-2xl shadow-xl shadow-slate-950/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        Criar Projeto
                    </button>

                    <Link
                        href="/projetos"
                        className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all active:scale-[0.98] text-center"
                    >
                        Cancelar
                    </Link>
                </div>
            </div>
        </form>
    );
}