import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { OrderState, OrderAction } from './types';

const initialState: OrderState = {
  step: 1,
  viabilityConfirmed: false,
  address: null,
  selectedPlan: null,
  selectedApps: [],
  additionalServices: [],
  customer: null,
  files: {
    docFrente: null,
    docVerso: null,
    comprovanteResidencia: null
  },
  analysisStatus: null,
  activationTax: 0,
  scheduling: null,
  paymentMethod: null,
  dueDate: '10'
};

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'SET_ADDRESS':
      return { ...state, address: action.payload, viabilityConfirmed: true };
    case 'SET_CONTACT_INFO':
       return { 
           ...state, 
           customer: { 
               ...state.customer!, 
               celular: action.payload.celular,
               // Initialize other fields if null
               nome: state.customer?.nome || '',
               cpfCnpj: state.customer?.cpfCnpj || '',
               email: state.customer?.email || '',
               dataNascimento: state.customer?.dataNascimento || '',
               tipoPessoa: state.customer?.tipoPessoa || 'F'
           }
       };
    case 'SET_PLAN':
      return { ...state, selectedPlan: action.payload, selectedApps: [] }; // Reset apps when plan changes
    case 'TOGGLE_APP':
      const exists = state.selectedApps.find(a => a.id === action.payload.id);
      const limit = state.selectedPlan?.appsLimit || 0;
      
      if (!exists && state.selectedApps.length >= limit) return state; // Limit reached
      
      return {
        ...state,
        selectedApps: exists 
          ? state.selectedApps.filter(a => a.id !== action.payload.id)
          : [...state.selectedApps, action.payload]
      };
    case 'TOGGLE_SERVICE':
      const serviceExists = state.additionalServices.find(s => s.id === action.payload.id);
      return {
        ...state,
        additionalServices: serviceExists
          ? state.additionalServices.filter(s => s.id !== action.payload.id)
          : [...state.additionalServices, action.payload]
      };
    case 'SET_CUSTOMER':
      return { 
          ...state, 
          customer: { ...state.customer!, ...action.payload } 
      };
    case 'SET_FILES':
      return {
        ...state,
        files: { ...state.files, ...action.payload }
      };
    case 'SET_ANALYSIS':
      return { 
        ...state, 
        analysisStatus: action.payload.status, 
        activationTax: action.payload.tax 
      };
    case 'SET_SCHEDULING':
      return { ...state, scheduling: action.payload };
    case 'SET_PAYMENT':
      return { ...state, paymentMethod: action.payload.method, dueDate: action.payload.date };
    case 'SET_DUE_DATE':
      return { ...state, dueDate: action.payload };
    default:
      return state;
  }
};

const OrderContext = createContext<{ state: OrderState; dispatch: React.Dispatch<OrderAction> } | undefined>(undefined);

export const OrderProvider = ({ children }: { children?: ReactNode }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within OrderProvider');
  return context;
};