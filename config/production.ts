import { Config } from 'config';


const config: Partial<Config> = {
    environment: 'production',
    port: parseInt(process.env.PORT || '80', 10),
};

export = config;
