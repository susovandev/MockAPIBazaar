import { config } from '@/config/_config.js';
import Logger from '@/utils/logger.js';
import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await connect(
            config.node_env === 'development'
                ? config.database.development_uri
                : config.database.production_uri,
        );
        Logger.info('DATABASE CONNECTED SUCCESSFULLY');
        Logger.info(`HOST: ${connectionInstance.connection.host}`);
        Logger.info(`DB NAME: ${connectionInstance.connection.name}`);
        Logger.info(`PORT: ${connectionInstance.connection.port}`);
    } catch (error) {
        Logger.error(`DATABASE CONNECTION ERROR: ${error}`);
        process.exit(1);
    }
};

export default connectDB;
