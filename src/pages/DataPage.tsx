
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Download, Filter, SlidersHorizontal } from "lucide-react";
import {
  generatePerformanceData,
  channelColors,
  channelNames,
} from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DataPage = () => {
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState("30d");
  const [view, setView] = useState("chart");
  const [metric, setMetric] = useState("revenue");
  const [showAllMetrics, setShowAllMetrics] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90;
      const performance = generatePerformanceData(days);

      setPerformanceData(performance);
      setLoading(false);
    };

    loadData();
  }, [timeframe]);

  // Aggregate the data based on selected metric
  const aggregateData = (data: any[], selectedMetric: string) => {
    if (!data.length) return [];
    
    return data.map(day => {
      const metrics: Record<string, any> = {
        date: day.name,
        revenue: day.totalRevenue,
        cost: Object.keys(channelNames).reduce((sum, channel) => sum + (day[channel] || 0) * 0.4, 0),
        clicks: Math.round(day.totalRevenue / 2.5),
        impressions: Math.round(day.totalRevenue * 10),
        conversions: Math.round(day.totalRevenue / 50),
        ctr: (Math.round(day.totalRevenue / 2.5) / Math.round(day.totalRevenue * 10) * 100).toFixed(2) + '%',
      };
      
      return metrics;
    });
  };

  const aggregatedData = aggregateData(performanceData, metric);

  // Format value based on metric type
  const formatValue = (value: any, metricType: string) => {
    if (metricType === 'revenue' || metricType === 'cost') {
      return `$${value?.toLocaleString() || "0"}`;
    }
    if (metricType === 'ctr') {
      return value;
    }
    return value?.toLocaleString() || "0";
  };

  // Get display name for metric
  const getMetricDisplayName = (metricKey: string) => {
    const displayNames: Record<string, string> = {
      revenue: "Revenue",
      cost: "Marketing Cost",
      clicks: "Clicks",
      impressions: "Impressions",
      conversions: "Conversions",
      ctr: "Click-Through Rate",
    };
    return displayNames[metricKey] || metricKey;
  };

  // Get color for metric
  const getMetricColor = (metricKey: string) => {
    const colors: Record<string, string> = {
      revenue: "#0EA5E9",
      cost: "#ea384c",
      clicks: "#22c55e",
      impressions: "#8b5cf6",
      conversions: "#f59e0b",
      ctr: "#ec4899",
    };
    return colors[metricKey] || "#64748b";
  };

  // List of all available metrics
  const availableMetrics = [
    { key: "revenue", name: "Revenue" },
    { key: "cost", name: "Marketing Cost" },
    { key: "clicks", name: "Clicks" },
    { key: "impressions", name: "Impressions" },
    { key: "conversions", name: "Conversions" },
    { key: "ctr", name: "Click-Through Rate" },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Data Overview"
        description="Explore and analyze your raw marketing data across all channels"
      >
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" variant="outline" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </PageHeader>

      <div className="dashboard-card">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2 items-center">
            <Tabs
              defaultValue="chart"
              value={view}
              onValueChange={(val) => {
                setView(val);
                // Reset showAllMetrics when switching to chart view
                if (val === "chart") {
                  setShowAllMetrics(false);
                }
              }}
              className="w-[200px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chart">Chart</TabsTrigger>
                <TabsTrigger value="table">Table</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2 ml-4">
              <Select
                value={showAllMetrics ? "all" : metric}
                onValueChange={(value) => {
                  if (value === "all") {
                    setShowAllMetrics(true);
                  } else {
                    setShowAllMetrics(false);
                    setMetric(value);
                  }
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  {view === "table" && (
                    <SelectItem value="all">All Metrics</SelectItem>
                  )}
                  {availableMetrics.map((m) => (
                    <SelectItem key={m.key} value={m.key}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs
            defaultValue="30d"
            value={timeframe}
            onValueChange={setTimeframe}
            className="w-[240px]"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
              <TabsTrigger value="90d">90D</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {loading ? (
          <div className="py-12 flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : view === "chart" ? (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-medium">{getMetricDisplayName(metric)} Over Time</h3>
              <p className="text-sm text-muted-foreground">Aggregated data across all channels</p>
            </div>
            <PerformanceChart
              data={aggregatedData}
              lines={[
                { 
                  dataKey: metric, 
                  color: getMetricColor(metric), 
                  label: getMetricDisplayName(metric)
                },
              ]}
              height={450}
            />
          </>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    {showAllMetrics ? (
                      availableMetrics.map((m) => (
                        <TableHead key={m.key}>{m.name}</TableHead>
                      ))
                    ) : (
                      <TableHead>{getMetricDisplayName(metric)}</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aggregatedData.map((entry, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{entry.date}</TableCell>
                      {showAllMetrics ? (
                        availableMetrics.map((m) => (
                          <TableCell key={m.key}>
                            {formatValue(entry[m.key], m.key)}
                          </TableCell>
                        ))
                      ) : (
                        <TableCell>{formatValue(entry[metric], metric)}</TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DataPage;
