
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
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { channelColors } from "@/data/mockData";

type ChannelTrendsChartProps = {
  data: any[];
  loading: boolean;
};

export function ChannelTrendsChart({ data, loading }: ChannelTrendsChartProps) {
  if (loading) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  // Get all available channels from first data point
  const channels = Object.keys(data[0] || {}).filter(
    (key) => key !== "name" && key !== "date" && key !== "totalRevenue"
  );

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "rgba(0,0,0,0.09)" }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value) => [`$${(value as number).toLocaleString()}`, ""]}
            contentStyle={{
              borderRadius: "0.5rem",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              border: "none",
              padding: "8px 12px",
            }}
          />
          <Legend />
          {channels.map((channel, index) => (
            <Line
              key={channel}
              type="monotone"
              dataKey={channel}
              stroke={channelColors[channel as keyof typeof channelColors] || `hsl(${index * 45}, 70%, 50%)`}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
