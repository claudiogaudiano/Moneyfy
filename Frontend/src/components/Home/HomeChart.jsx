import { Typography, Box } from '@mui/material';
import React from 'react';
import { Pie } from 'react-chartjs-2';

const HomeChart = ({ totSpese, totGuadagni }) => {
    const isEmptyData = totSpese === 0 && totGuadagni === 0;

    if (isEmptyData) {
        return <Box sx={{ display: 'flex', direction: 'row'}}>
            <Typography sx={{mt: 20, fontSize: 25}}>
                Nessun dato disponibile, vai alla sezione Transazioni 
                per visualizzarle o modificarle e poi torna alla Home per 
                visualizzarle nel grafico 
            </Typography>
        </Box>;
    }
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
                    sx={{ textAlign: 'center', fontWeight: '400' }}>
                    Differenza tra Spese e guadagni: <span style={{ fontSize: 23, fontWeight: "bold", marginLeft: 5 }}>{totGuadagni - totSpese} €</span>
                </Typography>
            </Box>
        </Box>
    );
}

export default HomeChart;