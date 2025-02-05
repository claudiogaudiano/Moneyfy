import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import logo from '../../moneyfy_icon.png'

const FixedLayout = ({ totSpese, totGuadagni }) => {
    return (
        <>
            <Sidebar />
            <AppBar id="appBar" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                <img src={logo} alt="Moneyfy Logo" style={{ marginRight: '16px', marginLeft: '-8px',height: '35px' }} />
                    <Typography variant="h6" noWrap component="div">
                        Moneyfy
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box id="mainContent"
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    ml: `240px`,
                    mt: `64px`,
                }}
            >
                <Outlet context={{ totSpese, totGuadagni }} />
            </Box>
        </>
    );
};

export default FixedLayout;