
import React from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DollarSign, Wallet, TrendingUp, Users } from "lucide-react";

type KeyMetricsGridProps = {
  totalRevenue: number;
  totalCost: number;
  totalRoas: number;
  totalConversions: number;
  revenueChange: number;
  costChange: number;
  roasChange: number;
  conversionChange: number;
  loading: boolean;
};

export function KeyMetricsGrid({
  totalRevenue,
  totalCost,
  totalRoas,
  totalConversions,
  revenueChange,
  costChange,
  roasChange,
  conversionChange,
  loading,
}: KeyMetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard 
        title="Total Revenue" 
        value={loading ? "-" : `$${totalRevenue.toLocaleString()}`} 
        change={revenueChange} 
        description="vs. previous period"
        icon={<DollarSign className="h-4 w-4" />}
        loading={loading}
      />
      <MetricCard 
        title="Marketing Spend" 
        value={loading ? "-" : `$${totalCost.toLocaleString()}`} 
        change={costChange}
        description="vs. previous period"
        icon={<Wallet className="h-4 w-4" />}
        loading={loading}
      />
      <MetricCard 
        title="Return on Ad Spend" 
        value={loading ? "-" : `${totalRoas.toFixed(2)}x`} 
        change={roasChange}
        description="vs. previous period"
        icon={<TrendingUp className="h-4 w-4" />}
        loading={loading}
      />
      <MetricCard 
        title="Total Conversions" 
        value={loading ? "-" : Math.round(totalConversions).toLocaleString()} 
        change={conversionChange}
        description="vs. previous period"
        icon={<Users className="h-4 w-4" />}
        loading={loading}
      />
    </div>
  );
}
