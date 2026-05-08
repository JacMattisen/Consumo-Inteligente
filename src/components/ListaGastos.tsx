import { useEffect, useState, useCallback } from "react";
import { getGastos, deletarGasto, atualizarGasto } from "../service/consumo";
import type { Gasto } from "../tipos/tipos";
import { Trash2, Edit } from "lucide-react";

export function ListaGastos() {
  const [gastos, setGastos] = useState<Gasto[]>([]);

  const carregarDados = useCallback(async () => {
    try {
      const dados = await getGastos();
      setGastos(dados);
    } catch (err) {
      console.error("Erro ao buscar gastos:", err);
    }
  }, []);

  useEffect(() => {
    const buscarDadosIniciais = async () => {
      await carregarDados();
    };

    buscarDadosIniciais();
  }, [carregarDados]);

  // tipo do gasto (50-30-20)
  const getCategoriaStyle = (catId: string) => {
    if (["1", "3", "4"].includes(catId))
      return { label: "Essencial", color: "text-blue-400", dot: "bg-blue-400" };
    if (["2", "5"].includes(catId))
      return { label: "Desejo", color: "text-pink-400", dot: "bg-pink-400" };
    return { label: "Outro", color: "text-slate-400", dot: "bg-slate-400" };
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Deseja apagar este gasto?")) {
      try {
        await deletarGasto(id);
        await carregarDados();
      } catch (err) {
        console.error("Erro ao deletar:", err);
      }
    }
  };

  const handleEdit = async (id: string) => {
    const novoValor = window.prompt("Digite o novo valor:");
    if (novoValor && !isNaN(Number(novoValor))) {
      try {
        await atualizarGasto(id, { valor: Number(novoValor) });
        await carregarDados();
      } catch (err) {
        console.error("Erro ao editar:", err);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      <h3 className="font-bold border-b border-slate-700 pb-2 text-white flex justify-between items-center">
        Extrato de Gastos
      </h3>

      {gastos.length === 0 ? (
        <p className="text-sm opacity-40 italic text-gray-400">
          Nenhum gasto encontrado.
        </p>
      ) : (
        <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
          {gastos.map((g) => {
            const style = getCategoriaStyle(g.categoria);
            return (
              <div
                key={g.id}
                className="flex justify-between items-center p-3 bg-slate-800/20 rounded-lg border border-slate-700/50 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${style.dot}`}
                    title={style.label}
                  />

                  <div>
                    <p className="font-medium text-gray-200 text-sm">
                      {g.descricao}
                    </p>
                    <div className="flex gap-2 items-center">
                      <span
                        className={`text-xs font-mono font-bold ${style.color}`}
                      >
                        R$ {g.valor.toFixed(2)}
                      </span>
                      <span className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">
                        • {style.label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(g.id)}
                    className="text-slate-500 hover:text-yellow-500 transition p-1"
                    title="Editar valor"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(g.id)}
                    className="text-slate-500 hover:text-red-500 transition p-1"
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
