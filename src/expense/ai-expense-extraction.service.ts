import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { EXPENSE_EXTRACTION_PROMPT, ExtractedExpense } from './prompts/expense-extraction.prompt';

@Injectable()
export class AIExpenseExtractorService {
    private readonly logger = new Logger(AIExpenseExtractorService.name);
    private readonly model;

    constructor() {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        this.model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash-lite',
        });
    }

    async extract(text: string) {
        try {
            const result = await this.model.generateContent([
                EXPENSE_EXTRACTION_PROMPT,
                `Texto: """${text}"""`,
            ]);

            const raw = result.response.text();

            const parsed = this.safeJsonParse(raw);

            return this.validate(parsed);
        } catch (error) {
            this.logger.error('Erro ao extrair despesa', error);

            return {
                isExpense: false,
                confidence: 0,
                description: null,
                amount: null,
                category: null,
                date: null,
            };
        }
    }

    private safeJsonParse(text: string): any {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('JSON não encontrado');

        return JSON.parse(jsonMatch[0]);
    }

    private validate(data: any): ExtractedExpense {
        return {
            isExpense: Boolean(data.isExpense),
            confidence: Number(data.confidence) || 0,
            description:
                typeof data.description === 'string'
                    ? data.description
                    : null,
            amount:
                typeof data.amount === 'number'
                    ? data.amount
                    : null,
            category:
                typeof data.category === 'string'
                    ? data.category
                    : null,
            date:
                typeof data.date === 'string'
                    ? data.date
                    : null,
        };
    }
}
