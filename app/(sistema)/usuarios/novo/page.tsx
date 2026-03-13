import Link from "next/link";
import UsuarioForm from "../componentes/UsuarioForm";

export default function cadastrarUsuario(){
    return(
    <div>
        <div>
            <Link href="/usuarios">Voltar</Link>
            <h1>Cadastro de Novo Usuário</h1>
        </div>

        <UsuarioForm/>
    </div>
    )
}