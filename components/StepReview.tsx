import React, { useState } from 'react';
import { useOrder } from '../OrderContext';
import { api } from '../services/api';
import { Lock, FileText, CheckCircle2, MapPin, Calendar, CreditCard, User, Loader2, Wifi, Info, Phone, Mail } from 'lucide-react';

interface StepReviewProps {
    onComplete: () => void;
}

export const StepReview = ({ onComplete }: StepReviewProps) => {
  const { state } = useOrder();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isActive = state.step === 5;
  if (state.step < 5) return null;

  const handleSubmit = async () => {
      setIsSubmitting(true);
      try {
          await api.submitOrder({
              customer: state.customer,
              address: state.address,
              plan: state.selectedPlan,
              services: state.additionalServices,
              payment: { method: state.paymentMethod, dueDate: state.dueDate },
              scheduling: state.scheduling,
              filesReceived: false // Changed to false as files are removed
          });
          onComplete(); // Triggers the success screen in App.tsx
      } catch (e) {
          alert("Houve um erro ao processar seu pedido. Tente novamente.");
      } finally {
          setIsSubmitting(false);
      }
  };

  const planTotal = state.selectedPlan?.price || 0;
  const servicesTotal = state.additionalServices.reduce((acc, curr) => acc + curr.price, 0);
  const finalTotal = planTotal + servicesTotal;

  // Helper to format date
  const formatDate = (dateString?: string) => {
      if (!dateString) return '-';
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
  };

  return (
    <div className="mt-6 animate-slide-down">
        <div className="rounded-3xl border-2 border-brand-500 bg-white shadow-2xl shadow-brand-900/10 overflow-hidden">
            
            <div className="bg-brand-900 p-5 sm:p-6 md:p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-transparent"></div>
                <div className="relative z-10">
                    <h3 className="flex items-center gap-3 text-2xl font-black tracking-tight">
                        <FileText className="h-7 w-7 text-brand-400" /> Resumo do Contrato
                    </h3>
                    <p className="mt-2 text-slate-300 font-medium">Verifique todos os detalhes da sua contratação abaixo.</p>
                </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-10">
                
                {/* 1. Dados do Cliente e Endereço */}
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest flex items-center gap-3">
                             <User className="h-5 w-5 text-slate-300" /> Dados do Titular
                        </h4>
                        <div className="bg-slate-50 p-5 rounded-3xl border-2 border-slate-100 text-sm h-full">
                            <dl className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                                <div className="sm:col-span-2">
                                    <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Nome Completo</dt>
                                    <dd className="font-black text-slate-900 text-lg">{state.customer?.nome}</dd>
                                </div>
                                
                                <div>
                                    <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">CPF</dt>
                                    <dd className="font-bold text-slate-900">{state.customer?.cpfCnpj}</dd>
                                </div>

                                <div>
                                    <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Data Nasc.</dt>
                                    <dd className="font-bold text-slate-900">{formatDate(state.customer?.dataNascimento)}</dd>
                                </div>

                                <div className="sm:col-span-2 pt-4 border-t border-slate-200/60 mt-2">
                                    <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Canais de Contato</dt>
                                    <dd className="space-y-2.5">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-brand-50 p-1.5 rounded-lg">
                                                <Phone className="h-4 w-4 text-brand-600" />
                                            </div>
                                            <span className="font-bold text-slate-900">{state.customer?.celular}</span>
                                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">Principal</span>
                                        </div>
                                        {state.customer?.telefone && (
                                            <div className="flex items-center gap-3">
                                                <div className="bg-slate-100 p-1.5 rounded-lg">
                                                    <Phone className="h-4 w-4 text-slate-400" />
                                                </div>
                                                <span className="font-bold text-slate-600">{state.customer?.telefone}</span>
                                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Secundário</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3">
                                            <div className="bg-slate-100 p-1.5 rounded-lg">
                                                <Mail className="h-4 w-4 text-slate-400" />
                                            </div>
                                            <span className="font-bold text-slate-600 truncate">{state.customer?.email}</span>
                                        </div>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest flex items-center gap-3">
                             <MapPin className="h-5 w-5 text-slate-300" /> Endereço de Instalação
                        </h4>
                        <div className="bg-slate-50 p-5 rounded-3xl border-2 border-slate-100 text-sm h-full flex flex-col justify-center">
                            <p className="font-black text-slate-900 text-xl mb-2 tracking-tight">
                                {state.address?.logradouro}, {state.address?.numero}
                            </p>
                            {state.address?.complemento && (
                                <p className="text-slate-700 font-bold mb-2">Compl: {state.address.complemento}</p>
                            )}
                            <p className="text-slate-600 font-medium">{state.address?.bairro}</p>
                            <p className="text-slate-600 font-medium mb-4">{state.address?.cidade} - {state.address?.estado}</p>
                            <p className="text-sm text-slate-500 font-mono font-medium">CEP: {state.address?.cep}</p>
                            
                            {state.address?.tipo === 'condominio' && (
                                <div className="mt-6 p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-sm text-indigo-700 font-bold flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 shrink-0"/> Instalação em Condomínio
                                    {state.address?.bloco && <span>| Bloco {state.address.bloco}</span>}
                                    {state.address?.apartamento && <span>| Apto {state.address.apartamento}</span>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="h-px bg-slate-200/60"></div>

                {/* 2. Produtos Contratados */}
                <div>
                    <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-5 flex items-center gap-3">
                         <Wifi className="h-5 w-5 text-slate-300" /> Produtos Selecionados
                    </h4>
                    
                    <div className="rounded-2xl sm:rounded-3xl border-2 border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left min-w-[320px]">
                            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs">
                                <tr>
                                    <th className="p-3 sm:p-5">Produto / Serviço</th>
                                    <th className="p-3 sm:p-5 text-right whitespace-nowrap">Valor Mensal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {/* Plano Base */}
                                <tr className="bg-white">
                                    <td className="p-3 sm:p-5">
                                        <p className="font-black text-slate-900 text-base sm:text-xl tracking-tight">{state.selectedPlan?.name} {state.selectedPlan?.speed} MEGA</p>
                                        <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2 flex flex-wrap items-center gap-2 sm:gap-3 font-medium">
                                            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500"/> Wi-Fi 6 Incluso</span>
                                            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500"/> Instalação Grátis</span>
                                        </p>
                                    </td>
                                    <td className="p-3 sm:p-5 text-right font-black text-slate-900 text-base sm:text-xl tracking-tight whitespace-nowrap">R$ {state.selectedPlan?.price.toFixed(2).replace('.', ',')}</td>
                                </tr>

                                {/* Adicionais */}
                                {state.additionalServices.map(svc => (
                                    <tr key={svc.id} className="bg-white">
                                        <td className="p-3 sm:p-5">
                                            <p className="font-bold text-slate-800 text-sm sm:text-base">{svc.name}</p>
                                            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">{svc.description}</p>
                                        </td>
                                        <td className="p-3 sm:p-5 text-right font-bold text-indigo-600 text-sm sm:text-base whitespace-nowrap">+ R$ {svc.price.toFixed(2).replace('.', ',')}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-slate-900 text-white">
                                <tr>
                                    <td className="p-4 sm:p-6 font-bold uppercase text-xs sm:text-sm tracking-widest text-slate-400">Total Mensal</td>
                                    <td className="p-4 sm:p-6 text-right font-black text-2xl sm:text-3xl tracking-tighter whitespace-nowrap">R$ {finalTotal.toFixed(2).replace('.', ',')}</td>
                                </tr>
                            </tfoot>
                        </table>
                        </div>
                    </div>
                </div>

                {/* 3. Financeiro e Agendamento */}
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                     <div className="space-y-4">
                        <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest flex items-center gap-3">
                             <CreditCard className="h-5 w-5 text-slate-300" /> Detalhes Financeiros
                        </h4>
                        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 text-sm space-y-4">
                             <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                 <span className="text-slate-600 font-medium">Forma de Pagamento</span>
                                 <span className="font-black text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg">
                                     {state.paymentMethod === 'credit_card' ? 'Cartão de Crédito' : 'Boleto Digital'}
                                 </span>
                             </div>
                             <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                 <span className="text-slate-600 font-medium">Dia de Vencimento</span>
                                 <span className="font-black text-brand-600 text-base">Todo dia {state.dueDate}</span>
                             </div>
                             <div className="flex gap-3 items-start text-sm text-amber-800 bg-amber-50 p-4 rounded-2xl border border-amber-100 font-medium">
                                <Info className="h-5 w-5 shrink-0 mt-0.5" />
                                <p><strong className="font-black">Atenção ao Pro-rata:</strong> Sua primeira fatura será proporcional aos dias utilizados até o fechamento.</p>
                             </div>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest flex items-center gap-3">
                             <Calendar className="h-5 w-5 text-slate-300" /> Agendamento
                        </h4>
                        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 text-sm flex flex-col justify-between h-full">
                             <div>
                                <p className="font-black text-slate-900 text-xl mb-2 capitalize tracking-tight">
                                    {state.scheduling?.date ? new Date(state.scheduling.date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }) : 'A definir'}
                                </p>
                                <p className="text-slate-600 font-bold flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                                    Período Comercial (08h às 18h)
                                </p>
                             </div>
                             <p className="mt-6 text-sm text-slate-400 font-medium border-t border-slate-100 pt-4">
                                 * A equipe técnica entrará em contato via WhatsApp para confirmar a faixa de horário exata.
                             </p>
                        </div>
                     </div>
                </div>

                <div className="h-px bg-slate-200/60"></div>

                {/* Terms */}
                <div className="rounded-3xl border-2 border-slate-200 p-5 bg-slate-50 transition-colors hover:border-brand-300">
                    <label className="flex items-start gap-4 cursor-pointer">
                        <div className="relative flex items-center pt-1">
                            <input 
                                type="checkbox" 
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                                className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-slate-300 bg-white transition-all checked:border-brand-600 checked:bg-brand-600"
                            />
                            <CheckCircle2 className="pointer-events-none absolute left-1/2 top-1/2 mt-0.5 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                        </div>
                        <span className="text-sm text-slate-600 font-medium select-none leading-relaxed">
                            Li e concordo com o <a href="#" className="font-bold text-brand-600 hover:underline">Contrato de Prestação de Serviços</a>, 
                            <a href="#" className="font-bold text-brand-600 hover:underline"> Termos de Uso</a> e 
                            <a href="#" className="font-bold text-brand-600 hover:underline"> Política de Privacidade</a>. 
                            Estou ciente da fidelidade de 12 meses e das condições da oferta.
                        </span>
                    </label>
                </div>

                {/* Final Button */}
                <button
                    onClick={handleSubmit}
                    disabled={!acceptedTerms || isSubmitting}
                    className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-600 py-6 text-xl font-black tracking-wide text-white shadow-xl shadow-brand-500/30 transition-all hover:bg-brand-700 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-7 w-7 animate-spin"/> Finalizando Contratação...
                        </>
                    ) : (
                        <>
                            <Lock className="h-7 w-7" /> CONTRATAR AGORA
                        </>
                    )}
                </button>
            </div>
        </div>
    </div>
  );
};