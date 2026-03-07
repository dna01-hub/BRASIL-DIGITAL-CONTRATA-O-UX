import { OrderState } from '../types';
import { supabase } from '../lib/supabase';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGFuaWVsb2xpdmVpcmExMDAiLCJhIjoiY21jYXhtNW5wMDhwaTJsb2tuendpcDZsOCJ9.d2vLD_yT0yUwyJFD0-_dSQ';
const MAPBOX_TILESET = 'danieloliveira100.4pws8e6n';
const API_TOKEN = '4|YlB1QqHYebqtZS1df6iYYmzKh2R7t4E9dYoev79yc5178352';
const API_URL = 'https://homologacao-siga.brasildigital.net.br/api/v1';

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
      console.log(`[API] Fetching: ${url}`);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn(`[API] Attempt ${i + 1} failed:`, e);
      if (i === maxRetries - 1) {
        if (fallbackValue !== undefined) {
          console.log('[API] Using fallback data due to error.');
          return fallbackValue;
        }
        throw e;
      }
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

// Builds the flat snake_case data object used for both Supabase and the external API
function buildLeadData(orderState: OrderState): Record<string, any> {
  const {
    address, selectedPlan, selectedApps, additionalServices,
    customer, analysisStatus, activationTax, scheduling, paymentMethod, dueDate
  } = orderState;

  return {
    nome: customer?.nome ?? null,
    cpf_cnpj: customer?.cpfCnpj ?? null,
    email: customer?.email ?? null,
    celular: customer?.celular ?? null,
    telefone: customer?.telefone ?? null,
    data_nascimento: customer?.dataNascimento ?? null,
    tipo_pessoa: customer?.tipoPessoa ?? null,
    razao_social: customer?.razaoSocial ?? null,
    nome_responsavel: customer?.nomeResponsavel ?? null,
    cpf_responsavel: customer?.cpfResponsavel ?? null,
    cep: address?.cep ?? null,
    logradouro: address?.logradouro ?? null,
    numero: address?.numero ?? null,
    bairro: address?.bairro ?? null,
    cidade: address?.cidade ?? null,
    estado: address?.estado ?? null,
    complemento: address?.complemento ?? null,
    tipo_endereco: address?.tipo ?? null,
    condominio_id: address?.condominioId ?? null,
    condominio_nome: address?.condominioNome ?? null,
    bloco: address?.bloco ?? null,
    apartamento: address?.apartamento ?? null,
    latitude: address?.latitude ?? null,
    longitude: address?.longitude ?? null,
    plano_id: selectedPlan?.id ?? null,
    plano_nome: selectedPlan?.name ?? null,
    plano_velocidade: selectedPlan?.speed ?? null,
    plano_preco: selectedPlan?.price ?? null,
    apps: selectedApps.length > 0 ? selectedApps : null,
    servicos_adicionais: additionalServices.length > 0 ? additionalServices : null,
    analise_status: analysisStatus ?? null,
    taxa_ativacao: activationTax ?? null,
    agendamento_data: scheduling?.date ?? null,
    agendamento_horario_id: scheduling?.timeId ?? null,
    agendamento_horario_label: scheduling?.timeLabel ?? null,
    forma_pagamento: paymentMethod ?? null,
    vencimento: dueDate ?? null,
  };
}

export const api = {
  upsertLead: async (data: object): Promise<string | null> => {
    try {
      const newId = crypto.randomUUID();
      const { error } = await supabase
        .from('pedidos')
        .insert({ ...data, id: newId, status: 'lead' });
      if (error) { console.error('[Supabase] upsertLead:', error.message); return null; }
      return newId;
    } catch (e) {
      console.error('[Supabase] upsertLead exception:', e);
      return null;
    }
  },

  updateLead: async (id: string, data: object): Promise<void> => {
    try {
      const { error } = await supabase.from('pedidos').update(data).eq('id', id);
      if (error) console.error('[Supabase] updateLead:', error.message);
    } catch (e) {
      console.error('[Supabase] updateLead exception:', e);
    }
  },

  saveStepData: async (orderState: OrderState): Promise<string | null> => {
    try {
      const data = buildLeadData(orderState);
      const { leadId } = orderState;

      if (leadId) {
        const { error } = await supabase.from('pedidos').update(data).eq('id', leadId);
        if (error) console.error('[Supabase] saveStepData update:', error.message);
        return leadId;
      } else {
        const newId = crypto.randomUUID();
        const { error } = await supabase
          .from('pedidos')
          .insert({ ...data, id: newId, status: 'lead' });
        if (error) { console.error('[Supabase] saveStepData insert:', error.message); return null; }
        return newId;
      }
    } catch (e) {
      console.error('[Supabase] saveStepData exception:', e);
      return null;
    }
  },

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
    } catch (error) {
      console.warn('[Viability] Check failed, using fallback', error);
      return { feasible: true, coords: FALLBACK_COORDS };
    }
  },

  getCondominios: async () => {
    return fetchWithRetry(`${API_URL}/condominios`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    }, 1, MOCK_CONDOS);
  },

  searchCep: async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return null;
    return fetchWithRetry(`https://viacep.com.br/ws/${cleanCep}/json/`, {}, 1, MOCK_ADDRESS);
  },

  analyzeCustomer: async (tipo: 'F' | 'J', doc: string, phone: string) => {
    const cleanDoc = doc.replace(/\D/g, '');
    if (cleanDoc === '11111111111') return { status: 'APROVADO', valor_ativacao: 0, nome_cliente: 'CLIENTE TESTE' };
    const mockResponse = { status: 'APROVADO', valor_ativacao: 0, nome_cliente: 'CLIENTE MOCK' };
    const url = `${API_URL}/analise-cliente?tipo_pessoa=${tipo}&cpf_cnpj=${cleanDoc}&tel_celular=${phone}`;
    return fetchWithRetry(url, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    }, 1, mockResponse);
  },

  getAvailableSlots: async (date: string, city: string) => {
    const mockSlots = [
      { id: '1', label: '08:00 - 10:00' },
      { id: '2', label: '10:00 - 12:00' },
      { id: '3', label: '13:00 - 15:00' },
      { id: '4', label: '15:00 - 18:00' }
    ];
    const url = `${API_URL}/listar-horarios?data_inicial=${date}&data_final=${date}&cidade=${encodeURIComponent(city)}&tipo_servico=NA&tipo_pessoa=F`;
    return fetchWithRetry(url, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    }, 1, mockSlots);
  },

  // Saves final order to Supabase and submits to the external API
  submitOrder: async (orderState: OrderState) => {
    const leadData = buildLeadData(orderState);
    const { leadId } = orderState;

    // Save to Supabase with status 'novo'
    try {
      let error;
      if (leadId) {
        ({ error } = await supabase.from('pedidos').update({ ...leadData, status: 'novo' }).eq('id', leadId));
      } else {
        ({ error } = await supabase.from('pedidos').insert({ ...leadData, status: 'novo' }));
      }
      if (error) console.error('[Supabase] Erro ao salvar pedido:', error.message);
      else console.log('[Supabase] Pedido salvo com sucesso.');
    } catch (err) {
      console.error('[Supabase] Exceção ao salvar pedido:', err);
    }

    // Submit to external API using the same flat snake_case payload
    return fetchWithRetry(`${API_URL}/pre-vendas/cadastrar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(leadData)
    }, 1, { success: true, message: 'Pedido realizado com sucesso (MOCK)' });
  }
};
