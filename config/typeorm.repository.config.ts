import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Injectable } from "@nestjs/common";
import { UserRepository } from 'src/user/repository/user.repository';
import { Repository } from 'lib/src/enum/repositories.enum';
import { ExpenseRepository } from 'src/expense/respository/expense.repository';
import { CategoryRepository } from 'src/category/repository/category.repository';

@Injectable()
export class TypeOrmRepositoryConfig {
    public static getRepositoryOf(repositories: string): EntityClassOrSchema[] {
        const repositoriesOf = {
            [Repository.USER]: () => [UserRepository],
            [Repository.EXPENSE]: () => [ExpenseRepository],
            [Repository.CATEGORY]: () => [CategoryRepository]
        }

        return repositoriesOf[repositories]();
    }
}