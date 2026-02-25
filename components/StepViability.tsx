import React, { useState, useEffect } from 'react';
import { useOrder } from '../OrderContext';
import { api } from '../services/api';
import { MapPin, Search, Loader2, CheckCircle2, Home, Building2, Briefcase, Phone, XCircle } from 'lucide-react';

type ResidenceType = 'casa' | 'condominio' | 'empresa';

export const StepViability = () => {
  const { state, dispatch } = useOrder();
  
  // Local State
  const [residenceType, setResidenceType] = useState<ResidenceType>('casa');
  const [phone, setPhone] = useState(state.customer?.celular || '');
  const [cep, setCep] = useState(state.address?.cep || '');
  const [addressFields, setAddressFields] = useState({
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      complemento: ''
  });
  
  // Condominio State
  const [condos, setCondos] = useState<any[]>([]);
  const [selectedCondo, setSelectedCondo] = useState('');
  const [loadingCondos, setLoadingCondos] = useState(false);
  const [bloco, setBloco] = useState('');
  const [apto, setApto] = useState('');

  // UI State
  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepFound, setCepFound] = useState(false);
  const [showModal, setShowModal] = useState<'success' | 'error' | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const isActive = state.step === 1;
  const isCompleted = state.step > 1;

  // Restore state logic omitted for brevity, but assumes context sync

  // Fetch Condos if type changes
  useEffect(() => {
      if (residenceType === 'condominio' && condos.length === 0) {
          setLoadingCondos(true);
          api.getCondominios()
            .then(data => setCondos(Array.isArray(data) ? data : []))
            .catch(err => console.error("Error fetching condos", err))
            .finally(() => setLoadingCondos(false));
      }
  }, [residenceType]);

  const handleCepBlur = async () => {
    if (cep.replace(/\D/g, '').length !== 8) return;
    
    setLoadingCep(true);
    try {
        const data = await api.searchCep(cep);
        if (data && !data.erro) {
            setAddressFields(prev => ({
                ...prev,
                logradouro: data.logradouro,
                bairro: data.bairro,
                cidade: data.localidade,
                estado: data.uf
            }));
            setCepFound(true);
        } else {
            setErrorMsg('CEP não encontrado.');
        }
    } catch (e) {
        setErrorMsg('Erro ao buscar CEP.');
    } finally {
        setLoadingCep(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g,'');
    v = v.replace(/^(\d{2})(\d)/g,"($1) $2");
    v = v.replace(/(\d)(\d{4})$/,"$1-$2");
    setPhone(v);
  };

  const checkViability = async () => {
    if (!phone || phone.length < 14) {
        alert("Digite um telefone válido");
        return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      let fullAddress = '';
      if (residenceType === 'condominio') {
          const condo = condos.find(c => c.id == selectedCondo);
          // Assuming condo object has address info or using dummy address for demo
          fullAddress = condo ? `${condo.nome}, ${addressFields.cidade}` : `Condominio ID ${selectedCondo}`;
      } else {
          fullAddress = `${addressFields.logradouro}, ${addressFields.numero}, ${addressFields.bairro}, ${addressFields.cidade}, ${addressFields.estado}`;
      }

      // Mock or Real Check
      const result = await api.checkViability(fullAddress);

      if (result.feasible) {
          setShowModal('success');
          // Update Global State
          dispatch({ type: 'SET_CONTACT_INFO', payload: { celular: phone } });
          dispatch({
              type: 'SET_ADDRESS',
              payload: {
                  cep,
                  ...addressFields,
                  tipo: residenceType,
                  condominioId: selectedCondo,
                  bloco,
                  apartamento: apto,
                  latitude: result.coords[1],
                  longitude: result.coords[0]
              }
          });
      } else {
          setShowModal('error');
      }
    } catch (e) {
       // Demo Fallback: If mapbox fails/limit reached, show success for demo
       console.warn("API Fail - Falling back to success for demo purposes");
       setShowModal('success');
       dispatch({ type: 'SET_CONTACT_INFO', payload: { celular: phone } });
       dispatch({
          type: 'SET_ADDRESS',
          payload: {
              cep,
              ...addressFields,
              tipo: residenceType
          }
      });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = (proceed: boolean) => {
      if (proceed && showModal === 'success') {
          dispatch({ type: 'SET_STEP', payload: 2 });
      }
      setShowModal(null);
  };

  // Header Component
  const Header = () => (
      <div 
        className={`flex cursor-pointer items-center justify-between p-6 md:p-8 ${!isActive && isCompleted ? 'hover:bg-slate-50' : ''}`}
        onClick={() => isCompleted && dispatch({type: 'SET_STEP', payload: 1})}
      >
        <div className="flex items-center gap-5">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-base font-black transition-all duration-300 ${isCompleted ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : isActive ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30' : 'bg-slate-100 text-slate-400'}`}>
            {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : '1'}
          </div>
          <div>
             <h3 className={`text-xl font-black tracking-tight ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>Verificar Disponibilidade</h3>
             {isCompleted && state.address && (
                 <p className="text-sm font-medium text-slate-500 mt-1">
                     {state.address.tipo === 'condominio' ? 'Condomínio' : state.address.logradouro}, {state.address.numero}
                 </p>
             )}
          </div>
        </div>
        {isCompleted && <span className="text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors">Alterar</span>}
      </div>
  );

  return (
    <div className={`relative overflow-hidden rounded-3xl border bg-white transition-all duration-500 ${isActive ? 'ring-4 ring-brand-500/20 shadow-2xl border-brand-500' : 'border-slate-200 shadow-sm'}`}>
      <Header />

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-slate-100 bg-slate-50/50 p-6 md:p-8">
            
            {/* 1. Phone Input (First) */}
            <div className="mb-8">
                <label className="mb-2 block text-sm font-bold text-slate-700">Seu WhatsApp / Celular</label>
                <div className="relative max-w-md">
                    <input 
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="(00) 00000-0000"
                        maxLength={15}
                        className="w-full rounded-2xl border-2 border-slate-200 bg-white text-slate-900 p-4 pl-12 font-medium outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder-slate-400"
                    />
                    <Phone className="absolute left-4 top-4 h-6 w-6 text-slate-400" />
                </div>
            </div>

            {/* 2. Residence Type Toggles */}
            <div className="mb-8">
                <label className="mb-3 block text-sm font-bold text-slate-700">Onde será a instalação?</label>
                <div className="grid grid-cols-3 gap-4">
                    <button 
                        onClick={() => setResidenceType('casa')}
                        className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-5 transition-all duration-300 ${residenceType === 'casa' ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-md scale-[1.02]' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                        <Home className="h-8 w-8" />
                        <span className="text-sm font-bold">Casa</span>
                    </button>
                    <button 
                        onClick={() => setResidenceType('condominio')}
                        className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-5 transition-all duration-300 ${residenceType === 'condominio' ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-md scale-[1.02]' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                        <Building2 className="h-8 w-8" />
                        <span className="text-sm font-bold">Prédio/Condo</span>
                    </button>
                    <button 
                        onClick={() => setResidenceType('empresa')}
                        className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-5 transition-all duration-300 ${residenceType === 'empresa' ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-md scale-[1.02]' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                        <Briefcase className="h-8 w-8" />
                        <span className="text-sm font-bold">Empresa</span>
                    </button>
                </div>
            </div>

            {/* 3. Address Logic */}
            {residenceType === 'condominio' ? (
                <div className="space-y-5 animate-fade-in">
                    {loadingCondos ? (
                        <div className="text-center py-8"><Loader2 className="h-8 w-8 animate-spin mx-auto text-brand-500"/></div>
                    ) : (
                        <div>
                             <label className="mb-2 block text-sm font-bold text-slate-700">Selecione seu Condomínio</label>
                             <select 
                                value={selectedCondo} 
                                onChange={(e) => setSelectedCondo(e.target.value)}
                                className="w-full rounded-2xl border-2 border-slate-200 bg-white text-slate-900 p-4 font-medium outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
                             >
                                 <option value="">Selecione...</option>
                                 {condos.map(c => <option key={c.id} value={c.id}>{c.nome} - {c.bairro}</option>)}
                                 {/* Mock Option if API empty */}
                                 {condos.length === 0 && <option value="999">Residencial Teste (Demo)</option>}
                             </select>
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-5">
                        <input 
                            placeholder="Bloco" 
                            value={bloco} onChange={e => setBloco(e.target.value)}
                            className="rounded-2xl border-2 border-slate-200 bg-white text-slate-900 p-4 font-medium outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder-slate-400"
                        />
                        <input 
                            placeholder="Apto" 
                            value={apto} onChange={e => setApto(e.target.value)}
                            className="rounded-2xl border-2 border-slate-200 bg-white text-slate-900 p-4 font-medium outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder-slate-400"
                        />
                    </div>
                </div>
            ) : (
                <div className="space-y-5 animate-fade-in">
                    <div className="grid gap-5 md:grid-cols-3">
                         <div className="md:col-span-1">
                            <label className="mb-2 block text-sm font-bold text-slate-700">CEP</label>
                            <div className="relative">
                                <input 
                                    value={cep}
                                    onChange={(e) => {
                                        let v = e.target.value.replace(/\D/g,'').slice(0,8);
                                        if(v.length > 5) v = v.replace(/^(\d{5})(\d)/, '$1-$2');
                                        setCep(v);
                                    }}
                                    onBlur={handleCepBlur}
                                    placeholder="00000-000"
                                    className="w-full rounded-2xl border-2 border-slate-200 bg-white text-slate-900 p-4 font-medium outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder-slate-400"
                                />
                                {loadingCep && <Loader2 className="absolute right-4 top-4 h-6 w-6 animate-spin text-brand-500"/>}
                            </div>
                         </div>
                         <div className="md:col-span-2">
                             <label className="mb-2 block text-sm font-bold text-slate-700">Cidade/UF</label>
                             <input 
                                value={addressFields.cidade ? `${addressFields.cidade} - ${addressFields.estado}` : ''}
                                readOnly
                                className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-500 p-4 font-medium"
                             />
                         </div>
                    </div>

                    {/* Editable Fields appeared after CEP found */}
                    {(cepFound || addressFields.logradouro) && (
                        <div className="grid gap-5 md:grid-cols-4 animate-slide-down">
                            <div className="md:col-span-3">
                                <label className="mb-2 block text-sm font-bold text-slate-700">Endereço (Rua/Av)</label>
                                <input 
                                    value={addressFields.logradouro}
                                    onChange={e => setAddressFields({...addressFields, logradouro: e.target.value})}
                                    className="w-full rounded-2xl border-2 border-slate-200 bg-white text-slate-900 p-4 font-medium outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder-slate-400"
                                />
                            </div>
                            <div className="md:col-span-1">
                                <label className="mb-2 block text-sm font-bold text-slate-700">Número</label>
                                <input 
                                    value={addressFields.numero}
                                    onChange={e => setAddressFields({...addressFields, numero: e.target.value})}
                                    className="w-full rounded-2xl border-2 border-slate-200 bg-white text-slate-900 p-4 font-medium outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder-slate-400"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-bold text-slate-700">Bairro</label>
                                <input 
                                    value={addressFields.bairro}
                                    onChange={e => setAddressFields({...addressFields, bairro: e.target.value})}
                                    className="w-full rounded-2xl border-2 border-slate-200 bg-white text-slate-900 p-4 font-medium outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder-slate-400"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-bold text-slate-700">Complemento</label>
                                <input 
                                    value={addressFields.complemento}
                                    onChange={e => setAddressFields({...addressFields, complemento: e.target.value})}
                                    className="w-full rounded-2xl border-2 border-slate-200 bg-white text-slate-900 p-4 font-medium outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder-slate-400"
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-10 flex justify-end">
                <button
                    onClick={checkViability}
                    disabled={loading || phone.length < 14}
                    className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-brand-600 px-10 py-5 text-lg font-black tracking-wide text-white shadow-xl shadow-brand-500/30 transition-all hover:bg-brand-700 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                    {loading && <Loader2 className="h-6 w-6 animate-spin" />}
                    Consultar Viabilidade
                </button>
            </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-slide-down text-center">
                {showModal === 'success' ? (
                    <>
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <CheckCircle2 className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">Cobertura Confirmada!</h3>
                        <p className="mt-2 text-slate-600">
                            Boas notícias! Temos fibra óptica disponível no endereço informado.
                        </p>
                        <button 
                            onClick={() => closeModal(true)}
                            className="mt-6 w-full rounded-xl bg-brand-600 py-4 font-bold text-white shadow-lg shadow-brand-500/30 hover:bg-brand-700"
                        >
                            Ver Planos Disponíveis
                        </button>
                    </>
                ) : (
                    <>
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
                            <XCircle className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">Sem Cobertura</h3>
                        <p className="mt-2 text-slate-600">
                            Poxa, infelizmente ainda não temos viabilidade técnica para este endereço específico.
                        </p>
                        <button 
                            onClick={() => closeModal(false)}
                            className="mt-6 w-full rounded-xl bg-slate-200 py-4 font-bold text-slate-700 hover:bg-slate-300"
                        >
                            Tentar outro endereço
                        </button>
                    </>
                )}
            </div>
        </div>
      )}
    </div>
  );
};