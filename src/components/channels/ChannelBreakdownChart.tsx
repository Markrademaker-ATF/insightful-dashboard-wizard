
import React from "react";
import { ChannelBreakdownChart as ChannelChart } from "@/components/dashboard/ChannelBreakdownChart";
import { channelColors } from "@/data/mockData";
import { FilterExportControls } from "./FilterExportControls";

type ChannelBreakdownChartProps = {
  data: any[];
  loading: boolean;
  bars?: {
    dataKey: string;
    color: string;
    label: string;
  }[];
  xAxisKey?: string;
  height?: number;
};

export function ChannelBreakdownChart({ 
  data, 
  loading,
  bars,
  xAxisKey,
  height
}: ChannelBreakdownChartProps) {
  const defaultBars = [
    { dataKey: "revenue", color: "#4361ee", label: "Revenue" },
    { dataKey: "cost", color: "#f72585", label: "Cost" },
  ];

  const chartData = !loading
    ? data.map(item => ({
        name: item.name,
        revenue: item.revenue,
        cost: item.cost,
      }))
    : [];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <FilterExportControls filterOptions={{ channels: false, metrics: true }} />
      </div>
      <ChannelChart
        data={chartData}
        bars={bars || defaultBars}
        loading={loading}
        height={height || 400}
        xAxisKey={xAxisKey || "name"}
      />
    </div>
  );
}
