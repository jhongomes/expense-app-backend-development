import { Injectable } from '@nestjs/common';

interface PendingExpense {
    user_id: string;
    description: string;
    amount: number;
    date: Date;
}

@Injectable()
export class PendingExpenseStore {
    private store = new Map<string, PendingExpense>();

    set(user_id: string, expense: PendingExpense) {
        this.store.set(user_id, expense);
    }

    get(user_id: string): PendingExpense | undefined {
        return this.store.get(user_id);
    }

    clear(user_id: string) {
        this.store.delete(user_id);
    }
}
