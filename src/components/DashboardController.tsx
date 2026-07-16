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
import { useTranslation } from "react-i18next";

export default function DashboardController() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [rendimentos, setRendimentos] = useState<Rendimento[]>([]);
  const { t } = useTranslation();

  const [versao, setVersao] = useState(0);

  const carregarDadosDoDashboard = useCallback(async () => {
    try {
      const [dadosGastos, dadosRendimentos] = await Promise.all([
        getGastos(),
        getRendimentos(),
      ]);

      // Usar o operador spread [...] garante que o React entenda que a lista mudou!
      setGastos([...dadosGastos]);
      setRendimentos([...dadosRendimentos]);
      setVersao((v) => v + 1); // Altera o controle para forçar a renderização dos componentes
    } catch (err) {
      console.error("Erro ao carregar dados do Dashboard:", err);
    }
  }, []);

  useEffect(() => {
    let ativo = true;

    const buscarDados = async () => {
      try {
        const [dadosGastos, dadosRendimentos] = await Promise.all([
          getGastos(),
          getRendimentos(),
        ]);

        if (ativo) {
          setGastos(dadosGastos);
          setRendimentos(dadosRendimentos);
        }
      } catch (err) {
        console.error("Erro ao inicializar dados:", err);
      }
    };

    buscarDados();

    // Função de limpeza (cleanup) para evitar vazamento de memória e cascata
    return () => {
      ativo = false;
    };
  }, []);

  const recarregarDados = useCallback(() => {
    return new Promise<void>((resolve) => {
      setTimeout(async () => {
        await carregarDadosDoDashboard();
        resolve();
      }, 150);
    });
  }, [carregarDadosDoDashboard]);

  return (
    <>
      {/* Bloco de Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Card Cadastrar Renda */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm text-foreground ">
          <h2 className="text-lg font-semibold mb-4 text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <BanknoteArrowDown size={20} /> {t("cadastrar_renda")}
          </h2>

          <FormRendimentos onRendimentoCriado={recarregarDados} />
        </div>

        {/* Card Novo Gasto */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm text-foreground ">
          <h2 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <BanknoteArrowUp size={20} /> {t("novo_gasto")}
          </h2>
          <FormGasto onGastoCriado={recarregarDados} />
        </div>
      </div>

      {/* Gráfico e Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-6 ">
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm flex flex-col items-center justify-center">
          <GraficoConsumo key={`grafico-${versao}`} gastos={gastos} />
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
            carregarDados={recarregarDados}
          />
        </div>

        <div className="lg:col-span-1 p-6 rounded-2xl border border-border bg-card/60 shadow-sm">
          <ListaGastos gastos={gastos} carregarDados={recarregarDados} />
        </div>
      </div>
    </>
  );
}
