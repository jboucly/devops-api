import { ApiProperty } from '@nestjs/swagger';

export class LoginDtoOut {
    @ApiProperty()
    public accessToken: string;
}
