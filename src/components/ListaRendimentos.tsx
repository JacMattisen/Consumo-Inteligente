import type { Rendimento } from "../tipos/tipos";
import { atualizarRenda, deletarRenda } from "../service/consumo";
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
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";

interface ListaRendimentosProps {
  rendimentos: Rendimento[];
  carregarDados: () => Promise<void>;
}

export function ListaRendimentos({
  rendimentos,
  carregarDados,
}: ListaRendimentosProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deletarRenda(id);
      await carregarDados();
    } catch (err) {
      console.error("Erro ao excluir renda:", err);
      await toast.error("Erro ao excluir renda");
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
      await atualizarRenda(id, { valor: valorNumber });

      await carregarDados();
      toast.success("Renda updated com sucesso!");

      setOpenId(null);
    } catch (err) {
      console.error("Erro ao editar:", err);
      toast.error("Erro ao atualizar renda");
    }
  };

  return (
    <div className="w-full h-full flex flex-col space-y-4 ">
      {/* Título adaptável ao tema */}
      <h3 className="font-bold border-b border-border pb-2 text-foreground">
        Rendimentos fixos e variáveis
      </h3>

      {rendimentos.length === 0 ? (
        <p className="text-sm opacity-60 italic text-muted-foreground">
          Nenhum rendimento encontrado.
        </p>
      ) : (
        <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar ">
          {rendimentos.map((r) => {
            return (
              <div
                key={r.id}
                /* Card adaptável: bg-card no claro e escuro */
                className="flex justify-between items-center p-3 bg-card rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {r.descricao}
                  </p>

                  {/* Verde semântico do CSS */}
                  <span className="text-xs text-accent-success font-bold">
                    R$ {r.valor.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2">
                  {/* Janela de edição */}
                  <Dialog
                    open={openId === r.id}
                    onOpenChange={(isOpen) => {
                      setOpenId(isOpen ? r.id : null);
                    }}
                  >
                    <DialogTrigger asChild>
                      <button className="text-muted-foreground hover:text-amber-500 transition p-1">
                        <Edit size={16} />
                      </button>
                    </DialogTrigger>
                    {/* Modal adaptável de acordo com o Shadcn */}
                    <DialogContent className="sm:max-w-sm bg-background border-border text-foreground">
                      <form onSubmit={(e) => handleEdit(e, r.id)}>
                        <DialogHeader>
                          <DialogTitle>Editar renda</DialogTitle>
                          <DialogDescription className="mb-4 text-sm text-muted-foreground">
                            Atualize o valor do rendimento, digite apenas
                            números.
                          </DialogDescription>
                        </DialogHeader>
                        <div>
                          <div>
                            <Label htmlFor="value-1"></Label>
                            <Input
                              className="mb-2 bg-transparent text-foreground border-border"
                              id="value-1"
                              name="value"
                              type="number"
                              step="0.01"
                              defaultValue={r.valor.toFixed(2)}
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

                  {/* Janela de confirmação de exclusão */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-muted-foreground hover:text-destructive transition p-1">
                        <Trash2 size={16} />
                      </button>
                    </AlertDialogTrigger>

                    {/* Alinhado com o tema semântico */}
                    <AlertDialogContent className="bg-background border-border text-foreground">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Tem certeza que deseja excluir a renda?
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
                          onClick={() => handleDelete(r.id)}
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
