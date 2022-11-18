import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDtoIn {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public password: string;
}
