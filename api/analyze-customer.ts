/**
 * Vercel Serverless Function — Proxy protegido para análise de crédito.
 *
 * Variáveis obrigatórias no painel Vercel (Settings → Environment Variables):
 *   API_TOKEN    — Token Bearer do backend SIGA
 *   API_URL      — URL base da API
 *   INTERNAL_KEY — Chave interna para proteger este endpoint (server-side only)
 *
 * VITE_INTERNAL_KEY é uma proteção de camada adicional, não uma autenticação real.
 * A proteção real vem de: CORS restrito ao domínio da aplicação + INTERNAL_KEY.
 */

/** Algoritmo oficial de validação de CPF (Receita Federal) */
function validateCPF(cpf: string): boolean {
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11) return false;
  // Rejeitar dígitos todos iguais (00000000000, 11111111111, etc.)
  if (/^(\d)\1{10}$/.test(clean)) return false;

  // Primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(clean[i]) * (10 - i);
  let remainder = (sum * 10) % 11;
  if (remainder >= 10) remainder = 0;
  if (remainder !== parseInt(clean[9])) return false;

  // Segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(clean[i]) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder >= 10) remainder = 0;
  if (remainder !== parseInt(clean[10])) return false;

  return true;
}

export default async function handler(req: any, res: any) {
  // Apenas POST aceito
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS: aceitar apenas do próprio domínio em produção
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    process.env.APP_URL || '',          // ex: https://brasil-digital.vercel.app
    'http://localhost:3000',            // dev local
    'http://localhost:5173',            // vite dev
  ].filter(Boolean);

  const originAllowed = allowedOrigins.length === 0 || allowedOrigins.some(o => origin.startsWith(o));
  if (origin && !originAllowed) {
    return res.status(403).json({ error: 'Origem não autorizada' });
  }

  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-internal-key');

  // Validar chave interna
  const internalKey = req.headers['x-internal-key'];
  const expectedKey = process.env.INTERNAL_KEY;
  if (expectedKey && (!internalKey || internalKey !== expectedKey)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Validar body
  const body = req.body;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Body inválido' });
  }

  const { cpf, phone, tipo } = body;

  // Validar tipos e comprimentos (previne injection)
  if (typeof cpf !== 'string' || typeof phone !== 'string') {
    return res.status(400).json({ error: 'cpf e phone devem ser strings' });
  }
  if (cpf.length > 20 || phone.length > 20) {
    return res.status(400).json({ error: 'Parâmetros inválidos' });
  }

  const tipoPessoa = ['F', 'J'].includes(tipo) ? tipo : 'F';

  const cleanCpf = cpf.replace(/\D/g, '');
  const cleanPhone = phone.replace(/\D/g, '');

  // Validar CPF com algoritmo da Receita Federal
  if (!validateCPF(cleanCpf)) {
    return res.status(422).json({ error: 'CPF inválido' });
  }

  // Verificar variáveis de ambiente obrigatórias — falhar ruidosamente em produção
  const apiUrl = process.env.API_URL;
  const apiToken = process.env.API_TOKEN;

  if (!apiUrl || !apiToken) {
    // Em dev, retorna mock; em produção bloqueia para evitar aprovações vazias
    if (process.env.VERCEL_ENV === 'production') {
      console.error('[analyze-customer] ERRO: API_URL ou API_TOKEN não configurados em produção.');
      return res.status(500).json({ error: 'Servidor mal configurado' });
    }
    return res.status(200).json({
      status: 'APROVADO',
      valor_ativacao: 0,
      nome_cliente: 'CLIENTE DEMO (env não configurado)',
    });
  }

  try {
    const url = `${apiUrl}/analise-cliente?tipo_pessoa=${encodeURIComponent(tipoPessoa)}&cpf_cnpj=${encodeURIComponent(cleanCpf)}&tel_celular=${encodeURIComponent(cleanPhone)}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      const status = response.status;
      // Não expor detalhes da falha do backend ao cliente
      return res.status(502).json({ error: `Serviço de análise retornou erro (${status})` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err: any) {
    // Não logar dados sensíveis — apenas mensagem e tipo do erro
    console.error('[analyze-customer] Falha na chamada ao backend:', {
      type: err?.name,
      message: err?.message?.substring(0, 100),
    });
    return res.status(503).json({ error: 'Serviço de análise indisponível. Tente novamente.' });
  }
}
