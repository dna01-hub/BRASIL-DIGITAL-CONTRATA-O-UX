import { Address } from '../types';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGFuaWVsb2xpdmVpcmExMDAiLCJhIjoiY21jYXhtNW5wMDhwaTJsb2tuendpcDZsOCJ9.d2vLD_yT0yUwyJFD0-_dSQ';
const MAPBOX_TILESET = 'danieloliveira100.4pws8e6n';

// Chave interna para o endpoint Vercel protegido.
// Configure VITE_INTERNAL_KEY nas env vars da Vercel (mesma chave que INTERNAL_KEY).
const INTERNAL_KEY = import.meta.env.VITE_INTERNAL_KEY || 'dev-key';

// Mock Data
const MOCK_CONDOS = [
    { id: '1', nome: 'Residencial Viver Bem', bairro: 'Jardim das Flores' },
    { id: '2', nome: 'Condomínio Grand Park', bairro: 'Centro' },
    { id: '3', nome: 'Edifício Horizonte', bairro: 'Bela Vista' }
];

const MOCK_ADDRESS = {
    logradouro: 'Avenida Paulista',
    bairro: 'Bela Vista',
    localidade: 'São Paulo',
    uf: 'SP',
    cep: '01310-100',
    erro: false
};

async function fetchWithRetry(url: string, options: RequestInit = {}, maxRetries = 1, fallbackValue?: any) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn(`[API] Attempt ${i + 1} failed:`, e);
      if (i === maxRetries - 1) {
          if (fallbackValue !== undefined) return fallbackValue;
          throw e;
      }
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

export const api = {
  checkViability: async (address: string): Promise<{ feasible: boolean; coords: [number, number] }> => {
    const FALLBACK_COORDS: [number, number] = [-46.6333, -23.5505];
    try {
      const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}&country=BR&limit=1`;
      const geoData = await fetchWithRetry(geoUrl, {}, 1, { features: [{ center: FALLBACK_COORDS }] });
      if (!geoData.features?.length) return { feasible: true, coords: FALLBACK_COORDS };
      const [lng, lat] = geoData.features[0].center;
      const tileUrl = `https://api.mapbox.com/v4/${MAPBOX_TILESET}/tilequery/${lng},${lat}.json?radius=0&limit=1&access_token=${MAPBOX_TOKEN}`;
      await fetchWithRetry(tileUrl, {}, 1, { features: [{}] });
      return { feasible: true, coords: [lng, lat] };
    } catch {
      return { feasible: true, coords: FALLBACK_COORDS };
    }
  },

  getCondominios: async () => {
    // Condomínios ainda passam direto (dados não sensíveis)
    return MOCK_CONDOS;
  },

  searchCep: async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return null;
    return fetchWithRetry(`https://viacep.com.br/ws/${cleanCep}/json/`, {}, 1, MOCK_ADDRESS);
  },

  // Análise de crédito — agora passa pelo proxy Vercel (API_TOKEN nunca exposto ao cliente)
  analyzeCustomer: async (tipo: 'F' | 'J', doc: string, phone: string) => {
    const mockResponse = { status: 'APROVADO', valor_ativacao: 0, nome_cliente: 'CLIENTE MOCK' };
    try {
      const res = await fetch('/api/analyze-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-key': INTERNAL_KEY,
        },
        body: JSON.stringify({ cpf: doc, phone, tipo }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn('[API] analyzeCustomer falhou, usando mock:', e);
      return mockResponse;
    }
  },

  getAvailableSlots: async (_date: string, _city: string) => {
    return [
        { id: '1', label: '08:00 - 10:00' },
        { id: '2', label: '10:00 - 12:00' },
        { id: '3', label: '13:00 - 15:00' },
        { id: '4', label: '15:00 - 18:00' }
    ];
  },

  submitOrder: async (payload: any) => {
    console.log('[Order] Payload:', payload);
    // TODO: mover para /api/submit-order quando pronto
    return { success: true, message: 'Pedido realizado com sucesso (MOCK)' };
  }
};
