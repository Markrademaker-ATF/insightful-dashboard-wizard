
import React from "react";
import { ChannelBreakdownChart } from "@/components/dashboard/ChannelBreakdownChart";
import { BudgetAllocationChart } from "@/components/dashboard/BudgetAllocationChart";
import { Button } from "@/components/ui/button";
import { Radio, PieChart } from "lucide-react";

type AnalyticsSectionProps = {
  channelData: any[];
  budgetData: any[];
  loading: boolean;
  channelColors: Record<string, string>;
};

export function AnalyticsSection({
  channelData,
  budgetData,
  loading,
  channelColors,
}: AnalyticsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Channel breakdown */}
      <div className="dashboard-card animate-fade-in" style={{ animationDelay: "300ms" }}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-medium">Channel ROAS</h3>
            <p className="text-sm text-muted-foreground">Return on ad spend by channel</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <a href="/channels">
              <Radio className="h-4 w-4 mr-1" /> All channels
            </a>
          </Button>
        </div>
        
        <ChannelBreakdownChart
          data={channelData}
          bars={[
            { dataKey: "roas", color: channelColors.search, label: "ROAS" },
          ]}
          xAxisKey="name"
          loading={loading}
          height={300}
        />
      </div>
      
      {/* Budget allocation */}
      <div className="dashboard-card animate-fade-in" style={{ animationDelay: "450ms" }}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-medium">Budget Allocation</h3>
            <p className="text-sm text-muted-foreground">Current distribution across channels</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <a href="/budget">
              <PieChart className="h-4 w-4 mr-1" /> Budget optimizer
            </a>
          </Button>
        </div>
        
        <BudgetAllocationChart data={budgetData} loading={loading} />
      </div>
    </div>
  );
}
