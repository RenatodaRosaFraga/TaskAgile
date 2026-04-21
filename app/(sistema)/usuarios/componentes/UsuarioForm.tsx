'use client';
import { Usuario, UsuarioFormProps } from "@/app/types/usuarios";
import api from "@/app/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"




export default function UsuarioForm({ usuarioExistente }: UsuarioFormProps) {


    const [usuario, setUsuario] = useState<Usuario>(
        usuarioExistente || new Usuario(null, '', '', "ATIVO")
    );

    const router = useRouter();

    const handleChange = (campo: 'nome' | 'email', valor: string) => {
        setUsuario(prev =>
            new Usuario(
                prev.id,
                campo === 'nome' ? valor : prev.nome,
                campo === 'email' ? valor : prev.email,
                prev.status
            )
        )
    }

    const handleSalvar = async (formData: FormData) => {

        try {
            if (usuarioExistente) {
                var dadosResult = await api
                .put('/usuarios/'+usuarioExistente.id, usuario);

                if (dadosResult.status !== 200) {
                    return;
                }
                alert("Usuário editado com sucesso! Código:" + dadosResult.data)

            } else {
                // Para criação, não enviar o campo id (que é null)
                const usuarioParaCriacao = {
                    nome: usuario.nome,
                    email: usuario.email,
                    status: usuario.status
                };

                var dadosResult = await api.post('/usuarios', usuarioParaCriacao);

                if (dadosResult.status !== 200 && dadosResult.status !== 201) {
                    console.error('Status inesperado:', dadosResult.status);
                    return;
                }
                alert("Usuário salvo com sucesso! Código:" + dadosResult.data)

            }

            router.push("/usuarios")
        } catch (error: any) {
            console.error('Erro ao salvar usuário:', error);

            if (error.response?.status === 500) {
                alert(`Erro interno do servidor ao salvar usuário.\nVerifique os logs do backend.`);
            } else if (error.response?.status === 400) {
                alert(`Dados inválidos. Verifique se todos os campos estão preenchidos corretamente.`);
            } else if (error.response?.status === 401) {
                alert("Sessão expirada. Faça login novamente.");
                router.push('/login');
            } else {
                alert(`Erro ao salvar usuário: ${error.message}`);
            }
        }
    }



    return (
        <form action={handleSalvar} className="w-full">
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
                             onChange={(e) => handleChange('nome', e.target.value)}
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
                            onChange={(e) => handleChange('email', e.target.value)}
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