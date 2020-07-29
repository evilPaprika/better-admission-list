import { Box } from '@material-ui/core';
import React, { memo } from 'react';


export const Error404 = memo(() => {
    return (
        <Box>
            Запрашиваемая вами страница не найдена!
        </Box>
    );
});
