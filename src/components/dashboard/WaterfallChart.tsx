
import React from "react";
import { 
  BarChart, 
  Bar, 
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

type WaterfallChartProps = {
  data: {
    name: string;
    value: number;
    fill: string;
    isTotal?: boolean;
  }[];
  loading?: boolean;
  height?: number;
  className?: string;
};

export function WaterfallChart({
  data,
  loading = false,
  height = 350,
  className,
}: WaterfallChartProps) {
  if (loading) {
    return (
      <div className={cn("w-full animate-pulse", className)} style={{ height }}>
        <div className="h-full w-full bg-muted rounded-md"></div>
      </div>
    );
  }

  // Calculate the running total for each bar
  let total = 0;
  const chartData = data.map((item) => {
    if (item.isTotal) {
      return { ...item, start: 0, end: item.value };
    }
    
    const start = total;
    total += item.value;
    
    return {
      ...item,
      start,
      end: total,
    };
  });

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
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
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="rounded-lg border border-border/50 bg-background px-3 py-2 text-sm shadow-xl">
                    <p className="font-medium">{data.name}</p>
                    <p className="text-muted-foreground pt-1">
                      {data.isTotal ? "Total" : "Contribution"}: ${Math.abs(data.value).toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar 
            dataKey="value" 
            fill="var(--fill-color)" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          >
            {chartData.map((entry, index) => (
              <defs key={`cell-${index}`}>
                <linearGradient id={`colorUv${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={entry.fill} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={entry.fill} stopOpacity={0.6}/>
                </linearGradient>
              </defs>
            ))}
            {chartData.map((entry, index) => (
              <cell 
                key={`cell-${index}`} 
                fill={entry.isTotal ? `url(#colorUv${index})` : entry.fill} 
                style={{ "--fill-color": entry.fill } as React.CSSProperties} 
              />
            ))}
          </Bar>
          <ReferenceLine y={0} stroke="rgba(0,0,0,0.3)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
