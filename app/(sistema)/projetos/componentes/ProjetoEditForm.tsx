'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Projeto, projetoMock } from "@/app/mock/projeto"; 

interface Props {
    projetoInicial: Projeto;
}

export default function ProjetoEditForm({ projetoInicial }: Props) {
    const router = useRouter();
    
    // Iniciamos o estado com os valores que já existem no projeto
    const [projeto, setProjeto] = useState({
        nome: projetoInicial.nome,
        prazo: projetoInicial.prazo
    });

    const handlerChange = (campo: string, valor: string) => {
        setProjeto(prev => ({ ...prev, [campo]: valor }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        // Usamos o método atualizar que criamos no seu Mock
        await projetoMock.atualizar(projetoInicial.id, {
            nome: projeto.nome,
            prazo: projeto.prazo
        });

        alert("Projeto atualizado com sucesso!");
        
        router.push("/projetos");
        router.refresh(); 
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                        Nome do Projeto
                    </label>
                    <input
                        required
                        value={projeto.nome}
                        onChange={(e) => handlerChange('nome', e.target.value)}
                        className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all text-sm font-medium"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                        Prazo de Entrega
                    </label>
                    <input
                        required
                        type="date"
                        value={projeto.prazo}
                        onChange={(e) => handlerChange('prazo', e.target.value)}
                        className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all text-sm font-medium"
                    />
                </div>

                <div className="flex items-center gap-4 pt-4">
                    <button
                        type="submit"
                        className="flex-1 py-4 bg-slate-950 hover:bg-slate-800 text-white font-black rounded-2xl shadow-xl transition-all active:scale-[0.98]"
                    >
                        Salvar Alterações
                    </button>

                    <Link
                        href="/projetos"
                        className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all text-center"
                    >
                        Cancelar
                    </Link>
                </div>
            </div>
        </form>
    );
}