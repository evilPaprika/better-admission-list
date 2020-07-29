import { Config } from 'config';


function throwError(message: string): string {
    // eslint-disable-next-line no-console
    console.error(message);

    return '';
}

const port = parseInt(process.env.PORT || '3000', 10);

const config: Config = {
    environment: 'development',
    port
};


export = config;
