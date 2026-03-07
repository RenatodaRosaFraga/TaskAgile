import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar"; // Não esqueça do import!

export default function SistemaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-slate-50">
      {/* Sidebar: Fixed no lado esquerdo */}
      <Sidebar />

      {/* Container de Conteúdo: 
          - No desktop (md:), adicionamos pl-64 para "empurrar" tudo para a direita da Sidebar.
          - flex-col e min-h-screen mantêm o Footer no fundo.
      */}
      <div className="flex flex-col min-h-screen md:pl-64 transition-all duration-300">
        
        {/* Header agora fica alinhado com o conteúdo, não sobre a Sidebar */}
        <Header />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}