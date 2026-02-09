import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { User } from "./entity/user.entity";
import { ResponseTypeDto } from "lib/src/general";

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
    @ApiCreatedResponse({ type: User, description: 'The User has been successfully created.' })
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async findOrCreateByPhone(@Body('phone') phone: string): Promise<User> {
        return this.userService.findOrCreateByPhone(phone);
    }

    @Get(':id')
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async getUserById(@Param('id') id: string): Promise<User> {
        return this.userService.findById(id);
    }

    @Get('phone/:phone')
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async getByPhone(@Param('phone') phone: string) {
        return this.userService.findByPhone(phone);
    }

    @Delete(':id')
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async deleteUser(@Param('id') id: string) {
        await this.userService.deleteUser(id);
        return { message: 'Usuário removido com sucesso' };
    }
}