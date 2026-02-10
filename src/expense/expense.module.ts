import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmRepositoryConfig } from 'config/typeorm.repository.config';
import { Repository } from 'lib/src/enum/repositories.enum';
import { ExpenseRepository } from './respository/expense.repository';
import { ExpensesController } from './expense.controller';
import { ExpensesService } from './expense.service';
import { AIExpenseExtractorService } from './ai-expense-extraction.service';

@Module({
  imports: [TypeOrmModule.forFeature(TypeOrmRepositoryConfig.getRepositoryOf(Repository.EXPENSE))],
  controllers: [ExpensesController],
  providers: [ExpenseRepository, ExpensesService, AIExpenseExtractorService],
  exports: [ExpenseRepository, ExpensesService, AIExpenseExtractorService],
})
export class ExpensesModule { }
