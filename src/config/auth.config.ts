import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
    jwtExpireIn: process.env.JWT_EXPIRE_IN || '30 days',
    jwtSecret: process.env.JWT_SECRET || 'nakhdajiojo987987aiuhaiaaaaab0090',
}));
