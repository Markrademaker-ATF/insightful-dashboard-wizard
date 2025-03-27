
import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ABTestComparisonChartProps {
  test: any;
  loading?: boolean;
}

export function ABTestComparisonChart({ test, loading = false }: ABTestComparisonChartProps) {
  if (loading) {
    return (
      <div className="w-full">
        <Skeleton className="h-[350px] w-full" />
      </div>
    );
  }

  // Extract variant data
  const variantA = test.variants.find((v: any) => v.name === "Control");
  const variantB = test.variants.find((v: any) => v.name === "Variant");

  // Prepare chart data for display
  const chartData = [
    {
      name: "Conversion Rate",
      Control: variantA?.conversionRate || 0,
      Variant: variantB?.conversionRate || 0,
      controlValue: variantA?.conversionRate || 0,
      variantValue: variantB?.conversionRate || 0,
    },
    {
      name: "Average Order Value",
      Control: variantA?.averageOrderValue || 0,
      Variant: variantB?.averageOrderValue || 0,
      controlValue: variantA?.averageOrderValue || 0,
      variantValue: variantB?.averageOrderValue || 0,
    },
    {
      name: "Revenue per Visitor",
      Control: variantA?.revenuePerVisitor || 0,
      Variant: variantB?.revenuePerVisitor || 0,
      controlValue: variantA?.revenuePerVisitor || 0,
      variantValue: variantB?.revenuePerVisitor || 0,
    }
  ];

  // Calculate percentage differences for tooltips
  const percentageDiffs = {
    "Conversion Rate": calculatePercentDiff(variantA?.conversionRate, variantB?.conversionRate),
    "Average Order Value": calculatePercentDiff(variantA?.averageOrderValue, variantB?.averageOrderValue),
    "Revenue per Visitor": calculatePercentDiff(variantA?.revenuePerVisitor, variantB?.revenuePerVisitor),
  };

  // Format values for tooltip
  const formatValue = (value: number, metricName: string) => {
    if (metricName === "Conversion Rate") {
      return `${(value * 100).toFixed(2)}%`;
    }
    if (metricName === "Average Order Value") {
      return `$${value.toFixed(2)}`;
    }
    if (metricName === "Revenue per Visitor") {
      return `$${value.toFixed(2)}`;
    }
    return value.toString();
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const controlValue = payload[0].value;
      const variantValue = payload[1].value;
      const diff = percentageDiffs[label as keyof typeof percentageDiffs];
      
      return (
        <div className="bg-background p-3 border rounded shadow-lg">
          <p className="font-semibold">{label}</p>
          <p className="text-sm">Control: {formatValue(controlValue, label)}</p>
          <p className="text-sm">Variant: {formatValue(variantValue, label)}</p>
          <p className="text-sm font-medium mt-1" style={{ color: diff >= 0 ? "#10b981" : "#ef4444" }}>
            {diff >= 0 ? "+" : ""}{diff.toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Function to determine bar fill color
  const getBarFill = (data: any) => {
    const isControl = data.dataKey === "Control";
    return isControl ? "#94a3b8" : "#4361ee";
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
        <XAxis 
          dataKey="name" 
          tickLine={false} 
          axisLine={{ stroke: 'rgba(0,0,0,0.1)' }} 
        />
        <YAxis 
          tickFormatter={(value) => value.toString()} 
          tickLine={false} 
          axisLine={false} 
          tickCount={6} 
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar 
          dataKey="Control" 
          name="Control" 
          fill="#94a3b8" 
          radius={[4, 4, 0, 0]} 
        />
        <Bar 
          dataKey="Variant" 
          name="Variant" 
          fill="#4361ee" 
          radius={[4, 4, 0, 0]} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

function calculatePercentDiff(valueA: number = 0, valueB: number = 0): number {
  if (valueA === 0) return valueB > 0 ? 100 : 0;
  return ((valueB - valueA) / valueA) * 100;
}
