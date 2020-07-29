import config from 'config';
import Koa, { Context } from 'koa';
import compress from 'koa-compress';
import mount from 'koa-mount';
import send from 'koa-send';
import koaStatic from 'koa-static';
import koaWebpack from 'koa-webpack';
import path from 'path';
import webpack from 'webpack';

import webpackConfig from '../webpack.config';
import middlewares from './middlewares';
import router from './router';


const app = new Koa();

export default async function createApp() {
    if (config.environment === 'development') {
        const compiler = webpack(webpackConfig);
        const hmrMiddleware = await koaWebpack({ compiler });
        app.use(hmrMiddleware);
        router.get('*', async (ctx) => {
            const filename = path.resolve(compiler.options.output?.path!, 'index.html');
            ctx.response.type = 'html';
            ctx.response.body = hmrMiddleware.devMiddleware.fileSystem.createReadStream(filename);
        });
    } else {
        router.get('*', async (ctx: Context) => {
            await send(ctx, 'build/static/index.html');
        });
    }
    app.use(compress({
        threshold: 2048,
        gzip: {
            // eslint-disable-next-line global-require
            flush: require('zlib').constants.Z_SYNC_FLUSH
        },
        deflate: {
            // eslint-disable-next-line global-require
            flush: require('zlib').constants.Z_SYNC_FLUSH,
        },
        br: false
    }));

    app.use(middlewares);
    app.use(mount('/static', koaStatic(path.join(__dirname, '..', 'static'))));
    app.use(router.routes());
    app.use(router.allowedMethods());

    return app;
}
