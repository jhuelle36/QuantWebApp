import React, { useState } from 'react';

const StockSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:5231/api/stock/search?query=${query}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
};

export default StockSearch;