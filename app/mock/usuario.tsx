import { Usuario } from "../context/AuthContext";


export class usuarioMock {

    private static usuarioDB: Usuario[] = [
        new Usuario(1, "Renato Fraga", "0000000", true),
        new Usuario(2, "Jose", "0000000", true),
        new Usuario(3, "João", "0000000", true),
        new Usuario(4, "Mario", "0000000", true)
    ];

    static async listarTodos(): Promise<Usuario[]> {
        return [...this.usuarioDB]
    }

    static async salvar(usuario: Usuario): Promise<void> {


        const indexExistente = this.usuarioDB.findIndex(u => u.codigo === usuario.codigo);

        if (indexExistente === -1) {
            
            const novoCodigo = Math.max(...this.usuarioDB.map(u => u.codigo)) + 1;
            usuario.codigo = novoCodigo;
            this.usuarioDB.push(usuario);
            console.log(`Usuario de ID ${novoCodigo} salvo com sucesso!`);

        } else {
            this.usuarioDB[indexExistente].nome = usuario.nome;
            this.usuarioDB[indexExistente].cpf = usuario.cpf;
            
            console.log(`Usuario de ID ${usuario.codigo} atualizado com sucesso!`);
        }
    }

    static async buscarPorId(codigo: number): Promise<Usuario | undefined> {

        return this.usuarioDB.find(u => u.codigo === codigo);
    }
}