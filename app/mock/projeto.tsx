// app/mock/projeto.ts

export interface Projeto {
  id: number;
  nome: string;
  prazo: string;
  status: string; // Adicionado para bater com o seu Java/DB
}

const STORAGE_KEY = 'taskagile_projetos_v1';

export class projetoMock {
  private static projetosDB: Projeto[] = [
    { id: 1, nome: "Redesign do App Mobile", prazo: "2026-05-20", status: "ATIVO" },
    { id: 2, nome: "Dashboard de Vendas", prazo: "2026-06-15", status: "ATIVO" }
  ];

  // Carrega os dados do navegador se existirem
  private static init() {
    if (typeof window !== 'undefined') {
      const salvo = localStorage.getItem(STORAGE_KEY);
      if (salvo) {
        try {
          this.projetosDB = JSON.parse(salvo);
        } catch (e) {
          console.error("Erro ao carregar localStorage", e);
        }
      } else {
        this.persistir(); // Salva os iniciais na primeira vez
      }
    }
  }

  private static persistir() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.projetosDB));
    }
  }

  static async listarTodos(): Promise<Projeto[]> {
    this.init();
    return [...this.projetosDB];
  }

  static async buscarPorId(id: number | string): Promise<Projeto | undefined> {
    this.init();
    const idNumerico = Number(id); 
    return this.projetosDB.find(p => p.id === idNumerico);
  }

  static async salvar(novo: Omit<Projeto, 'id'>): Promise<void> {
    this.init();
    const proximoId = this.projetosDB.length > 0 
      ? Math.max(...this.projetosDB.map(p => p.id)) + 1 
      : 1;
    
    // Garante que o status padrão seja ATIVO se não for enviado
    const projetoComStatus = { 
      ...novo, 
      id: proximoId, 
      status: (novo as any).status || "ATIVO" 
    };
    
    this.projetosDB.push(projetoComStatus as Projeto);
    this.persistir();
  }

  static async atualizar(id: number | string, dados: Partial<Projeto>): Promise<void> {
    this.init();
    const idNumerico = Number(id);
    const index = this.projetosDB.findIndex(p => p.id === idNumerico);
    if (index !== -1) {
      this.projetosDB[index] = { ...this.projetosDB[index], ...dados };
      this.persistir();
    }
  }
}