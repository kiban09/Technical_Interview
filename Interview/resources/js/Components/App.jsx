import React, { Fragment, useState } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';

function App() {
    const [inputUrl, setInputUrl] = useState('');
    const [responseData, setResponseData] = useState('');
    const [InvertedResponseData, setInvertedResponseData] = useState('');

    const handleOnChange = (event) => {
        setInputUrl(event.target.value);
    }

    const handleClickButton = async (e) => {
        e.preventDefault();

        try {
            const postResponse = await fetch('/api/passUrl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inputUrl })
            });
            const postData = await postResponse.json();
            const { data, invertedData } = postData;
            setResponseData(data);
            setInvertedResponseData(invertedData);

            console.log("data from the back", postData);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Fragment>

            <Grid container spacing={1}>
                <Grid item lg={1}>
                    <Typography fontSize={40}>URL</Typography>
                </Grid>
                <Grid item lg={9}>
                    <TextField
                        placeholder="Enter URL"
                        fullWidth={true}
                        value={inputUrl}
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item lg={2}>
                    <Button
                        size="large"
                        variant='contained'
                        fullWidth={true}
                        onClick={handleClickButton}
                    >
                        Query
                    </Button>
                </Grid>
            </Grid>

            <Box sx={{ mt: 8 }}>
                <Grid container spacing={1}>
                    <Grid item lg={6}>
                        <Typography fontSize={20}>URL Response</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={25}
                            overflow="scroll"
                            value={responseData}
                        />
                    </Grid>
                    <Grid item lg={6}>
                        <Typography fontSize={20}>Inverted URL Response</Typography>
                        <TextField fullWidth
                            multiline
                            rows={25}
                            overflow="scroll"
                            value={InvertedResponseData}
                        />
                    </Grid>
                </Grid>
            </Box>

        </Fragment>
    )
}

export default App