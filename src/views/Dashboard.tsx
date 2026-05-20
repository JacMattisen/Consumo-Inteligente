// views/Dashboard.tsx
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import DashboardController from "../components/DashboardController";

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
        
        {/* Chama DashboardController com os forms de inputs e outputs */}
          <div className="lg:col-span-1 p-6 rounded-2xl bg-slate-900/40 shadow-inner">
            <DashboardController />
          </div>
      </main>
      <Footer />
    </div>
  );
}
