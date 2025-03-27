
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

type ROISummaryCardProps = {
  totalRevenue: number;
  totalCost: number;
  totalRoas: number;
  revenueChange: number;
  costChange: number;
  roasChange: number;
  topChannel: { name: string; roas: number } | null;
  bottomChannel: { name: string; roas: number } | null;
};

export function ROISummaryCard({
  totalRevenue,
  totalCost,
  totalRoas,
  revenueChange,
  costChange,
  roasChange,
  topChannel,
  bottomChannel,
}: ROISummaryCardProps) {
  return (
    <Card className="mb-8 animate-fade-in border-l-4 border-l-primary">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Marketing ROI Summary</h2>
            <p className="text-muted-foreground mb-4">
              Overall campaign performance for the selected period
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-muted-foreground">Total Return</div>
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                <div className={`text-sm flex items-center gap-1 ${revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {revenueChange >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(revenueChange)}% vs. prev
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Investment</div>
                <div className="text-2xl font-bold">${totalCost.toLocaleString()}</div>
                <div className={`text-sm flex items-center gap-1 ${costChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {costChange >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(costChange)}% vs. prev
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Overall ROAS</div>
                <div className="text-2xl font-bold">{totalRoas.toFixed(2)}x</div>
                <div className={`text-sm flex items-center gap-1 ${roasChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {roasChange >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(roasChange).toFixed(1)}% vs. prev
                </div>
              </div>
            </div>
          </div>
          <div className="min-w-[280px] border-l pl-6 hidden lg:block">
            <h3 className="text-sm font-medium mb-4">Performance Insights</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-2 text-green-700">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Top Performer</div>
                  <div className="text-sm text-muted-foreground">{topChannel?.name || 'Loading...'}</div>
                  <div className="text-sm font-medium">{topChannel ? `${topChannel.roas.toFixed(2)}x ROAS` : ''}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-red-100 p-2 text-red-700">
                  <TrendingUp className="h-4 w-4 transform rotate-180" />
                </div>
                <div>
                  <div className="text-sm font-medium">Needs Attention</div>
                  <div className="text-sm text-muted-foreground">{bottomChannel?.name || 'Loading...'}</div>
                  <div className="text-sm font-medium">{bottomChannel ? `${bottomChannel.roas.toFixed(2)}x ROAS` : ''}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
