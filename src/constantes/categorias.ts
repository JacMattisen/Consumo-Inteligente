import type { Categoria } from "../tipos/tipos";

export const categorias: Categoria[] = [
  { id: "1", descricao: "Alimentação (Essencial)", limite: 0.5 }, // 50%
  { id: "2", descricao: "Lazer (Desejo)", limite: 0.3 }, // 30%
  { id: "3", descricao: "Saúde (Essencial)", limite: 0.5 }, // 50%
  { id: "4", descricao: "Contas mensais (Essencial)", limite: 0.5 }, // 50%
  { id: "5", descricao: "Outros (Desejo)", limite: 0.3 }, // 30%
];
