
// Format value based on metric type
export const formatValue = (value: any, metricType: string) => {
  if (metricType === 'revenue' || metricType === 'cost' || metricType === 'cpa' || metricType === 'cpc') {
    return `$${value?.toLocaleString() || "0"}`;
  }
  if (metricType === 'ctr') {
    return value;
  }
  return value?.toLocaleString() || "0";
};

// Get display name for metric
export const getMetricDisplayName = (metricKey: string) => {
  const displayNames: Record<string, string> = {
    revenue: "Revenue",
    cost: "Marketing Cost",
    clicks: "Clicks",
    impressions: "Impressions",
    conversions: "Conversions",
    ctr: "Click-Through Rate",
    roas: "ROAS",
    cpa: "Cost per Acquisition",
    cpc: "Cost per Click"
  };
  return displayNames[metricKey] || metricKey;
};

// Get color for metric
export const getMetricColor = (metricKey: string) => {
  const colors: Record<string, string> = {
    revenue: "#0EA5E9",
    cost: "#ea384c",
    clicks: "#22c55e",
    impressions: "#8b5cf6",
    conversions: "#f59e0b",
    ctr: "#ec4899",
    roas: "#06b6d4",
    cpa: "#f43f5e",
    cpc: "#d946ef"
  };
  return colors[metricKey] || "#64748b";
};

// List of all available metrics
export const availableMetrics = [
  { key: "revenue", name: "Revenue" },
  { key: "cost", name: "Marketing Cost" },
  { key: "clicks", name: "Clicks" },
  { key: "impressions", name: "Impressions" },
  { key: "conversions", name: "Conversions" },
  { key: "ctr", name: "Click-Through Rate" },
];
