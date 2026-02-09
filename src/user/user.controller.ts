import { Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { User } from "./entity/user.entity";
import { CreateUserDto } from "lib/src/apps/user/create-user.dto";
import { ResponseTypeDto } from "lib/src/general";

@ApiTags('User')
@Controller('auserlbum')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
    @ApiBody({ type: CreateUserDto })
    @ApiCreatedResponse({ type: User, description: 'The User has been successfully created.' })
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }
}