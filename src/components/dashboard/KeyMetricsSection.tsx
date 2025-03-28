
import React, { useState } from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Layers, DollarSign, Compass, CreditCard, Archive, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { channelColors } from "@/data/mockData";

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

// Sample channel data for each media type
// In a real app, this would come from your data source
const channelBreakdown = {
  paid: [
    { name: "Google Ads", value: 382500, color: channelColors.google },
    { name: "Facebook Ads", value: 245000, color: channelColors.facebook },
    { name: "LinkedIn Ads", value: 175000, color: channelColors.linkedin },
    { name: "Other Paid", value: 97500, color: channelColors.other }
  ],
  organic: [
    { name: "SEO", value: 325000, color: channelColors.seo },
    { name: "Organic Social", value: 180000, color: channelColors.social },
    { name: "PR", value: 95000, color: channelColors.pr }
  ],
  nonPaid: [
    { name: "Email", value: 215000, color: channelColors.email },
    { name: "Referral", value: 145000, color: channelColors.referral },
    { name: "Direct", value: 240000, color: channelColors.direct }
  ]
};

export function KeyMetricsSection({ loading, latestPeriodData }: KeyMetricsSectionProps) {
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

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

  const toggleExpand = (metricName: string) => {
    if (expandedMetric === metricName) {
      setExpandedMetric(null);
    } else {
      setExpandedMetric(metricName);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
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
          className="bg-gradient-to-br from-blue-50 to-blue-50/50 border-l-4 border-l-blue-400 lg:col-span-1 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => toggleExpand("paid")}
          action={
            <Button variant="ghost" size="icon" className="h-6 w-6">
              {expandedMetric === "paid" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          }
        />
        <MetricCard
          title="Organic Media"
          value={loading ? "-" : `$${latestPeriodData.organic.toLocaleString()}`}
          description={`${organicPct}% of total`}
          icon={<Compass className="h-4 w-4" />}
          loading={loading}
          className="bg-gradient-to-br from-green-50 to-green-50/50 border-l-4 border-l-green-400 lg:col-span-1 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => toggleExpand("organic")}
          action={
            <Button variant="ghost" size="icon" className="h-6 w-6">
              {expandedMetric === "organic" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          }
        />
        <MetricCard
          title="Non-Paid Media"
          value={loading ? "-" : `$${latestPeriodData.nonPaid.toLocaleString()}`}
          description={`${nonPaidPct}% of total`}
          icon={<CreditCard className="h-4 w-4" />}
          loading={loading}
          className="bg-gradient-to-br from-purple-50 to-purple-50/50 border-l-4 border-l-purple-400 lg:col-span-1 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => toggleExpand("nonPaid")}
          action={
            <Button variant="ghost" size="icon" className="h-6 w-6">
              {expandedMetric === "nonPaid" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          }
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

      {/* Channel breakdown expansion */}
      {expandedMetric && (
        <Card className="mb-4 animate-fade-in overflow-hidden">
          <CardContent className="p-4">
            <div className="mb-2">
              <h3 className="text-sm font-semibold mb-2 flex items-center">
                {expandedMetric === "paid" && "Paid Media"}
                {expandedMetric === "organic" && "Organic Media"}
                {expandedMetric === "nonPaid" && "Non-Paid Media"}
                <span className="text-xs ml-2 text-muted-foreground"> - Channel Breakdown</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {channelBreakdown[expandedMetric as keyof typeof channelBreakdown]?.map((channel, i) => (
                <div 
                  key={i}
                  className="rounded-md border bg-card p-3 flex flex-col gap-2"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }}></div>
                      <span className="text-sm font-medium">{channel.name}</span>
                    </div>
                    <span className="text-sm font-semibold">${channel.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full" 
                      style={{ 
                        width: `${(channel.value / latestPeriodData[expandedMetric as keyof typeof latestPeriodData]) * 100}%`,
                        backgroundColor: channel.color 
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-right text-muted-foreground">
                    {((channel.value / latestPeriodData[expandedMetric as keyof typeof latestPeriodData]) * 100).toFixed(1)}% of {expandedMetric}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
