import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDtoIn } from './dtos/login.dto.in';
import { LoginDtoOut } from './dtos/login.dto.out';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiOkResponse({ type: LoginDtoOut, description: 'User connected' })
    public async login(@Body() dto: LoginDtoIn): Promise<LoginDtoOut> {
        return await this.service.login(dto);
    }
}
