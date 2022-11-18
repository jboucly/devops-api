import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
    passwordSalt: process.env.PASSWORD_SALT || 10,
    jwtExpireIn: process.env.JWT_EXPIRE_IN || '30 days',
    jwtSecret: process.env.JWT_SECRET || 'nakhdajiojo987987aiuhaiaaaaab0090',
}));
