
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
  LineChart,
  Line
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ABTest } from "@/hooks/useMockABTestData";

interface ABTestComparisonChartProps {
  test: ABTest;
  loading: boolean;
}

export function ABTestComparisonChart({ test, loading }: ABTestComparisonChartProps) {
  const [chartType, setChartType] = useState<"overview" | "timeseries">("overview");

  if (loading) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  // Prepare data for overview comparison chart
  const overviewData = test.variants.map(variant => ({
    name: variant.name,
    conversionRate: variant.conversionRate,
    visitors: variant.visitors,
    conversions: variant.conversions,
    isControl: variant.isControl
  }));

  // Prepare data for time series chart (assuming the data exists)
  const hasTimeSeriesData = test.variants[0]?.timeSeriesData?.length > 0;
  
  // Transform the time series data to be suitable for a multi-line chart
  const timeSeriesData = hasTimeSeriesData 
    ? test.variants[0].timeSeriesData?.map((dataPoint, index) => {
        const result: any = { date: dataPoint.date };
        
        // Add data from each variant
        test.variants.forEach(variant => {
          if (variant.timeSeriesData && variant.timeSeriesData[index]) {
            result[variant.name] = (variant.timeSeriesData[index].conversions / variant.timeSeriesData[index].visitors) * 100;
          }
        });
        
        return result;
      })
    : [];

  return (
    <div className="space-y-4">
      <Tabs value={chartType} onValueChange={(value) => setChartType(value as "overview" | "timeseries")}>
        <TabsList>
          <TabsTrigger value="overview">Conversion Rate Comparison</TabsTrigger>
          {hasTimeSeriesData && (
            <TabsTrigger value="timeseries">Time Series Analysis</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="overview" className="pt-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={overviewData}
              margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={70}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={(value) => `${value}%`}
                domain={[0, 'auto']}
                label={{ value: 'Conversion Rate (%)', angle: -90, position: 'insideLeft', offset: -5 }}
              />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(2)}%`, "Conversion Rate"]}
                contentStyle={{
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                  border: "none",
                  padding: "8px 12px",
                }}
              />
              <Legend />
              <Bar 
                dataKey="conversionRate" 
                name="Conversion Rate"
                fill={(data: any) => data.isControl ? "#94a3b8" : "#4361ee"} 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
        
        {hasTimeSeriesData && (
          <TabsContent value="timeseries" className="pt-4">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={timeSeriesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis 
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 'auto']}
                  label={{ value: 'Conversion Rate (%)', angle: -90, position: 'insideLeft', offset: -5 }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(2)}%`, ""]}
                  contentStyle={{
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                    border: "none",
                    padding: "8px 12px",
                  }}
                />
                <Legend />
                {test.variants.map((variant, index) => (
                  <Line
                    key={variant.id}
                    type="monotone"
                    dataKey={variant.name}
                    stroke={variant.isControl ? "#94a3b8" : "#4361ee"}
                    strokeWidth={2}
                    dot={{ stroke: variant.isControl ? "#94a3b8" : "#4361ee", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
