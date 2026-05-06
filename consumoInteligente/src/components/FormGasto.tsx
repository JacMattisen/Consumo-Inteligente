import { useState } from "react";
import { categorias } from "../constantes/categorias";
import { criarGasto } from "../service/consumo";


export function FormGasto() {

  const [descricao, setDescricao] = useState<string>("");
  const [valor, setValor] = useState<number>(0);
  const [categoria, setCategoria] = useState<string>("1");

  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();
      console.log("clicou submit");

     const novoGasto = {
      descricao,
      valor,
      categoria,
      dataCriacao: Date.now()
    };
    
    try {
      await criarGasto(novoGasto); // chama o POST

      console.log("Gasto criado com sucesso");

      // limpa o form
      setDescricao("");
      setValor(0);
      setCategoria("1");

    } catch (error) {
      console.error("Erro ao criar gasto", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        
      <input
        className="bg-white text-black p-2 rounded border border-gray-300 mb-4 ..."
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <input
        className="bg-white text-black p-2 rounded border border-gray-300 mb-4 ..."
        value={valor}
        onChange={(e) => setValor(Number(e.target.value))}
      />

      <select
      className="bg-white text-black p-2 rounded border border-gray-300"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        {categorias.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.descricao}
          </option>
        ))}
      </select>

      <button type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        Adicionar</button>
    </form>
  );
}