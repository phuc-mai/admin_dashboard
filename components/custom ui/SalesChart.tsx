"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SalesChart = ({ graphData }: { graphData: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={graphData}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        className="w-full h-full"
      >
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
