
import React from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Layers, DollarSign } from "lucide-react";

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
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      <MetricCard
        title="Total Revenue"
        value={loading ? "-" : `$${latestPeriodData.total.toLocaleString()}`}
        icon={<Layers className="h-4 w-4" />}
        loading={loading}
        className="md:col-span-1"
      />
      <MetricCard
        title="Paid Media"
        value={loading ? "-" : `$${latestPeriodData.paid.toLocaleString()}`}
        description={`${paidPct}% of total`}
        icon={<DollarSign className="h-4 w-4" />}
        loading={loading}
        className="md:col-span-1"
      />
      <MetricCard
        title="Organic Media"
        value={loading ? "-" : `$${latestPeriodData.organic.toLocaleString()}`}
        description={`${organicPct}% of total`}
        loading={loading}
        className="md:col-span-1"
      />
      <MetricCard
        title="Non-Paid Media"
        value={loading ? "-" : `$${latestPeriodData.nonPaid.toLocaleString()}`}
        description={`${nonPaidPct}% of total`}
        loading={loading}
        className="md:col-span-1"
      />
      <MetricCard
        title="Baseline"
        value={loading ? "-" : `$${latestPeriodData.baseline.toLocaleString()}`}
        description={`${baselinePct}% of total`}
        loading={loading}
        className="md:col-span-1"
      />
    </div>
  );
}
