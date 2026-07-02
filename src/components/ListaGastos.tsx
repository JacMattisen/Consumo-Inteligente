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
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface ListaGastosProps {
  gastos: Gasto[];
  carregarDados: () => Promise<void>;
}

export function ListaGastos({ gastos, carregarDados }: ListaGastosProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  // Cores adaptáveis de acordo com o tema (Evita sumir no claro)
  const getCategoriaStyle = (catId: string) => {
    if (["1", "3", "4"].includes(catId))
      return {
        label: "Essencial",
        color: "text-blue-600 dark:text-blue-400",
        dot: "bg-blue-600 dark:bg-blue-400",
      };
    if (["2", "5"].includes(catId))
      return {
        label: "Desejo",
        color: "text-rose-600 dark:text-rose-400",
        dot: "bg-rose-600 dark:bg-rose-400",
      };
    if (catId === "6")
      return {
        label: "Investimento",
        color: "text-green-600 dark:text-green-400",
        dot: "bg-green-600 dark:bg-green-400",
      };
    return {
      label: "Outro",
      color: "text-muted-foreground",
      dot: "bg-muted-foreground",
    };
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

  const handleEdit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string,
  ) => {
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
      await atualizarGasto(id, { valor: valorNumber });

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
      <h3 className="font-bold border-b border-border pb-2 text-foreground">
        Extrato de Gastos
      </h3>

      {gastos.length === 0 ? (
        <p className="text-sm opacity-60 italic text-muted-foreground">
          Nenhum gasto encontrado.
        </p>
      ) : (
        <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
          {gastos.map((g) => {
            const style = getCategoriaStyle(g.categoria);
            return (
              <div
                key={g.id}
                className="flex justify-between items-center p-3 bg-card rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${style.dot}`}
                    title={style.label}
                  />

                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {g.descricao}
                    </p>
                    <div className="flex gap-2 items-center">
                      <span
                        className={`text-xs font-mono font-bold ${style.color}`}
                      >
                        R$ {g.valor.toFixed(2)}
                      </span>
                      <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter">
                        • {style.label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {/* Janela para edição de gasto */}
                  <Dialog
                    open={openId === g.id}
                    onOpenChange={(isOpen) => {
                      setOpenId(isOpen ? g.id : null);
                    }}
                  >
                    <DialogTrigger asChild>
                      <button className="text-muted-foreground hover:text-amber-500 transition p-1">
                        <Edit size={16} />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm bg-background border-border text-foreground">
                      <form onSubmit={(e) => handleEdit(e, g.id)}>
                        <DialogHeader>
                          <DialogTitle>Editar gasto</DialogTitle>
                          <DialogDescription className="mb-4 text-sm text-muted-foreground">
                            Atualize o valor do gasto, digite apenas números.
                          </DialogDescription>
                        </DialogHeader>
                        <div>
                          <div>
                            <Label htmlFor="value-1"></Label>
                            <Input
                              className="mb-2 bg-transparent border-border text-foreground"
                              id="value-1"
                              name="value"
                              type="number"
                              step="0.01"
                              defaultValue={g.valor.toFixed(2)}
                            />
                          </div>
                        </div>
                        <DialogFooter className="gap-2 sm:gap-0">
                          <DialogClose asChild>
                            <Button
                              variant="outline"
                              className="border-border text-foreground hover:bg-accent transition"
                            >
                              Cancelar
                            </Button>
                          </DialogClose>
                          <Button
                            className="bg-green-600 text-white hover:bg-green-700"
                            type="submit"
                          >
                            Salvar alterações
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* Alert de confirmação de exclusão do gasto */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-muted-foreground hover:text-destructive transition p-1">
                        <Trash2 size={16} />
                      </button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="bg-background border-border text-foreground">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Tem certeza que deseja excluir o gasto?
                        </AlertDialogTitle>

                        <AlertDialogDescription className="text-muted-foreground">
                          Essa ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-border text-foreground hover:bg-accent transition">
                          Cancelar
                        </AlertDialogCancel>

                        <AlertDialogAction
                          onClick={() => handleDelete(g.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
