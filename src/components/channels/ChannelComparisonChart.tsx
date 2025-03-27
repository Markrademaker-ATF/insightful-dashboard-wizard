
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
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { channelColors } from "@/data/mockData";
import { FilterExportControls } from "./FilterExportControls";

type ChannelComparisonChartProps = {
  data: any[];
  loading: boolean;
};

export function ChannelComparisonChart({ data, loading }: ChannelComparisonChartProps) {
  const [metric, setMetric] = useState("roas");
  const [filteredChannels, setFilteredChannels] = useState<string[]>([]);

  if (loading) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  const metrics = [
    { value: "revenue", label: "Revenue" },
    { value: "cost", label: "Cost" },
    { value: "roas", label: "ROAS" },
    { value: "conversion", label: "Conversion Rate" },
    { value: "cpa", label: "CPA" },
  ];

  // Apply filters to data
  const filteredData = filteredChannels.length > 0
    ? data.filter(item => filteredChannels.includes(item.id))
    : data;

  const formatValue = (value: number, metricType: string) => {
    if (metricType === "revenue" || metricType === "cost") {
      return `$${value.toLocaleString()}`;
    } else if (metricType === "roas") {
      return `${value}x`;
    } else if (metricType === "conversion") {
      return `${value}%`;
    } else if (metricType === "cpa") {
      return `$${value}`;
    }
    return value;
  };

  // Handle filter changes
  const handleFilterChange = (filters: {channels?: string[], metrics?: string[]}) => {
    if (filters.channels) {
      setFilteredChannels(filters.channels);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <Select value={metric} onValueChange={setMetric}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            {metrics.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <FilterExportControls 
          filterOptions={{ channels: true, metrics: false }}
          className="flex justify-end"
          onFilterChange={handleFilterChange}
        />
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={filteredData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(value) =>
              metric === "revenue" || metric === "cost" || metric === "cpa"
                ? `$${value}`
                : metric === "conversion"
                ? `${value}%`
                : `${value}${metric === "roas" ? "x" : ""}`
            }
          />
          <Tooltip
            formatter={(value) => [
              formatValue(value as number, metric),
              metrics.find((m) => m.value === metric)?.label,
            ]}
          />
          <Legend />
          <Bar
            dataKey={metric}
            fill="#4361ee"
            name={metrics.find((m) => m.value === metric)?.label}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
