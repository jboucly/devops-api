import { BaseEntity } from '@common/class/base-entity';
import { Column, Entity } from 'typeorm';
import { IUser } from './interfaces/user.interface';

@Entity('users')
export class Users extends BaseEntity implements IUser {
    @Column({
        length: 50,
        unique: true,
        type: 'varchar',
    })
    public username: string;

    @Column({
        length: 255,
        unique: true,
        type: 'varchar',
    })
    public email: string;

    @Column({
        length: 255,
        type: 'varchar',
    })
    public password: string;
}
