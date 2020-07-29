import { Config } from 'config';


const config: Config = {
    environment: 'development',
    port: parseInt(process.env.PORT || '3000', 10)
};


export = config;
