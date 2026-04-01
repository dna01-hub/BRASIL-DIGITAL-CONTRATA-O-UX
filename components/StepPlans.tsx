import React, { useState, useRef, useEffect } from 'react';
import { useOrder } from '../OrderContext';
import { Check, Star, CheckCircle2, Plus, Wifi, Zap, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { Plan, AppOption, AdditionalService } from '../types';

const plans: Plan[] = [
  // Vitrine
  { id: 1, name: 'MACETA PRO', speed: 500, price: 119.90, originalPrice: 159.90, features: ['Kaspersky', 'Ubook Go', '1 App PlayHub à escolha'], appsLimit: 1 },
  { id: 2, name: 'MACETA PLUS', speed: 700, price: 149.90, originalPrice: 199.90, features: ['Kaspersky', 'Ubook Go', 'Câmera BRD CAM inclusa'], appsLimit: 0, bestValue: true },
  { id: 3, name: 'MACETA PREMIUM', speed: 1000, price: 169.90, originalPrice: 219.90, features: ['Kaspersky', 'Ubook Go', 'Câmera BRD CAM inclusa'], appsLimit: 0 },
  // Promocionais
  { id: 4, name: 'PRO GLOBOPLAY', speed: 500, price: 129.90, originalPrice: 159.90, features: ['Kaspersky', 'Ubook Go', 'Globoplay (com anúncios)'], appsLimit: 0 },
  { id: 5, name: 'PRO BASIC CAM', speed: 500, price: 139.90, originalPrice: 159.90, features: ['Kaspersky', 'Ubook Go', 'BRD CAM inclusa'], appsLimit: 0 },
  { id: 6, name: 'PLUS GLOBOPLAY', speed: 700, price: 159.90, originalPrice: 199.90, features: ['Kaspersky', 'Ubook Go', 'Globoplay (com anúncios)'], appsLimit: 0 },
  { id: 7, name: 'PREMIUM GLOBOPLAY', speed: 1000, price: 179.90, originalPrice: 219.90, features: ['Kaspersky', 'Ubook Go', 'Globoplay (com anúncios)'], appsLimit: 0 },
];

export const availableApps: AppOption[] = [
    { id: 'looke', name: 'Looke', logo: 'https://ui-avatars.com/api/?name=Looke&background=random' },
    { id: 'leitura360', name: 'Leitura 360', logo: 'https://ui-avatars.com/api/?name=Leitura+360&background=random' },
    { id: 'indie', name: 'Indie', logo: 'https://ui-avatars.com/api/?name=Indie&background=random' },
    { id: 'leitura', name: 'Leitura', logo: 'https://ui-avatars.com/api/?name=Leitura&background=random' },
    { id: 'curtaon', name: 'Curta!On', logo: 'https://ui-avatars.com/api/?name=Curta!On&background=random' },
    { id: 'fluid', name: 'Fluid', logo: 'https://ui-avatars.com/api/?name=Fluid&background=random' },
    { id: 'kiddlepass', name: 'Kiddle Pass', logo: 'https://ui-avatars.com/api/?name=Kiddle+Pass&background=random' },
    { id: 'j', name: 'J', logo: 'https://ui-avatars.com/api/?name=J&background=random' },
    { id: 'socialcomics', name: 'Social Comics', logo: 'https://ui-avatars.com/api/?name=Social+Comics&background=random' },
    { id: 'pequenosleitores', name: 'Pequenos Leitores', logo: 'https://ui-avatars.com/api/?name=Pequenos+Leitores&background=random' },
    { id: 'hubvantagens', name: 'HUB Vantagens', logo: 'https://ui-avatars.com/api/?name=HUB+Vantagens&background=random' },
    { id: 'pkplus', name: 'PK+', logo: 'https://ui-avatars.com/api/?name=PK%2B&background=random' },
    { id: 'exitlag', name: 'Exitlag', logo: 'https://ui-avatars.com/api/?name=Exitlag&background=random' },
    { id: 'zen', name: 'Zen', logo: 'https://ui-avatars.com/api/?name=Zen&background=random' },
];

export const services: AdditionalService[] = [
    { id: 'disney', name: 'Disney+', price: 29.90, description: 'SVA Premium' },
    { id: 'globoplay', name: 'Globoplay', price: 22.90, description: 'SVA Premium' },
    { id: 'telecine', name: 'Telecine', price: 14.90, description: 'SVA Premium' },
    { id: 'deezer', name: 'Deezer', price: 9.90, description: 'SVA Premium' },
    { id: 'hbomax', name: 'HBO Max', price: 29.90, description: 'SVA Premium' },
    { id: 'premiere', name: 'Premiere', price: 59.90, description: 'SVA Premium' },
    { id: 'hotgo', name: 'HotGo', price: 29.90, description: 'SVA Premium' },
    { id: 'queimadiaria', name: 'Queima Diária', price: 29.90, description: 'SVA Premium' },
    { id: 'smartcontent', name: 'Smart Content', price: 29.90, description: 'SVA Premium' },
    { id: 'mesh', name: 'Rede Mesh', price: 29.90, description: 'Adicional de Infra (Combo)' },
    { id: 'brdcam', name: 'BRD Cam adicional', price: 29.90, description: 'Adicional de Infra (Combo)' },
    ...availableApps.map(app => ({
        id: `${app.id}_sva`,
        name: app.name,
        price: 10.00,
        description: 'App Playhub Adicional'
    }))
];

export const StepPlans = () => {
  const { state, dispatch } = useOrder();
  const [showErrors, setShowErrors] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const plansCarouselRef = useRef<HTMLDivElement>(null);
  const servicesCarouselRef = useRef<HTMLDivElement>(null);
  const appsCarouselRef = useRef<HTMLDivElement>(null);
  
  const scrollCarousel = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
      if (ref.current) {
          const scrollAmount = ref.current.clientWidth;
          ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
  };

  const isActive = state.step === 2;
  const isCompleted = state.step > 2;
  const isDisabled = state.step < 2;

  const handleSelectPlan = (plan: Plan) => {
      dispatch({ type: 'SET_PLAN', payload: plan });
      // Auto-scroll to options after a short delay to allow render
      setTimeout(() => {
          optionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
  };

  const handleContinue = () => {
      if(state.selectedPlan && state.selectedApps.length === state.selectedPlan.appsLimit) {
        setShowErrors(false);
        dispatch({ type: 'SET_STEP', payload: 3 });
      } else {
        setShowErrors(true);
      }
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl border bg-white transition-all duration-500 ${isActive ? 'ring-4 ring-brand-500/20 shadow-2xl border-brand-500 mt-6' : 'border-slate-200 shadow-sm mt-4'}`}>
      
      {/* Header */}
      <div 
        className={`flex items-center justify-between p-4 sm:p-6 md:p-8 ${!isDisabled ? 'cursor-pointer hover:bg-slate-50' : 'opacity-50 cursor-not-allowed'}`}
        onClick={() => isCompleted && dispatch({type: 'SET_STEP', payload: 2})}
      >
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          <div className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl text-base font-black transition-all duration-300 ${isCompleted ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : isActive ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30' : 'bg-slate-100 text-slate-400'}`}>
            {isCompleted ? <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" /> : '2'}
          </div>
          <div className="min-w-0">
             <h3 className={`text-lg sm:text-xl font-black tracking-tight truncate ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>Escolha seu Plano</h3>
             {isCompleted && state.selectedPlan && (
                 <p className="text-sm font-medium text-slate-500 mt-1 truncate">{state.selectedPlan.name} - {state.selectedPlan.speed} MEGA por R$ {state.selectedPlan.price.toFixed(2)}</p>
             )}
          </div>
        </div>
        {isCompleted && <button className="text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors ml-2 shrink-0">Alterar</button>}
      </div>

      {/* Content */}
      <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isActive ? 'max-h-[15000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-slate-100 bg-slate-50/50 p-6 md:p-8">
            
            {/* Plan Cards */}
            <div className="relative group/carousel">
                <button 
                    onClick={(e) => { e.stopPropagation(); scrollCarousel(plansCarouselRef, 'left'); }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg text-slate-600 hover:text-brand-600 hover:border-brand-300 transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
                >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); scrollCarousel(plansCarouselRef, 'right'); }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg text-slate-600 hover:text-brand-600 hover:border-brand-300 transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
                >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <div ref={plansCarouselRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-4 hide-scrollbar w-full scroll-smooth">
                {plans.map((plan) => {
                    const selected = state.selectedPlan?.id === plan.id;
                    return (
                    <div 
                        key={plan.id}
                        onClick={() => handleSelectPlan(plan)}
                        className={`w-full shrink-0 md:w-[calc(50%-12px)] snap-start group relative flex h-full flex-col cursor-pointer overflow-hidden rounded-3xl border-2 bg-white p-6 sm:p-8 transition-all duration-300 hover:shadow-xl ${selected ? 'border-brand-500 shadow-brand-500/20 scale-[1.02]' : 'border-slate-200 hover:border-brand-300 hover:-translate-y-1'}`}
                    >
                    {plan.bestValue && (
                        <div className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1.5 text-xs font-black tracking-wider text-white shadow-sm">
                            MAIS VENDIDO
                        </div>
                    )}
                    
                    <div className="mb-6">
                        <span className="text-sm font-black uppercase tracking-widest text-slate-400">{plan.name}</span>
                        <div className="mt-2 flex items-baseline gap-1">
                            <span className="text-6xl font-black tracking-tighter text-slate-900">{plan.speed}</span>
                            <span className="text-xl font-bold text-slate-500">MEGA</span>
                        </div>
                    </div>

                    <div className="mb-8 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                         <div className="flex items-center gap-2 text-sm font-medium text-slate-400 line-through">
                             De R$ {plan.originalPrice.toFixed(2).replace('.', ',')}
                         </div>
                         <div className="flex items-baseline gap-1 text-brand-600">
                             <span className="text-lg font-bold">R$</span>
                             <span className="text-4xl font-black tracking-tight">{plan.price.toFixed(2).replace('.', ',')}</span>
                             <span className="text-sm font-bold text-slate-500">/mês</span>
                         </div>
                    </div>

                    <div className="flex-1 space-y-4 border-t border-slate-100 pt-6">
                        {plan.features.map(f => (
                            <div key={f} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
                                    <Check className="h-3 w-3" />
                                </div>
                                {f}
                            </div>
                        ))}
                    </div>
                    
                    <div className={`mt-8 flex h-14 w-full items-center justify-center rounded-2xl text-lg font-black transition-all duration-300 ${selected ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30' : 'bg-slate-100 text-slate-500 group-hover:bg-brand-100 group-hover:text-brand-700'}`}>
                        {selected ? 'Selecionado' : 'Quero este'}
                    </div>
                </div>
                );
            })}
                </div>
            </div>

            {/* Apps & Services Selection - Shows below when plan selected */}
            {state.selectedPlan && (
                <div ref={optionsRef} className="mt-10 animate-fade-in space-y-8">
                    
                    {/* APPS */}
                    {state.selectedPlan.appsLimit > 0 && (
                        <div className={`rounded-3xl border p-6 md:p-8 transition-colors ${showErrors && state.selectedApps.length !== state.selectedPlan.appsLimit ? 'border-red-500 bg-red-50' : 'border-indigo-100 bg-indigo-50/50'}`}>
                            <h4 className="mb-2 text-xl font-black text-slate-900 tracking-tight">1. Personalize seus Apps</h4>
                            <p className="mb-8 text-slate-600 font-medium">
                                Seu plano inclui <strong className="text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">{state.selectedPlan.appsLimit} aplicativo{state.selectedPlan.appsLimit > 1 ? 's' : ''} Playhub</strong>. Selecione o{state.selectedPlan.appsLimit > 1 ? 's' : ''} que você mais gosta:
                            </p>

                            <div className="relative group/carousel">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); scrollCarousel(appsCarouselRef, 'left'); }}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
                                >
                                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); scrollCarousel(appsCarouselRef, 'right'); }}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
                                >
                                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                                </button>
                                <div ref={appsCarouselRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-5 pb-4 hide-scrollbar w-full scroll-smooth">
                                    {availableApps.map(app => {
                                        const isSelected = state.selectedApps.some(a => a.id === app.id);
                                        const limitReached = state.selectedApps.length >= (state.selectedPlan?.appsLimit || 0);
                                        const disabled = !isSelected && limitReached;

                                        return (
                                            <button
                                                key={app.id}
                                                onClick={() => {
                                                    if (!disabled) {
                                                        dispatch({type: 'TOGGLE_APP', payload: app});
                                                        if (showErrors) setShowErrors(false);
                                                    }
                                                }}
                                                className={`w-[calc(50%-8px)] shrink-0 md:w-[calc(25%-12px)] lg:w-[calc(16.666%-16px)] snap-start relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 p-5 transition-all duration-300 ${
                                                    isSelected 
                                                    ? 'border-indigo-500 bg-white shadow-lg shadow-indigo-500/20 scale-105' 
                                                    : disabled 
                                                        ? 'cursor-not-allowed border-slate-200 bg-slate-100 opacity-50' 
                                                        : 'cursor-pointer border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md hover:-translate-y-1'
                                                }`}
                                            >
                                                {isSelected && <div className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center shadow-sm"><Check className="w-4 h-4 text-white"/></div>}
                                                <div className="h-14 w-14 rounded-full overflow-hidden bg-slate-100 shadow-sm">
                                                    <img src={app.logo} alt={app.name} className="h-full w-full object-cover" onError={(e) => {
                                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${app.name}&background=random`
                                                    }} />
                                                </div>
                                                <span className="text-sm font-bold text-slate-700 text-center leading-tight">{app.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            
                            {showErrors && state.selectedApps.length !== state.selectedPlan.appsLimit && (
                                <div className="mt-6 flex items-center gap-3 rounded-xl bg-red-100 p-4 text-red-600">
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-200 font-bold">!</div>
                                    <p className="text-sm font-bold">
                                        Por favor, selecione {state.selectedPlan.appsLimit} aplicativo{state.selectedPlan.appsLimit > 1 ? 's' : ''} Playhub para continuar.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* SERVICES */}
                    <div className="rounded-3xl border border-violet-100 bg-violet-50/50 p-6 md:p-8">
                         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div>
                                <h4 className="text-xl font-black text-slate-900 tracking-tight">2. Serviços Adicionais (Opcional)</h4>
                                <p className="text-slate-600 font-medium mt-1">Turbine sua conexão com serviços exclusivos.</p>
                            </div>
                            <span className="px-4 py-1.5 rounded-full bg-violet-200 text-violet-800 text-xs font-black uppercase tracking-wider self-start md:self-auto">Recomendado</span>
                         </div>

                         <div className="relative group/carousel">
                            <button 
                                onClick={(e) => { e.stopPropagation(); scrollCarousel(servicesCarouselRef, 'left'); }}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg text-slate-600 hover:text-violet-600 hover:border-violet-300 transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
                            >
                                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); scrollCarousel(servicesCarouselRef, 'right'); }}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg text-slate-600 hover:text-violet-600 hover:border-violet-300 transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
                            >
                                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                            </button>
                            <div ref={servicesCarouselRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-5 pb-4 hide-scrollbar w-full scroll-smooth">
                                {services.map(svc => {
                                    const isAdded = state.additionalServices.some(s => s.id === svc.id);
                                    return (
                                        <div 
                                            key={svc.id}
                                            onClick={() => dispatch({type: 'TOGGLE_SERVICE', payload: svc})}
                                            className={`w-full shrink-0 md:w-[calc(50%-10px)] snap-start cursor-pointer rounded-2xl border-2 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl ${isAdded ? 'border-violet-500 bg-white shadow-lg shadow-violet-500/10 scale-[1.02]' : 'border-violet-100 bg-white/60 hover:border-violet-300 hover:-translate-y-1'}`}
                                        >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 rounded-xl bg-violet-100">
                                                {svc.id === 'mesh' ? <Wifi className="h-6 w-6 text-violet-600"/> : svc.description.includes('SVA') ? <Star className="h-6 w-6 text-violet-600"/> : <Shield className="h-6 w-6 text-violet-600"/>}
                                            </div>
                                            <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${isAdded ? 'bg-violet-600 border-violet-600' : 'border-slate-300'}`}>
                                                {isAdded && <Check className="h-4 w-4 text-white"/>}
                                            </div>
                                        </div>
                                        <h5 className="font-bold text-slate-900 text-lg">{svc.name}</h5>
                                        <p className="text-sm text-slate-500 mt-2 mb-4 font-medium leading-relaxed">{svc.description}</p>
                                        <p className="text-lg font-black text-violet-700">+ R$ {svc.price.toFixed(2).replace('.', ',')}<span className="text-sm text-slate-400 font-bold">/mês</span></p>
                                    </div>
                                )
                            })}
                            </div>
                         </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <button 
                             onClick={handleContinue}
                             className="group flex items-center justify-center gap-3 rounded-2xl bg-brand-600 px-10 py-5 text-lg font-black tracking-wide text-white shadow-xl shadow-brand-500/30 transition-all hover:bg-brand-700 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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
