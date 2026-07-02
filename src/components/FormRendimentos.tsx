import { useState } from "react";
import { criarRendimento } from "../service/consumo";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

interface FormRendimentosProps {
  onRendimentoCriado: () => Promise<void>;
}

export function FormRendimentos({ onRendimentoCriado }: FormRendimentosProps) {
  const [descricao, setDescricao] = useState<string>("");
  const [valor, setValor] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!descricao || valor <= 0) {
      toast.warning(
        "Por favor, insira um valor de renda válido e preencha todos os campos.",
      );
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
      toast.success("Renda adicionada com sucesso");

      setDescricao("");
      setValor(0);
    } catch (error) {
      console.error("Erro ao adicionar renda", error);
      toast.error("Erro ao criar renda");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="flex flex-col gap-2">
        <select
          className={`
            p-2 rounded border border-border w-full bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring
            ${descricao === "" ? "text-muted-foreground" : "text-foreground"}
          `}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        >
          <option
            value=""
            disabled
            hidden
            className="bg-background text-muted-foreground"
          >
            Selecione a categoria de rendimento
          </option>

          <option value="Salário" className="bg-background text-foreground">
            Salário
          </option>
          <option value="Renda Extra" className="bg-background text-foreground">
            Renda Extra
          </option>
          <option
            value="Investimentos"
            className="bg-background text-foreground"
          >
            Rendimentos
          </option>
          <option
            value="Reserva/Poupança"
            className="bg-background text-foreground"
          >
            Reserva/Poupança
          </option>
          <option value="Outros" className="bg-background text-foreground">
            Outros
          </option>
        </select>

        <Input
          type="number"
          placeholder="Valor (R$)"
          value={valor || ""}
          onChange={(e) => setValor(Number(e.target.value))}
          className="bg-transparent border-border text-foreground w-full"
        />
      </div>

      <Button
        type="submit"
        className="w-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Adicionar Renda
      </Button>

      <p className="text-[10px] text-muted-foreground italic">
        * A soma das rendas define seus limites de 50%, 30% e 20%.
      </p>
    </form>
  );
}
