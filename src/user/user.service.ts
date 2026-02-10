import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "lib/src/apps/user/create-user.dto";
import { User } from "./entity/user.entity";
import { UserRepository } from "./repository/user.repository";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async findOrCreateByPhone(phone: string): Promise<User> {
        return this.userRepository.findOrCreateByPhone(phone);
    }

    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) throw new NotFoundException('Usuário não encontrado');
        return user;
    }

    async findByPhone(phone: string) {
        const user = await this.userRepository.findByPhone(phone);
        if (!user) throw new NotFoundException('Usuário não encontrado');
        return user;
    }

    async deleteUser(id: string) {
        return this.userRepository.deleteUser(id);
    }
}