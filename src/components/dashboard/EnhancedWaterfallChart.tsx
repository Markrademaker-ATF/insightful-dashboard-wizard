
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  Label,
} from "recharts";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Define enhanced colors for different category types
const categoryColors = {
  baseline: "#9b87f5", // Primary Purple
  nonPaid: "#0EA5E9", // Ocean Blue
  organic: "#6E59A5", // Tertiary Purple
  paid: "#F97316", // Bright Orange
  total: "#33C3F0", // Sky Blue
};

type WaterfallDataItem = {
  name: string;
  value: number;
  fill: string;
  start?: number;
  end?: number;
  isTotal?: boolean;
  displayValue?: number;
};

type EnhancedWaterfallChartProps = {
  data: any[];
  loading?: boolean;
  height?: number;
  className?: string;
};

export function EnhancedWaterfallChart({
  data,
  loading = false,
  height = 400,
  className,
}: EnhancedWaterfallChartProps) {
  if (loading) {
    return (
      <div className={cn("w-full", className)}>
        <Skeleton className="w-full" style={{ height }} />
      </div>
    );
  }
  
  // Transform data for waterfall chart
  const prepareWaterfallData = (): WaterfallDataItem[] => {
    if (!data || data.length === 0) return [];
    
    // Take the latest data point
    const latestData = data[data.length - 1];
    
    // Create waterfall data structure
    return [
      { name: 'Baseline', value: latestData.baseline, fill: categoryColors.baseline, isTotal: false },
      { name: 'Non-Paid Media', value: latestData.nonPaid, fill: categoryColors.nonPaid, isTotal: false },
      { name: 'Organic Media', value: latestData.organic, fill: categoryColors.organic, isTotal: false },
      { name: 'Paid Media', value: latestData.paid, fill: categoryColors.paid, isTotal: false },
      { name: 'Total', value: latestData.total, fill: categoryColors.total, isTotal: true }
    ];
  };
  
  // Calculate running totals for waterfall positioning
  const calculateRunningTotal = (data: WaterfallDataItem[]): WaterfallDataItem[] => {
    let runningTotal = 0;
    
    return data.map(item => {
      if (item.isTotal) {
        // For total item, set start to 0 and end to the total value
        return { ...item, start: 0, end: item.value, displayValue: item.value };
      } else {
        // For regular items, set start to current running total
        const start = runningTotal;
        runningTotal += item.value;
        
        return { 
          ...item, 
          start, 
          end: runningTotal,
          displayValue: item.value
        };
      }
    });
  };
  
  const waterfallData = prepareWaterfallData();
  const chartData = calculateRunningTotal(waterfallData);
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Card className="shadow-lg border-border/60">
          <CardContent className="py-3 px-4">
            <p className="font-medium text-base">{data.name}</p>
            <p className="text-muted-foreground text-sm mt-1">
              {data.isTotal 
                ? `Total: $${Math.abs(data.value).toLocaleString()}`
                : `Contribution: $${Math.abs(data.value).toLocaleString()}`
              }
            </p>
            {!data.isTotal && (
              <p className="text-xs text-muted-foreground mt-1">
                Running total: ${data.end.toLocaleString()}
              </p>
            )}
          </CardContent>
        </Card>
      );
    }
    return null;
  };
  
  // Custom label for bars
  const renderCustomBarLabel = (props: any) => {
    const { x, y, width, height, value, index } = props;
    const item = chartData[index];
    
    // Only show labels if bar is large enough
    if (height < 20) return null;
    
    const displayText = `$${Math.abs(item.displayValue).toLocaleString()}`;
    
    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={13}
        fontWeight="500"
        style={{ textShadow: "0px 1px 2px rgba(0,0,0,0.3)" }}
      >
        {displayText}
      </text>
    );
  };
  
  return (
    <div className={cn("w-full", className)}>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barGap={0}
            barCategoryGap={10}
          >
            <defs>
              {Object.entries(categoryColors).map(([key, color]) => (
                <linearGradient
                  key={key}
                  id={`color${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.9} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.7} />
                </linearGradient>
              ))}
              <filter id="shadow" height="130%">
                <feDropShadow
                  dx="0"
                  dy="3"
                  stdDeviation="3"
                  floodColor="rgba(0, 0, 0, 0.15)"
                />
              </filter>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="rgba(0,0,0,0.05)"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fontWeight: 500 }}
              tickLine={false}
              axisLine={{ stroke: "rgba(0,0,0,0.09)" }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36}
            />
            <Bar 
              dataKey="end" 
              stackId="a"
              fill="rgba(0,0,0,0)"
              stroke="rgba(0,0,0,0)"
            />
            <Bar
              dataKey="displayValue"
              stackId="a"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-in-out"
              filter="url(#shadow)"
            >
              <Label content={renderCustomBarLabel} />
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#color${entry.isTotal ? 'total' : entry.name.toLowerCase().replace(/\s+/g, '')})`}
                  stroke={entry.fill}
                  strokeWidth={1}
                  style={{
                    filter: entry.isTotal
                      ? 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))'
                      : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" /> 
          The waterfall chart shows how each media type contributes to the total revenue, starting with baseline and adding each additional component.
        </p>
      </div>
    </div>
  );
}
