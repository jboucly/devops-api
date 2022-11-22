import { Users } from '@entities/users/users.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { IAuthDecodedPayload } from '../interfaces/auth-decoded-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        private readonly configService: ConfigService
    ) {
        super({
            ignoreExpiration: false,
            secretOrKey: configService.get('auth.jwtSecret'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    /**
     * @name validate
     * @description Check if existing user
     * @param {IAuthDecodedPayload} payload
     * @returns {Promise<Users>}
     */
    public async validate(payload: IAuthDecodedPayload): Promise<Users> {
        const user = await this.usersRepository.findOne({
            where: { id: payload.userId },
        });

        if (isNil(user)) {
            throw new NotFoundException('No user');
        }

        return user;
    }
}
