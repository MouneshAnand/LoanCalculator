import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Card, CardContent } from '@mui/material';

const Home = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [termYears, setTermYears] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const interest = parseFloat(interestRate) / 100 / 12;
    const payments = parseFloat(termYears) * 12;

    const emi = (principal * interest * Math.pow(1 + interest, payments)) /
      (Math.pow(1 + interest, payments) - 1);

    setMonthlyPayment(emi.toFixed(2));
  };

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" gutterBottom>Loan Calculator Dashboard</Typography>
      <Grid container spacing={2} maxWidth={800}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Loan Amount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Interest Rate (%)"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Term (Years)"
            type="number"
            value={termYears}
            onChange={(e) => setTermYears(e.target.value)}
          />
        </Grid>
      </Grid>
      <Box mt={3}>
        <Button variant="contained" onClick={calculateEMI}>CALCULATE</Button>
      </Box>
      {monthlyPayment && (
        <Card sx={{ mt: 4, maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h6">Monthly EMI:</Typography>
            <Typography variant="h5">₹{monthlyPayment}</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Home;