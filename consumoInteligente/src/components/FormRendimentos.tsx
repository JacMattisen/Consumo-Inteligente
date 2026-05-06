import { useState } from "react";
import { criarRendimento } from "../service/consumo";

export function FormRendimentos() {
    const [descricao, setDescricao] = useState<string>("");
    const [valor, setValor] = useState<number>(0);

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        const novoRendimento = {
            descricao,
            valor,
        };

        try {
            await criarRendimento(novoRendimento);
            console.log("renda adicionada com sucesso");
            
            setDescricao("");
            setValor(0);
        } catch (error) {
            console.error("Erro ao adicionar renda", error);
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
    
          <button type="submit" 
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition">
            Adicionar</button>
        </form>
      );

}