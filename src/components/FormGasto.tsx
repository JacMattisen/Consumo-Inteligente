import { useState } from "react";
import { categorias } from "../constantes/categorias";
import { criarGasto } from "../service/consumo";

export function FormGasto() {
  const [descricao, setDescricao] = useState<string>("");
  const [valor, setValor] = useState<number>(0);
  const [categoria, setCategoria] = useState<string>("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    // Verificação para não enviar vazio
    if (!descricao || valor <= 0) {
      alert("Preencha a descrição e o valor!");
      return;
    }

    const novoGasto = {
      descricao,
      valor,
      categoria,
      dataCriacao: Date.now(),
    };

    try {
      await criarGasto(novoGasto);

      // Limpa o formulário
      setDescricao("");
      setValor(0);
      setCategoria("1");

      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar gasto", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      
    {/* DESCRIÇÃO */}
      <input
        className="bg-white text-black p-2 rounded border border-gray-300 w-full"
        placeholder="Descrição (ex: Aluguel)"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

    {/* LINHA 2 */}
    <div className="flex gap-2">
        <input
          type="number"
          className="bg-white text-black p-2 rounded border border-gray-300 w-1/2"
          placeholder="Valor (R$)"
          value={valor || ""}
          onChange={(e) => setValor(Number(e.target.value))}
        />

        <select
          className={ `
              bg-white text-black p-2 rounded border border-gray-300 w-1/2 
              ${categoria === "" ? "text-gray-400" : "text-black"}
            `}
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >

          <option
            value=""
            disabled
            hidden
          >
            Selecione uma categoria
          </option>

          {categorias.map((cat) => (
            <option 
              key={cat.id} 
              value={cat.id}>
              {cat.descricao}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full font-bold"
      >
        Adicionar Gasto
      </button>
    </form>
  );
}
