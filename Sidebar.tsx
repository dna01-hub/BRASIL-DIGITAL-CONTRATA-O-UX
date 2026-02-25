import React, { useState } from 'react';
import { useOrder } from '../OrderContext';
import { ShoppingCart, Check, ShieldCheck, Wifi, MapPin, ChevronUp, ChevronDown, Zap, Plus, X } from 'lucide-react';
import { AdditionalService } from '../types';

// Duplicated from StepPlans to ensure availability in Modal. In a real app, this would be in a constants file.
const SERVICES_OPTIONS: AdditionalService[] = [
    { id: 'mesh', name: 'Ponto Ultra Mesh', price: 19.90, description: 'Amplie o sinal do Wi-Fi para a casa toda.' },
    { id: 'ipfixo', name: 'IP Fixo Gamer', price: 29.90, description: 'Menor latência e estabilidade para jogos.' },
    { id: 'suporte', name: 'Suporte Premium', price: 9.90, description: 'Atendimento prioritário 24h.' },
];

export const Sidebar = () => {
  const { state, dispatch } = useOrder();
  const { selectedPlan, additionalServices, activationTax } = state;
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);

  if (state.step === 1 && !selectedPlan) return null;

  const planPrice = selectedPlan?.price || 0;
  const servicesPrice = additionalServices.reduce((acc, curr) => acc + curr.price, 0);
  const total = planPrice + servicesPrice;

  // Content Component
  const SummaryContent = () => (
      <div className="p-6">
            {/* Address */}
            {state.address && (
                <div className="mb-6 rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-sm text-slate-600 shadow-sm">
                    <div className="flex items-start gap-3">
                        <div className="rounded-full bg-white p-2 shadow-sm border border-slate-100 mt-0.5">
                            <MapPin className="h-4 w-4 shrink-0 text-brand-500" />
                        </div>
                        <div>
                            <span className="font-bold block text-slate-800 mb-0.5">
                                {state.address.tipo === 'condominio' ? 'Condomínio' : 'Instalação em:'}
                            </span>
                            <span className="text-slate-500 leading-tight block">
                                {state.address.logradouro}, {state.address.numero} <br/>
                                {state.address.bairro}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {!selectedPlan ? (
            <div className="py-12 text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 border border-slate-100">
                    <ShoppingCart className="h-6 w-6 text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-400">
                    Selecione um plano para ver os valores
                </p>
            </div>
            ) : (
            <div className="space-y-6">
                {/* Plan Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">Plano Escolhido</p>
                        <p className="text-2xl font-black text-slate-900 tracking-tight">{selectedPlan.name}</p>
                    </div>
                    <div className="text-right">
                         <p className="text-3xl font-black text-slate-900 tracking-tighter">{selectedPlan.speed} <span className="text-sm font-bold text-slate-500 tracking-normal">MEGA</span></p>
                    </div>
                </div>

                <div className="h-px bg-slate-100"></div>

                {/* Benefits */}
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm font-medium text-slate-600">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                            <Wifi className="h-3.5 w-3.5" />
                        </div>
                        Wi-Fi 6 de Última Geração
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-slate-600">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                            <ShieldCheck className="h-3.5 w-3.5" />
                        </div>
                        Proteção Online Inclusa
                    </li>
                </ul>
                
                {/* App Icons Grid */}
                {state.selectedApps.length > 0 && (
                    <div className="pt-2">
                        <p className="mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Apps Inclusos</p>
                        <div className="flex flex-wrap gap-2">
                            {state.selectedApps.map(app => (
                                <div key={app.id} className="h-10 w-10 rounded-full bg-white shadow-sm overflow-hidden border border-slate-100 transition-transform hover:scale-110" title={app.name}>
                                    <img src={app.logo} alt={app.name} className="h-full w-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="h-px bg-slate-100"></div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-slate-600">
                        <span className="font-medium">Mensalidade</span>
                        <span className="font-bold text-slate-900">R$ {planPrice.toFixed(2).replace('.', ',')}</span>
                    </div>
                    {additionalServices.map(svc => (
                    <div key={svc.id} className="flex justify-between text-slate-600">
                        <span className="font-medium">{svc.name}</span>
                        <span className="font-bold text-indigo-600">+ R$ {svc.price.toFixed(2).replace('.', ',')}</span>
                    </div>
                    ))}
                    {state.analysisStatus === 'APPROVED_WITH_TAX' && (
                        <div className="flex justify-between text-amber-600 font-medium">
                            <span>Taxa de Ativação</span>
                            <span className="font-bold">R$ {activationTax.toFixed(2).replace('.', ',')}</span>
                        </div>
                    )}
                </div>

                {/* Total */}
                <div className="rounded-2xl bg-slate-900 p-5 text-center shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-transparent"></div>
                    <div className="relative z-10">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Mensal</p>
                        <p className="text-4xl font-black text-white tracking-tight">
                            R$ {total.toFixed(2).replace('.', ',')}
                        </p>
                    </div>
                </div>
            </div>
            )}
      </div>
  );

  return (
    <>
        {/* Desktop Sidebar */}
        <div className="hidden lg:block animate-fade-in">
            <div className="sticky top-28 space-y-6">
                
                {/* SVAs Button - Visible if viability confirmed */}
                {state.viabilityConfirmed && state.step > 1 && (
                    <button 
                        onClick={() => setShowServicesModal(true)}
                        className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-5 text-left shadow-xl shadow-indigo-500/20 transition-all hover:shadow-indigo-500/40 hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-white flex items-center gap-2 text-lg">
                                    <Zap className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                                    Turbinar Plano
                                </h3>
                                <p className="text-sm text-indigo-100 mt-1 font-medium">Adicione Mesh, IP Fixo e mais</p>
                            </div>
                            <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-sm transition-transform group-hover:rotate-90">
                                <Plus className="h-5 w-5 text-white" />
                            </div>
                        </div>
                    </button>
                )}

                <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="border-b border-slate-100 bg-slate-50/80 p-6 backdrop-blur-sm">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                        <ShoppingCart className="h-5 w-5 text-brand-600" />
                        Resumo do Pedido
                        </h3>
                    </div>
                    <SummaryContent />
                </div>
            </div>
        </div>

        {/* Services Modal */}
        {showServicesModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
                <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl animate-slide-down relative">
                    <button 
                        onClick={() => setShowServicesModal(false)}
                        className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Serviços Adicionais</h3>
                    <p className="text-sm text-slate-500 mb-6">Personalize sua experiência com serviços extras.</p>

                    <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                        {SERVICES_OPTIONS.map(svc => {
                             const isAdded = state.additionalServices.some(s => s.id === svc.id);
                             return (
                                <div 
                                    key={svc.id}
                                    onClick={() => dispatch({type: 'TOGGLE_SERVICE', payload: svc})}
                                    className={`cursor-pointer rounded-xl border-2 p-4 transition-all flex items-center justify-between ${isAdded ? 'border-purple-500 bg-purple-50' : 'border-slate-100 hover:border-purple-200'}`}
                                >
                                    <div>
                                        <h5 className="font-bold text-slate-900">{svc.name}</h5>
                                        <p className="text-xs text-slate-500">{svc.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-purple-700">+ R$ {svc.price.toFixed(2).replace('.', ',')}</p>
                                        <div className={`mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border ${isAdded ? 'bg-purple-600 border-purple-600' : 'border-slate-300'}`}>
                                            {isAdded && <Check className="h-3 w-3 text-white"/>}
                                        </div>
                                    </div>
                                </div>
                             )
                        })}
                    </div>

                    <button 
                        onClick={() => setShowServicesModal(false)}
                        className="mt-6 w-full rounded-xl bg-brand-600 py-3 font-bold text-white hover:bg-brand-700"
                    >
                        Concluir
                    </button>
                </div>
            </div>
        )}

        {/* Mobile Bottom Sheet Summary */}
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
            {/* Toggle Button / Mini Header */}
            <div 
                onClick={() => setMobileExpanded(!mobileExpanded)}
                className="bg-white border-t border-slate-200 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] cursor-pointer"
            >
                <div className="px-6 py-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold">Total Mensal</p>
                        <p className="text-xl font-black text-brand-600">
                            R$ {total.toFixed(2).replace('.', ',')}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-brand-600">
                        {mobileExpanded ? 'Ocultar Resumo' : 'Ver Resumo'}
                        {mobileExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
                    </div>
                </div>
            </div>
            
            {/* Expanded Content */}
            {mobileExpanded && (
                <div className="bg-white border-t border-slate-100 max-h-[60vh] overflow-y-auto pb-6">
                    <SummaryContent />
                    {/* Add Services Button Mobile */}
                    <div className="p-6 pt-0">
                         <button 
                            onClick={() => setShowServicesModal(true)}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-100 py-3 font-bold text-purple-700"
                        >
                            <Plus className="h-4 w-4" /> Adicionar Serviços
                        </button>
                    </div>
                </div>
            )}
        </div>
    </>
  );
};