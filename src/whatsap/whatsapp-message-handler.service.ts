import { Injectable, Logger } from '@nestjs/common';
import { PendingExpenseStore } from 'lib/src/validators/pending-expense.store';
import { CategoryService } from 'src/category/category.service';
import { AIExpenseExtractorService } from 'src/expense/ai-expense-extraction.service';
import { ExpensesService } from 'src/expense/expense.service';

interface HandleTextMessageInput {
  user_id: string;
  from: string;
  text: string;
}
type HandlerResponse =
  | { type: 'reply'; message: string }
  | { type: 'saved'; message: string }
  | { type: 'ask_confirmation'; message: string };

@Injectable()
export class WhatsappMessageHandlerService {
  private readonly logger = new Logger(
    WhatsappMessageHandlerService.name,
  );

  constructor(
    private readonly extractor: AIExpenseExtractorService,
    private readonly expenseService: ExpensesService,
    private readonly pendingStore: PendingExpenseStore,
    private readonly categoryService: CategoryService
  ) { }

  async handleTextMessage(
    input: HandleTextMessageInput,
  ): Promise<HandlerResponse> {
    const { text, user_id } = input;

    const pending = this.pendingStore.get(user_id);

    if (pending) {
      const category = await this.categoryService.resolveCategory(
        user_id,
        text,
      );

      await this.expenseService.addExpense(user_id, {
        user_id,
        description: pending.description,
        amount: pending.amount,
        category_id: category.id,
        category_slug: category.slug,
        expense_date: pending.date,
        source: 'whatsapp',
      });

      this.pendingStore.clear(user_id);

      return {
        type: 'saved',
        message:
          `✅ Despesa registrada!\n` +
          `📝 ${pending.description}\n` +
          `🏷️ ${text}`,
      };
    }

    const extraction = await this.extractor.extract(text);

    if (!extraction.isExpense || !extraction.amount) {
      return {
        type: 'reply',
        message:
          'Não consegui identificar uma despesa 🤔\n' +
          'Exemplo: "Uber 18,50" ou "Almoço 32 reais"',
      };
    }

    if (!extraction.category) {
      this.pendingStore.set(user_id, {
        user_id,
        description: extraction.description ?? 'Despesa via WhatsApp',
        amount: extraction.amount,
        date: extraction.date
          ? new Date(extraction.date)
          : new Date(),
      });

      return {
        type: 'reply',
        message:
          `💸 Anotei uma despesa de R$ ${extraction.amount}.\n` +
          `Qual categoria deseja usar?\n` +
          `Ex: alimentação, transporte, lazer`,
      };
    }

    if (extraction.category) {
      const category = await this.categoryService.resolveCategory(
        user_id,
        extraction.category,
      );

      const expense = await this.expenseService.addExpense(user_id, {
        user_id,
        description: extraction.description ?? 'Despesa registrada via WhatsApp',
        amount: extraction.amount,
        category_id: category.id,
        category_slug: category.slug,
        expense_date: extraction.date
          ? new Date(extraction.date)
          : new Date(),
        source: 'whatsapp',
      });

      return {
        type: 'saved',
        message:
          `✅ Despesa registrada!\n` +
          `📝 ${expense.description}\n` +
          `🏷️ ${expense.category}\n` +
          `💰 R$ ${expense.amount}`,
      };
    }
  }
}
