import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import styles from './styles.module.scss';

function CustomChart({
  arrResponse,
  code,
}: {
  arrResponse: Array<{ date: string; value: number | unknown }>;
  code: string;
}) {
  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={arrResponse}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey={'value'}
            stroke="#82ca9d"
            name={code}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomChart;
