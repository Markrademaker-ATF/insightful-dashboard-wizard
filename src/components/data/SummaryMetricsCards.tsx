
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Database, BarChart3, TrendingUp } from "lucide-react";

type SummaryMetricsCardsProps = {
  summaryMetrics: {
    totalRevenue: number;
    totalCost: number;
    roas: number;
    totalConversions: number;
  } | null;
  loading: boolean;
};

export function SummaryMetricsCards({ summaryMetrics, loading }: SummaryMetricsCardsProps) {
  if (!summaryMetrics || loading) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 mb-3">
            <LineChart className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
          <h3 className="text-xl font-bold">${summaryMetrics.totalRevenue.toLocaleString()}</h3>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 mb-3">
            <Database className="h-5 w-5 text-red-600" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Spend</p>
          <h3 className="text-xl font-bold">${summaryMetrics.totalCost.toLocaleString()}</h3>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 mb-3">
            <BarChart3 className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">ROAS</p>
          <h3 className="text-xl font-bold">{summaryMetrics.roas.toFixed(2)}x</h3>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 mb-3">
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Conversions</p>
          <h3 className="text-xl font-bold">{summaryMetrics.totalConversions.toLocaleString()}</h3>
        </CardContent>
      </Card>
    </div>
  );
}
