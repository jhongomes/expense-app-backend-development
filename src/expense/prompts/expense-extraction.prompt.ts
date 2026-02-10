export interface ExtractedExpense {
  isExpense: boolean;
  confidence: number;
  description: string | null;
  amount: number | null;
  category: string | null;
  date: string | null;
}


export const EXPENSE_EXTRACTION_PROMPT = `
Você é um sistema que extrai despesas financeiras a partir de mensagens curtas.

Regras:
- Retorne APENAS JSON válido
- Nunca explique nada
- Nunca use texto fora do JSON
- Valores monetários devem ser números (ex: 32.5)
- Datas devem estar no formato yyyy-mm-dd
- Se a data não for informada, use a data de hoje
- Se não for uma despesa, marque success=false

Formato exato da resposta:

{
  "isExpense": boolean,
  "confidence": number,
  "description": string | null,
  "amount": number | null,
  "category": string | null,
  "date": string | null
}
`;
