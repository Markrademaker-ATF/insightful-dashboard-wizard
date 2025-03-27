
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
import { cn } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type MediaSaturationChartProps = {
  data: any[];
  curves: {
    dataKey: string;
    color: string;
    label: string;
  }[];
  xAxisKey?: string;
  loading?: boolean;
  height?: number;
  className?: string;
};

export function MediaSaturationChart({
  data,
  curves,
  xAxisKey = "spend",
  loading = false,
  height = 350,
  className,
}: MediaSaturationChartProps) {
  if (loading) {
    return (
      <div className={cn("w-full animate-pulse", className)} style={{ height }}>
        <div className="h-full w-full bg-muted rounded-md"></div>
      </div>
    );
  }

  const chartConfig = curves.reduce((acc, curve) => {
    acc[curve.dataKey] = { 
      label: curve.label,
      color: curve.color
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <ChartContainer className={cn("w-full", className)} style={{ height }} config={chartConfig}>
      <LineChart
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
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          label={{ value: "Media Spend", position: "insideBottom", offset: -5 }}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          label={{ value: "Incremental Revenue", angle: -90, position: "insideLeft" }}
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
            <span className="text-sm">{curves[index]?.label || value}</span>
          )}
        />
        {curves.map((curve, index) => (
          <Line
            key={curve.dataKey}
            type="monotone"
            dataKey={curve.dataKey}
            name={curve.label}
            stroke={curve.color}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            animationDuration={1000 + index * 250}
            animationBegin={index * 100}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}
