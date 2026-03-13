import { Usuario } from '@/app/context/AuthContext';
import { usuarioMock } from '@/app/mock/usuario';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Usuarios(){

    // Corrigido para 'usuarios' (plural) para coincidir com o .map()
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(()=>{
        // Chamada da função para carregar os dados ao montar o componente
        carregarDados();
    }, []);

    const carregarDados = async ()=>{
        try{
            const dados = await usuarioMock.listarTodos();
            setUsuarios(dados);
        }catch(error){
            console.error(error)
        }
    }

    const handlerAlertarStatus = async (usuario:Usuario)=>{
        try{
            setUsuarios( usuariosAtuais => usuariosAtuais.map( u=> u.codigo === usuario.codigo?new Usuario(u.codigo, u.nome, u.cpf, !u.ativo):u
        ));
        }catch(error){
            alert("Erro ao alterar status do usuário!")
        }
    }

    return(
        <div>
            <div>
                <h1>Gestão usuários</h1>
                <Link href="/usuarios/novo"> + Novo Usuário</Link>
            </div>
            <div className="overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th> 
                            <th>CPF</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => 
                        <tr key={usuario.codigo}>
                            <td>{usuario.codigo}</td>
                            <td>{usuario.nome}</td>
                            <td>{usuario.cpf}</td>
                            <td>{usuario.ativo ? 'Ativo' : 'Inativo'}</td>
                            <td>
                                <Link href={`/usuarios/${usuario.codigo}/editar</td>}`}></Link>
                                <button onClick={()=>handlerAlertarStatus(usuario)}>
                                    {usuario.ativo ? 'Inativar' : 'Ativar'}
                                    </button>
                            </td>
                        </tr>
                        )}
                        {usuarios.length ===0 && (
                            <tr>
                                <td>Nenhum usuário encontrado!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}