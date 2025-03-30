
import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";

type BudgetAllocationProps = {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  loading?: boolean;
  title?: string;
};

export function BudgetAllocationChart({ data, loading = false, title }: BudgetAllocationProps) {
  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-32 w-32 rounded-full bg-muted animate-pulse"></div>
      </div>
    );
  }

  // Create color config for the chart
  const colorConfig = data.reduce((acc, item) => {
    acc[item.name] = { color: item.color };
    return acc;
  }, {} as Record<string, { color: string }>);

  return (
    <div className="h-64">
      <ChartContainer config={colorConfig} className="w-full h-full">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            animationDuration={750}
            animationBegin={0}
            stroke="#111"
            strokeWidth={1}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))' }} />
            ))}
          </Pie>
          <Tooltip
            content={(props) => (
              <ChartTooltipContent
                formatter={(value) => `$${Number(value).toLocaleString()}`}
                {...props}
              />
            )}
          />
          <Legend 
            content={(props) => (
              <ChartLegendContent
                {...props}
                nameKey="name"
              />
            )}
            verticalAlign="bottom" 
            align="center"
          />
        </PieChart>
      </ChartContainer>
      {title && (
        <div className="text-center mt-2 text-sm text-muted-foreground">
          {title}
        </div>
      )}
    </div>
  );
}
