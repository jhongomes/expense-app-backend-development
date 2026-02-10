import { Injectable } from '@nestjs/common';
import { ExpenseRepository } from './respository/expense.repository';
import { CreateExpenseDto } from 'lib/src/apps/expense/create-expense.dto';
import { PeriodType } from 'lib/src/util/date-range.util';

@Injectable()
export class ExpensesService {
    constructor(
        private readonly expenseRepository: ExpenseRepository,
    ) { }

    async addExpense(userId: string, dto: CreateExpenseDto & {
        amount: number;
        category: string;
        description?: string;
        expense_date: Date;
    }) {
        return this.expenseRepository.createExpense({
            userId,
            ...dto,
        });
    }

    async getTodaySummary(userId: string) {
        return this.expenseRepository.getDailyTotal(userId, new Date());
    }

    async getMonthlySummary(userId: string, date: Date, period: PeriodType) {
        return this.expenseRepository.getMonthlyByCategory(userId, date, period);
    }

    async listByPeriod(userId: string, start: Date, end: Date) {
        return this.expenseRepository.listByPeriod(userId, start, end);
    }
}
