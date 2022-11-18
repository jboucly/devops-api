
import { BaseEntity } from "@common/class/base-entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Users extends BaseEntity {
    @Column({ length: 50, type: 'varchar' })
    public username: string;

    @Column({ length: 255, type: 'varchar' })
    public email:string;

    @Column({ length: 255, type: 'varchar' })
    public password: string;
}