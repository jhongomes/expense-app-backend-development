import { Injectable } from '@nestjs/common';

interface PendingExpense {
    userId: string;
    description: string;
    amount: number;
    date: Date;
}

@Injectable()
export class PendingExpenseStore {
    private store = new Map<string, PendingExpense>();

    set(userId: string, expense: PendingExpense) {
        this.store.set(userId, expense);
    }

    get(userId: string): PendingExpense | undefined {
        return this.store.get(userId);
    }

    clear(userId: string) {
        this.store.delete(userId);
    }
}
