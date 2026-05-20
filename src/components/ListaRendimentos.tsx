import type { Rendimento } from "../tipos/tipos";
import { atualizarRenda, deletarRenda} from "../service/consumo";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";

interface ListaRendimentosProps {
  rendimentos: Rendimento[];
  carregarDados: () => Promise<void>;
}

export function ListaRendimentos({
  rendimentos,
  carregarDados
}: ListaRendimentosProps) {

  const [openId, setOpenId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
      try {
        await deletarRenda(id);
        await carregarDados();
      } catch (err) {
        console.error("Erro ao excluir renda:", err);
        toast.error("Erro ao excluir renda");
      }
  };

  const handleEdit = async (e: React.SubmitEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const novoValor = formData.get("value");

    if (!novoValor) return;

    const valorNumber = Number(novoValor);

      if (isNaN(valorNumber)) {
        toast.error("Valor inválido");
        return;
      }
    
      try {
        await atualizarRenda(id, { valor: valorNumber });
        
        await carregarDados();
        toast.success("Renda atualizada com sucesso!");

        setOpenId(null);

      } catch (err) {
        console.error("Erro ao editar:", err);
        toast.error("Erro ao atualizar renda");
      } 
      
  };

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      <h3 className="font-bold border-b border-slate-700 pb-2 text-white">
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
                className="flex justify-between items-center p-3 bg-slate-800/20 rounded-lg border border-slate-700/50 hover:bg-slate-800/30 transition-colors"
              >
                <div>
                  <p className="font-medium text-white-300 text-sm">
                    {r.descricao}
                  </p>

                  <span className="text-xs text-green-700 font-bold">
                    R$ {r.valor.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2">
                  {/* Janela de edição */}
                <Dialog 
                      open={openId === r.id} 
                      onOpenChange={(isOpen) => {
                      setOpenId(isOpen ? r.id : null)
                    }}
                    >
                    
                      <DialogTrigger asChild>
                        <button
                            className="text-white-500 hover:text-yellow-500 transition p-1"
                          >
                          <Edit size={16} />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-sm bg-slate-900 border-slate-700 text-white">
                        <form onSubmit={(e) => handleEdit(e, r.id)}>
                          <DialogHeader>
                            <DialogTitle>Editar renda</DialogTitle>
                            <DialogDescription className="mb-4 text-sm text-slate-400">
                              Atualize o valor do rendimento, digite apenas números.
                            </DialogDescription>
                          </DialogHeader>
                          <div>
                            <div>
                              <Label htmlFor="value-1"></Label>
                              <Input className="mb-2" id="value-1" name="value" type="number" step="0.01" 
                              defaultValue={r.valor.toFixed(2)} />
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

                    {/* Janela de confirmação de exclusão de renda */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="text-white-500 hover:text-red-500 transition p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="bg-slate-900 border-slate-700 text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Tem certeza que deseja excluir a renda?
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
                            onClick={() => handleDelete(r.id)}
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
