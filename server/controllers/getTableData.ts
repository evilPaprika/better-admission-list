import { Context } from 'koa';
import fetch from 'node-fetch';
// @ts-ignore
import { safeMemoryCache } from 'safe-memory-cache';
// @ts-ignore
import { Tabletojson } from 'tabletojson';


const baseApiUrl = 'https://urfu.ru/api/ratings/alphabetical/1/';
const baseUrl = 'https://urfu.ru';
const cache = safeMemoryCache({ limit: 50 });

async function fetchLetterPage(num: number) {
    const response = await fetch(baseApiUrl + num);
    const data = await response.json();

    return new Promise((resolve) => {
        const cached = cache.get(data.url);
        if (cached) {
            resolve(cached);

            return;
        }
        Tabletojson.convertUrl(
            baseUrl + data.url,
            (tablesAsJson: any) => {
                cache.set(data.url, tablesAsJson);
                resolve(tablesAsJson);
            }
        );
    });
}

export async function getTableData(ctx: Context) {
    const pages = [];

    for (let i = 1; i < 34; i += 1) {
        if (i !== 11 && i !== 28 && i !== 30) {
            pages.push(fetchLetterPage(i));
        }
    }
    const result = await Promise.all(pages);

    ctx.status = 200;
    ctx.body = result.flat(2);
}
