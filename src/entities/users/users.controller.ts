import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotAcceptableResponse, ApiTags } from '@nestjs/swagger';
import { UserRegisterDtoIn } from './dtos/user-register.dto.in';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({ description: 'User created' })
    @ApiNotAcceptableResponse({ description: 'User exist' })
    public async register(@Body() dtoIn: UserRegisterDtoIn): Promise<void> {
        await this.service.registerUser(dtoIn);
    }
}
