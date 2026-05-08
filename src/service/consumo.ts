import type { Gasto, Rendimento } from "../tipos/tipos";

const BASE_URL = "https://69fa5f12c509a40d3aa4321b.mockapi.io/smartcons";

export const criarRendimento = async (
  rendimento: Omit<Rendimento, "id">,
): Promise<Rendimento> => {
  const res = await fetch(`${BASE_URL}/rendimentos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rendimento),
  });

  return res.json();
};

export const getRendimentos = async (): Promise<Rendimento[]> => {
  const res = await fetch(`${BASE_URL}/rendimentos`);
  
    if (!res.ok) {
      throw new Error("Erro ao buscar rendimentos");
    }
  
  return res.json();
};

export const atualizarRenda = async (
  id: string,
  renda: Partial<Rendimento>
): Promise<Rendimento> => {

  const res = await fetch(`${BASE_URL}/rendimentos/${id}`, {
    method: "PUT", //Esse endpoint é PATCH (atualizações parciais) mas a Mock API só aceita a descrição do verbo PUT
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(renda),
  });

  if (!res.ok) {
    throw new Error(`Erro ao atualizar renda: ${res.status}`);
  }

  return res.json();
};

export const deletarRenda = async (
  id: string
): Promise<void> => {

  const res = await fetch(`${BASE_URL}/rendimentos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Erro ao deletar renda: ${res.status}`);
  }
};

export const criarGasto = async (gasto: Omit<Gasto, "id">): Promise<Gasto> => {
  const res = await fetch(`${BASE_URL}/gastos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gasto),
  });

  return res.json();
};

export const getGastos = async (): Promise<Gasto[]> => {
  const res = await fetch(`${BASE_URL}/gastos`);
  return res.json();
};
// Deletar
export const deletarGasto = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/gastos/${id}`, {
    method: "DELETE",
  });
};

// Atualizar/editar
export const atualizarGasto = async (
  id: string,
  gasto: Partial<Gasto>,
): Promise<Gasto> => {
  const res = await fetch(`${BASE_URL}/gastos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gasto),
  });

  //add o if porque o fetch não "quebrará" se der erro 404 ou 500.
  if (!res.ok) {
    throw new Error(`Erro ao atualizar gasto: ${res.status}`);
  }

  return res.json();
};
