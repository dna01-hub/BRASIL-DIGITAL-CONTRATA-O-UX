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
    <div className={`relative overflow-hidden rounded-3xl border bg-white transition-all duration-500 ${isActive ? 'ring-4 ring-brand-500/20 shadow-2xl border-brand-500 mt-6' : 'border-slate-200 shadow-sm mt-4'}`}>
        
        <div 
            className={`flex items-center justify-between p-6 md:p-8 ${!isDisabled ? 'cursor-pointer hover:bg-slate-50' : 'opacity-50 cursor-not-allowed'}`}
            onClick={() => isCompleted && dispatch({type: 'SET_STEP', payload: 3})}
        >
            <div className="flex items-center gap-5">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-base font-black transition-all duration-300 ${isCompleted ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : isActive ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30' : 'bg-slate-100 text-slate-400'}`}>
                    {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : '3'}
                </div>
                <div>
                    <h3 className={`text-xl font-black tracking-tight ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>Identificação</h3>
                    {isCompleted && <p className="text-sm text-emerald-600 font-bold flex items-center gap-1.5 mt-1"><ShieldCheck className="h-4 w-4"/> Crédito Aprovado</p>}
                </div>
            </div>
            {isCompleted && <button className="text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors">Alterar</button>}
        </div>

        <div className={`transition-all duration-500 ease-in-out ${isActive ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="border-t border-slate-100 bg-slate-50/50 p-6 md:p-8">
                <div className="mb-8 flex items-center gap-4 rounded-2xl bg-indigo-50 p-5 text-indigo-900 border border-indigo-100">
                    <div className="bg-white p-2 rounded-xl shadow-sm">
                        <UserCircle2 className="h-6 w-6 shrink-0 text-indigo-600" />
                    </div>
                    <p className="text-sm font-medium leading-relaxed">Precisamos apenas do seu CPF para validar as ofertas disponíveis e garantir a segurança da contratação.</p>
                </div>

                <div className="max-w-md">
                    <label className="mb-2 block text-sm font-bold text-slate-700">CPF</label>
                    <input 
                        type="text" 
                        value={doc}
                        onChange={(e) => setDoc(formatDoc(e.target.value))}
                        className="w-full rounded-2xl border-2 border-slate-200 bg-white text-slate-900 p-4 font-medium outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder-slate-400 text-lg tracking-wide"
                        placeholder="000.000.000-00"
                    />
                </div>

                <div className="mt-10 flex justify-end">
                    <button
                        onClick={handleAnalyze}
                        disabled={loading || doc.length < 14}
                        className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-brand-600 px-10 py-5 text-lg font-black tracking-wide text-white shadow-xl shadow-brand-500/30 transition-all hover:bg-brand-700 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                        {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Verificar Ofertas'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};