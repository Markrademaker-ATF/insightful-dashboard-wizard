
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
        <Card key={metric.name}>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">{metric.name} Overview</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Average:</span>
                <span className="font-medium">{metric.format(metric.average)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Best:</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: channelColors[metric.best.id as keyof typeof channelColors] }}
                  />
                  <span className="font-medium">{metric.best.name} ({metric.format(metric.best[metric.property])})</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <ArrowDown className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-muted-foreground">Worst:</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: channelColors[metric.worst.id as keyof typeof channelColors] }}
                  />
                  <span className="font-medium">{metric.worst.name} ({metric.format(metric.worst[metric.property])})</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
