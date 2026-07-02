import { useCallback, useEffect, useState } from "react";
import type { Gasto, Rendimento } from "../tipos/tipos";
import { getGastos, getRendimentos } from "../service/consumo";
import { FormGasto } from "./FormGasto";
import { ListaGastos } from "./ListaGastos";
import { FormRendimentos } from "./FormRendimentos";
import { ListaRendimentos } from "./ListaRendimentos";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import { GraficoConsumo } from "./Chart";
import { Insights } from "./Insights";

export default function DashboardController() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [rendimentos, setRendimentos] = useState<Rendimento[]>([]);

  // Carregar gastos
  const carregarGastos = useCallback(async () => {
    try {
      const dados = await getGastos();
      setGastos(dados);
    } catch (err) {
      console.error("Erro ao buscar gastos:", err);
    }
  }, []);

  // Carregar rendimentos
  const carregarRendimentos = useCallback(async () => {
    try {
      const dados = await getRendimentos();
      setRendimentos(dados);
    } catch (err) {
      console.error("Erro ao buscar rendimento:", err);
    }
  }, []);

  useEffect(() => {
    carregarGastos();
    carregarRendimentos();
  }, [carregarGastos, carregarRendimentos]);

  return (
    <>
      {/* Bloco de Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Card Cadastrar Renda */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm text-foreground ">
          <h2 className="text-lg font-semibold mb-4 text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <BanknoteArrowDown size={20} /> Cadastrar Renda
          </h2>

          <FormRendimentos onRendimentoCriado={carregarRendimentos} />
        </div>

        {/* Card Novo Gasto */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm text-foreground ">
          <h2 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <BanknoteArrowUp size={20} /> Novo Gasto
          </h2>
          <FormGasto onGastoCriado={carregarGastos} />
        </div>
      </div>

      {/* Gráfico e Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-6 ">
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm flex flex-col items-center justify-center">
          <GraficoConsumo gastos={gastos} />
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
          <Insights />
        </div>
      </div>

      {/* Colunas de Listas e Histórico */}
      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        <div className="lg:col-span-1 p-6 rounded-2xl border border-border bg-card/60 shadow-sm">
          <ListaRendimentos
            rendimentos={rendimentos}
            carregarDados={carregarRendimentos}
          />
        </div>

        <div className="lg:col-span-1 p-6 rounded-2xl border border-border bg-card/60 shadow-sm">
          <ListaGastos gastos={gastos} carregarDados={carregarGastos} />
        </div>
      </div>
    </>
  );
}
