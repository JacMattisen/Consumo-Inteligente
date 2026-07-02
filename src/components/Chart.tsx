import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { Gasto } from "../tipos/tipos"; // Importe o seu tipo de Gasto

// Propriedade para receber a lista atualizada do Dashboard
interface GraficoConsumoProps {
  gastos: Gasto[];
}

const COLORS = ["#2563eb", "#db2777", "#16a34a"];

export function GraficoConsumo({ gastos }: GraficoConsumoProps) {
  const [dadosGrafico, setDadosGrafico] = useState<
    { name: string; value: number }[]
  >([]);
  const [maiorGasto, setMaiorGasto] = useState<{
    descricao: string;
    valor: number;
  } | null>(null);

  useEffect(() => {
    if (!gastos || gastos.length === 0) {
      setDadosGrafico([]);
      setMaiorGasto(null);
      return;
    }

    // 1. O que mais pesa no bolso
    const maior = gastos.reduce((prev, current) =>
      prev.valor > current.valor ? prev : current,
    );
    setMaiorGasto({ descricao: maior.descricao, valor: maior.valor });

    // 2. Agrupar pela Lógica 50-30-20
    const totalEssenciais = gastos
      .filter((g) => ["1", "3", "4"].includes(g.categoria))
      .reduce((soma, g) => soma + g.valor, 0);

    const totalDesejos = gastos
      .filter((g) => ["2", "5"].includes(g.categoria))
      .reduce((soma, g) => soma + g.valor, 0);

    const totalReserva = gastos
      .filter((g) => g.categoria === "6")
      .reduce((soma, g) => soma + g.valor, 0);

    const novosDados = [
      { name: "Essenciais (50%)", value: totalEssenciais },
      { name: "Desejos (30%)", value: totalDesejos },
      { name: "Reserva (20%)", value: totalReserva },
    ];

    setDadosGrafico(novosDados.filter((d) => d.value > 0));
  }, [gastos]); // Agora ele recalcula instantaneamente quando a lista de gastos mudar!

  return (
    <div className="w-full h-full flex flex-col items-center text-foreground">
      <h3 className="text-center font-bold mb-2 text-foreground">
        Visão 50-30-20
      </h3>

      {maiorGasto && (
        <div className="mb-4 p-3 bg-accent/40 rounded-lg border border-border text-center w-full transition-colors">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            Maior Gasto Detectado
          </p>
          <p className="text-sm font-bold text-foreground">
            {maiorGasto.descricao}:{" "}
            <span className="text-destructive font-mono font-bold">
              {maiorGasto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </p>
        </div>
      )}

      <div className="w-full h-112.5">
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
                backgroundColor: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                color: "var(--popover-foreground)",
              }}
              itemStyle={{ color: "var(--popover-foreground)" }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ color: "var(--foreground)" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
