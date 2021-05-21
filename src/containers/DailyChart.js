import React from 'react';
import timeStampToDate from '../helpers/timeStampToDate';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  Legend,
} from 'recharts';

export default function DailyChart({ dailyForecast }) {
  const data = dailyForecast.map((item, i) => {
    return {
      name: timeStampToDate(item.dt),
      Temperature: Math.round(item.temp.day),
      WindSpeed: item.wind_speed,
      Rain: Math.round(item.pop * 100),
    };
  });
  return (
    <ResponsiveContainer width="90%" height={250}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="Temperature" stroke="#db3312" />
        <Line yAxisId="right" type="monotone" dataKey="Rain" stroke="#1261e0" />
        <Line yAxisId="left" type="monotone" dataKey="WindSpeed" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
