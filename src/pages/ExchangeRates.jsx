import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const ExchangeRates = () => {
  const [rates, setRates] = useState({});

  useEffect(() => {
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => setRates(res.data.rates))
      .catch(err => console.error('Error fetching exchange rates', err));
  }, []);

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" gutterBottom>Live Exchange Rates (USD)</Typography>
      <List>
        {Object.entries(rates).map(([currency, rate]) => (
          <ListItem key={currency}>
            <ListItemText primary={`${currency}: ${rate}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ExchangeRates;
