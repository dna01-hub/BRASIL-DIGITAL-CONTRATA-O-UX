export interface Address {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento?: string;
  latitude?: number;
  longitude?: number;
  tipo: 'casa' | 'empresa' | 'condominio';
  // Specific to condominio
  condominioId?: string;
  condominioNome?: string; // For display
  bloco?: string;
  apartamento?: string;
}

export interface Plan {
  id: number;
  name: string;
  speed: number;
  price: number;
  originalPrice: number;
  features: string[];
  appsLimit: number;
  bestValue?: boolean;
}

export interface AppOption {
  id: string;
  name: string;
  logo: string; // URL for the logo
  domain?: string; // Used for fetching logo if needed
}

export interface AdditionalService {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface CustomerData {
  nome: string;
  cpfCnpj: string;
  email: string;
  celular: string; // Now captured in Step 1
  telefone?: string; // Telefone Secundário
  dataNascimento: string;
  rg?: string;
  orgaoEmissor?: string;
  sexo?: string;
  nacionalidade?: string;
  naturalidade?: string; // Cidade de nascimento
  estadoNascimento?: string; // UF de nascimento
  estadoCivil?: string;
  profissao?: string;
  tipoPessoa: 'F' | 'J';
  // PJ fields
  razaoSocial?: string;
  nomeResponsavel?: string;
  cpfResponsavel?: string;
}

export interface OrderFiles {
  docFrente: File | null;
  docVerso: File | null;
  comprovanteResidencia: File | null;
}

export interface Scheduling {
  date: string;
  timeId: string;
  timeLabel: string;
}

export interface OrderState {
  step: number;
  viabilityConfirmed: boolean;
  address: Address | null;
  selectedPlan: Plan | null;
  selectedApps: AppOption[]; // Changed to object array to hold logo info
  additionalServices: AdditionalService[];
  customer: CustomerData | null;
  files: OrderFiles; // New field for uploads
  analysisStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'APPROVED_WITH_TAX' | null;
  activationTax: number;
  scheduling: Scheduling | null;
  paymentMethod: 'credit_card' | 'boleto' | null;
  dueDate: string;
}

export type OrderAction = 
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_ADDRESS'; payload: Address }
  | { type: 'SET_CONTACT_INFO'; payload: { celular: string } } // New action for Step 1 contact info
  | { type: 'SET_PLAN'; payload: Plan }
  | { type: 'TOGGLE_APP'; payload: AppOption }
  | { type: 'TOGGLE_SERVICE'; payload: AdditionalService }
  | { type: 'SET_CUSTOMER'; payload: Partial<CustomerData> } // Allow partial updates
  | { type: 'SET_FILES'; payload: Partial<OrderFiles> } // New action for files
  | { type: 'SET_ANALYSIS'; payload: { status: OrderState['analysisStatus']; tax: number } }
  | { type: 'SET_SCHEDULING'; payload: Scheduling }
  | { type: 'SET_PAYMENT'; payload: { method: 'credit_card' | 'boleto'; date: string } }
  | { type: 'SET_DUE_DATE'; payload: string };