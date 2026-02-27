import React from 'react';
import { useOrder } from '../OrderContext';
import { Check, Star, CheckCircle2, Plus, Wifi, Zap, Shield } from 'lucide-react';
import { Plan, AppOption, AdditionalService } from '../types';

const plans: Plan[] = [
  { id: 286, name: 'START', speed: 500, price: 99.90, originalPrice: 119.90, features: ['Wi-Fi 6 Grátis', 'Instalação Grátis'], appsLimit: 1 },
  { id: 287, name: 'TURBO', speed: 700, price: 119.90, originalPrice: 149.90, features: ['Wi-Fi 6 Grátis', 'Instalação Grátis', 'IP Fixo'], appsLimit: 2, bestValue: true },
  { id: 288, name: 'GIGA', speed: 1000, price: 149.90, originalPrice: 199.90, features: ['Wi-Fi 6 Mesh', 'Prioridade Suporte', 'IP Público'], appsLimit: 3 },
];

const availableApps: AppOption[] = [
    { id: 'netflix', name: 'Netflix', domain: 'netflix.com', logo: 'https://logo.clearbit.com/netflix.com' },
    { id: 'hbomax', name: 'HBO Max', domain: 'hbomax.com', logo: 'https://logo.clearbit.com/hbomax.com' },
    { id: 'disney', name: 'Disney+', domain: 'disneyplus.com', logo: 'https://logo.clearbit.com/disneyplus.com' },
    { id: 'paramount', name: 'Paramount+', domain: 'paramountplus.com', logo: 'https://logo.clearbit.com/paramountplus.com' },
    { id: 'deezer', name: 'Deezer', domain: 'deezer.com', logo: 'https://logo.clearbit.com/deezer.com' },
    { id: 'spotify', name: 'Spotify', domain: 'spotify.com', logo: 'https://logo.clearbit.com/spotify.com' },
];

const services: AdditionalService[] = [
    { id: 'mesh', name: 'Ponto Ultra Mesh', price: 19.90, description: 'Amplie o sinal do Wi-Fi para a casa toda.' },
    { id: 'ipfixo', name: 'IP Fixo Gamer', price: 29.90, description: 'Menor latência e estabilidade para jogos.' },
    { id: 'suporte', name: 'Suporte Premium', price: 9.90, description: 'Atendimento prioritário 24h.' },
];

