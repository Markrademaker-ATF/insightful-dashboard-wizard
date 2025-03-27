
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { channelColors } from "@/data/mockData";

type ChannelMetricsOverviewProps = {
  data: any[];
  loading: boolean;
};

export function ChannelMetricsOverview({ data, loading }: ChannelMetricsOverviewProps) {
  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-2/3 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Calculate metrics
  const metrics = [
    {
      name: "Revenue",
      property: "revenue",
      format: (val: number) => `$${val.toLocaleString()}`,
      average: data.reduce((sum, item) => sum + item.revenue, 0) / data.length,
      best: data.reduce((best, item) => item.revenue > best.revenue ? item : best, data[0]),
      worst: data.reduce((worst, item) => item.revenue < worst.revenue ? item : worst, data[0])
    },
    {
      name: "Cost",
      property: "cost",
      format: (val: number) => `$${val.toLocaleString()}`,
      average: data.reduce((sum, item) => sum + item.cost, 0) / data.length,
      // For cost, lower is better
      best: data.reduce((best, item) => item.cost < best.cost ? item : best, data[0]),
      worst: data.reduce((worst, item) => item.cost > worst.cost ? item : worst, data[0])
    },
    {
      name: "ROAS",
      property: "roas",
      format: (val: number) => `${val.toFixed(2)}x`,
      average: data.reduce((sum, item) => sum + item.roas, 0) / data.length,
      best: data.reduce((best, item) => item.roas > best.roas ? item : best, data[0]),
      worst: data.reduce((worst, item) => item.roas < worst.roas ? item : worst, data[0])
    },
    {
      name: "Conversion",
      property: "conversion",
      format: (val: number) => `${val.toFixed(2)}%`,
      average: data.reduce((sum, item) => sum + item.conversion, 0) / data.length,
      best: data.reduce((best, item) => item.conversion > best.conversion ? item : best, data[0]),
      worst: data.reduce((worst, item) => item.conversion < worst.conversion ? item : worst, data[0])
    }
  ];

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.name} className="overflow-hidden border">
          <div className="bg-primary/10 py-2 px-6">
            <h3 className="text-lg font-medium">{metric.name} Overview</h3>
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <span className="text-sm font-medium text-muted-foreground">Average:</span>
              <span className="text-lg font-bold">{metric.format(metric.average)}</span>
            </div>
            
            <div className="space-y-5">
              <div className="group relative overflow-hidden rounded-md p-3 transition-all hover:bg-primary/5">
                <div className="absolute left-0 top-0 h-full w-1 bg-green-500"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowUp className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">Best:</span>
                  </div>
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: channelColors[metric.best.id as keyof typeof channelColors] }}
                  />
                </div>
                <div className="mt-1 flex justify-between items-center">
                  <span className="font-medium text-sm">{metric.best.name}</span>
                  <span className="font-bold">{metric.format(metric.best[metric.property])}</span>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-md p-3 transition-all hover:bg-primary/5">
                <div className="absolute left-0 top-0 h-full w-1 bg-red-500"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowDown className="h-5 w-5 text-red-500" />
                    <span className="text-sm font-medium">Worst:</span>
                  </div>
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: channelColors[metric.worst.id as keyof typeof channelColors] }}
                  />
                </div>
                <div className="mt-1 flex justify-between items-center">
                  <span className="font-medium text-sm">{metric.worst.name}</span>
                  <span className="font-bold">{metric.format(metric.worst[metric.property])}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
