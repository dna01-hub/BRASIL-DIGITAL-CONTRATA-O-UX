import React, { useState } from 'react';
import { useOrder } from '../OrderContext';
import { Calendar, CreditCard, User, CheckCircle2, ArrowRight, CalendarDays, AlertCircle, Briefcase, ChevronLeft, ChevronRight, Clock, Check } from 'lucide-react';

export const StepData = () => {
  const { state, dispatch } = useOrder();
  const [formData, setFormData] = useState({
      nome: state.customer?.nome || '',
      email: state.customer?.email || '',
      telefoneSecundario: state.customer?.telefone || '',
  });
  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState<string>(''); // Local state for time selection styling
  
  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const isActive = state.step === 4;
  const isCompleted = state.step > 4;
  const isDisabled = state.step < 4;

  const handlePhoneMask = (val: string): string => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits.length ? `(${digits}` : '';
    if (digits.length <= 6) return `(${digits.slice(0,2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`;
    return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
  };

  const handleNext = () => {
     // Save form data to context before moving
     dispatch({
         type: 'SET_CUSTOMER',
         payload: {
             nome: formData.nome,
             email: formData.email,
             telefone: formData.telefoneSecundario,
         }
     });
     dispatch({
         type: 'SET_SCHEDULING',
         payload: { 
             date: date, 
             timeId: selectedTime === 'Manhã' ? '1' : '2', 
             timeLabel: selectedTime || 'Comercial' 
         } 
     });
     dispatch({ type: 'SET_STEP', payload: 5 });
  };

  // Calendar Helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentMonth.setMonth(currentMonth.getMonth() + offset));
    setCurrentMonth(new Date(newDate));
  };

  const handleDateSelect = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    // Format YYYY-MM-DD considering timezone offset
    const year = selected.getFullYear();
    const month = String(selected.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    setDate(`${year}-${month}-${dayStr}`);
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const daysArray = [];
    const today = new Date();
    today.setHours(0,0,0,0);

    // Empty slots for previous month
    for (let i = 0; i < firstDay; i++) {
        daysArray.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    // Days
    for (let i = 1; i <= days; i++) {
        const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const isSelected = date === dateStr;
        const isPast = currentDate < today;

        daysArray.push(
            <button
                key={i}
                onClick={() => !isPast && handleDateSelect(i)}
                disabled={isPast}
                className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-xs sm:text-sm font-medium transition-all
                    ${isSelected ? 'bg-brand-600 text-white shadow-md' : ''}
                    ${!isSelected && !isPast ? 'hover:bg-brand-100 text-slate-700 hover:text-brand-700' : ''}
                    ${isPast ? 'text-slate-300 cursor-not-allowed' : 'cursor-pointer'}
                    ${!isSelected && currentDate.getTime() === today.getTime() ? 'border border-brand-500 text-brand-600 font-bold' : ''}
                `}
            >
                {i}
            </button>
        );
    }
    return daysArray;
  };

  const dueDates = ['05', '10', '15', '20', '25'];

  const isFormValid =
      formData.nome &&
      formData.email &&
      formData.telefoneSecundario &&
      date &&
      selectedTime &&
      state.paymentMethod;

  return (
    <div className={`relative overflow-hidden rounded-2xl border bg-white transition-all duration-500 ${isActive ? 'ring-2 ring-brand-500/20 shadow-lg border-brand-400' : 'border-slate-200 shadow-sm'}`}>

         <div
            className={`flex items-center justify-between p-4 sm:p-5 ${!isDisabled ? 'cursor-pointer hover:bg-slate-50/70' : 'opacity-50 cursor-not-allowed'}`}
            onClick={() => isCompleted && dispatch({type: 'SET_STEP', payload: 4})}
         >
            <div className="flex items-center gap-3 md:gap-4">
                <div className={`flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${isCompleted ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' : isActive ? 'bg-brand-600 text-white shadow-md shadow-brand-500/30' : 'bg-slate-100 text-slate-400'}`}>
                    {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : '4'}
                </div>
                <div>
                    <h3 className={`text-sm sm:text-base font-semibold tracking-tight ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>Dados para Contrato</h3>
                    {isCompleted && <p className="text-xs text-emerald-600 font-medium mt-0.5">Todos os dados preenchidos</p>}
                </div>
            </div>
            {isCompleted && <button className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors shrink-0 ml-2">Alterar</button>}
         </div>

         <div className={`transition-all duration-500 ease-in-out ${isActive ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="border-t border-slate-100 bg-slate-50/30 p-4 sm:p-5 md:p-6 space-y-7 sm:space-y-8">
                
                {/* Personal Data */}
                <section>
                    <h4 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase text-slate-400 tracking-widest">
                        <User className="h-5 w-5 text-slate-300" /> Dados Pessoais
                    </h4>
                    <div>
                        <label className="mb-2 block text-sm font-bold text-slate-700">Nome Completo</label>
                        <input
                            type="text"
                            value={formData.nome}
                            onChange={e => setFormData({...formData, nome: e.target.value})}
                            className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 p-3.5 font-medium outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 placeholder-slate-400"
                        />
                    </div>
                </section>

                 <div className="h-px bg-slate-200/60"></div>

                 {/* Contact */}
                <section>
                    <h4 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase text-slate-400 tracking-widest">
                        <Briefcase className="h-5 w-5 text-slate-300" /> Contato
                    </h4>
                    <div className="grid gap-5 md:grid-cols-2">
                         <div>
                            <label className="mb-2 block text-sm font-bold text-slate-700">Email</label>
                            <input 
                                type="email" 
                                value={formData.email} 
                                onChange={e => setFormData({...formData, email: e.target.value})} 
                                className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 p-3.5 font-medium outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 placeholder-slate-400" 
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-bold text-slate-700">Telefone Secundário</label>
                            <input 
                                type="tel" 
                                value={formData.telefoneSecundario} 
                                onChange={e => setFormData({...formData, telefoneSecundario: handlePhoneMask(e.target.value)})} 
                                className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 p-3.5 font-medium outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 placeholder-slate-400" 
                                placeholder="(00) 00000-0000"
                            />
                        </div>
                    </div>
                </section>

                <div className="h-px bg-slate-200/60"></div>

                {/* Custom Scheduling UI */}
                <section>
                    <h4 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase text-slate-400 tracking-widest">
                        <Calendar className="h-5 w-5 text-slate-300" /> Agendamento da Instalação
                    </h4>
                    
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        {/* Calendar Component */}
                        <div className="flex-1 md:max-w-sm md:mx-0">
                            <div className="bg-white border-2 border-slate-100 rounded-2xl sm:rounded-3xl shadow-sm p-4 sm:p-5">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4 sm:mb-6">
                                    <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                        <ChevronLeft className="h-5 w-5 text-slate-600" />
                                    </button>
                                    <h5 className="font-black text-slate-800 capitalize text-sm sm:text-base tracking-tight">
                                        {currentMonth.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                                    </h5>
                                    <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                        <ChevronRight className="h-5 w-5 text-slate-600" />
                                    </button>
                                </div>

                                {/* Weekdays */}
                                <div className="grid grid-cols-7 mb-2">
                                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                                        <div key={i} className="text-center text-xs font-black text-slate-400 py-1">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Days Grid */}
                                <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
                                    {renderCalendar()}
                                </div>
                            </div>
                        </div>

                        {/* Time Selection */}
                        <div className="flex-1 flex flex-col justify-center">
                            <label className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                <Clock className="h-5 w-5 text-brand-500" />
                                Preferência de Horário
                            </label>
                            
                            {!date ? (
                                <div className="flex items-center gap-3 p-5 bg-amber-50 rounded-2xl text-amber-800 text-sm border border-amber-100 font-medium">
                                    <AlertCircle className="h-5 w-5 shrink-0" />
                                    Selecione uma data no calendário primeiro.
                                </div>
                            ) : (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="text-sm text-slate-600 mb-3 font-medium">
                                        Agendando para: <span className="font-black text-brand-700 text-base ml-1">
                                            {new Date(date + 'T12:00:00').toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Manhã', 'Tarde'].map(time => (
                                            <button 
                                                key={time} 
                                                onClick={() => setSelectedTime(time)}
                                                className={`
                                                    relative flex items-center justify-center gap-2 rounded-2xl border-2 px-4 py-5 text-base font-black transition-all duration-300
                                                    ${selectedTime === time 
                                                        ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-md scale-[1.02]' 
                                                        : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:bg-slate-50'
                                                    }
                                                `}
                                            >
                                                {time}
                                                {selectedTime === time && (
                                                    <div className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-brand-500"></div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-3 font-medium">
                                        * A equipe confirmará o horário exato via WhatsApp.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <div className="h-px bg-slate-200/60"></div>

                {/* Payment & Due Date */}
                <section>
                    <h4 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase text-slate-400 tracking-widest">
                        <CreditCard className="h-5 w-5 text-slate-300" /> Pagamento
                    </h4>
                    
                    <div className="space-y-8">
                        {/* Due Date */}
                        <div>
                            <label className="mb-4 block text-sm font-bold text-slate-700 flex items-center gap-2">
                                <CalendarDays className="h-5 w-5 text-brand-500"/> 
                                Melhor dia para vencimento
                            </label>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {dueDates.map(day => (
                                    <button
                                        key={day}
                                        onClick={() => dispatch({ type: 'SET_DUE_DATE', payload: day })}
                                        className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl border-2 font-black text-base sm:text-lg transition-all duration-300 ${state.dueDate === day ? 'border-brand-600 bg-brand-600 text-white shadow-lg shadow-brand-500/30 scale-110' : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:bg-slate-50'}`}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-5 flex gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800 border border-amber-100 font-medium">
                                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                                <p>
                                    <strong className="font-black">Atenção:</strong> A escolha da data de vencimento pode gerar uma cobrança proporcional (pro-rata) referente aos dias utilizados até o primeiro fechamento da fatura.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div 
                                onClick={() => dispatch({type: 'SET_PAYMENT', payload: {method: 'credit_card', date: state.dueDate}})} 
                                className={`cursor-pointer rounded-xl border-2 p-4 sm:p-5 transition-all duration-200 ${state.paymentMethod === 'credit_card' ? 'border-brand-500 bg-brand-50 shadow-sm' : 'border-slate-200 bg-white hover:border-brand-300 hover:bg-slate-50'}`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-semibold text-slate-800 text-sm sm:text-base">Cartão de Crédito</span>
                                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${state.paymentMethod === 'credit_card' ? 'bg-brand-600 border-brand-600' : 'border-slate-300'}`}>
                                        {state.paymentMethod === 'credit_card' && <Check className="h-4 w-4 text-white"/>}
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">Pagamento recorrente, não ocupa o limite total do cartão.</p>
                            </div>
                            <div 
                                onClick={() => dispatch({type: 'SET_PAYMENT', payload: {method: 'boleto', date: state.dueDate}})} 
                                className={`cursor-pointer rounded-xl border-2 p-4 sm:p-5 transition-all duration-200 ${state.paymentMethod === 'boleto' ? 'border-brand-500 bg-brand-50 shadow-sm' : 'border-slate-200 bg-white hover:border-brand-300 hover:bg-slate-50'}`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-semibold text-slate-800 text-sm sm:text-base">Boleto Digital</span>
                                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${state.paymentMethod === 'boleto' ? 'bg-brand-600 border-brand-600' : 'border-slate-300'}`}>
                                        {state.paymentMethod === 'boleto' && <Check className="h-4 w-4 text-white"/>}
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">Receba por email todo mês. Pague via PIX ou código de barras.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Continue Button */}
                <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row sm:justify-end">
                    <button
                        onClick={handleNext}
                        disabled={!isFormValid}
                        className="group w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl bg-brand-600 px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-black tracking-wide text-white shadow-xl shadow-brand-500/30 transition-all hover:bg-brand-700 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                        Revisar Pedido <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>

            </div>
         </div>
    </div>
  );
};