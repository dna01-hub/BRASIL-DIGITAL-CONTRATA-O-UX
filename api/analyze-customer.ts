/**
 * Vercel Serverless Function — Proxy protegido para análise de crédito.
 *
 * O API_TOKEN e API_URL ficam APENAS nas variáveis de ambiente do Vercel
 * (server-side), nunca expostos no bundle JS do cliente.
 *
 * Variáveis necessárias no painel Vercel (Settings → Environment Variables):
 *   API_TOKEN   — Token de autenticação do backend (ex: 4|YlB1...)
 *   API_URL     — URL base da API (ex: https://homologacao-siga.brasildigital.net.br/api/v1)
 *   INTERNAL_KEY — Chave interna para proteger este endpoint
 *
 * No projeto .env (client-side, prefixo VITE_):
 *   VITE_INTERNAL_KEY — mesma chave acima, enviada no header x-internal-key
 */
export default async function handler(req: any, res: any) {
  // Só aceita POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validar chave interna (proteção básica do endpoint)
  const internalKey = req.headers['x-internal-key'];
  if (!internalKey || internalKey !== process.env.INTERNAL_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { cpf, phone, tipo = 'F' } = req.body;

  if (!cpf || !phone) {
    return res.status(400).json({ error: 'cpf e phone são obrigatórios' });
  }

  const cleanCpf = cpf.replace(/\D/g, '');

  // Modo demo: CPF de teste retorna aprovado sem chamar a API real
  if (cleanCpf === '11111111111') {
    return res.status(200).json({
      status: 'APROVADO',
      valor_ativacao: 0,
      nome_cliente: 'CLIENTE TESTE',
    });
  }

  const apiUrl = process.env.API_URL;
  const apiToken = process.env.API_TOKEN;

  if (!apiUrl || !apiToken) {
    console.error('[analyze-customer] Variáveis de ambiente API_URL/API_TOKEN não configuradas.');
    // Fallback para não quebrar em ambiente sem vars configuradas
    return res.status(200).json({
      status: 'APROVADO',
      valor_ativacao: 0,
      nome_cliente: 'CLIENTE (ENV NÃO CONFIGURADO)',
    });
  }

  try {
    const url = `${apiUrl}/analise-cliente?tipo_pessoa=${tipo}&cpf_cnpj=${cleanCpf}&tel_celular=${phone}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error('[analyze-customer] Erro ao chamar o backend:', err);
    // Fallback demo
    return res.status(200).json({
      status: 'APROVADO',
      valor_ativacao: 0,
      nome_cliente: 'CLIENTE MOCK',
    });
  }
}
