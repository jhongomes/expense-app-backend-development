import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmRepositoryConfig } from "config/typeorm.repository.config";
import { CategoryService } from "./category.service";
import { Repository } from "lib/src/enum/repositories.enum";
import { CategoryRepository } from "./repository/category.repository";


@Module({
  imports: [TypeOrmModule.forFeature(TypeOrmRepositoryConfig.getRepositoryOf(Repository.CATEGORY))],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule { }