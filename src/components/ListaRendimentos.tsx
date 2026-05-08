import { useEffect, useState, useCallback } from "react";
import type { Rendimento } from "../tipos/tipos";
import { atualizarRenda, deletarRenda, getRendimentos } from "../service/consumo";
import { Edit, Trash2 } from "lucide-react";

export function ListaRendimentos() {
  const [rendimentos, setRendimentos] = useState<Rendimento[]>([]);

  const carregarDados = useCallback(async () => {
    try {
      const dados = await getRendimentos();
      setRendimentos(dados);
    } catch (err) {
      console.error("Erro ao buscar rendimento:", err);
    }
  }, []);

  useEffect(() => {
    const buscarDadosIniciais = async () => {
      await carregarDados();
    };

    buscarDadosIniciais();
  }, [carregarDados]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Deseja apagar esta renda?")) {
      try {
        await deletarRenda(id);
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
        await atualizarRenda(id, { valor: Number(novoValor) });
        await carregarDados();
      } catch (err) {
        console.error("Erro ao editar:", err);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      <h3 className="font-bold border-b border-slate-700 pb-2 text-white flex justify-between items-center">
        Rendimentos fixos e variáveis
      </h3>

      {rendimentos.length === 0 ? (
        <p className="text-sm opacity-40 italic text-gray-400">
          Nenhum rendimento encontrado.
        </p>
      ) : (
        <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
          {rendimentos.map((r) => {

            return (
              <div
                key={r.id}
                className="flex justify-between items-center p-3 bg-slate-800/20 rounded-lg border border-slate-700/50 hover:bg-slate-800/40 transition-colors"
              >
                
             <div>
                <p className="font-medium text-gray-200 text-sm">
                    {r.descricao}
                </p>

                <span className="text-xs text-green-400 font-bold">
                    R$ {r.valor.toFixed(2)}
                </span>
              </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(r.id)}
                    className="text-slate-500 hover:text-yellow-500 transition p-1"
                    title="Editar valor"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(r.id)}
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


