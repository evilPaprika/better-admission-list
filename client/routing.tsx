import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { ROUTES } from '_client/consts';
import { Error404 } from '_components/pages/error-page';
import { TablePage } from '_components/pages/table-page';


export default (
    <BrowserRouter>
        <Switch>
            <Redirect exact from={ROUTES.ROOT} to={ROUTES.TABLE} />
            <Route path={ROUTES.TABLE} component={TablePage} />
            <Route component={Error404} />
        </Switch>
    </BrowserRouter>
);
