import React, { useState } from 'react';
import { useOrder } from '../OrderContext';
import { api } from '../services/api';
import { Loader2, ShieldCheck, CheckCircle2, UserCircle2 } from 'lucide-react';

export const StepAnalysis = () => {
  const { state, dispatch } = useOrder();
  const [doc, setDoc] = useState('');
  const [loading, setLoading] = useState(false);

  const isActive = state.step === 3;
  const isCompleted = state.step > 3;
  const isDisabled = state.step < 3;

  const handleAnalyze = async () => {
      setLoading(true);
      try {
        const phone = state.customer?.celular || '';
        
        // Use the phone collected in Step 1
        console.log(`Analyzing with CPF: ${doc} and Phone: ${phone}`);
        const result = await api.analyzeCustomer('F', doc, phone);
        
        if (result.status === 'APROVADO') {
            dispatch({
                type: 'SET_ANALYSIS',
                payload: { status: result.valor_ativacao > 0 ? 'APPROVED_WITH_TAX' : 'APPROVED', tax: result.valor_ativacao }
            });
            dispatch({
                type: 'SET_CUSTOMER',
                payload: {
                    nome: result.nome_cliente || '',
                    cpfCnpj: doc,
                    // Phone is already in state, preserving it
                }
            });
            dispatch({ type: 'SET_STEP', payload: 4 });
        } else {
            alert('Não foi possível aprovar automaticamente. Entre em contato.');
        }
      } catch (e) {
        alert('Erro na análise. Verifique o console.');
      } finally {
        setLoading(false);
      }
  };

  const formatDoc = (val: string) => {
    return val.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border bg-white transition-all duration-500 ${isActive ? 'ring-2 ring-brand-500/20 shadow-lg border-brand-400' : 'border-slate-200 shadow-sm'}`}>

        <div
            className={`flex items-center justify-between p-4 sm:p-5 ${!isDisabled ? 'cursor-pointer hover:bg-slate-50/70' : 'opacity-50 cursor-not-allowed'}`}
            onClick={() => isCompleted && dispatch({type: 'SET_STEP', payload: 3})}
        >
            <div className="flex items-center gap-3 md:gap-4">
                <div className={`flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${isCompleted ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' : isActive ? 'bg-brand-600 text-white shadow-md shadow-brand-500/30' : 'bg-slate-100 text-slate-400'}`}>
                    {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : '3'}
                </div>
                <div>
                    <h3 className={`text-sm sm:text-base font-semibold tracking-tight ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>Identificação</h3>
                    {isCompleted && <p className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-0.5"><ShieldCheck className="h-3 w-3"/> Crédito Aprovado</p>}
                </div>
            </div>
            {isCompleted && <button className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors shrink-0 ml-2">Alterar</button>}
        </div>

        <div className={`transition-all duration-500 ease-in-out ${isActive ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="border-t border-slate-100 bg-slate-50/30 p-4 sm:p-5 md:p-6">
                <div className="mb-5 flex items-start gap-3 rounded-xl bg-indigo-50 p-4 text-indigo-900 border border-indigo-100/80">
                    <div className="bg-white p-1.5 rounded-lg shadow-sm shrink-0 mt-0.5">
                        <UserCircle2 className="h-4 w-4 text-indigo-600" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">Precisamos apenas do seu CPF para validar as ofertas disponíveis e garantir a segurança da contratação.</p>
                </div>

                <div className="max-w-sm">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">CPF</label>
                    <input
                        type="text"
                        value={doc}
                        onChange={(e) => setDoc(formatDoc(e.target.value))}
                        className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 p-3.5 font-medium outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 placeholder-slate-400 text-base tracking-widest"
                        placeholder="000.000.000-00"
                    />
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:justify-end">
                    <button
                        onClick={handleAnalyze}
                        disabled={loading || doc.length < 14}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-8 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-700 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Verificar Ofertas'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};