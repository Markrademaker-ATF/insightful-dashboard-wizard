
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, PercentIcon, TrendingDown, TrendingUp } from "lucide-react";

type ChannelMetricsCardsProps = {
  data: any[];
  loading: boolean;
};

export function ChannelMetricsCards({ data, loading }: ChannelMetricsCardsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex flex-col gap-3">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Calculate total metrics from all channels
  const totalRevenue = data.reduce((sum, channel) => sum + channel.revenue, 0);
  const totalCost = data.reduce((sum, channel) => sum + channel.cost, 0);
  const avgRoas = totalRevenue / totalCost || 0;
  const avgConversion = data.reduce((sum, channel) => sum + channel.conversion, 0) / data.length || 0;
  
  // Calculate standard deviations for each metric (new)
  const revenueValues = data.map(c => c.revenue);
  const costValues = data.map(c => c.cost);
  const roasValues = data.map(c => c.roas);
  const conversionValues = data.map(c => c.conversion);
  
  const stdDevRevenue = calculateStdDev(revenueValues);
  const stdDevCost = calculateStdDev(costValues);
  const stdDevRoas = calculateStdDev(roasValues);
  const stdDevConversion = calculateStdDev(conversionValues);

  const metrics = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      trend: totalRevenue > 500000 ? 12.5 : -5.2,
      icon: DollarSign,
      stdDev: stdDevRevenue.toFixed(0),
      stdDevFormatted: `$${stdDevRevenue.toLocaleString()}`
    },
    {
      title: "Total Cost",
      value: `$${totalCost.toLocaleString()}`,
      trend: totalCost > 200000 ? 8.3 : -3.1,
      icon: DollarSign,
      stdDev: stdDevCost.toFixed(0),
      stdDevFormatted: `$${stdDevCost.toLocaleString()}`
    },
    {
      title: "Average ROAS",
      value: `${avgRoas.toFixed(2)}x`,
      trend: avgRoas > 2.5 ? 5.7 : -2.4,
      icon: TrendingUp,
      stdDev: stdDevRoas.toFixed(2),
      stdDevFormatted: `${stdDevRoas.toFixed(2)}x`
    },
    {
      title: "Average Conversion",
      value: `${avgConversion.toFixed(2)}%`,
      trend: avgConversion > 2 ? 9.2 : -4.1,
      icon: PercentIcon,
      stdDev: stdDevConversion.toFixed(2),
      stdDevFormatted: `${stdDevConversion.toFixed(2)}%`
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">{metric.title}</span>
                <span className="text-2xl font-bold">{metric.value}</span>
                <div className="flex items-center gap-1 mt-1">
                  {metric.trend > 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-green-500">+{metric.trend}% vs prev. period</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 text-red-500" />
                      <span className="text-xs text-red-500">{metric.trend}% vs prev. period</span>
                    </>
                  )}
                </div>
                <div className="mt-1">
                  <span className="text-xs text-muted-foreground">
                    Std Dev: {metric.stdDevFormatted}
                  </span>
                </div>
              </div>
              <div className="rounded-full bg-muted p-3">
                <metric.icon className="h-5 w-5 text-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Helper function to calculate standard deviation
function calculateStdDev(values: number[]): number {
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
  return Math.sqrt(variance);
}
