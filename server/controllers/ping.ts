import { Context } from 'koa';


export function ping(ctx: Context) {
    // TODO check db connection too
    ctx.status = 200;
    ctx.body = 'Pong!';
}
