import type { Gasto, Rendimento } from "../tipos/tipos";

const BASE_URL = "http://localhost:8080/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ==================== RENDIMENTOS ( com Java Local) ====================

export const getRendimentos = async (): Promise<Rendimento[]> => {
  const res = await fetch(`${BASE_URL}/rendimentos`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error(`Erro ao buscar rendimentos: ${res.status}`);
  const dadosJava = await res.json();

  // TRADUTOR: Transforma o padrão do Java (amount, description) para o React (valor, descricao)
  return dadosJava.map((r: any) => ({
    id: String(r.id),
    descricao: r.description,
    valor: Number(r.amount),
  }));
};

export const criarRendimento = async (
  rendimento: Omit<Rendimento, "id">,
): Promise<Rendimento> => {
  const rendimentoParaJava = {
    description: rendimento.descricao,
    amount: rendimento.valor,
  };

  const res = await fetch(`${BASE_URL}/rendimentos`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(rendimentoParaJava),
  });
  if (!res.ok) throw new Error("Erro ao salvar rendimento no servidor");

  const r = await res.json();
  // Devolve em português para o React atualizar a tela
  return {
    id: String(r.id),
    descricao: r.description,
    valor: Number(r.amount),
  };
};

export const atualizarRenda = async (
  id: string,
  renda: Partial<Rendimento>,
): Promise<Rendimento> => {
  const res = await fetch(`${BASE_URL}/rendimentos/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(renda),
  });
  if (!res.ok) throw new Error(`Erro ao atualizar renda: ${res.status}`);
  const r = await res.json();
  return {
    id: String(r.id),
    descricao: r.description,
    valor: Number(r.amount),
  };
};

export const deletarRenda = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/rendimentos/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error(`Erro ao deletar renda: ${res.status}`);
};

// ==================== GASTOS / TRANSAÇÕES (Java Local) ====================

export const getGastos = async (): Promise<Gasto[]> => {
  const res = await fetch(`${BASE_URL}/transactions`, {
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error(`Erro ao buscar gastos: ${res.status}`);

  const dadosJava = await res.json();

  return dadosJava.map((g: any) => ({
    id: String(g.id),
    categoria: g.category,
    descricao: g.description,
    valor: Number(g.amount),
    dataCriacao: new Date(g.date).getTime(),
  }));
};

export const criarGasto = async (
  gasto: Omit<Gasto, "id" | "dataCriacao">,
): Promise<Gasto> => {
  const gastoParaJava = {
    category: gasto.categoria,
    description: gasto.descricao,
    amount: gasto.valor,
    date: new Date().toISOString().split("T")[0],
  };

  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(gastoParaJava),
  });

  if (!res.ok) throw new Error("Erro ao salvar gasto no servidor");

  const g = await res.json();

  return {
    id: String(g.id),
    categoria: g.category,
    descricao: g.description,
    valor: Number(g.amount),
    dataCriacao: new Date(g.date).getTime(),
  };
};

export const deletarGasto = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error(`Erro ao deletar: ${res.status}`);
};

export const atualizarGasto = async (
  id: string,
  gasto: Partial<Gasto>,
): Promise<Gasto> => {
  const gastoParaJava = {
    category: gasto.categoria,
    description: gasto.descricao,
    amount: gasto.valor,
    date: gasto.dataCriacao
      ? new Date(gasto.dataCriacao).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  };

  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(gastoParaJava),
  });

  if (!res.ok) throw new Error(`Erro ao atualizar: ${res.status}`);

  const g = await res.json();
  return {
    id: String(g.id),
    categoria: g.category,
    descricao: g.description,
    valor: Number(g.amount),
    dataCriacao: new Date(g.date).getTime(),
  };
};
