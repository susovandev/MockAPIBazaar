import { config } from '@/config/_config.js';
import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await connect(
            config.node_env === 'development'
                ? config.database.development_uri
                : config.database.production_uri,
        );
        console.log(`DATABASE CONNECTED SUCCESSFULLY: \n
            DATABASE HOST: ${connectionInstance.connection.host}\n
            DATABASE NAME: ${connectionInstance.connection.name}\n
            DATABASE PORT: ${connectionInstance.connection.port}\n
            `);
    } catch (error) {
        console.log(`DATABASE CONNECTION ERROR: ${error}`);
        process.exit(1);
    }
};

export default connectDB;
