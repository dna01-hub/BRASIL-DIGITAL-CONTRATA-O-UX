import React from 'react';
import { CheckCircle2, Home, Download, Share2 } from 'lucide-react';
import { useOrder } from '../OrderContext';

interface SuccessScreenProps {
    onReset: () => void;
}

export const SuccessScreen = ({ onReset }: SuccessScreenProps) => {
    const { state } = useOrder();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-down border-2 border-slate-100">
                <div className="p-8 md:p-12 text-center">
                    <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 shadow-inner rotate-3">
                        <CheckCircle2 className="h-12 w-12" />
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                        Pedido Confirmado!
                    </h1>
                    <p className="text-lg text-slate-600 mb-10 font-medium">
                        Parabéns, <strong className="text-slate-900">{state.customer?.nome.split(' ')[0]}</strong>! <br/>
                        Sua contratação da <strong className="text-brand-600">Brasil Digital</strong> foi realizada com sucesso.
                    </p>

                    <div className="bg-slate-50 rounded-3xl p-8 mb-10 text-left border-2 border-slate-100">
                        <h3 className="text-sm font-black uppercase text-slate-400 mb-6 tracking-widest">Próximos Passos</h3>
                        <ul className="space-y-6">
                            <li className="flex gap-5">
                                <div className="h-10 w-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0 font-black text-brand-600 text-lg shadow-sm">1</div>
                                <div>
                                    <p className="font-black text-slate-900 text-lg">Confirmação</p>
                                    <p className="text-sm text-slate-500 font-medium mt-1">Você receberá um email e um WhatsApp com os detalhes do seu contrato.</p>
                                </div>
                            </li>
                            <li className="flex gap-5">
                                <div className="h-10 w-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0 font-black text-brand-600 text-lg shadow-sm">2</div>
                                <div>
                                    <p className="font-black text-slate-900 text-lg">Agendamento</p>
                                    <p className="text-sm text-slate-500 font-medium mt-1">Nossa equipe técnica entrará em contato em breve para confirmar a visita no dia <strong className="text-slate-700">{state.scheduling?.date ? new Date(state.scheduling.date + 'T12:00:00').toLocaleDateString('pt-BR') : ''}</strong>.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <button className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all duration-300">
                            <Download className="h-5 w-5" /> Baixar Contrato
                        </button>
                        <button 
                            onClick={onReset}
                            className="flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-brand-600 text-white font-black tracking-wide shadow-xl shadow-brand-500/30 hover:bg-brand-700 hover:-translate-y-1 transition-all duration-300"
                        >
                            <Home className="h-5 w-5" /> Voltar ao Início
                        </button>
                    </div>
                </div>
                <div className="bg-slate-900 p-5 text-center text-sm font-bold tracking-widest text-slate-400 uppercase">
                    Protocolo: #BD-{Math.floor(Math.random() * 1000000)}
                </div>
            </div>
        </div>
    );
};