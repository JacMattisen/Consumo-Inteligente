import { useState } from "react";
import { criarRendimento } from "../service/consumo";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

interface FormRendimentosProps {
  onRendimentoCriado: () => Promise<void>;
}

export function FormRendimentos({ onRendimentoCriado }: FormRendimentosProps) {
  const [descricao, setDescricao] = useState<string>("");
  const [valor, setValor] = useState<number>(0);
  const { t } = useTranslation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!descricao || valor <= 0) {
      toast.warning(t("form_rendimentos.aviso_campos"));
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
      toast.success(t("form_rendimentos.sucesso"));

      setDescricao("");
      setValor(0);
    } catch (error) {
      console.error("Erro ao adicionar renda", error);
      toast.error(t("form_rendimentos.erro"));
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
            {t("form_rendimentos.selecione_categoria")}
          </option>

          <option value="Salário" className="bg-background text-foreground">
            {t("form_rendimentos.opcoes.salario")}
          </option>
          <option value="Renda Extra" className="bg-background text-foreground">
            {t("form_rendimentos.opcoes.renda_extra")}
          </option>
          <option
            value="Investimentos"
            className="bg-background text-foreground"
          >
            {t("form_rendimentos.opcoes.investimentos")}
          </option>
          <option
            value="Reserva/Poupança"
            className="bg-background text-foreground"
          >
            {t("form_rendimentos.opcoes.reserva")}
          </option>
          <option value="Outros" className="bg-background text-foreground">
            {t("form_rendimentos.opcoes.outros")}
          </option>
        </select>

        <Input
          type="number"
          placeholder={t("form_rendimentos.placeholder_valor")}
          value={valor || ""}
          onChange={(e) => setValor(Number(e.target.value))}
          className="bg-transparent border-border text-foreground w-full"
        />
      </div>

      <Button
        type="submit"
        className="w-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {t("form_rendimentos.botao_adicionar")}
      </Button>

      <p className="text-[10px] text-muted-foreground italic">
        {t("form_rendimentos.nota_limites")}
      </p>
    </form>
  );
}
