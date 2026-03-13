'use client';

import { Usuario } from '@/app/context/AuthContext';
import { usuarioMock } from '@/app/mock/usuario';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Usuarios() {

    // Corrigido para 'usuarios' (plural) para coincidir com o .map()
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        // Chamada da função para carregar os dados ao montar o componente

    }, []);

    const carregarDados = async () => {
        try {
            const dados = await usuarioMock.listarTodos();
            setUsuarios(dados);
        } catch (error) {
            console.error(error)
        }
    }

    const handlerAlertarStatus = async (usuario: Usuario) => {
        try {
            setUsuarios(usuariosAtuais => usuariosAtuais.map(u =>
                // Ajustado de u.nome para u.name para bater com a sua classe
                u.codigo === usuario.codigo ? new Usuario(u.codigo, u.nome, u.cpf, !u.ativo) : u
            ));
        } catch (error) {
            alert("Erro ao alterar status do usuário!")
        }
    }

    return (
        <div>
            <div className="space-y-6">
                {/* HEADER DA PÁGINA */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-950 tracking-tighter">Gestão de Usuários</h1>
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
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">CPF</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {usuarios.map((usuario) => (
                                    <tr key={usuario.codigo} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-bold text-slate-400 group-hover:text-slate-950 transition-colors">
                                            #{usuario.codigo}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900">
                                            {usuario.nome}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-500">
                                            {usuario.cpf}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide ${usuario.ativo
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                {usuario.ativo ? '● Ativo' : '○ Inativo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end items-center gap-2">
                                                <Link
                                                    href={`/usuarios/${usuario.codigo}/editar`}
                                                    className="p-2 text-slate-400 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-all"
                                                    title="Editar Usuário"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                                                </Link>
                                                <button
                                                    onClick={() => handlerAlertarStatus(usuario)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${usuario.ativo
                                                            ? 'text-red-500 hover:bg-red-50'
                                                            : 'text-emerald-600 hover:bg-emerald-50'
                                                        }`}
                                                >
                                                    {usuario.ativo ? 'Inativar' : 'Ativar'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {usuarios.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-sm font-medium text-slate-400 italic">
                                            Nenhum usuário encontrado no sistema.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}