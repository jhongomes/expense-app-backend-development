import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repository/user.repository";
import { TypeOrmRepositoryConfig } from "config/typeorm.repository.config";
import { Repository } from "lib/src/enum/repositories.enum";

@Module({
    imports: [TypeOrmModule.forFeature(TypeOrmRepositoryConfig.getRepositoryOf(Repository.USER))],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository]
})
export class USerModule { }