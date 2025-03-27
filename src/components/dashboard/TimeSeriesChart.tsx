
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
  Area,
  AreaChart
} from "recharts";
import { cn } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type TimeSeriesChartProps = {
  data: any[];
  series: {
    dataKey: string;
    color: string;
    label: string;
    type?: "line" | "area";
    strokeDasharray?: string;
  }[];
  xAxisKey?: string;
  loading?: boolean;
  height?: number;
  className?: string;
  stacked?: boolean;
};

export function TimeSeriesChart({
  data,
  series,
  xAxisKey = "date",
  loading = false,
  height = 350,
  className,
  stacked = false,
}: TimeSeriesChartProps) {
  if (loading) {
    return (
      <div className={cn("w-full animate-pulse", className)} style={{ height }}>
        <div className="h-full w-full bg-muted rounded-md"></div>
      </div>
    );
  }

  const chartConfig = series.reduce((acc, item) => {
    acc[item.dataKey] = { 
      label: item.label,
      color: item.color
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <ChartContainer className={cn("w-full", className)} style={{ height }} config={chartConfig}>
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
        <XAxis
          dataKey={xAxisKey}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: "rgba(0,0,0,0.09)" }}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent 
              formatter={(value, name) => {
                return [`$${Number(value).toLocaleString()}`, name];
              }}
            />
          }
        />
        <Legend 
          formatter={(value, entry, index) => (
            <span className="text-sm">{series[index]?.label || value}</span>
          )}
        />
        {series.map((item, index) => (
          item.type === "line" ? (
            <Line
              key={item.dataKey}
              type="monotone"
              dataKey={item.dataKey}
              name={item.label}
              stroke={item.color}
              strokeWidth={2}
              strokeDasharray={item.strokeDasharray}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              animationDuration={1000 + index * 250}
              animationBegin={index * 100}
              fill="transparent"
            />
          ) : (
            <Area
              key={item.dataKey}
              type="monotone"
              dataKey={item.dataKey}
              name={item.label}
              stroke={item.color}
              fill={item.color}
              strokeWidth={1.5}
              fillOpacity={0.3}
              animationDuration={1000 + index * 250}
              animationBegin={index * 100}
              stackId={stacked ? "stack" : undefined}
            />
          )
        ))}
      </AreaChart>
    </ChartContainer>
  );
}
