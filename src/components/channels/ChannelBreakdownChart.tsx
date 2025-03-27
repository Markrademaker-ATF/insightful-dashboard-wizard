
import React from "react";
import { ChannelBreakdownChart as ChannelChart } from "@/components/dashboard/ChannelBreakdownChart";
import { channelColors } from "@/data/mockData";

type ChannelBreakdownChartProps = {
  data: any[];
  loading: boolean;
};

export function ChannelBreakdownChart({ data, loading }: ChannelBreakdownChartProps) {
  const chartData = !loading
    ? data.map(item => ({
        name: item.name,
        revenue: item.revenue,
        cost: item.cost,
      }))
    : [];

  const bars = [
    { dataKey: "revenue", color: "#4361ee", label: "Revenue" },
    { dataKey: "cost", color: "#f72585", label: "Cost" },
  ];

  return (
    <div className="space-y-4">
      <ChannelChart
        data={chartData}
        bars={bars}
        loading={loading}
        height={400}
      />
    </div>
  );
}
