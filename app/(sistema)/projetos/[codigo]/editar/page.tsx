'use client';

import { useEffect, useState, use } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { projetoMock, Projeto } from "@/app/mock/projeto";

// Import ajustado para sua estrutura de componentes dentro de projetos
import ProjetoEditForm from "../../componentes/ProjetoEditForm";

export default function EditarProjetoPage({ params }: { params: Promise<{ codigo: string }> }) {
    // 1. Desembrulha o params (necessário no Next 15)
    const resolvedParams = use(params);
    const [projeto, setProjeto] = useState<Projeto | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarDados() {
            try {
                // 2. IMPORTANTE: Usamos 'codigo' porque é o nome da sua pasta [codigo]
                const idDaUrl = resolvedParams.codigo;
                
                if (!idDaUrl) return;

                const dado = await projetoMock.buscarPorId(idDaUrl);
                
                if (dado) {
                    setProjeto(dado);
                }
            } catch (err) {
                console.error("Erro ao carregar projeto:", err);
            } finally {
                setCarregando(false);
            }
        }
        carregarDados();
    }, [resolvedParams.codigo]);

    // Tela de carregamento visual
    if (carregando) {
        return (
            <div className="p-12 flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-bold animate-pulse">Buscando dados do projeto...</p>
            </div>
        );
    }

    // Se após carregar não encontrar o projeto
    if (!projeto) {
        return (
            <div className="p-12 text-center">
                <div className="bg-red-50 text-red-600 p-6 rounded-2xl inline-block mb-4">
                    <h2 className="text-xl font-black">Projeto não encontrado</h2>
                    <p className="font-medium">O código "{resolvedParams.codigo}" não existe no sistema.</p>
                </div>
                <br />
                <Link href="/projetos" className="text-indigo-600 font-bold hover:underline">
                    Voltar para a lista de projetos
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-[#FDFDFD]">
            <div className="max-w-2xl mx-auto mb-10">
                <div className="flex flex-col gap-6">
                    <Link 
                        href="/projetos" 
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-950 transition-colors group w-fit"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </span>
                        Voltar para a listagem
                    </Link>

                    <div className="space-y-1">
                        <h1 className="text-4xl font-black text-slate-950 tracking-tighter uppercase">
                            Editar Projeto
                        </h1>
                        <p className="text-slate-500 font-medium">
                            Atualize as informações de <span className="text-indigo-600">ID #{projeto.id}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Passando o projeto encontrado para o seu formulário */}
            <div className="max-w-2xl mx-auto">
                <ProjetoEditForm projetoInicial={projeto} />
            </div>
        </div>
    );
}