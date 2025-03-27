
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

interface MarginalReturnsChartProps {
  data: any[];
}

export function MarginalReturnsChart({ data }: MarginalReturnsChartProps) {
  return (
    <div className="w-full" style={{ height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis
            dataKey="spend"
            tick={{ fontSize: 12 }}
            tickLine={false}
            tickFormatter={(value) => `$${value/1000}k`}
            label={{ value: "Media Spend", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={[0, 'auto']}
            label={{ value: "Return on Ad Spend", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="returns"
            stroke="#4361ee"
            name="ROAS"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="marginal"
            stroke="#ef476f"
            name="Marginal ROAS"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <ReferenceLine y={1} stroke="rgba(0,0,0,0.3)" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
