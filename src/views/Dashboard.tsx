// views/Dashboard.tsx
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Insights } from "../components/Insights";
import { ListaGastos } from "../components/ListaGastos";
import { FormGasto } from "../components/FormGasto";
import { FormRendimentos } from "../components/FormRendimentos";
import { GraficoConsumo } from "../components/Chart";
import { ListaRendimentos } from "../components/ListaRendimentos";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-(--bg-color) text-(--text-primary)">
      <Navbar />

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Minha Saúde Financeira</h1>
          <p className="opacity-60 text-sm">
            Gerencie seu dinheiro com inteligência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-slate-700 bg-slate-800/20 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-pink-400 flex items-center gap-2">
              <BanknoteArrowDown size= {20}/> Cadastrar Renda
            </h2>
            
            <FormRendimentos />
          </div>

          <div className="border border-green-500 p-6 rounded-2xl border border-slate-700 bg-slate-800/20 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-blue-400 flex items-center gap-2">
              <BanknoteArrowUp size={20}/> Novo Gasto
            </h2>
            <FormGasto/>
          </div>
        </div>

        {/* Gráfico e Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-slate-700 bg-slate-900/40 shadow-inner flex flex-col items-center justify-center">
            <GraficoConsumo />
          </div>

          <div className="p-6 rounded-2xl border border-slate-700 bg-slate-900/40 shadow-inner">
            <Insights />
          </div>
        </div>
          
        {/* container que abriga as colunas de rendimentos e gastos*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1 p-6 rounded-2xl border border-slate-700 bg-slate-900/40 shadow-inner">
          <ListaRendimentos/>
          </div>
          
           {/* Primeira coluna - Lista de gastos */}
          <div className="lg:col-span-1 p-6 rounded-2xl border border-slate-700 bg-slate-900/40 shadow-inner">
            <ListaGastos />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
