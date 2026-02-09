import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async findByPhone(phone: string): Promise<User | null> {
        return this.findOne({
            where: { phone },
        });
    }

    async createUserByPhone(phone: string): Promise<User> {
        const user = this.create({
            phone,
            plan: 'free',
            trialEndsAt: this.getTrialEndDate(),
        });

        return this.save(user);
    }

    async findOrCreateByPhone(phone: string): Promise<User> {
        const existingUser = await this.findByPhone(phone);

        if (existingUser) {
            return existingUser;
        }

        return this.createUserByPhone(phone);
    }

    async updatePlan(userId: string, plan: 'free' | 'premium') {
        return this.update({ id: userId }, { plan });
    }

    async deleteUser(userId: string) {
        return this.delete({ id: userId });
    }

    private getTrialEndDate(): Date {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date;
    }
}
