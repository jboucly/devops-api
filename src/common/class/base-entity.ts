import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @CreateDateColumn()
    @ApiProperty({ type: Date })
    public createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ type: Date })
    public updatedAt: Date;
}
