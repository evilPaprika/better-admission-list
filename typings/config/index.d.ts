interface IConfig {
    port: number;
    environment: 'production' | 'development';
}

declare module 'config' {
    export interface Config extends IConfig {}
    const config: Config;
    export default config;
}

declare const CONFIG: IConfig; // only for bundled files, so ConfigWebpackPlugin works
