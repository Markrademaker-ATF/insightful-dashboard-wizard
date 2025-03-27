
import React, { useState } from "react";
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
  AreaChart,
  ReferenceArea,
  ReferenceLine,
  Brush,
  Scatter,
  ScatterChart,
  ZAxis,
  ComposedChart
} from "recharts";
import { cn } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type TimeSeriesChartProps = {
  data: any[];
  series: {
    dataKey: string;
    color: string;
    label: string;
    type?: "line" | "area" | "scatter";
    strokeDasharray?: string;
    hidden?: boolean;
  }[];
  xAxisKey?: string;
  loading?: boolean;
  height?: number;
  className?: string;
  stacked?: boolean;
  showBrush?: boolean;
  showRollingAverage?: boolean;
  comparisonPeriod?: {start: number, end: number} | null;
  roasScatterVisible?: boolean;
};

export function TimeSeriesChart({
  data,
  series,
  xAxisKey = "date",
  loading = false,
  height = 350,
  className,
  stacked = false,
  showBrush = false,
  showRollingAverage = false,
  comparisonPeriod = null,
  roasScatterVisible = false,
}: TimeSeriesChartProps) {
  const [visibleSeries, setVisibleSeries] = useState<string[]>(
    series.map(s => s.dataKey)
  );

  // Calculate rolling average (7-period) for the total
  const rollingAverageData = React.useMemo(() => {
    if (!showRollingAverage) return [];
    
    const revenueSeries = series.find(s => s.dataKey === "revenue");
    if (!revenueSeries) return [];
    
    const windowSize = 7;
    return data.map((item, index) => {
      if (index < windowSize - 1) return { ...item, rollingAvg: null };
      
      let sum = 0;
      for (let i = 0; i < windowSize; i++) {
        sum += data[index - i].revenue;
      }
      
      return {
        ...item,
        rollingAvg: sum / windowSize
      };
    });
  }, [data, showRollingAverage, series]);

  // Filter series by visibility
  const filteredSeries = series.filter(s => visibleSeries.includes(s.dataKey) || s.dataKey === "rollingAvg");
  
  // Handle legend click to toggle series visibility
  const handleLegendClick = (e: any) => {
    const { dataKey } = e;
    
    setVisibleSeries(prev => {
      if (prev.includes(dataKey)) {
        return prev.filter(key => key !== dataKey);
      } else {
        return [...prev, dataKey];
      }
    });
  };

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

  // Add rolling average to config
  if (showRollingAverage) {
    chartConfig.rollingAvg = {
      label: "Rolling Average (7-period)",
      color: "#9b87f5" // Primary purple
    };
  }

  return (
    <ChartContainer className={cn("w-full", className)} style={{ height }} config={chartConfig}>
      <ComposedChart
        data={showRollingAverage ? rollingAverageData : data}
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
          yAxisId="left"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        {roasScatterVisible && (
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={[0, 'dataMax + 1']}
            label={{ value: 'ROAS', angle: -90, position: 'insideRight' }}
          />
        )}
        <ChartTooltip
          content={
            <ChartTooltipContent 
              formatter={(value, name) => {
                if (name === "roas") {
                  return [`${Number(value).toFixed(2)}x`, name];
                }
                return [`$${Number(value).toLocaleString()}`, name];
              }}
            />
          }
        />
        <Legend 
          onClick={handleLegendClick}
          formatter={(value, entry, index) => {
            const seriesItem = series[index];
            if (!seriesItem) return <span className="text-sm">{value}</span>;
            
            const isActive = visibleSeries.includes(seriesItem.dataKey);
            return (
              <span className={cn("text-sm", {"opacity-50": !isActive})}>
                {seriesItem.label || value}
              </span>
            );
          }}
        />

        {/* Reference area for comparison period */}
        {comparisonPeriod && (
          <ReferenceArea 
            x1={comparisonPeriod.start} 
            x2={comparisonPeriod.end} 
            fill="#8884d83a" 
            fillOpacity={0.3} 
          />
        )}

        {/* Render each series based on visibility and type */}
        {filteredSeries.map((item, index) => {
          const isVisible = visibleSeries.includes(item.dataKey);
          if (!isVisible && item.dataKey !== "rollingAvg") return null;
          
          if (item.type === "scatter" && roasScatterVisible) {
            return (
              <Scatter
                key={item.dataKey}
                dataKey={item.dataKey}
                name={item.label}
                fill={item.color}
                yAxisId="right"
                animationDuration={1000 + index * 250}
                animationBegin={index * 100}
              />
            );
          } else if (item.type === "line" || item.dataKey === "rollingAvg") {
            return (
              <Line
                key={item.dataKey}
                type="monotone"
                dataKey={item.dataKey === "rollingAvg" ? "rollingAvg" : item.dataKey}
                name={item.dataKey === "rollingAvg" ? "Rolling Average (7-period)" : item.label}
                stroke={item.dataKey === "rollingAvg" ? "#9b87f5" : item.color}
                strokeWidth={item.dataKey === "rollingAvg" ? 3 : 2}
                strokeDasharray={item.dataKey === "rollingAvg" ? "" : item.strokeDasharray}
                dot={item.dataKey === "rollingAvg" ? false : { r: 3 }}
                activeDot={item.dataKey === "rollingAvg" ? { r: 4 } : { r: 5 }}
                animationDuration={1000 + index * 250}
                animationBegin={index * 100}
                fill="transparent"
                yAxisId="left"
              />
            );
          } else {
            return (
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
                yAxisId="left"
              />
            );
          }
        })}

        {/* Add brush for zooming */}
        {showBrush && (
          <Brush 
            dataKey={xAxisKey} 
            height={30} 
            stroke="#8884d8" 
            startIndex={Math.max(0, data.length - 30)} 
          />
        )}
      </ComposedChart>
    </ChartContainer>
  );
}
