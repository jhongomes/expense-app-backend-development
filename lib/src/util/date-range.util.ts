export type PeriodType = 'day' | 'month' | 'year';

export function getDateRange(
    date: Date,
    period: PeriodType,
): { start: Date; end: Date } {
    const start = date ? new Date(date) : new Date();
    const end = new Date(date);

    if (period === 'day') {
        start.setHours(0, 0, 0, 0);
        end.setHours(24, 0, 0, 0);
    }

    if (period === 'month') {
        start.setDate(1);
        start.setHours(0, 0, 0, 0);

        end.setMonth(end.getMonth() + 1, 1);
        end.setHours(0, 0, 0, 0);
    }

    if (period === 'year') {
        start.setMonth(0, 1);
        start.setHours(0, 0, 0, 0);

        end.setFullYear(end.getFullYear() + 1, 0, 1);
        end.setHours(0, 0, 0, 0);
    }

    return { start, end };
}
