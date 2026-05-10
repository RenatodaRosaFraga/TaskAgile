'use client'
import { Usuario } from "../types/usuarios";
import api from "./api";



export async function buscarListaUsuarios(): Promise<Usuario[]> {
    const dados = await api.get<Usuario[]>('/usuarios');

    if (dados.status == 200) {
        return dados.data;
    }
    return [];
}

export async function alterarStatusUsuario(usuario: Usuario): Promise<void> {

    let novoStatus = {};
    if (usuario.status === "ATIVO") {
        novoStatus = { status: "INATIVO" };
    } else {
        novoStatus = { status: "ATIVO" };
    }

    const dadosResult = await api
        .put<number>('/usuarios/' + usuario.id + '/AlterarStatus', { status: novoStatus });

    if (dadosResult.status !== 200) {
        alert("Erro ao atualizar Status!")
    }
}