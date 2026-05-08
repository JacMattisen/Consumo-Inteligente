import { useState } from "react";
import { criarRendimento } from "../service/consumo";

interface FormRendimentosProps {
  onRendimentoCriado: () => Promise<void>;
}

export function FormRendimentos({
  onRendimentoCriado
}: FormRendimentosProps) {

  const [descricao, setDescricao] = useState<string>("");
  const [valor, setValor] = useState<number>(0);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!descricao || valor <= 0) {
      alert("Por favor, insira um valor de renda válido e preecha todos os campos.");
      return;
    }

    const novoRendimento = {
      descricao,
      valor,
    };

    try {
      await criarRendimento(novoRendimento);
      await onRendimentoCriado();
      console.log("Renda adicionada com sucesso");
      alert("Renda adicionada com sucesso!")

      setDescricao("");
      setValor(0);

      // Atualiza a página para os Insights recalcularem os limites imediatamente
      // window.location.reload();
    } catch (error) {
      console.error("Erro ao adicionar renda", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="flex flex-col gap-2">
        {/* Select para escolher o tipo de renda */}
        <select
          className={`
            bg-white text-black p-2 rounded border border-gray-300 w-full
            ${descricao === "" ? "text-gray-400" : "text-black"}
            `}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        >
          <option value="" disabled hidden>
            Selecione a categoria de rendimento
          </option>

          <option value="Salário">Salário</option>
          <option value="Renda Extra">Renda Extra</option>
          <option value="Investimentos">Rendimentos</option>
          <option value="Reserva/Poupança">Reserva/Poupança</option>
          <option value="Outros">Outros</option>
        </select>

        {/* Input de Valor */}
        <input
          type="number"
          className="bg-white text-black p-2 rounded border border-gray-300 w-full"
          placeholder="Valor (R$)"
          value={valor || ""}
          onChange={(e) => setValor(Number(e.target.value))}
        />
      </div>

      <button
        type="submit"
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition w-full font-bold"
      >
        Adicionar Renda
      </button>

      <p className="text-[10px] text-gray-700 italic">
        * A soma das rendas define seus limites de 50%, 30% e 20%.
      </p>
    </form>
  );
}
