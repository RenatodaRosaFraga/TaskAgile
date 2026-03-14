export interface Projeto {
    id: number;
    nome: string;
    prazo: string;
}

export class projetoMock {
    private static projetosDB: Projeto[] = [
        { id: 1, nome: "Redesign do App", prazo: "2026-12-20" },
        { id: 2, nome: "Campanha de Natal", prazo: "2026-12-25" },
    ];

    static async listarTodos(): Promise<Projeto[]> {
        return [...this.projetosDB];
    }

    static async salvar(projeto: { nome: string; prazo: string }): Promise<void> {
        const novoId = this.projetosDB.length > 0 
            ? Math.max(...this.projetosDB.map(p => p.id)) + 1 
            : 1;
        
        this.projetosDB.push({ id: novoId, ...projeto });
    }
}