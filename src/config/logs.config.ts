import { registerAs } from '@nestjs/config';

export default registerAs('logs', () => ({
    nest: process.env.IS_ALLOW_NEST_LOG === 'true' || false,
    swagger: process.env.IS_ALLOW_API_DOCS === 'true' || false,
    orm: process.env.IS_ALLOW_TYPE_ORM_LOG === 'true' || false,
}));
