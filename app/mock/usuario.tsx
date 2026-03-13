import { Usuario } from "../context/AuthContext";

export class usuarioMock {
   
    private static usuarioDB: Usuario[] = [
        new Usuario(1, "Renato Fraga", "0000000", true),
        new Usuario(2, "Jose", "0000000", true),
        new Usuario(3, "João", "0000000", true),
        new Usuario(4, "Mario", "0000000", true)
    ];

    // Adicionado: Método para retornar a lista
    static listarTodos(): Usuario[] {
        return this.usuarioDB;
    }
}