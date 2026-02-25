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
    <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900 selection:bg-brand-500 selection:text-white">
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-900 shadow-xl backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
             {/* Logo Container */}
             <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg">
                  <Wifi className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight text-white leading-none">Brasil</span>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-brand-400 leading-none mt-1">DIGITAL</span>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-300">
                <ShieldCheck className="h-4 w-4 text-brand-400" />
                <span>Ambiente Seguro</span>
             </div>
             <div className="flex items-center gap-2 text-sm font-medium text-white/90 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                Vendas Online
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Contrate sua Internet
          </h1>
          <p className="mt-2 text-slate-500">
            Siga os passos abaixo para ter a melhor conexão na sua casa.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 xl:gap-12">
          
          {/* Form Column - Accordion Flow */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-6">
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