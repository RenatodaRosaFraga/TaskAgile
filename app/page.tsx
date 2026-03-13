import Link from 'next/link';
import React from 'react';

// --- COMPONENTES AUXILIARES (SVG Padrão W3C) ---
const Icons = {
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
  ),
  Project: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M11 3v18" /><path d="M3 11h18" /></svg>
  ),
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 antialiased">

      {/* 1. NAVEGAÇÃO FIXA */}
      <nav className="fixed top-0 z-[60] w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white font-black text-xl">TA</div>
            <span className="text-xl font-bold tracking-tighter text-slate-950">TaskAgile</span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            {['Produto', 'Preços', 'Recursos', 'Demo'].map((item) => (
              <a key={item} href="#" className="text-sm font-semibold text-slate-500 transition-colors hover:text-slate-950">{item}</a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/login"
              className="text-sm font-bold text-slate-900 hover:opacity-70 transition-opacity"
            >
              Login
            </Link>
            <Link
              href="/login"
              className="hidden rounded-full bg-slate-950 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 md:block shadow-lg shadow-slate-950/20 active:scale-95 text-center"
            >
              Começar Agora
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-52 lg:pb-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

            {/* Lado Esquerdo: Conteúdo */}
            <div className="flex flex-col space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ring-1 ring-inset ring-slate-200">
                  Novidade: TaskAgile v2.0
                </span>
              </div>

              <h1 className="text-5xl font-black leading-[1.05] tracking-tighter text-slate-950 md:text-7xl">
                TaskAgile. Organização <br />
                <span className="text-slate-400">Sem Esforço para <br /> Equipes Ágeis.</span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-slate-500 md:text-xl antialiased">
                A plataforma de gestão de projetos projetada para simplificar fluxos de trabalho,
                aumentar a visibilidade e acelerar a entrega da sua equipe. Neutra. Rápida. Eficiente.
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <button className="w-full rounded-2xl bg-slate-950 px-8 py-5 text-base font-black text-white transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto shadow-2xl shadow-slate-950/30">
                  <Link
                    href="/login"
                    className="hidden rounded-full bg-slate-950 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 md:block shadow-lg shadow-slate-950/20 active:scale-95 text-center"
                  >
                    Começar Agora - É gratis
                  </Link>
                </button>
                <button className="group flex items-center gap-2 px-8 py-5 text-base font-bold text-slate-900">
                  Ver Demonstração
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>

            {/* Lado Direito: Mockup Realista */}
            <div className="relative">
              <div className="relative rounded-2xl border border-slate-200 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] overflow-hidden transition-transform hover:scale-[1.01] duration-500">

                {/* Barra do Navegador */}
                <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-[#FF5F56] shadow-inner" />
                    <div className="h-3 w-3 rounded-full bg-[#FFBD2E] shadow-inner" />
                    <div className="h-3 w-3 rounded-full bg-[#27C93F] shadow-inner" />
                  </div>
                  <div className="mx-auto h-5 w-full max-w-[240px] rounded-md bg-white border border-slate-200 flex items-center justify-center">
                    <span className="text-[10px] text-slate-300 font-medium">app.taskagile.com</span>
                  </div>
                </div>

                {/* Imagem do Dashboard */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
                    alt="TaskAgile Dashboard"
                    className="h-full w-full object-cover opacity-90 grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>

              {/* Elementos Decorativos de Fundo */}
              <div className="absolute -z-10 -top-16 -right-16 h-64 w-64 rounded-full bg-slate-200/40 blur-[80px]" />
              <div className="absolute -z-10 -bottom-16 -left-16 h-64 w-64 rounded-full bg-slate-100/60 blur-[80px]" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION: BENEFÍCIOS */}
      <section className="bg-white py-24 sm:py-32 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-20 text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Por que escolher o TaskAgile?</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { title: 'Gestão Intuitiva', desc: 'Interface limpa para que o foco seja apenas no trabalho, não na ferramenta.' },
              { title: 'Colaboração Real', desc: 'Atualizações em tempo real para toda a equipe, onde quer que estejam.' },
              { title: 'Visibilidade Clara', desc: 'Relatórios automáticos e visão de progresso sem complicações.' }
            ].map((feature, i) => (
              <div key={i} className="group relative rounded-3xl border border-slate-100 bg-slate-50/40 p-10 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/40">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-sm group-hover:bg-slate-950 group-hover:text-white transition-all duration-300">
                  <Icons.Project />
                </div>
                <h3 className="text-xl font-bold text-slate-950">{feature.title}</h3>
                <p className="mt-4 text-slate-500 leading-relaxed antialiased">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION: PRICING */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-16">
          <p className="text-4xl font-black tracking-tight text-slate-950">Planos Simples e Transparentes</p>
        </div>

        <div className="mx-auto max-w-5xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Plano Starter */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 flex flex-col shadow-sm">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Starter</span>
            <div className="mt-4 text-4xl font-black">$0</div>
            <p className="mt-4 text-sm text-slate-500 flex-1 leading-relaxed">Projetos básicos para pequenos times independentes.</p>
            <button className="mt-8 w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50 transition-all">Começar Grátis</button>
          </div>

          {/* Plano PRO (Destaque) */}
          <div className="relative rounded-3xl border-2 border-slate-950 bg-slate-950 p-10 flex flex-col shadow-2xl scale-105 z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full ring-4 ring-slate-50">Popular</div>
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Pro</span>
            <div className="mt-4 text-5xl font-black text-white">$29</div>
            <p className="mt-4 text-sm text-slate-300 flex-1 leading-relaxed">Gestão avançada, projetos ilimitados e automações para times.</p>
            <button className="mt-8 w-full rounded-xl bg-white py-4 text-sm font-black text-slate-950 hover:bg-slate-100 transition-all shadow-lg">Começar Agora</button>
          </div>

          {/* Plano Enterprise */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 flex flex-col shadow-sm">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Enterprise</span>
            <div className="mt-4 text-4xl font-black text-slate-900">Custom</div>
            <p className="mt-4 text-sm text-slate-500 flex-1 leading-relaxed">Segurança avançada e suporte dedicado para grandes empresas.</p>
            <button className="mt-8 w-full rounded-xl bg-slate-950 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-all">Falar com Vendas</button>
          </div>
        </div>
      </section>

      {/* 5. FOOTER SIMPLES */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} TaskAgile. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}