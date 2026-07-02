import { useState } from "react";
import { categorias } from "../constantes/categorias";
import { criarGasto } from "../service/consumo";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

interface FormGastoProps {
  onGastoCriado: () => Promise<void>;
}

export function FormGasto({ onGastoCriado }: FormGastoProps) {
  const [descricao, setDescricao] = useState<string>("");
  const [valor, setValor] = useState<number>(0);
  const [categoria, setCategoria] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificação para não enviar vazio ou inválido
    if (!descricao || valor <= 0 || !categoria) {
      toast.warning(
        "Por favor, preencha todos os campos e insira um valor válido.",
      );
      return;
    }

    const novoGasto = {
      descricao,
      valor,
      categoria,
      dataCriacao: Date.now(),
    };

    try {
      await criarGasto(novoGasto); // Chama POST de gastos
      await onGastoCriado();
      toast.success("Gasto criado com sucesso");

      // Limpa o formulário
      setDescricao("");
      setValor(0);
      setCategoria("");
    } catch (error) {
      console.error("Erro ao criar gasto", error);
      toast.error("Erro ao criar gasto");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <Input
        className="bg-transparent border-border text-foreground w-full"
        placeholder="Descrição (ex: Aluguel)"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      {/* LINHA 2 */}
      <div className="flex gap-2">
        <Input
          type="number"
          className="bg-transparent border-border text-foreground w-1/2"
          placeholder="Valor (R$)"
          value={valor || ""}
          onChange={(e) => setValor(Number(e.target.value))}
        />

        <select
          className={`
            p-2 rounded border border-border w-1/2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring
            ${categoria === "" ? "text-muted-foreground" : "text-foreground"}
          `}
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option
            value=""
            disabled
            hidden
            className="bg-background text-muted-foreground"
          >
            Selecione uma categoria
          </option>

          {categorias.map((cat) => (
            <option
              key={cat.id}
              value={cat.id}
              className="bg-background text-foreground"
            >
              {cat.descricao}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="submit"
        className="w-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Adicionar Gasto
      </Button>
    </form>
  );
}
