'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Projeto } from "@/app/mock/projeto";

interface ProjetoFormProps {
    projetoExistente?: Projeto;
}

export default function ProjetoForm({ projetoExistente }: ProjetoFormProps) {
    const router = useRouter();
    
    // Estado inicial simplificado: id, nome e prazo
    const [projeto, setProjeto] = useState<Partial<Projeto>>({
        nome: '',
        prazo: '',
    });

    // Se estiver editando, carrega os dados do projeto
    useEffect(() => {
        if (projetoExistente) {
            setProjeto(projetoExistente);
        }
    }, [projetoExistente]);

    const handleChange = (campo: string, valor: string) => {
        setProjeto(prev => ({ ...prev, [campo]: valor }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (projeto.id) {
                // EDIÇÃO (PUT)
                const response = await axios.put(`http://localhost:8080/projetos/${projeto.id}`, projeto);
                if (response.status === 200) {
                    alert("Projeto atualizado com sucesso!");
                    router.push("/projetos");
                    router.refresh();
                }
            } else {
                // CRIAÇÃO (POST)
                const response = await axios.post('http://localhost:8080/projetos', projeto);
                if (response.status === 200 || response.status === 201) {
                    alert("Projeto criado com sucesso! ID: " + response.data);
                    router.push("/projetos");
                    router.refresh();
                }
            }
        } catch (error) {
            console.error("Erro ao salvar projeto:", error);
            alert("Erro ao conectar com o servidor.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                
                {/* Campo Nome */}
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                        Nome do Projeto
                    </label>
                    <input
                        required
                        type="text"
                        value={projeto.nome}
                        onChange={(e) => handleChange('nome', e.target.value)}
                        placeholder="Ex: Desenvolvimento App Mobile"
                        className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all text-sm font-medium"
                    />
                </div>

                {/* Campo Prazo */}
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                        Prazo de Entrega
                    </label>
                    <input
                        required
                        type="date"
                        value={projeto.prazo}
                        onChange={(e) => handleChange('prazo', e.target.value)}
                        className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all text-sm font-medium"
                    />
                </div>

                {/* Botões */}
                <div className="flex items-center gap-4 pt-4">
                    <button
                        type="submit"
                        className="flex-1 py-4 bg-slate-950 hover:bg-slate-800 text-white font-black rounded-2xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        {projeto.id ? "Salvar Alterações" : "Criar Projeto"}
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