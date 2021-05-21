import React from 'react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from 'recharts';

export default function DayTempChart({ dailyTemp }) {
  const data = [
      {
      name: dailyTemp[1][0],
      Temperature: Math.round(dailyTemp[1][1]),
    },
      {
      name: dailyTemp[5][0],
      Temperature: Math.round(dailyTemp[5][1]),
    },
      {
      name: dailyTemp[0][0],
      Temperature: Math.round(dailyTemp[0][1]),
    },
      {
      name: dailyTemp[2][0],
      Temperature: Math.round(dailyTemp[2][1]),
    },
      {
      name: dailyTemp[4][0],
      Temperature: Math.round(dailyTemp[4][1]),
    },
      {
      name: dailyTemp[3][0],
      Temperature: Math.round(dailyTemp[3][1]),
    },
  ];

  return (
    <ResponsiveContainer width="90%" height={100}>
      <LineChart
        data = {data}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <Tooltip />
        <Line type="monotone" dataKey="Temperature" stroke="#db3312" />
      </LineChart>
    </ResponsiveContainer>
  );
}
