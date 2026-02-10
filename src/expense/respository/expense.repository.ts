import { Injectable } from '@nestjs/common';
import { Between, DataSource, Repository } from 'typeorm';
import { Expense } from '../entity/expense.entity';

@Injectable()
export class ExpenseRepository extends Repository<Expense> {
    constructor(private readonly dataSource: DataSource) {
        super(Expense, dataSource.createEntityManager());
    }

    async createExpense(data: {
        userId: string;
        amount: number;
        category: string;
        description?: string;
        expense_date: Date;
    }): Promise<Expense> {
        const expense = this.create({
            amount: data.amount,
            category: data.category,
            description: data.description,
            expense_date: data.expense_date,
            user: { id: data.userId } as any,
        });

        return this.save(expense);
    }

    async getDailyTotal(userId: string, date: Date) {
        return this.createQueryBuilder('e')
            .select('COALESCE(SUM(e.amount), 0)', 'total')
            .where('e.user_id = :userId', { userId })
            .andWhere('e.expenseDate = :date', { date })
            .getRawOne();
    }

    async getMonthlyByCategory(userId: string, month: Date) {
        return this.createQueryBuilder('e')
            .select('e.category', 'category')
            .addSelect('SUM(e.amount)', 'total')
            .where('e.user_id = :userId', { userId })
            .andWhere(
                `date_trunc('month', e.expenseDate) = date_trunc('month', :month)`,
                { month },
            )
            .groupBy('e.category')
            .getRawMany();
    }

    async listByPeriod(userId: string, start: Date, end: Date) {
        return this.find({
            where: {
                user: { id: userId },
                expense_date: Between(start, end),
            },
            order: { expense_date: 'DESC' },
        });
    }
}
