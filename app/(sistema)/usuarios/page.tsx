'use client';

import { Usuario } from '@/app/context/AuthContext';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Usuarios() {
    // Estado para armazenar a lista de usuários vinda do banco
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [carregando, setCarregando] = useState(true);

    // Carrega os dados assim que a página abre
    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            setCarregando(true);
            const response = await axios.get<Usuario[]>('http://localhost:8080/usuarios');
            
            if (response.status === 200) {
                setUsuarios(response.data);
            }
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            alert("Não foi possível conectar ao servidor Spring Boot.");
        } finally {
            setCarregando(false);
        }
    };

    // Função para Inativar/Ativar o usuário
    const handlerAlterarStatus = async (usuario: Usuario) => {
        const novoStatus = usuario.status === "ATIVO" ? "INATIVO" : "ATIVO";
        
        // Pequena confirmação visual para o usuário
        const confirmar = confirm(`Deseja alterar o status de ${usuario.nome} para ${novoStatus}?`);
        if (!confirmar) return;

        try {
            // Enviamos o PATCH para o endpoint específico do ID
            const response = await axios.put(`http://localhost:8080/usuarios/${usuario.id}/AlterarStatus`, {
                status: novoStatus
            });

            if (response.status === 200) {
                // ATUALIZAÇÃO LOCAL: Mapeamos a lista e trocamos apenas o status do usuário editado
                setUsuarios(prev => 
                    prev.map(u => u.id === usuario.id ? { ...u, status: novoStatus } : u)
                );
            }
        } catch (error) {
            console.error("Erro ao alterar status:", error);
            alert("Erro técnico ao alterar status no servidor.");
        }
    };

    return (
        <div className="p-8">
            <div className="space-y-6">
                {/* HEADER DA PÁGINA */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-950 tracking-tighter uppercase">Gestão de Usuários</h1>
                        <p className="text-sm text-slate-500 font-medium">Visualize e gerencie os acessos ao sistema.</p>
                    </div>
                    <Link
                        href="/usuarios/novo"
                        className="bg-slate-950 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-slate-950/20 active:scale-95 flex items-center gap-2"
                    >
                        <span className="text-lg">+</span> Novo Usuário
                    </Link>
                </div>

                {/* CARD DA TABELA */}
                <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Código</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Nome</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">E-mail</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {usuarios.map((usuario) => (
                                    <tr key={usuario.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-bold text-slate-400 group-hover:text-slate-950 transition-colors">
                                            #{usuario.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900">
                                            {usuario.nome}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-500">
                                            {usuario.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide transition-colors ${
                                                usuario.status === 'ATIVO'
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-slate-100 text-slate-500'
                                            }`}>
                                                {usuario.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end items-center gap-2">
                                                <Link
                                                    href={`/usuarios/${usuario.id}/editar`}
                                                    className="p-2 text-slate-400 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-all"
                                                    title="Editar Usuário"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                                                </Link>
                                                
                                                {/* BOTÃO DE STATUS AJUSTADO */}
                                                <button
                                                    onClick={() => handlerAlterarStatus(usuario)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                                        usuario.status === 'ATIVO'
                                                            ? 'text-red-500 hover:bg-red-50'
                                                            : 'text-emerald-600 hover:bg-emerald-50'
                                                    }`}
                                                >
                                                    {usuario.status === "ATIVO" ? 'Inativar' : 'Ativar'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {/* MENSAGEM CASO A LISTA ESTEJA VAZIA */}
                                {!carregando && usuarios.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-sm font-medium text-slate-400 italic">
                                            Nenhum usuário encontrado no sistema.
                                        </td>
                                    </tr>
                                )}
                                
                                {/* FEEDBACK DE CARREGAMENTO */}
                                {carregando && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-sm font-bold text-slate-400 animate-pulse">
                                            Sincronizando com o servidor...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}