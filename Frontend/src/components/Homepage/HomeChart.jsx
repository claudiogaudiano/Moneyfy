import { Typography, Box } from '@mui/material';
import React from 'react';
import { Pie } from 'react-chartjs-2';

const HomeChart = ({ totSpese, totGuadagni }) => {

    const data = {
        labels: ['Spese', 'Guadagni'],
        datasets: [
            {
                data: [totSpese, totGuadagni],
                backgroundColor: [
                    'rgba(179, 47, 47, 0.5)',
                    'rgba(51, 255, 0, 0.5)'
                ],
                borderColor: [
                    'rgba(179, 47, 47, 0.5)',
                    'rgba(51, 255, 0, 0.5)'
                ],
                borderWidth: 1,
                width: '100vw',
                height: '100vh',
            },
        ],
    };

    return (
        <Box sx={{ height: '400px' }} id='container'>
            <Box style={{ width: '400px', height: '400px' }}>
                <Pie data={data} />
                <br />
                <Typography variant="h6" gutterBottom
                    sx={{ textAlign: 'center', fontWeight: '400'}}>
                    Totale Spese di questo mese: {totSpese} € <br />
                    Totale Guadagni di questo mese: {totGuadagni} €
                </Typography>
            </Box>
        </Box>
    );
}

export default HomeChart;