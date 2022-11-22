import { Users } from '@entities/users/users.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { isNil } from 'lodash';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    /**
     * @name validate
     * @description Validate an user
     * @param {string} username
     * @param {string} password
     * @returns {Promise<Users>}
     */
    public async validate(username: string, password: string): Promise<Users> {
        const userInfos = await this.authService.validateUser(username, password);

        if (isNil(userInfos)) {
            throw new UnauthorizedException();
        }

        return userInfos;
    }
}
