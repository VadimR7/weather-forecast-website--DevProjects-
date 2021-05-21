import React from 'react';
import timeStampToDate from '../helpers/timeStampToDate';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from 'recharts';

export default function HourlyChart({ hourlyForecast, tabValue}) {
  const data = hourlyForecast.map((item, i) => {
    return {
      name: `${timeStampToDate(item.dt, 'getHourOnly')}:00`,
      Temperature: Math.round(item.temp),
      Rain: Math.round(item.pop * 100),
      WindSpeed: Math.round(item.wind_speed),
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
        {tabValue === 0 && <Line type="monotone" dataKey="Temperature" stroke="#db3312" />}
        {tabValue === 1 && <Line type="monotone" dataKey="Rain" stroke="#1261e0" />}
        {tabValue === 2 && <Line type="monotone" dataKey="WindSpeed" stroke="#82ca9d" />}
      </LineChart>
    </ResponsiveContainer>
  );
}
