'use client';

import { Usuario } from "@/app/context/AuthContext"
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
    // Nota: Usei um objeto simples se o Usuario for uma interface, 
    // ou mantenha o 'new' se for uma classe.
    const [usuario, setUsuario] = useState<Usuario>(
        usuarioExistente || { id: null, nome: '', email: '', status: "ATIVO" } as Usuario
    );

    useEffect(() => {
        if (usuarioExistente) {
            setUsuario(usuarioExistente);
        }
    }, [usuarioExistente]);

    const handlerChange = (campo: 'nome' | 'email', valor: string) => {
        setUsuario(prev => ({
            ...prev,
            [campo]: valor
        }));
    };

    const handlesalvar = async (e: React.FormEvent) => {
        e.preventDefault(); // Agora o onSubmit vai disparar isso corretamente

        try {
            // Se tem ID, é Edição (PUT)
            if (usuario.id !== null) {
                const url = `http://localhost:8080/usuarios/${usuario.id}`;
                const dadosResult = await axios.put<number>(url, usuario);

                if (dadosResult.status === 200) {
                    alert("Usuário atualizado com sucesso!");
                    router.push("/usuarios");
                    router.refresh();
                }
            } 
            // Se não tem ID, é Criação (POST)
            else {
                const dadosResult = await axios.post<number>('http://localhost:8080/usuarios', usuario);
                
                if (dadosResult.status === 201 || dadosResult.status === 200) {
                    alert("Usuário criado com sucesso! Código: " + dadosResult.data);
                    router.push("/usuarios");
                    router.refresh();
                }
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao salvar usuário. Verifique a conexão com o servidor.");
        }
    };

    return (
        // AJUSTE: Trocado 'action' por 'onSubmit'
        <form onSubmit={handlesalvar} >
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
                            placeholder="Ex: Renato Fraga"
                            className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all text-sm font-medium"
                        />
                    </div>

                    {/* Campo: Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={usuario.email}
                            onChange={(e) => handlerChange('email', e.target.value)}
                            placeholder="seu@email.com"
                            className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all text-sm font-medium"
                        />
                    </div>

                    {/* Ações */}
                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 py-4 bg-slate-950 hover:bg-slate-800 text-white font-black rounded-2xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {usuario.id ? "Salvar Alterações" : "Criar Usuário"}
                        </button>

                        <Link
                            href="/usuarios"
                            className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all text-center"
                        >
                            Cancelar
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    )
}