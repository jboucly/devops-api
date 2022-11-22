import { Users } from '@entities/users/users.entity';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    controllers: [AuthController],
    imports: [
        PassportModule,
        TypeOrmModule.forFeature([Users]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('auth.jwtSecret'),
                signOptions: {
                    expiresIn: configService.get('auth.jwtExpireIn'),
                },
            }),
        }),
    ],
    providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
