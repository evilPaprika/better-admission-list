import { Box, Fade } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ROUTES } from '_client/consts';


const PageTransitionHOC = (Component: React.ElementType) => (
    () => (
        <Fade mountOnEnter in>
            <Box width="100%">
                <Component />
            </Box>
        </Fade>
    )
);

export default (
    <BrowserRouter>
        <Switch>
            <Route path={ROUTES.TABLE} component={PageTransitionHOC(TablePage)} />
            <Route component={PageTransitionHOC(Error404)} />
        </Switch>
    </BrowserRouter>
);
