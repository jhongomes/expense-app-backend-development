import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "lib/src/apps/user/create-user.dto";
import { User } from "./entity/user.entity";
import { UserRepository } from "./repository/user.repository";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.findOrCreateByPhone(createUserDto.phone);
    }
}