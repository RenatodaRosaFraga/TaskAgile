// src/app/types/projetos.ts

export class projetos {
  constructor(
    public id: number, // sem null
    public nome: string,
    public prazo: string,
    public status: string
  ) {}
}

export interface ProjetoFormProps {
  projetoInicial?: Projeto; // opcional, usado para edição
}
// src/app/types/projetos.ts

export class Projeto {
  constructor(
    public id: number,
    public nome: string,
    public prazo: string,
    public status: string
  ) {}
}

export interface ProjetoFormProps {
  projetoInicial?: Projeto; // opcional, usado para edição
}
