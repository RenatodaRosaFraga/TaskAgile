'use client';

import { Usuario } from '@/app/types/auth';
import { buscarListaUsuarios } from '@/app/services/usuarioService';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        carregarDados();
    }, []);

    // Ajustado: Sintaxe da função carregarDados corrigida
    const carregarDados = async () => {
        setCarregando(true);
        try {   
            const dados = await buscarListaUsuarios();
            setUsuarios(dados);
        } catch (erro) {
            alert("Erro ao carregar dados dos usuários!");
            console.error(erro);
        } finally {
            setCarregando(false);
        }
    };

    const handlerAlterarStatus = async (usuario: Usuario) => {
        const novoStatus = usuario.status === "ATIVO" ? "INATIVO" : "ATIVO";
        
        const confirmar = confirm(`Deseja alterar o status de ${usuario.nome} para ${novoStatus}?`);
        if (!confirmar) return;

        try {
            // Usa 'codigo' conforme definido na sua classe Usuario
            const idUsuario = usuario.codigo || (usuario as any).id;
            
            const response = await axios.put(`http://localhost:8080/usuarios/${idUsuario}/AlterarStatus`, {
                status: novoStatus
            });

            if (response.status === 200) {
                setUsuarios(prev => 
                    prev.map(u => {
                        const currentId = u.codigo || (u as any).id;
                        return currentId === idUsuario ? { ...u, status: novoStatus } : u;
                    })
                );
            }
        } catch (error) {
            console.error("Erro ao alterar status:", error);
            alert("Erro técnico ao alterar status no servidor.");
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="space-y-8 animate-in fade-in duration-500">
                {/* HEADER */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black text-slate-950 tracking-tighter uppercase">Gestão de Usuários</h1>
                        <p className="text-sm text-slate-500 font-medium">Controle de acessos e permissões do sistema.</p>
                    </div>
                    <Link
                        href="/usuarios/novo"
                        className="bg-slate-950 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-950/10 active:scale-95 flex items-center gap-2"
                    >
                        + Novo Usuário
                    </Link>
                </div>

                {/* TABELA */}
                <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">ID</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Colaborador</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">E-mail</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {usuarios.map((usuario) => (
                                    <tr key={usuario.codigo || (usuario as any).id} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-8 py-5 text-sm font-bold text-slate-400">
                                            #{(usuario.codigo || (usuario as any).id)}
                                        </td>
                                        <td className="px-8 py-5 text-sm font-black text-slate-950 uppercase tracking-tight">
                                            {usuario.nome}
                                        </td>
                                        <td className="px-8 py-5 text-sm font-medium text-slate-500">
                                            {usuario.email}
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
                                                usuario.status === 'ATIVO'
                                                    ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200'
                                                    : 'bg-slate-100 text-slate-500 ring-1 ring-slate-200'
                                            }`}>
                                                {usuario.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end items-center gap-3">
                                                <Link
                                                    href={`/usuarios/${usuario.codigo || (usuario as any).id}/editar`}
                                                    className="p-2.5 text-slate-400 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-all"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                                                </Link>
                                                
                                                <button
                                                    onClick={() => handlerAlterarStatus(usuario)}
                                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                                        usuario.status === 'ATIVO'
                                                            ? 'text-red-500 hover:bg-red-50'
                                                            : 'text-emerald-600 hover:bg-emerald-50'
                                                    }`}
                                                >
                                                    {usuario.status === "ATIVO" ? 'Desativar' : 'Reativar'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {usuarios.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            {carregando ? (
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-950 rounded-full animate-spin" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sincronizando base de dados...</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm font-medium text-slate-400 italic">Nenhum registro encontrado.</span>
                                            )}
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