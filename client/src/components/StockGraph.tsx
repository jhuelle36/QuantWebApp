import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { date: '2024-01-01', close: 150 },
  { date: '2024-01-02', close: 153 },
  { date: '2024-01-03', close: 148 },
];

const StockGraph = () => (
  <LineChart width={600} height={300} data={data}>
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
    <Line type="monotone" dataKey="close" stroke="#8884d8" />
  </LineChart>
);

export default StockGraph;
