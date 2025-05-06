import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function generateAmortizationSchedule(principal, rate, termYears) {
  const months = termYears * 12;
  const monthlyRate = rate / 100 / 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
              (Math.pow(1 + monthlyRate, months) - 1);

  let balance = principal;
  const schedule = [];

  for (let i = 1; i <= months; i++) {
    const interest = balance * monthlyRate;
    const principalPayment = emi - interest;
    balance -= principalPayment;

    schedule.push({
      month: i,
      emi: emi.toFixed(2),
      principal: principalPayment.toFixed(2),
      interest: interest.toFixed(2),
      balance: balance > 0 ? balance.toFixed(2) : '0.00',
    });
  }
  return schedule;
}

export default function Home() {
  const [loanAmount, setLoanAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [schedule, setSchedule] = useState([]);

  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₹';

  const handleCalculate = () => {
    const sched = generateAmortizationSchedule(Number(loanAmount), Number(rate), Number(term));
    setSchedule(sched);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Loan Calculator Dashboard</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Loan Amount"
            type="number"
            variant="outlined"
            fullWidth
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Interest Rate (%)"
            type="number"
            variant="outlined"
            fullWidth
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Term (Years)"
            type="number"
            variant="outlined"
            fullWidth
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            select
            label="Currency"
            variant="outlined"
            fullWidth
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value="INR">INR</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={1}>
          <Button
            variant="contained"
            sx={{ bgcolor: 'black', color: 'white' }}
            fullWidth
            onClick={handleCalculate}
          >
            CALCULATE
          </Button>
        </Grid>
      </Grid>

      {schedule.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell>EMI ({currencySymbol})</TableCell>
                <TableCell>Principal</TableCell>
                <TableCell>Interest</TableCell>
                <TableCell>Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>{currencySymbol}{row.emi}</TableCell>
                  <TableCell>{currencySymbol}{row.principal}</TableCell>
                  <TableCell>{currencySymbol}{row.interest}</TableCell>
                  <TableCell>{currencySymbol}{row.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
