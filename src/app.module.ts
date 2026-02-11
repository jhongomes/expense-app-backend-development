import { Module } from '@nestjs/common';
import { USerModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'config/typeorm.config';
import { ExpensesModule } from './expense/expense.module';
import { ConfigModule } from '@nestjs/config';
import { WhatsapModule } from './whatsap/whatsap.module';
import { CategoryModule } from './category/category.module';

@Module({
   imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      autoLoadEntities: true,
    }),
    USerModule,
    ExpensesModule,
    WhatsapModule,
    CategoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
