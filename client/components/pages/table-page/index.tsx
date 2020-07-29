import {
    Backdrop,
    Box,
    Card,
    CardContent,
    CircularProgress,
    CssBaseline,
    Link,
    Typography
} from '@material-ui/core';
// @ts-ignore
import HtmlTableToJson from 'html-table-to-json';
import fetch from 'node-fetch';
import React, { memo, useEffect, useState } from 'react';

import { Table } from '_components/common/Table';


const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';
const baseApiUrl = 'https://urfu.ru/api/ratings/alphabetical/1/';
const baseUrl = 'https://urfu.ru';

async function fetchLetterPage(num: number): [] {
    const response = await fetch(proxyUrl + baseApiUrl + num);
    const data = await response.json();

    const page = await fetch(proxyUrl + baseUrl + data.url);
    const pagedata = await page.text();
    const jsonTables = HtmlTableToJson.parse(pagedata);

    return jsonTables.results;
}


export const TablePage = memo(() => {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getTableData() {
            const pages = [];

            for (let i = 1; i < 34; i += 1) {
                if (i !== 11 && i !== 28 && i !== 30) {
                    pages.push(fetchLetterPage(i));
                }
            }

            const result = await Promise.all(pages);
            setData(result.flat(2));
        }

        getTableData();
    }, []);

    return (
        <Box>
            <CssBaseline />
            <Table
                columns={[
                    { field: 'Фамилия Имя Отчество', title: 'Фамилия Имя Отчество' },
                    { field: 'Рег.№', title: 'Рег.№' },
                    { field: 'Состояние', title: 'Состояние' },
                    { field: 'Вид конкурса', title: 'Вид конкурса' },
                    { field: 'Заявление о согласиии на зачисление', title: 'Заявление о согласиии на зачисление' },
                    { field: 'Направление (специальность)', title: 'Направление (специальность)' },
                    {
                        field: 'Образовательная/магистерская программа (институт/филиал)',
                        title: 'Образовательная/магистерская программа (институт/филиал)'
                    },
                    { field: 'Форма обучения', title: 'Форма обучения' },
                    { field: 'Бюджетная (контрактная) основа', title: 'Бюджетная (контрактная) основа' },
                    { field: 'Вступительные испытания по предметам', title: 'Вступительные испытания по предметам' },
                    { field: 'Индивидуальные достижения', title: 'Индивидуальные достижения' },
                    { field: 'Сумма конкурсных баллов', title: 'Сумма конкурсных баллов' },
                ]}
                data={data}
                title="Списки поступающих"
                options={{
                    filtering: true
                }}
            />
            <Backdrop
                style={{
                    zIndex: 35001,
                    flexDirection: 'column',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)'
                }}
                open={!data.length}
            >
                <Box pb={2}>
                    <CircularProgress size={80} thickness={5} color="secondary" />
                </Box>
                <Box>
                    <Typography variant="h6" style={{ color: 'white' }}>Загрузка может занять ~1 минуты</Typography>
                </Box>
            </Backdrop>
            <Card>
                <CardContent>
                    <Typography>
                        Telegram: @evil_paprika<br />
                        Github:<span> </span>
                        <Link href="https://github.com/evilPaprika/better-admission-list">
                            https://github.com/evilPaprika/better-admission-list
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
});