export const StepPlans = () => {
  const { state, dispatch } = useOrder();
  
  const isActive = state.step === 2;
  const isCompleted = state.step > 2;
  const isDisabled = state.step < 2;

  const handleSelectPlan = (plan: Plan) => {
      dispatch({ type: 'SET_PLAN', payload: plan });
  };

  const handleContinue = () => {
      if(state.selectedPlan && state.selectedApps.length === state.selectedPlan.appsLimit) {
        dispatch({ type: 'SET_STEP', payload: 3 });
      }
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border bg-white transition-all duration-500 ${isActive ? 'ring-2 ring-brand-500/20 shadow-lg border-brand-400' : 'border-slate-200 shadow-sm'}`}>

      {/* Header */}
      <div
        className={`flex items-center justify-between p-4 sm:p-5 ${!isDisabled ? 'cursor-pointer hover:bg-slate-50/70' : 'opacity-50 cursor-not-allowed'}`}
        onClick={() => isCompleted && dispatch({type: 'SET_STEP', payload: 2})}
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className={`flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${isCompleted ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' : isActive ? 'bg-brand-600 text-white shadow-md shadow-brand-500/30' : 'bg-slate-100 text-slate-400'}`}>
            {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : '2'}
          </div>
          <div>
             <h3 className={`text-sm sm:text-base font-semibold tracking-tight ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>Escolha seu Plano</h3>
             {isCompleted && state.selectedPlan && (
                 <p className="text-xs font-medium text-slate-400 mt-0.5">{state.selectedPlan.name} · {state.selectedPlan.speed} MEGA · R$ {state.selectedPlan.price.toFixed(2).replace('.', ',')}/mês</p>
             )}
          </div>
        </div>
        {isCompleted && <button className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors shrink-0 ml-2">Alterar</button>}
      </div>

      {/* Content */}
      <div className={`transition-all duration-700 ease-in-out ${isActive ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-slate-100 bg-slate-50/30 p-4 sm:p-5 md:p-6">
            
            {/* Plan Cards */}
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-1 lg:grid-cols-3">
            {plans.map((plan) => {
                const selected = state.selectedPlan?.id === plan.id;
                return (
                <div
                    key={plan.id}
                    onClick={() => handleSelectPlan(plan)}
                    className={`group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border-2 bg-white p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:shadow-xl ${selected ? 'border-brand-500 shadow-brand-500/20 scale-[1.01]' : 'border-slate-200 hover:border-brand-300 hover:-translate-y-1'}`}
                >
                    {plan.bestValue && (
                        <div className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-xs font-black tracking-wider text-white shadow-sm">
                            MAIS VENDIDO
                        </div>
                    )}

                    {/* Mobile: horizontal layout, Desktop: vertical */}
                    <div className="flex items-center justify-between gap-3 lg:block">
                        <div className="mb-0 lg:mb-3">
                            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">{plan.name}</span>
                            <div className="mt-1 flex items-baseline gap-1">
                                <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-slate-900">{plan.speed}</span>
                                <span className="text-sm sm:text-base font-semibold text-slate-500">MEGA</span>
                            </div>
                        </div>

                        <div className="shrink-0 lg:mb-4 rounded-lg sm:rounded-xl bg-slate-50 px-3 py-1.5 sm:p-3 border border-slate-100 text-right lg:text-left">
                            <div className="text-xs font-medium text-slate-400 line-through">
                                R$ {plan.originalPrice.toFixed(2).replace('.', ',')}
                            </div>
                            <div className="flex items-baseline justify-end lg:justify-start gap-0.5 text-brand-600">
                                <span className="text-xs font-semibold">R$</span>
                                <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">{plan.price.toFixed(2).replace('.', ',')}</span>
                                <span className="text-xs font-medium text-slate-500">/mês</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-4 border-t border-slate-100 pt-3 sm:pt-6">
                        {plan.features.map(f => (
                            <div key={f} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-slate-600">
                                <div className="flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
                                    <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                </div>
                                {f}
                            </div>
                        ))}
                        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-brand-600 bg-brand-50 p-2 sm:p-3 rounded-xl border border-brand-100">
                            <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-brand-600 text-brand-600 shrink-0" />
                            {plan.appsLimit} Apps Premium
                        </div>
                    </div>

                    <div className={`mt-4 sm:mt-6 flex h-11 sm:h-14 w-full items-center justify-center rounded-xl sm:rounded-2xl text-sm sm:text-lg font-black transition-all duration-300 ${selected ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30' : 'bg-slate-100 text-slate-500 group-hover:bg-brand-100 group-hover:text-brand-700'}`}>
                        {selected ? 'Selecionado' : 'Quero este'}
                    </div>
                </div>
                );
            })}
            </div>

            {/* Apps & Services Selection - Shows below when plan selected */}
            {state.selectedPlan && (
                <div className="mt-10 animate-fade-in space-y-8">
                    
                    {/* APPS */}
                    <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 sm:p-5 md:p-6">
                        <h4 className="mb-1 text-base font-semibold text-slate-900">1. Personalize seus Apps</h4>
                        <p className="mb-5 text-sm text-slate-500 font-medium">
                            Seu plano inclui <strong className="text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">{state.selectedPlan.appsLimit} aplicativos premium</strong>. Selecione os que você mais gosta:
                        </p>

                        <div className="grid grid-cols-3 gap-2 sm:gap-4 sm:grid-cols-3 md:grid-cols-6">
                            {availableApps.map(app => {
                                const isSelected = state.selectedApps.some(a => a.id === app.id);
                                const limitReached = state.selectedApps.length >= (state.selectedPlan?.appsLimit || 0);
                                const disabled = !isSelected && limitReached;

                                return (
                                    <button
                                        key={app.id}
                                        onClick={() => !disabled && dispatch({type: 'TOGGLE_APP', payload: app})}
                                        className={`relative flex flex-col items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 transition-all duration-300 ${
                                            isSelected
                                            ? 'border-indigo-500 bg-white shadow-lg shadow-indigo-500/20 scale-105'
                                            : disabled
                                                ? 'cursor-not-allowed border-slate-200 bg-slate-100 opacity-50'
                                                : 'cursor-pointer border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md hover:-translate-y-1'
                                        }`}
                                    >
                                        {isSelected && <div className="absolute -right-1.5 -top-1.5 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-indigo-500 flex items-center justify-center shadow-sm"><Check className="w-3 h-3 sm:w-4 sm:h-4 text-white"/></div>}
                                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden bg-slate-100 shadow-sm">
                                            <img src={app.logo} alt={app.name} className="h-full w-full object-cover" onError={(e) => {
                                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${app.name}&background=random`
                                            }} />
                                        </div>
                                        <span className="text-xs font-bold text-slate-700 text-center leading-tight">{app.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* SERVICES */}
                    <div className="rounded-2xl border border-violet-100 bg-violet-50/40 p-4 sm:p-5 md:p-6">
                         <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-2">
                            <div>
                                <h4 className="text-base font-semibold text-slate-900">2. Serviços Adicionais <span className="text-slate-400 font-normal">(Opcional)</span></h4>
                                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Turbine sua conexão com serviços exclusivos.</p>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold uppercase tracking-wider self-start sm:self-auto shrink-0">Recomendado</span>
                         </div>

                         <div className="grid gap-3 sm:gap-5 md:grid-cols-3">
                            {services.map(svc => {
                                const isAdded = state.additionalServices.some(s => s.id === svc.id);
                                return (
                                    <div
                                        key={svc.id}
                                        onClick={() => dispatch({type: 'TOGGLE_SERVICE', payload: svc})}
                                        className={`cursor-pointer rounded-2xl border-2 p-4 sm:p-6 transition-all duration-300 hover:shadow-xl ${isAdded ? 'border-violet-500 bg-white shadow-lg shadow-violet-500/10 scale-[1.01]' : 'border-violet-100 bg-white/60 hover:border-violet-300 hover:-translate-y-1'}`}
                                    >
                                        <div className="flex justify-between items-start mb-3 sm:mb-4">
                                            <div className="p-2 sm:p-3 rounded-xl bg-violet-100">
                                                {svc.id === 'mesh' ? <Wifi className="h-6 w-6 text-violet-600"/> : svc.id === 'ipfixo' ? <Zap className="h-6 w-6 text-violet-600"/> : <Shield className="h-6 w-6 text-violet-600"/>}
                                            </div>
                                            <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${isAdded ? 'bg-violet-600 border-violet-600' : 'border-slate-300'}`}>
                                                {isAdded && <Check className="h-4 w-4 text-white"/>}
                                            </div>
                                        </div>
                                        <h5 className="font-semibold text-slate-900 text-sm sm:text-base">{svc.name}</h5>
                                        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 mb-3 font-medium leading-relaxed">{svc.description}</p>
                                        <p className="text-base font-bold text-violet-700">+ R$ {svc.price.toFixed(2).replace('.', ',')}<span className="text-xs text-slate-400 font-medium">/mês</span></p>
                                    </div>
                                )
                            })}
                         </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-end pt-4 sm:pt-6">
                        <button
                             onClick={handleContinue}
                             disabled={state.selectedApps.length !== state.selectedPlan.appsLimit}
                             className="group w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl bg-brand-600 px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-black tracking-wide text-white shadow-xl shadow-brand-500/30 transition-all hover:bg-brand-700 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            Continuar para Análise
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
