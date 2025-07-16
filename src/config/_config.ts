import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const _config = {
    node_env: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 3000,
    database: {
        production_uri: process.env.PRODUCTION_DATABASE_URI as string,
        development_uri: process.env.DEVELOPMENT_DATABASE_URI as string,
    },
};

export const config = Object.freeze(_config);
