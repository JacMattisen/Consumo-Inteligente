export interface Gasto {
  id: string;
  dataCriacao: number;
  categoria: string;
  descricao: string;
  valor: number;
}

export interface Rendimento {
  id: string;
  descricao: string;
  valor: number;
}

export interface Categoria {
  id: string;
  descricao: string;
  limite: number;
}
