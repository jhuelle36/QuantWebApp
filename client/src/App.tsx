import React from 'react';
import { Container, Typography } from '@mui/material';
import StockSearch from './components/StockSearch';

function App() {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Stock Market Data
      </Typography>
      <StockSearch />
    </Container>
  );
}

export default App;
