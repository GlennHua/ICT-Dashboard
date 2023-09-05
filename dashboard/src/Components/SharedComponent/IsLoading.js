import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import React from 'react'
import { Typography } from '@mui/material';

const IsLoading = () => {
  return (
    <Box sx={{ width: '100%' }}>
        <LinearProgress sx={{marginTop: 5}} />
        <Typography align='center' variant='h6' mt={5}>
            This might take some time...
        </Typography>
    </Box>
  )
}

export default IsLoading