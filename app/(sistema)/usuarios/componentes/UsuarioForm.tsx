'use client';

import { Usuario } from "@/app/context/AuthContext"
import { usuarioMock } from "@/app/mock/usuario";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

interface UsuarioFormProps {
    usuarioExistente?: Usuario
}

export default function UsuarioForm({ usuarioExistente }: UsuarioFormProps) {
    const router = useRouter();
    
    // Inicializa o estado. 
    const [usuario, setUsuario] = useState<Usuario>(
        usuarioExistente || new Usuario(null , '', '', "ATIVO")
    );

    // ESSENCIAL: Atualiza o estado quando o usuário chega da busca assíncrona
    useEffect(() => {
        if (usuarioExistente) {
            setUsuario(usuarioExistente);
        }
    }, [usuarioExistente]);

    const handlerChange = (campo: 'nome' | 'email', valor: string) => {
        setUsuario(prev =>
            new Usuario(
                prev.id,
                campo === 'nome' ? valor : prev.nome,
                campo === 'email' ? valor : prev.email,
                prev.status
            )
        )
    }

    const handlesalvar = async () => {
        debugger
        try {
            var dadosResult = await axios.post<number>('http://localhost:8080/usuarios', usuario);
            alert("Usuário salvo com sucesso!" + dadosResult.data)
            router.push("/usuarios");
        } catch (error) {
            alert("Erro ao salvar usuário.");
        }
    }

    return (
        <form action={handlesalvar} >
            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                

                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                    {/* Campo: Nome Completo */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                            Nome completo
                        </label>
                        <input
                            required
                            value={usuario.nome}
                            onChange={(e) => handlerChange('nome', e.target.value)}
                            placeholder="João da Silva Sauro"
                            className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all placeholder:text-slate-400 text-sm font-medium"
                        />
                    </div>

                    {/* Campo: CPF */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            maxLength={14}
                            value={usuario.email}
                            onChange={(e) => handlerChange('email', e.target.value)}
                            placeholder="seu@email.com"
                            className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all placeholder:text-slate-400 text-sm font-medium font-mono"
                        />
                    </div>

                    {/* Ações do Formulário */}
                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 py-4 bg-slate-950 hover:bg-slate-800 text-white font-black rounded-2xl shadow-xl shadow-slate-950/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                            {usuarioExistente ? "Salvar Alterações" : "Criar Usuário"}
                        </button>

                        <Link
                            href="/usuarios"
                            className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all active:scale-[0.98] text-center"
                        >
                            Cancelar
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    )
}