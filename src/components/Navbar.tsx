import { Sun, Moon, User, Bell, Settings, Brain } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const [dark, setDark] = useState(true);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.setAttribute(
      "data-theme",

      dark ? "light" : "dark",
    );
  };

  return (
    <nav className="flex justify-between items-center p-4 border-b border-slate-700 shadow-md">
      {/* Esquerda: Logo */}
      <div className="flex items-center gap-2 text-blue-500">
        {/* <LayoutDashboard size={28} /> */}
        <Brain size={28}/>
        <span className="text-white px-3 py-1 font-size:20px">
          Consumo Inteligente
        </span>
      </div>

      {/* Direita: Ações */}
      <div className="flex items-center gap-10">
        {/* Sub-grupo: Utilidades (Notificações e Configurações) */}
        <div className="flex items-center gap-6 pr-4 border-r border-slate-600">
          <button className="hover:text-blue-500 transition-colors p-2 rounded-full">
            <Bell size={20} />
          </button>

          <button className="hover:text-blue-500 transition-colors p-2 rounded-full">
            <Settings size={20} />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-slate-700/50 rounded-full transition-all ml-2"
          >
            {dark ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-slate-300" />
            )}
          </button>
        </div>

        {/* Divisor Visual */}
        <div className="h-8 w-px bg-slate-700 hidden sm:block"></div>

        {/* Login/Perfil */}
        <div
          className="flex items-center gap-4 pl-2 relative cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">Olá,VISITANTE</p>
            <p className="text-[10px] uppercase tracking-wider text-blue-500 font-bold">
              Premium
            </p>
          </div>
          <div className="w-11 h-11  from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-gray-600 shadow-xl border-2 border-gray/10 cursor-pointer hover:scale-110 transition-all">
            <User size={22} />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 rounded-full"></div>
        </div>
      </div>
    </nav>
  );
}
