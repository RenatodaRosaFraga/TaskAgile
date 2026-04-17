import { Usuario } from "../types/auth";
import api from "./api";



export async function buscarListaUsuarios(): Promise<Usuario[]> {
     const dados = await api.get<Usuario[]>('/usuarios');
            
            if (dados.status == 200) {
               return dados.data;
            }
    
    
    
    return[];

}