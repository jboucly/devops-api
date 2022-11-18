import { registerAs } from '@nestjs/config';
import { join } from 'path';

export const DIRNAME_PATH: string = __dirname.toString().includes('dist')
    ? join(__dirname, '..', '..', '..', 'src')
    : __dirname;

export default registerAs('commons', () => ({
    env: process.env.NODE_ENV,
    version: process.env.npm_package_version,
    versioning: process.env.VERSIONING || '1',
    isProdEnv: process.env.NODE_ENV === 'prod',
    frontUrl: process.env.FRONT_URL ? process.env.FRONT_URL : 'http://localhost:4200',
}));
