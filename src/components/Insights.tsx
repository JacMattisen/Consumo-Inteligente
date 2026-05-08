import { useEffect, useState } from "react";
import { getGastos, getRendimentos } from "../service/consumo";
import type { Gasto, Rendimento } from "../tipos/tipos";
import { ChessQueen, House, Lightbulb, PiggyBank } from "lucide-react";

export function Insights() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [rendimentos, setRendimentos] = useState<Rendimento[]>([]);

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

  return (
    <div className="p-5 bg-[#1a1a1a] rounded-xl shadow-lg space-y-6">
      <div className="flex items-center gap-2">
        <Lightbulb size={20}/>
        <h2 className="text-white text-xl font-bold flex items-center gap-2">
          50-30-20
        </h2>
      </div>
      

      {totalRecebido === 0 ? (
        <p className="text-gray-500 italic">
          Cadastre sua renda para organizar seus pilares financeiros.
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {/* GRUPO 50% - NECESSIDADES */}
            <div
              className="p-4 bg-[#2a2a2a] rounded-lg border-l-4"
              style={{
                borderLeftColor:
                  totalEssenciais > limite50 ? "#ff4d4d" : "#3b82f6",
              }}
            >
              <div className="flex items-center gap-2">
                <House size={20}/>
                <h4 className="text-gray-300 font-semibold text-sm">
                  Essenciais (50%)
                </h4>
              </div>
              
              <p
                className="text-base"
                style={{
                  color: totalEssenciais > limite50 ? "#ff4d4d" : "#4dff4d",
                }}
              >
                {totalEssenciais.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                <span className="text-gray-500 text-xs italic ml-1">
                  / limite de{" "}
                  {limite50.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </p>
              {totalEssenciais > limite50 && (
                <p className="text-[10px] text-[#ff4d4d] font-bold mt-1">
                  ⚠️ Reduza gastos básicos!
                </p>
              )}
            </div>

            {/* GRUPO 30% - DESEJOS */}
            <div
              className="p-4 bg-[#2a2a2a] rounded-lg border-l-4"
              style={{
                borderLeftColor:
                  totalDesejos > limite30 ? "#eab308" : "#ec4899",
              }}
            >

              <div className="flex items-center gap-2">
                <ChessQueen size={20}/>
                <h4 className="text-gray-300 font-semibold text-sm">
                  Estilo de Vida (30%)
              </h4>
              </div>
              
              <p
                className="text-base"
                style={{
                  color: totalDesejos > limite30 ? "#eab308" : "#4dff4d",
                }}
              >
                {totalDesejos.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                <span className="text-gray-500 text-xs italic ml-1">
                  / limite de{" "}
                  {limite30.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </p>
              {totalDesejos > limite30 && (
                <p className="text-[10px] text-[#eab308] font-bold mt-1">
                  ⚠️ Controle seus desejos momentâneos!
                </p>
              )}
            </div>

            {/* GRUPO 20% - FUTURO */}
            <div
              className="p-4 bg-[#2a2a2a] rounded-lg border-l-4"
              style={{
                borderLeftColor:
                  saldoAtualParaOFuturo < meta20 ? "#ff8c00" : "#22c55e",
              }}
            >
              <div className="flex items-center gap-2">
                <PiggyBank size={20}/>
                <h4 className="text-gray-300 font-semibold text-sm">
                Futuro e Reserva (20%)
              </h4>
              </div>
              
              <p
                className="text-base"
                style={{
                  color: saldoAtualParaOFuturo < meta20 ? "#ff8c00" : "#4dff4d",
                }}
              >
                {saldoAtualParaOFuturo.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                <span className="text-gray-500 text-xs italic ml-1">
                  / meta de{" "}
                  {meta20.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </p>
              <p
                className="text-[10px] font-bold mt-1"
                style={{
                  color:
                    saldoAtualParaOFuturo >= meta20 ? "#4dff4d" : "#ff8c00",
                }}
              >
                {saldoAtualParaOFuturo >= meta20
                  ? "✅ No caminho certo para a liberdade!"
                  : "📉 Tente poupar um pouco mais."}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700 space-y-3">
            <h3 className="text-white text-xs font-bold uppercase tracking-wider text-center opacity-70">
              Entenda o Método
            </h3>

            <div className="space-y-2 text-[11px] leading-relaxed">
              <p className="text-gray-400">
                <strong className="text-blue-400">
                  50% - Necessidades (Gastos Essenciais):
                </strong>{" "}
                Moradia (aluguel/condomínio), conta de luz, água, gás,
                supermercado, transporte, plano de saúde e educação.
              </p>
              <p className="text-gray-400">
                <strong className="text-pink-400">
                  30% - Desejos (Gastos Variáveis):
                </strong>{" "}
                Assinaturas (Netflix, Spotify), restaurantes, salão de beleza,
                compras não essenciais, viagens e hobbies.
              </p>
              <p className="text-gray-400">
                <strong className="text-green-400">
                  20% - Futuro (Prioridades):
                </strong>{" "}
                Reserva de emergência, pagamento de dívidas, aportes em
                investimentos (ações, tesouro direto, previdência).
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
