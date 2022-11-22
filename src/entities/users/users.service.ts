import { Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import { Repository } from 'typeorm';
import { UserRegisterDtoIn } from './dtos/user-register.dto.in';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly repository: Repository<Users>
    ) {}

    /**
     * @description Register user in BDD
     */
    public async registerUser(dtoIn: UserRegisterDtoIn): Promise<void> {
        await this.checkUserExistOnRegistration(dtoIn);

        try {
            await this.repository.save(
                this.repository.create({
                    ...dtoIn,
                })
            );
        } catch (error) {
            throw new InternalServerErrorException('An error occurred in the registration process');
        }
    }

    /**
     * @description Check if user exist before register
     * @param {UserRegisterDtoIn} dtoIn
     * @returns {Promise<void>}
     */
    private async checkUserExistOnRegistration(dto: UserRegisterDtoIn): Promise<void> {
        const userSearch = await this.repository.findOne({
            where: [{ email: dto.email }, { username: dto.username }, { username: dto.username, email: dto.email }],
        });

        if (!isNil(userSearch)) {
            throw new NotAcceptableException('User exist');
        }
    }
}
