'use client';

import { Usuario } from "@/app/context/AuthContext";
import { usuarioMock } from "@/app/mock/usuario";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UsuarioForm from "../../componentes/UsuarioForm";
import axios from "axios";



export default function EditarUsuario() {

    const params = useParams()
    const router = useRouter()
    const codigo = Number(params.codigo);

    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        buscarDados();
    }, []);

    const buscarDados = async () => {
        const user = await axios.get<Usuario>('http://localhost:8080/usuarios/'+codigo)

        if (user.data) setUsuario(user.data)
        else router.push("/usuarios")
    }

    if (!usuario) return (<div className="p-8"> Carregando dados...</div>)

    return (
        <div>
            <div>
                <h1 className="text-4xl font-black text-slate-950 tracking-tighter">
                            Editar Usuário
                        </h1>
                        <p className="text-slate-500 font-medium">
                            Preencha os dados abaixo para editar um usuário no sistema.
                        </p>
            </div>
            <UsuarioForm usuarioExistente={usuario}/>
        </div>
    );
}