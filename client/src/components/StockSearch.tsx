import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Box } from '@mui/material';

interface StockSearchResult {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
}

interface HistoricalData {
  symbol: string;
  historical: Array<{
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }>;
}

const StockSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [historicalQuery, setHistoricalQuery] = useState('');
  const [searchResults, setSearchResults] = useState<StockSearchResult[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:5231/api/stock/search/${searchQuery}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError('Failed to fetch search results');
    } finally {
      setLoading(false);
    }
  };

  const handleHistoricalSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:5231/api/stock/historical/${historicalQuery}`);
      const data = await response.json();
      setHistoricalData(data);
    } catch (err) {
      setError('Failed to fetch historical data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Stock Search
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Search Stocks"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
            {searchResults.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Search Results:
                </Typography>
                {searchResults.map((result, index) => (
                  <Paper key={index} sx={{ p: 1, mb: 1 }}>
                    <Typography><strong>{result.symbol}</strong> - {result.name}</Typography>
                    <Typography variant="body2">Exchange: {result.stockExchange}</Typography>
                  </Paper>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Historical Data
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Enter Stock Symbol"
                  value={historicalQuery}
                  onChange={(e) => setHistoricalQuery(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleHistoricalSearch}
                  disabled={loading}
                >
                  Get History
                </Button>
              </Grid>
            </Grid>
            {historicalData && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Historical Data for {historicalData.symbol}:
                </Typography>
                {historicalData.historical.slice(0, 5).map((data, index) => (
                  <Paper key={index} sx={{ p: 1, mb: 1 }}>
                    <Typography><strong>Date:</strong> {data.date}</Typography>
                    <Typography variant="body2">
                      Open: ${data.open} | High: ${data.high} | Low: ${data.low} | Close: ${data.close}
                    </Typography>
                    <Typography variant="body2">Volume: {data.volume}</Typography>
                  </Paper>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Typography color="error">{error}</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default StockSearch;