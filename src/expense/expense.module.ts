import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmRepositoryConfig } from 'config/typeorm.repository.config';
import { Repository } from 'lib/src/enum/repositories.enum';
import { ExpenseRepository } from './respository/expense.repository';

@Module({
  imports: [TypeOrmModule.forFeature(TypeOrmRepositoryConfig.getRepositoryOf(Repository.EXPENSE))],
  providers: [ExpenseRepository],
  exports: [ExpenseRepository],
})
export class ExpensesModule {}
