import { Context } from 'koa';
import KoaRouter from 'koa-router';
import send from 'koa-send';

import { getTableData } from './controllers/getTableData';
import { ping } from './controllers/ping';


const router = new KoaRouter();

router.get('/ping', ping);
router.get('/get-table-data', getTableData);
router.get('/robots.txt', async (ctx: Context) => {
    await send(ctx, 'build/static/robots.txt');
});

export default router;
