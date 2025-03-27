
import React, { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Legend,
  ReferenceLine
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

type MetricScatterPlotProps = {
  data: any[];
  loading: boolean;
};

export function MetricScatterPlot({ data, loading }: MetricScatterPlotProps) {
  const [xMetric, setXMetric] = useState("cost");
  const [yMetric, setYMetric] = useState("revenue");
  
  if (loading) {
    return <Skeleton className="w-full h-[350px]" />;
  }
  
  const metricOptions = [
    { value: "revenue", label: "Revenue" },
    { value: "cost", label: "Cost" },
    { value: "roas", label: "ROAS" },
    { value: "conversion", label: "Conversion Rate" },
    { value: "cpa", label: "CPA" },
  ];
  
  // Format data for scatter plot
  const scatterData = data.map(item => ({
    name: item.name,
    x: item[xMetric],
    y: item[yMetric],
    z: item.roas // Size based on ROAS
  }));
  
  // Calculate trend line (simple linear regression)
  const n = scatterData.length;
  const sumX = scatterData.reduce((a, b) => a + b.x, 0);
  const sumY = scatterData.reduce((a, b) => a + b.y, 0);
  const sumXY = scatterData.reduce((a, b) => a + b.x * b.y, 0);
  const sumX2 = scatterData.reduce((a, b) => a + b.x * b.x, 0);
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  // Calculate correlation coefficient
  const sumY2 = scatterData.reduce((a, b) => a + b.y * b.y, 0);
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  const correlation = denominator === 0 ? 0 : numerator / denominator;
  
  // Create regression line data
  const minX = Math.min(...scatterData.map(item => item.x));
  const maxX = Math.max(...scatterData.map(item => item.x));
  const regressionData = [
    { x: minX, y: minX * slope + intercept },
    { x: maxX, y: maxX * slope + intercept }
  ];
  
  // Format tick values based on metric type
  const formatXAxis = (value: number) => {
    if (xMetric === 'revenue' || xMetric === 'cost') {
      return `$${(value / 1000).toFixed(0)}k`;
    } else if (xMetric === 'roas') {
      return `${value.toFixed(1)}x`;
    } else if (xMetric === 'conversion') {
      return `${value.toFixed(1)}%`;
    } else if (xMetric === 'cpa') {
      return `$${value}`;
    }
    return value;
  };
  
  const formatYAxis = (value: number) => {
    if (yMetric === 'revenue' || yMetric === 'cost') {
      return `$${(value / 1000).toFixed(0)}k`;
    } else if (yMetric === 'roas') {
      return `${value.toFixed(1)}x`;
    } else if (yMetric === 'conversion') {
      return `${value.toFixed(1)}%`;
    } else if (yMetric === 'cpa') {
      return `$${value}`;
    }
    return value;
  };
  
  // Tooltip formatter
  const tooltipFormatter = (value: number, name: string) => {
    if (name === 'x') {
      name = metricOptions.find(m => m.value === xMetric)?.label || xMetric;
      if (xMetric === 'revenue' || xMetric === 'cost') {
        return [`$${value.toLocaleString()}`, name];
      } else if (xMetric === 'roas') {
        return [`${value.toFixed(2)}x`, name];
      } else if (xMetric === 'conversion') {
        return [`${value.toFixed(2)}%`, name];
      }
    } else if (name === 'y') {
      name = metricOptions.find(m => m.value === yMetric)?.label || yMetric;
      if (yMetric === 'revenue' || yMetric === 'cost') {
        return [`$${value.toLocaleString()}`, name];
      } else if (yMetric === 'roas') {
        return [`${value.toFixed(2)}x`, name];
      } else if (yMetric === 'conversion') {
        return [`${value.toFixed(2)}%`, name];
      }
    } else if (name === 'z') {
      return [`${value.toFixed(2)}x`, 'ROAS (bubble size)'];
    }
    return [value, name];
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <CardTitle className="text-md">Scatter Analysis</CardTitle>
            <CardDescription>
              Relationship between metrics (bubble size = ROAS)
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={xMetric} onValueChange={setXMetric}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="X Axis" />
              </SelectTrigger>
              <SelectContent>
                {metricOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={yMetric} onValueChange={setYMetric}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Y Axis" />
              </SelectTrigger>
              <SelectContent>
                {metricOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2 text-xs text-muted-foreground">
          <span className="font-medium">Correlation:</span> {correlation.toFixed(2)} 
          <span className="ml-2">
            ({Math.abs(correlation) > 0.7 
              ? 'Strong' 
              : Math.abs(correlation) > 0.3 
                ? 'Moderate' 
                : 'Weak'} 
            {correlation > 0 ? 'positive' : 'negative'} relationship)
          </span>
        </div>
        
        <div style={{ height: 350 }} className="mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="x"
                tickFormatter={formatXAxis} 
                label={{ 
                  value: metricOptions.find(m => m.value === xMetric)?.label, 
                  position: 'insideBottom', 
                  offset: -5 
                }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="y"
                tickFormatter={formatYAxis}
                label={{ 
                  value: metricOptions.find(m => m.value === yMetric)?.label, 
                  angle: -90, 
                  position: 'insideLeft' 
                }}
              />
              <ZAxis 
                type="number" 
                dataKey="z" 
                range={[50, 400]} 
                name="z" 
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                formatter={tooltipFormatter}
                labelFormatter={(label) => scatterData[label as number]?.name || ''}
              />
              <Legend />
              <Scatter 
                name="Channels" 
                data={scatterData} 
                fill="#4361ee"
                line={{ stroke: '#ea384c', strokeWidth: 2, strokeDasharray: '5 5' }}
                lineType="fitting"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-xs text-muted-foreground">
            <h4 className="text-sm font-medium mb-1">Interpretation</h4>
            <p>
              {correlation > 0.7
                ? `There is a strong positive relationship between ${metricOptions.find(m => m.value === xMetric)?.label} and ${metricOptions.find(m => m.value === yMetric)?.label}.`
                : correlation < -0.7
                ? `There is a strong negative relationship between ${metricOptions.find(m => m.value === xMetric)?.label} and ${metricOptions.find(m => m.value === yMetric)?.label}.`
                : correlation > 0.3
                ? `There is a moderate positive relationship between ${metricOptions.find(m => m.value === xMetric)?.label} and ${metricOptions.find(m => m.value === yMetric)?.label}.`
                : correlation < -0.3
                ? `There is a moderate negative relationship between ${metricOptions.find(m => m.value === xMetric)?.label} and ${metricOptions.find(m => m.value === yMetric)?.label}.`
                : `There is a weak relationship between ${metricOptions.find(m => m.value === xMetric)?.label} and ${metricOptions.find(m => m.value === yMetric)?.label}.`
              }
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            <h4 className="text-sm font-medium mb-1">Formula</h4>
            <p>
              {metricOptions.find(m => m.value === yMetric)?.label} = 
              {slope >= 0 ? ' ' : ' -'}
              {Math.abs(slope).toFixed(2)} × {metricOptions.find(m => m.value === xMetric)?.label}
              {intercept >= 0 ? ' + ' : ' - '}
              {Math.abs(intercept).toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
