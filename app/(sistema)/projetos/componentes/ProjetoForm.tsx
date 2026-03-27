'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function ProjetoForm() {
    const router = useRouter();
    const [projeto, setProjeto] = useState({
        nome: '',
        prazo: ''
    });
    const [enviando, setEnviando] = useState(false);

    const handlerChange = (campo: string, valor: string) => {
        setProjeto(prev => ({ ...prev, [campo]: valor }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEnviando(true);
        
        try {
            // O Erro 500 acontece quando o Java recebe um objeto incompleto.
            // Aqui enviamos exatamente o que a Entity Projeto espera.
            const dadosParaEnviar = {
                nome: projeto.nome,
                prazo: projeto.prazo,
                status: "ATIVO" // Enviando o texto exato do EnumStatusProjeto
            };

            const response = await axios.post('http://localhost:8080/projetos', dadosParaEnviar);

            if (response.status === 200 || response.status === 201) {
                alert("Projeto criado com sucesso! ID: " + response.data);
                router.push("/projetos");
                router.refresh(); 
            }
        } catch (error: any) {
            console.error("Erro detalhado:", error.response?.data || error.message);
            alert("Erro ao salvar no servidor. Verifique se o Backend está rodando e se o Banco de Dados foi criado corretamente.");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                
                <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900">Novo Projeto</h2>
                    <p className="text-sm text-slate-500">Preencha os dados para começar</p>
                </div>

                {/* Campo: Nome do Projeto */}
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                        Nome do Projeto
                    </label>
                    <input
                        required
                        disabled={enviando}
                        value={projeto.nome}
                        onChange={(e) => handlerChange('nome', e.target.value)}
                        placeholder="Ex: Redesign do App Mobile"
                        className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all placeholder:text-slate-400 text-sm font-medium disabled:opacity-50"
                    />
                </div>

                {/* Campo: Prazo de Entrega */}
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                        Prazo de Entrega
                    </label>
                    <input
                        required
                        disabled={enviando}
                        type="date"
                        value={projeto.prazo}
                        onChange={(e) => handlerChange('prazo', e.target.value)}
                        className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all text-sm font-medium disabled:opacity-50"
                    />
                </div>

                {/* Ações */}
                <div className="flex items-center gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={enviando}
                        className="flex-1 py-4 bg-slate-950 hover:bg-slate-800 text-white font-black rounded-2xl shadow-xl shadow-slate-950/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:bg-slate-400"
                    >
                        {enviando ? (
                            "Salvando..."
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                Criar Projeto
                            </>
                        )}
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