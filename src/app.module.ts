import { Module } from '@nestjs/common';
import { USerModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'config/typeorm.config';

@Module({
   imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      autoLoadEntities: true,
    }),
    USerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
