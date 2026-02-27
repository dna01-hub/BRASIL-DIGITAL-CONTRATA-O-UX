import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { StepViability } from './components/StepViability';
import { StepPlans } from './components/StepPlans';
import { StepAnalysis } from './components/StepAnalysis';
import { StepData } from './components/StepData';
import { StepReview } from './components/StepReview';
import { SuccessScreen } from './components/SuccessScreen';
import { ShieldCheck, Wifi } from 'lucide-react';

const App = () => {
  const [orderComplete, setOrderComplete] = useState(false);

  if (orderComplete) {
    return <SuccessScreen onReset={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-36 lg:pb-12 font-sans text-slate-900 selection:bg-brand-500 selection:text-white">

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-900 shadow-lg backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 shadow-md">
                  <Wifi className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tight text-white leading-none">Brasil</span>
                  <span className="text-[9px] font-bold tracking-[0.2em] text-brand-400 leading-none mt-0.5">DIGITAL</span>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-300">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-400" />
                <span>Ambiente Seguro</span>
             </div>
             <div className="flex items-center gap-1.5 text-xs font-medium text-white/90 bg-white/10 px-2.5 py-1.5 rounded-full border border-white/10">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-500"></span>
                </span>
                Vendas Online
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="mb-5 text-center md:text-left">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
            Contrate sua Internet
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Siga os passos abaixo para ter a melhor conexão na sua casa.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-12 xl:gap-8">

          {/* Form Column */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-4">
            <StepViability />
            <StepPlans />
            <StepAnalysis />
            <StepData />
            <StepReview onComplete={() => setOrderComplete(true)} />
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 xl:col-span-4">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
