//componente pai/orquestrador (lifting state up) - controla estados principais, carrega dados, distribui props

import {useCallback, useEffect, useState } from "react";
import type { Gasto, Rendimento } from "../tipos/tipos";
import { getGastos, getRendimentos } from "../service/consumo";
import { FormGasto } from "./FormGasto";
import { ListaGastos } from "./ListaGastos";
import { FormRendimentos } from "./FormRendimentos";
import { ListaRendimentos } from "./ListaRendimentos";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

export default function DashboardController() {
    const [gastos, setGastos] = useState<Gasto[]>([]);

    const [rendimentos, setRendimentos] = useState<Rendimento[]>([]);

    // =========================
    // Carregar gastos
    // =========================
    //função para atualizar estado
    const carregarGastos = useCallback(async () => {
    try {
      const dados = await getGastos();
      setGastos(dados);
    } catch (err) {
      console.error("Erro ao buscar gastos:", err);
      alert("Erro ao buscar gastos:");
    }
  }, []); //Memoriza a função para evitar recriações desnecessárias

  // =========================
  // Carregar rendimentos
  // =========================
  const carregarRendimentos = useCallback(async () => {
    try {
      const dados = await getRendimentos();
      setRendimentos(dados);
    } catch (err) {
      console.error("Erro ao buscar rendimento:", err);
    }
  }, []);

  //2. Para evitar o erro usa assíncrona limpa
  useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      carregarGastos();
      carregarRendimentos();
  }, [carregarGastos, carregarRendimentos]);

  return (
    <>
        {/* Abriga forms de inputs de dados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-slate-700 bg-slate-800/20 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-pink-400 flex items-center gap-2">
              <BanknoteArrowDown size= {20}/> Cadastrar Renda
            </h2>
            
            <FormRendimentos
            onRendimentoCriado={carregarRendimentos}
        />
          </div> 

           <div className="border border-green-500 p-6 rounded-2xl border border-slate-700 bg-slate-800/20 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-blue-400 flex items-center gap-2">
              <BanknoteArrowUp size={20}/> Novo Gasto
            </h2>
            <FormGasto onGastoCriado={carregarGastos} />
          </div>
        </div>


         {/*abriga as colunas de rendimentos e gastos*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="lg:col-span-1 p-6 rounded-2xl border border-slate-700 bg-slate-900/40 shadow-inner">
            <ListaRendimentos
                rendimentos={rendimentos}
                carregarDados={carregarRendimentos}
            />
          </div> 
          
           {/* Primeira coluna - Lista de gastos */}
          <div className="lg:col-span-1 p-6 rounded-2xl border border-slate-700 bg-slate-900/40 shadow-inner">
            <ListaGastos
                gastos={gastos}
                carregarDados={carregarGastos}
            />           
          </div>
        </div>
    </>
  );

}
