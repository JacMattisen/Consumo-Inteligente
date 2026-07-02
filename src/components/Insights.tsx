import { useEffect, useState } from "react";
import { getGastos, getRendimentos } from "../service/consumo";
import type { Gasto, Rendimento } from "../tipos/tipos";
import { ChessQueen, House, Lightbulb, PiggyBank } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

export function Insights() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [rendimentos, setRendimentos] = useState<Rendimento[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    async function carregarDados() {
      const g = await getGastos();
      const r = await getRendimentos();
      setGastos(g);
      setRendimentos(r);
    }
    carregarDados();
  }, []);

  const totalRecebido = rendimentos.reduce(
    (soma, item) => soma + item.valor,
    0,
  );

  // --- LÓGICA DA REGRA 50-30-20 ---
  const totalEssenciais = gastos
    .filter((g) => ["1", "3", "4"].includes(g.categoria)) // IDs: 1-Alimentação, 3-Saúde, 4-Contas
    .reduce((soma, g) => soma + g.valor, 0); // Soma total dos gastos essenciais

  const totalDesejos = gastos
    .filter((g) => ["2", "5"].includes(g.categoria))
    .reduce((soma, g) => soma + g.valor, 0);

  const saldoAtualParaOFuturo =
    totalRecebido - (totalEssenciais + totalDesejos);

  const limite50 = totalRecebido * 0.5;
  const limite30 = totalRecebido * 0.3;
  const meta20 = totalRecebido * 0.2;

  //descobre se deve exibir R$, $ ou € baseado na bandeira
  const formatarMoeda = (valor: number) => {
    const locale =
      i18n.language === "pt"
        ? "pt-BR"
        : i18n.language.startsWith("de")
          ? "de-DE"
          : "en-US";
    const moeda =
      i18n.language === "pt"
        ? "BRL"
        : i18n.language.startsWith("de")
          ? "EUR"
          : "USD";

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: moeda,
    }).format(valor);
  };

  return (
    <div
      className="p-5 rounded-xl shadow-lg space-y-6 transition-colors"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)",
        borderWidth: "1px",
      }}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Lightbulb size={20} style={{ color: "var(--text-secondary)" }} />
          <h2
            className="text-xl font-bold flex items-center gap-2"
            style={{ color: "var(--text-primary)" }}
          >
            50-30-20
          </h2>
        </div>
      </div>

      {totalRecebido === 0 ? (
        <p className="text-gray-500 italic">{t("insights.sem_renda")}</p>
      ) : (
        <>
          <div className="space-y-4">
            {/* GRUPO 50% - NECESSIDADES */}
            <div
              className="p-4 rounded-lg border-l-4 transition-colors bg-sky-100/70 dark:bg-[#1a1a1a]"
              style={{
                borderLeftColor:
                  totalEssenciais > limite50 ? "#f60e0e" : "#3b82f6",
              }}
            >
              <div className="flex items-center gap-2">
                <House size={20} className="text-gray-800" />
                <h4 className="text-gray-600 font-semibold text-sm">
                  {t("insights.essenciais")}
                </h4>
              </div>

              <p
                className="text-base"
                style={{
                  color: totalEssenciais > limite50 ? "#f60e0e" : "#39ff14",
                }}
              >
                {formatarMoeda(totalEssenciais)}

                <span className="text-gray-800 text-xs italic ml-1">
                  {t("insights.limite_de")} {formatarMoeda(limite50)}
                </span>
              </p>
              {totalEssenciais > limite50 && (
                <p className="text-[10px] text-[#f60e0e] font-bold mt-1">
                  {t("insights.aviso_essenciais")}
                </p>
              )}
            </div>

            {/* GRUPO 30% - DESEJOS */}
            <div
              className="p-4 rounded-lg border-l-4 transition-colors bg-sky-100/70 dark:bg-[#1a1a1a]"
              style={{
                borderLeftColor:
                  totalDesejos > limite30 ? "#eab308" : "#ec4899",
              }}
            >
              <div className="flex items-center gap-2">
                <ChessQueen size={20} className="text-gray-800" />
                <h4 className="text-gray-600 font-semibold text-sm">
                  {t("insights.estilo_vida")}
                </h4>
              </div>

              <p
                className="text-base"
                style={{
                  color: totalDesejos > limite30 ? "#eab308" : "#10A310",
                }}
              >
                {formatarMoeda(totalDesejos)}
                <span className="text-gray-800 text-xs italic ml-1">
                  {t("insights.limite_de")} {formatarMoeda(limite30)}
                </span>
              </p>
              {totalDesejos > limite30 && (
                <p className="text-[10px] text-[#eab308] font-bold mt-1">
                  {t("insights.aviso_desejos")}
                </p>
              )}
            </div>

            {/* GRUPO 20% - FUTURO */}
            <div
              className="p-4 rounded-lg border-l-4 transition-colors bg-sky-100/70 dark:bg-[#1a1a1a]"
              style={{
                borderLeftColor:
                  saldoAtualParaOFuturo < meta20 ? "#ff8c00" : "#10A310",
              }}
            >
              <div className="flex items-center gap-2">
                <PiggyBank size={20} className="text-gray-800" />
                <h4 className="text-gray-600 font-semibold text-sm">
                  {t("insights.futuro_reserva")}
                </h4>
              </div>

              <p
                className="text-base"
                style={{
                  color: saldoAtualParaOFuturo < meta20 ? "#ff8c00" : "#39ff14",
                }}
              >
                {formatarMoeda(saldoAtualParaOFuturo)}
                <span className="text-gray-800 text-xs italic ml-1">
                  {t("insights.meta_de")} {formatarMoeda(meta20)}
                </span>
              </p>
              <p
                className="text-[10px] font-bold mt-1"
                style={{
                  color:
                    saldoAtualParaOFuturo >= meta20 ? "#39ff14" : "#ff8c00",
                }}
              >
                {saldoAtualParaOFuturo >= meta20
                  ? t("insights.sucesso_futuro")
                  : t("insights.aviso_futuro")}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700 space-y-3">
            <h3 className="text-white text-xs font-bold uppercase tracking-wider text-center opacity-70">
              {t("insights.entenda_metodo")}
            </h3>

            <div className="space-y-2 text-[11px] leading-relaxed">
              <p className="text-gray-400">
                <strong className="text-blue-400">
                  {t("insights.essenciais")}:
                </strong>{" "}
                {t("insights.desc_essenciais")}
              </p>
              <p className="text-gray-400">
                <strong className="text-pink-400">
                  {t("insights.estilo_vida")}:
                </strong>{" "}
                {t("insights.desc_desejos")}
              </p>
              <p className="text-gray-400">
                <strong className="text-green-400">
                  {t("insights.futuro_reserva")}:
                </strong>{" "}
                {t("insights.desc_futuro")}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
