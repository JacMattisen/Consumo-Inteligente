import { Sun, Moon, User, Bell, Settings, Brain } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const [dark, setDark] = useState(true);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.setAttribute(
      "data-theme",

      dark ? "light" : "dark",
    );
  };

  const mudarIdioma = (idioma: string) => {
    i18n.changeLanguage(idioma);
  };

  return (
    <nav className="flex justify-between items-center p-4 border-b border-slate-700 shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2 text-blue-500">
        <Brain size={28} />
        <span className="hover:text-blue-500 transition-colors p-2 rounded-full">
          Smart Finance
        </span>
      </div>

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

          {/* IDIOMAS */}
          <div className="flex gap-1 bg-muted/60 p-1 rounded-lg border border-border ml-2 transition-colors">
            <button
              onClick={() => mudarIdioma("pt")}
              className={`px-1.5 py-0.5 rounded text-sm transition-all ${
                i18n.language === "pt"
                  ? "bg-primary text-primary-foreground scale-105 font-bold shadow-sm"
                  : "opacity-50 hover:opacity-100 hover:bg-accent"
              }`}
              title="Português"
            >
              🇧🇷
              <img
                src="https://flagcdn.com/w40/br.png"
                alt="Brasil bandeira"
                className="w-5 h-3.5 object-cover rounded-sm shadow-2xs"
              />
            </button>
            <button
              onClick={() => mudarIdioma("en")}
              className={`px-1.5 py-0.5 rounded text-sm transition-all ${
                i18n.language.startsWith("en")
                  ? "bg-primary text-primary-foreground scale-105 font-bold shadow-sm"
                  : "opacity-50 hover:opacity-100 hover:bg-accent"
              }`}
              title="English"
            >
              us
              <img
                src="https://flagcdn.com/w40/us.png"
                alt="United States Flag"
                className="w-5 h-3.5 object-cover rounded-sm shadow-2xs"
              />
            </button>
            <button
              onClick={() => mudarIdioma("de")}
              className={`px-1.5 py-0.5 rounded text-sm transition-all ${
                i18n.language.startsWith("de")
                  ? "bg-primary text-primary-foreground scale-105 font-bold shadow-sm"
                  : "opacity-50 hover:opacity-100 hover:bg-accent"
              }`}
              title="Deutsch"
            >
              🇩🇪
              <img
                src="https://flagcdn.com/w40/de.png"
                alt="Deutschland Flagge"
                className="w-5 h-3.5 object-cover rounded-sm shadow-2xs"
              />
            </button>
          </div>
        </div>

        {/* Divisor Visual */}
        <div className="h-8 w-px bg-slate-700 hidden sm:block"></div>

        {/* Login/Perfil */}
        <div
          className="flex items-center gap-4 pl-2 relative cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">{t("navbar.user")}</p>
            <p className="text-[10px] uppercase tracking-wider text-blue-500 font-bold">
              {t("navbar.premium")}
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
