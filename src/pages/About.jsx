import React from 'react';
import { Box, Typography } from '@mui/material';

const About = () => (
  <Box sx={{ p: 5 }}>
    <Typography variant="h4">About</Typography>
    <Typography>This app helps you calculate loan EMIs and view live exchange rates.</Typography>
  </Box>
);

export default About;