import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { getGastos } from "../service/consumo";

// Cores
const COLORS = ["#3b82f6", "#ec4899", "#eab308"]; // Essencial, Desejos, Reserva

export function GraficoConsumo() {
  const [dadosGrafico, setDadosGrafico] = useState<
    { name: string; value: number }[]
  >([]);
  const [maiorGasto, setMaiorGasto] = useState<{
    descricao: string;
    valor: number;
  } | null>(null);

  useEffect(() => {
    async function prepararDados() {
      const gastosApi = await getGastos();

      if (gastosApi.length === 0) return;

      // Onde está gastando mais?
      const maior = gastosApi.reduce((prev, current) =>
        prev.valor > current.valor ? prev : current,
      );
      setMaiorGasto({ descricao: maior.descricao, valor: maior.valor });

      // 2. Agrupar pela Lógica 50-30-20
      // IDs: 1-Alimentação, 3-Saúde, 4-Contas (Essenciais)
      const totalEssenciais = gastosApi
        .filter((g) => ["1", "3", "4"].includes(g.categoria))
        .reduce((soma, g) => soma + g.valor, 0);

      // IDs: 2-Lazer, 5-Outros (Desejos)
      const totalDesejos = gastosApi
        .filter((g) => ["2", "5"].includes(g.categoria))
        .reduce((soma, g) => soma + g.valor, 0);

      // ID: 6 - Poupança/Investimentos
      const totalReserva = gastosApi
        .filter((g) => g.categoria === "6")
        .reduce((soma, g) => soma + g.valor, 0);

      // gráfico
      const novosDados = [
        { name: "Essenciais (50%)", value: totalEssenciais },
        { name: "Desejos (30%)", value: totalDesejos },
        { name: "Reserva (20%)", value: totalReserva },
      ];

      // Filtra grupos que não possuem gastos ainda para não bugar o gráfico
      setDadosGrafico(novosDados.filter((d) => d.value > 0));
    }

    prepararDados();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h3 className="text-center font-bold mb-2">Visão 50-30-20</h3>

      {/* maior gasto individual */}
      {maiorGasto && (
        <div className="mb-4 p-2 bg-slate-800/50 rounded-lg border border-slate-700 text-center w-full">
          <p className="text-[10px] uppercase tracking-wider text-white">
            Maior Gasto Detectado
          </p>
          <p className="text-sm font-bold text-white">
            {maiorGasto.descricao}:{" "}
            <span className="text-red-600">
              {maiorGasto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </p>
        </div>
      )}

      <div className="w-full h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dadosGrafico}
              cx="50%"
              cy="50%"
              innerRadius={85}
              outerRadius={120}
              paddingAngle={3}
              dataKey="value"
            >
              {dadosGrafico.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
