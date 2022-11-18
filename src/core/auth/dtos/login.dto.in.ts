import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDtoIn {
    @IsString()
    @IsNotEmpty()
    public username: string;

    @IsString()
    @IsNotEmpty()
    public password: string;
}
