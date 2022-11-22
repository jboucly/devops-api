import { IBaseEntity } from '@common/interfaces/base-entity.interface';

export interface IUser extends IBaseEntity {
    username: string;
    email: string;
    password: string;
}
