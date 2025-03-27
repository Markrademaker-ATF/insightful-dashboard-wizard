
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChannelBreakdownChart } from "@/components/dashboard/ChannelBreakdownChart";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCompare, Download, Share2, ChevronDown } from "lucide-react";
import {
  generateChannelBreakdown,
  generatePerformanceData,
  channelColors,
} from "@/data/mockData";

const MetricsPage = () => {
  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState<any[]>([]);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [compareMetrics, setCompareMetrics] = useState("revenue-cost");
  const [timeframe, setTimeframe] = useState("30d");

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 700));

      const channels = generateChannelBreakdown();
      const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90;
      const performance = generatePerformanceData(days);
      
      setChannelData(channels);
      setPerformanceData(performance);
      setLoading(false);
    };

    loadData();
  }, [timeframe]);

  // Parse the comparison metrics
  const [metric1, metric2] = compareMetrics.split("-");

  // Format metric display names
  const formatMetricName = (metric: string) => {
    return {
      revenue: "Revenue",
      cost: "Cost",
      roas: "ROAS",
      conversion: "Conversion Rate",
    }[metric] || metric;
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Metric Comparison"
        description="Compare different metrics across channels to identify patterns and insights"
      >
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </PageHeader>

      {/* Comparison controls */}
      <div className="dashboard-card mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Metric Comparison</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            <Tabs
              defaultValue="revenue-cost"
              value={compareMetrics}
              onValueChange={setCompareMetrics}
              className="w-[300px]"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="revenue-cost">Revenue vs. Cost</TabsTrigger>
                <TabsTrigger value="revenue-conversion">Revenue vs. Conv.</TabsTrigger>
                <TabsTrigger value="cost-roas">Cost vs. ROAS</TabsTrigger>
              </TabsList>
            </Tabs>

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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">By Channel</CardTitle>
              <CardDescription>
                Comparing {formatMetricName(metric1)} and {formatMetricName(metric2)} across channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChannelBreakdownChart
                data={channelData}
                bars={[
                  {
                    dataKey: metric1,
                    color: "#4361ee",
                    label: formatMetricName(metric1),
                  },
                  {
                    dataKey: metric2,
                    color: "#f72585",
                    label: formatMetricName(metric2),
                  },
                ]}
                xAxisKey="name"
                loading={loading}
                height={300}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Over Time</CardTitle>
              <CardDescription>
                Comparing {formatMetricName(metric1)} and {formatMetricName(metric2)} trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart
                data={performanceData}
                lines={[
                  {
                    dataKey: "search",
                    color: channelColors.search,
                    label: "Search",
                  },
                  {
                    dataKey: "social",
                    color: channelColors.social,
                    label: "Social",
                  },
                  {
                    dataKey: "email",
                    color: channelColors.email,
                    label: "Email",
                  },
                  {
                    dataKey: "display",
                    color: channelColors.display,
                    label: "Display",
                  },
                ]}
                loading={loading}
                height={300}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Correlation Analysis */}
      <div className="dashboard-card">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-medium">Correlation Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Identifying relationships between metrics
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" /> Share insights
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">
                {formatMetricName(metric1)} vs. {formatMetricName(metric2)}
              </CardTitle>
              <CardDescription>Strong positive correlation (0.87)</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-muted-foreground">
                There is a strong relationship between these metrics, suggesting that 
                improvements in {formatMetricName(metric1)} tend to drive similar 
                improvements in {formatMetricName(metric2)}.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Channel Efficiency</CardTitle>
              <CardDescription>Ranking by {formatMetricName(metric1)}/{formatMetricName(metric2)} ratio</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-muted-foreground">
                Search and Email channels show the highest efficiency when 
                measuring {formatMetricName(metric1)} relative to {formatMetricName(metric2)}.
                Consider optimizing budget allocation accordingly.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Actionable Insight</CardTitle>
              <CardDescription>Optimization opportunity</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-muted-foreground">
                Based on the {formatMetricName(metric1)}/{formatMetricName(metric2)} analysis, 
                an opportunity exists to reallocate budget from Display to Search 
                channels for a potential 15% efficiency gain.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MetricsPage;
