
import React from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Layers, DollarSign, Compass, CreditCard, Archive } from "lucide-react";

interface KeyMetricsSectionProps {
  loading: boolean;
  latestPeriodData: {
    total: number;
    paid: number;
    organic: number;
    nonPaid: number;
    baseline: number;
  };
}

export function KeyMetricsSection({ loading, latestPeriodData }: KeyMetricsSectionProps) {
  // Calculate percentages
  const paidPct = latestPeriodData.total > 0 
    ? ((latestPeriodData.paid / latestPeriodData.total) * 100).toFixed(1) 
    : "0";

  const organicPct = latestPeriodData.total > 0 
    ? ((latestPeriodData.organic / latestPeriodData.total) * 100).toFixed(1) 
    : "0";

  const nonPaidPct = latestPeriodData.total > 0 
    ? ((latestPeriodData.nonPaid / latestPeriodData.total) * 100).toFixed(1) 
    : "0";

  const baselinePct = latestPeriodData.total > 0 
    ? ((latestPeriodData.baseline / latestPeriodData.total) * 100).toFixed(1) 
    : "0";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <MetricCard
        title="Total Revenue"
        value={loading ? "-" : `$${latestPeriodData.total.toLocaleString()}`}
        icon={<Layers className="h-4 w-4" />}
        loading={loading}
        className="bg-gradient-to-br from-primary/10 to-primary/5 border-l-4 border-l-primary lg:col-span-1"
      />
      <MetricCard
        title="Paid Media"
        value={loading ? "-" : `$${latestPeriodData.paid.toLocaleString()}`}
        description={`${paidPct}% of total`}
        icon={<DollarSign className="h-4 w-4" />}
        loading={loading}
        className="bg-gradient-to-br from-blue-50 to-blue-50/50 border-l-4 border-l-blue-400 lg:col-span-1"
      />
      <MetricCard
        title="Organic Media"
        value={loading ? "-" : `$${latestPeriodData.organic.toLocaleString()}`}
        description={`${organicPct}% of total`}
        icon={<Compass className="h-4 w-4" />}
        loading={loading}
        className="bg-gradient-to-br from-green-50 to-green-50/50 border-l-4 border-l-green-400 lg:col-span-1"
      />
      <MetricCard
        title="Non-Paid Media"
        value={loading ? "-" : `$${latestPeriodData.nonPaid.toLocaleString()}`}
        description={`${nonPaidPct}% of total`}
        icon={<CreditCard className="h-4 w-4" />}
        loading={loading}
        className="bg-gradient-to-br from-purple-50 to-purple-50/50 border-l-4 border-l-purple-400 lg:col-span-1"
      />
      <MetricCard
        title="Baseline"
        value={loading ? "-" : `$${latestPeriodData.baseline.toLocaleString()}`}
        description={`${baselinePct}% of total`}
        icon={<Archive className="h-4 w-4" />}
        loading={loading}
        className="bg-gradient-to-br from-amber-50 to-amber-50/50 border-l-4 border-l-amber-400 lg:col-span-1"
      />
    </div>
  );
}
