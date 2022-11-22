import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserRegisterDtoIn {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty()
    public username: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    public email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public password: string;
}
