import { registerAs } from '@nestjs/config';


export default registerAs('http', () => ({
    cors: process.env.CORS || '*',
    host: process.env.HTTP_HOST || 'localhost',
    port: process.env.PORT || process.env.HTTP_PORT || 3000,
}));
