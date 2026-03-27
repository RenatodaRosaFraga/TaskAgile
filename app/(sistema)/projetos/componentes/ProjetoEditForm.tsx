'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Projeto } from "@/app/mock/projeto"; 

interface Props {
    projetoInicial: Projeto;
}

export default function ProjetoEditForm({ projetoInicial }: Props) {
    const router = useRouter();
    const [carregando, setCarregando] = useState(false);
    
    // Ajuste: Limpamos a data para garantir que o input consiga exibir
    // Se vier "2026-03-27T15:00:00", vira "2026-03-27"
    const dataFormatada = projetoInicial.prazo?.includes('T') 
        ? projetoInicial.prazo.split('T')[0] 
        : projetoInicial.prazo;

    const [projeto, setProjeto] = useState({
        nome: projetoInicial.nome,
        prazo: dataFormatada
    });

    const handlerChange = (campo: string, valor: string) => {
        setProjeto(prev => ({ ...prev, [campo]: valor }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCarregando(true);
        
        try {
            const response = await axios.put(`http://localhost:8080/projetos/${projetoInicial.id}`, {
                id: projetoInicial.id, // Importante enviar o ID no corpo também para o Hibernate
                nome: projeto.nome,
                prazo: projeto.prazo,
                status: (projetoInicial as any).status || "ATIVO" 
            });

            if (response.status === 200 || response.status === 204) {
                alert("Projeto atualizado no banco de dados!");
                
                // Força o redirecionamento e a atualização da rota
                router.push("/projetos");
                router.refresh(); 
            }
        } catch (error) {
            console.error("Erro ao atualizar no servidor:", error);
            alert("Erro ao conectar com o servidor Spring Boot.");
        } finally {
            setCarregando(false);
        }
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
                        disabled={carregando}
                        value={projeto.nome}
                        onChange={(e) => handlerChange('nome', e.target.value)}
                        className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all text-sm font-medium disabled:opacity-50"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                        Prazo de Entrega
                    </label>
                    <input
                        required
                        disabled={carregando}
                        type="date"
                        value={projeto.prazo}
                        onChange={(e) => handlerChange('prazo', e.target.value)}
                        className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all text-sm font-medium disabled:opacity-50"
                    />
                </div>

                <div className="flex items-center gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={carregando}
                        className="flex-1 py-4 bg-slate-950 hover:bg-slate-800 text-white font-black rounded-2xl shadow-xl transition-all active:scale-[0.98] disabled:bg-slate-400"
                    >
                        {carregando ? "Salvando..." : "Salvar Alterações"}
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