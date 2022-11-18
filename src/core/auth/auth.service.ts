import { Users } from '@entities/users/users.entity';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { isNil } from 'lodash';
import { Repository } from 'typeorm';
import { LoginDtoIn } from './dtos/login.dto.in';
import { LoginDtoOut } from './dtos/login.dto.out';
import { IAuthDecodedPayload } from './interfaces/auth-decoded-payload';

@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name);

    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,

        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    /**
     * @name login
     * @description Return access token for connect user
     * @param {string} username
     * @returns {Promise<LoginDtoOut>}
     */
    public async login({ username }: LoginDtoIn): Promise<LoginDtoOut> {
        const user = await this.findUserByUserName(username);
        const payload = { userId: user.id } as IAuthDecodedPayload;

        return {
            accessToken: this.jwtService.sign(payload, {
                expiresIn: this.configService.get<string>('auth.jwtExpireIn'),
            }),
        };
    }

    /**
     * @description Check if user exist and if password is identical
     * @param username
     * @param password
     * @returns {Promise<Users>}
     */
    public async validateUser(username: string, password: string): Promise<Users> {
        try {
            const user = await this.findUserByUserName(username);

            if (!isNil(user) && !isNil(user.password) && (await compare(password, user.password))) {
                return user;
            }
        } catch (error) {
            this.logger.warn(error);
        }

        return null;
    }

    /**
     * @param username
     * @returns {Promise<Users | undefined>}
     */
    private findUserByUserName(username: string): Promise<Users | undefined> {
        return this.usersRepository.findOneOrFail({
            where: {
                username,
            },
        });
    }
}
