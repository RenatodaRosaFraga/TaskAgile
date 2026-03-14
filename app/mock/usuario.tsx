import { Usuario } from "../context/AuthContext";

export class usuarioMock {

    private static usuarioDB: Usuario[] = [
        new Usuario(1, "Renato Fraga", "0000000", true),
        new Usuario(2, "Jose", "0000000", true),
        new Usuario(3, "João", "0000000", true),
        new Usuario(4, "Mario", "0000000", true)
    ];

    // Alterado: Retorna a lista original para garantir que o estado reflita a memória atual
    static async listarTodos(): Promise<Usuario[]> {
        return this.usuarioDB;
    }

    static async salvar(usuario: Usuario): Promise<void> {
        const indexExistente = this.usuarioDB.findIndex(u => u.codigo === usuario.codigo);

        if (indexExistente === -1) {
            // Lógica de Inserção
            const maiorCodigo = this.usuarioDB.length > 0 
                ? Math.max(...this.usuarioDB.map(u => u.codigo)) 
                : 0;
            
            usuario.codigo = maiorCodigo + 1;
            this.usuarioDB.push(usuario);
            console.log(`Usuário de ID ${usuario.codigo} salvo com sucesso!`);
        } else {
            // Lógica de Atualização: Substituímos o objeto inteiro para evitar problemas de referência
            this.usuarioDB[indexExistente] = usuario;
            console.log(`Usuário de ID ${usuario.codigo} atualizado com sucesso!`);
        }
    }

    static async buscarPorId(codigo: number): Promise<Usuario | undefined> {
        return this.usuarioDB.find(u => u.codigo === codigo);
    }
}