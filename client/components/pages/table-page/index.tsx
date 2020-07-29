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
import useAxios from 'axios-hooks';
import React, { memo } from 'react';

import { Table } from '_components/common/Table';


export const TablePage = memo(() => {
    const [{ data, loading, error }] = useAxios({
        baseURL: '/get-table-data'
    });

    return (
        <Box>
            <CssBaseline />
            <Table
                columns={[
                    { title: 'ФИО', field: 'Фамилия Имя Отчество' },
                    { title: 'Направление', field: 'Направление (специальность)' },
                    { title: 'Институт/Филиал', field: 'Образовательная/магистерская программа (институт/филиал)' },
                    {
                        title: 'Вступительные испытания по предметам',
                        field: 'Вступительные испытания по предметам',

                    },
                    {
                        title: 'Бюджетная (контрактная) основа',
                        field: 'Бюджетная (контрактная) основа',
                    },
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
                open={loading}
            >
                <Box pb={2}>
                    <CircularProgress size={80} thickness={5} color="secondary" />
                </Box>
                <Box>
                    <Typography variant="h6" style={{ color: 'white' }}>Загрузка может занять ~1 минуты</Typography>
                </Box>
            </Backdrop>
            {error && (
                <Box>
                    <Typography variant="h6" style={{ color: 'orange' }}>Произошла ошибка 😭</Typography>
                </Box>
            )}

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
