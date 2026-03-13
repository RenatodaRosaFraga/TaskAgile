'use client';

import { Usuario } from "@/app/context/AuthContext"
import Link from "next/link";
import { useState } from "react"



export default function UsuarioForm() {

    const [usuario, setUsuario] = useState<Usuario>(new Usuario(0, '', '', true));

    const handlerChange = (campo: 'nome' | 'cpf', valor: string) => {
        setUsuario(prev =>
            new Usuario(
                prev.codigo,
                campo === 'nome' ? valor : prev.nome,
                campo === 'cpf' ? valor : prev.cpf,
                prev.ativo
            )
        )
    }

    const handlesalvar = (formData : FormData) => {

    }

    return (<form action={handlesalvar} >
        <div>
            <div>
                <label>
                    Nome completo
                </label>
                <input
                    required
                    value={usuario.nome}
                    onChange={(e) => handlerChange('nome', e.target.value)}
                    placeholder="João da Silva Sauro">
                </input>
            </div>
            <div>
                <label>
                    CPF
                </label>
                <input
                    required
                    maxLength={14}
                    value={usuario.cpf}
                    onChange={(e) => handlerChange('cpf', e.target.value)}
                    placeholder="999.999.999-99">
                </input>
            </div>
            <Link href="usuario">Cancelar</Link>
            <button type="submit">Salvar</button>
        </div>
    </form>)

}