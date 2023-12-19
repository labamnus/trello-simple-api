import * as process from 'process';

export const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT) || 3001,
    JWT_SECRET: process.env.JWT_SECRET,
});
