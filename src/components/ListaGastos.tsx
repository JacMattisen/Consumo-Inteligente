import { toast } from "sonner";
import { deletarGasto, atualizarGasto } from "../service/consumo";
import type { Gasto } from "../tipos/tipos";
import { Trash2, Edit } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input"
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface ListaGastosProps {
  gastos: Gasto[];
  carregarDados: () => Promise<void>;
}

export function ListaGastos({gastos,
  carregarDados
}: ListaGastosProps) {

  const [openId, setOpenId] = useState<string | null>(null)

  // tipo do gasto (50-30-20)
  const getCategoriaStyle = (catId: string) => {
    if (["1", "3", "4"].includes(catId))
      return { label: "Essencial", color: "text-blue-400", dot: "bg-blue-400" };
    if (["2", "5"].includes(catId))
      return { label: "Desejo", color: "text-pink-400", dot: "bg-pink-400" };
    if (catId === "6")
      return {
        label: "Investimento",
        color: "text-green-400",
        dot: "bg-green-400",
      };
    return { label: "Outro", color: "text-slate-400", dot: "bg-slate-400" };
  };

  const handleDelete = async (id: string) => {
      try {
        await deletarGasto(id);
        await carregarDados();
        toast.success("Gasto excluído com sucesso!");
      } catch (err) {
        console.error("Erro ao excluir gasto:", err);
        toast.error("Erro ao excluir gasto");
      }
  };
  
  //Atualiza o valor do gasto selecionado
  const handleEdit = async (e: React.SubmitEvent<HTMLFormElement>, id: string) => {
    
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const novoValor = formData.get("value");

    if (!novoValor) return;

    const valorNumber = Number(novoValor);

    if (isNaN(Number(valorNumber))) {
       toast.error("Valor inválido");
        return;
    }

    try {
        await atualizarGasto(id, { valor: (valorNumber) });

        await carregarDados();
        toast.success("Gasto atualizado com sucesso!");

        setOpenId(null);

      } catch (err) {
        console.error("Erro ao editar:", err);
        toast.error("Erro ao atualizar gasto");
      } 
  };

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      <h3 className="font-bold border-b border-slate-700 pb-2 text-white">
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
                    <p className="font-medium text-white text-sm">
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

                   {/* Janela para edição de gasto */}
                     <Dialog open={openId === g.id} 
                     onOpenChange={(isOpen) => {
                       setOpenId(isOpen ? g.id : null);
                     }}>
                      <DialogTrigger asChild>
                        <button
                            className="text-white-500 hover:text-yellow-500 transition p-1"
                          >
                          <Edit size={16} />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-sm bg-slate-900 border-slate-700 text-white">
                        <form onSubmit={(e) => handleEdit(e, g.id)}>
                          <DialogHeader>
                            <DialogTitle>Editar gasto</DialogTitle>
                            <DialogDescription className="mb-4 text-sm text-slate-400">
                              Atualize o valor do gasto, digite apenas números.
                            </DialogDescription>
                          </DialogHeader>
                          <div>
                            <div>
                              <Label htmlFor="value-1"></Label>
                              <Input className="mb-2" id="value-1" name="value" type="number" step="0.01" 
                              defaultValue={g.valor.toFixed(2)} />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline" className="text-black hover:bg-slate-300 transition">
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button
                            className="bg-green-500 hover:bg-green-600"
                            type="submit">Save changes</Button>
                          </DialogFooter>

                        </form>
                      </DialogContent>                   
                  </Dialog>

                    {/* Alert de confirmação de exclusão do gasto */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className="text-red-500 hover:scale-110 transition p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="bg-slate-900 border-slate-700 text-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Tem certeza que deseja excluir o gasto?
                            </AlertDialogTitle>

                            <AlertDialogDescription className="text-slate-400">
                              Essa ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel className="text-black hover:bg-slate-300 transition">
                              Cancelar
                            </AlertDialogCancel>

                            <AlertDialogAction
                              onClick={() => handleDelete(g.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
