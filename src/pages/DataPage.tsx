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
import { Loader2, Download, Filter, SlidersHorizontal, X, Database, BarChart3, LineChart, TrendingUp, Calendar } from "lucide-react";
import {
  generatePerformanceData,
  channelColors,
  channelNames,
} from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const DataPage = () => {
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState("30d");
  const [view, setView] = useState("chart");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["revenue"]);
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

  // Aggregate the data based on selected metrics
  const aggregateData = (data: any[]) => {
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

  const aggregatedData = aggregateData(performanceData);

  // Calculate summary metrics
  const getSummaryMetrics = () => {
    if (!aggregatedData.length) return null;
    
    const summary = {
      totalRevenue: aggregatedData.reduce((sum, day) => sum + day.revenue, 0),
      totalCost: aggregatedData.reduce((sum, day) => sum + day.cost, 0),
      totalClicks: aggregatedData.reduce((sum, day) => sum + day.clicks, 0),
      totalImpressions: aggregatedData.reduce((sum, day) => sum + day.impressions, 0),
      totalConversions: aggregatedData.reduce((sum, day) => sum + day.conversions, 0),
      avgCTR: aggregatedData.reduce((sum, day) => sum + parseFloat(day.ctr), 0) / aggregatedData.length,
    };

    return {
      ...summary,
      roas: summary.totalRevenue / summary.totalCost,
      cpa: summary.totalCost / summary.totalConversions,
      cpc: summary.totalCost / summary.totalClicks
    };
  };

  const summaryMetrics = getSummaryMetrics();

  // Get date range information
  const getDateInfo = () => {
    if (!aggregatedData || aggregatedData.length === 0) return null;
    
    return {
      startDate: aggregatedData[0].date,
      endDate: aggregatedData[aggregatedData.length - 1].date,
      totalDataPoints: aggregatedData.length,
      dataGranularity: "daily"
    };
  };

  const dateInfo = getDateInfo();

  // Format value based on metric type
  const formatValue = (value: any, metricType: string) => {
    if (metricType === 'revenue' || metricType === 'cost' || metricType === 'cpa' || metricType === 'cpc') {
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
      roas: "ROAS",
      cpa: "Cost per Acquisition",
      cpc: "Cost per Click"
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
      roas: "#06b6d4",
      cpa: "#f43f5e",
      cpc: "#d946ef"
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

  // Handle metric selection/deselection
  const toggleMetric = (metricKey: string) => {
    if (metricKey === "all") {
      setShowAllMetrics(true);
      return;
    }
    
    setShowAllMetrics(false);
    setSelectedMetrics(prev => {
      // If already selected, remove it
      if (prev.includes(metricKey)) {
        // Don't allow removing the last metric
        if (prev.length === 1) return prev;
        return prev.filter(m => m !== metricKey);
      }
      // Add the new metric
      return [...prev, metricKey];
    });
  };

  const handleMetricSelect = (value: string) => {
    if (value === "all") {
      setShowAllMetrics(true);
    } else {
      setShowAllMetrics(false);
      // If not already in the list, add it
      if (!selectedMetrics.includes(value)) {
        setSelectedMetrics(prev => [...prev, value]);
      }
    }
  };

  const removeMetric = (metricKey: string) => {
    // Don't allow removing the last metric
    if (selectedMetrics.length === 1) return;
    setSelectedMetrics(prev => prev.filter(m => m !== metricKey));
  };

  // Generate chart lines based on selected metrics
  const getChartLines = () => {
    return selectedMetrics.map(metricKey => ({
      dataKey: metricKey,
      color: getMetricColor(metricKey),
      label: getMetricDisplayName(metricKey)
    }));
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Data Overview"
        description="Explore and analyze your raw marketing data across all channels and timeframes. Use the tools below to customize your view and identify performance trends."
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

      {/* Date and Data Range Information */}
      {!loading && dateInfo && (
        <div className="mb-6 bg-muted/30 p-4 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Date Range: <span className="font-medium">{dateInfo.startDate} to {dateInfo.endDate}</span>
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <span className="text-sm text-muted-foreground">
              <span className="font-medium">{dateInfo.totalDataPoints}</span> data points
            </span>
            <span className="text-sm text-muted-foreground">
              Granularity: <span className="font-medium capitalize">{dateInfo.dataGranularity}</span>
            </span>
            <span className="text-sm text-muted-foreground">
              Timeframe: <span className="font-medium">{timeframe === '7d' ? '7 Days' : timeframe === '30d' ? '30 Days' : '90 Days'}</span>
            </span>
          </div>
        </div>
      )}

      {/* Summary Metrics Cards */}
      {!loading && summaryMetrics && (
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
      )}

      <div className="dashboard-card">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Data Analytics</h2>
          <p className="text-muted-foreground">
            This section provides a detailed view of your marketing performance data. Use the chart or table view to analyze trends and patterns over time. 
            Select different metrics and timeframes to customize your analysis.
          </p>
          {!loading && (
            <p className="text-sm text-muted-foreground mt-2">
              Currently displaying <span className="font-medium">{aggregatedData.length}</span> days of data from{" "}
              <span className="font-medium">{aggregatedData[0]?.date}</span> to{" "}
              <span className="font-medium">{aggregatedData[aggregatedData.length - 1]?.date}</span>.
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col gap-2 w-full sm:w-auto">
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
                  value=""
                  onValueChange={handleMetricSelect}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Add metric" />
                  </SelectTrigger>
                  <SelectContent>
                    {view === "table" && (
                      <SelectItem value="all">All Metrics</SelectItem>
                    )}
                    {availableMetrics
                      .filter(m => !selectedMetrics.includes(m.key) || showAllMetrics)
                      .map((m) => (
                        <SelectItem key={m.key} value={m.key}>
                          {m.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Selected metrics badges */}
            {!showAllMetrics && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedMetrics.map(metricKey => (
                  <Badge 
                    key={metricKey} 
                    variant="secondary"
                    className="flex items-center gap-1 px-3 py-1"
                    style={{ backgroundColor: `${getMetricColor(metricKey)}20` }}
                  >
                    <span style={{ color: getMetricColor(metricKey) }}>
                      {getMetricDisplayName(metricKey)}
                    </span>
                    <button 
                      onClick={() => removeMetric(metricKey)}
                      className="ml-1 hover:bg-black/5 rounded-full"
                    >
                      <X size={14} className="opacity-70" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            {showAllMetrics && (
              <Badge 
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1 w-fit"
              >
                All Metrics
                <button 
                  onClick={() => {
                    setShowAllMetrics(false);
                    if (selectedMetrics.length === 0) {
                      setSelectedMetrics(["revenue"]);
                    }
                  }}
                  className="ml-1 hover:bg-black/5 rounded-full"
                >
                  <X size={14} className="opacity-70" />
                </button>
              </Badge>
            )}
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
              <h3 className="text-lg font-medium">
                {selectedMetrics.length > 1 
                  ? "Metrics Comparison Over Time" 
                  : `${getMetricDisplayName(selectedMetrics[0])} Over Time`}
              </h3>
              <p className="text-sm text-muted-foreground">Aggregated data across all channels</p>
            </div>
            <PerformanceChart
              data={aggregatedData}
              lines={getChartLines()}
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
                      selectedMetrics.map(metricKey => (
                        <TableHead key={metricKey}>
                          {getMetricDisplayName(metricKey)}
                        </TableHead>
                      ))
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
                        selectedMetrics.map(metricKey => (
                          <TableCell key={metricKey}>
                            {formatValue(entry[metricKey], metricKey)}
                          </TableCell>
                        ))
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
