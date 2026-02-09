import { Module } from '@nestjs/common';
import { USerModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'config/typeorm.config';
import { ExpensesModule } from './expense/expense.module';
import { ConfigModule } from '@nestjs/config';

@Module({
   imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      autoLoadEntities: true,
    }),
    USerModule,
    ExpensesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
