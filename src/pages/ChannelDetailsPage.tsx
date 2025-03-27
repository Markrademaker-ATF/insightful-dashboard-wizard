
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowRight, BarChart3, DollarSign, Users, Percent } from "lucide-react";
import {
  generateChannelBreakdown,
  generatePerformanceData,
  channelColors,
  channelNames,
} from "@/data/mockData";

const ChannelDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("id") || "search"; // Default to search if no ID

  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState<any | null>(null);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState("30d");

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const channels = generateChannelBreakdown();
      const channel = channels.find((c) => c.id === channelId) || channels[0];
      
      const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90;
      const allPerformance = generatePerformanceData(days);
      
      // Extract just this channel's data for the performance chart
      const channelPerformance = allPerformance.map(day => ({
        name: day.name,
        date: day.date,
        revenue: day[channelId] || 0,
        // Add some made up metrics for the channel details
        clicks: Math.round((day[channelId] || 0) / (5 + Math.random() * 15)),
        impressions: Math.round((day[channelId] || 0) / (1 + Math.random() * 3) * 100),
        ctr: parseFloat((Math.random() * 5).toFixed(2)),
      }));
      
      setChannelData(channel);
      setPerformanceData(channelPerformance);
      setLoading(false);
    };

    loadData();
  }, [channelId, timeframe]);

  // Calculate additional metrics
  const channelName = channelNames[channelId as keyof typeof channelNames] || "Channel";
  const channelColor = channelColors[channelId as keyof typeof channelColors] || "#4361ee";
  
  const totalRevenue = !loading && performanceData.length
    ? performanceData.reduce((sum, day) => sum + day.revenue, 0)
    : 0;
    
  const totalClicks = !loading && performanceData.length
    ? performanceData.reduce((sum, day) => sum + day.clicks, 0)
    : 0;
    
  const totalImpressions = !loading && performanceData.length
    ? performanceData.reduce((sum, day) => sum + day.impressions, 0)
    : 0;
    
  const avgCtr = totalImpressions > 0
    ? ((totalClicks / totalImpressions) * 100).toFixed(2)
    : "0";

  return (
    <div className="animate-fade-in">
      <PageHeader
        title={`${channelName} Analytics`}
        description={`Detailed performance metrics for your ${channelName.toLowerCase()} marketing channel`}
      >
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
      </PageHeader>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Revenue"
          value={loading ? "-" : `$${totalRevenue.toLocaleString()}`}
          change={5.2}
          description="vs. previous period"
          icon={<DollarSign className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard
          title="ROAS"
          value={loading || !channelData ? "-" : `${channelData.roas}x`}
          change={2.1}
          description="vs. previous period"
          icon={<TrendingUp className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard
          title="Clicks"
          value={loading ? "-" : totalClicks.toLocaleString()}
          change={3.8}
          description="vs. previous period"
          icon={<Users className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard
          title="CTR"
          value={loading ? "-" : `${avgCtr}%`}
          change={-0.5}
          description="vs. previous period"
          icon={<Percent className="h-4 w-4" />}
          loading={loading}
        />
      </div>

      {/* Performance chart */}
      <div className="dashboard-card mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-medium">{channelName} Performance</h3>
            <p className="text-sm text-muted-foreground">
              Revenue and engagement metrics over time
            </p>
          </div>
        </div>

        <PerformanceChart
          data={performanceData}
          lines={[
            {
              dataKey: "revenue",
              color: channelColor,
              label: "Revenue",
            },
          ]}
          loading={loading}
          height={350}
        />
      </div>

      {/* Channel insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Performance Breakdown</CardTitle>
            <CardDescription>
              Key metrics for the {channelName} channel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Revenue</span>
                <span className="font-semibold">
                  ${channelData?.revenue?.toLocaleString() || "-"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Cost</span>
                <span className="font-semibold">
                  ${channelData?.cost?.toLocaleString() || "-"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">ROAS</span>
                <span className="font-semibold">
                  {channelData?.roas || "-"}x
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Conversion Rate</span>
                <span className="font-semibold">
                  {channelData?.conversion || "-"}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">CPA</span>
                <span className="font-semibold">
                  ${channelData?.cpa || "-"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Impressions</span>
                <span className="font-semibold">
                  {totalImpressions?.toLocaleString() || "-"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Clicks</span>
                <span className="font-semibold">
                  {totalClicks?.toLocaleString() || "-"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">CTR</span>
                <span className="font-semibold">{avgCtr}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Channel Insights</CardTitle>
              <CardDescription>
                Analysis and recommendations for {channelName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Performance Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    {channelName} is currently {channelData?.roas >= 2 ? "performing well" : "underperforming"} with a ROAS of {channelData?.roas || "-"}x. 
                    {channelData?.roas >= 3 
                      ? " This channel is one of your top performers and should be considered for additional investment."
                      : channelData?.roas >= 2
                      ? " This channel is performing at an acceptable level but has room for optimization."
                      : " This channel needs attention to improve efficiency and return on investment."}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Trends</h4>
                  <p className="text-sm text-muted-foreground">
                    Revenue has {Math.random() > 0.5 ? "increased" : "decreased"} by {Math.round(Math.random() * 15 + 5)}% compared to the previous period.
                    Conversion rates have remained relatively stable with a slight {Math.random() > 0.5 ? "upward" : "downward"} trend.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Recommendations</h4>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                    <li>
                      {channelData?.roas >= 3 
                        ? "Increase budget allocation to capitalize on strong performance"
                        : channelData?.roas >= 2
                        ? "Optimize targeting parameters to improve conversion rates"
                        : "Review campaign structure and targeting to address underperformance"}
                    </li>
                    <li>
                      Consider {channelData?.roas >= 2.5 ? "expanding" : "refining"} your keyword strategy to {channelData?.roas >= 2.5 ? "capture more traffic" : "focus on higher-converting terms"}
                    </li>
                    <li>
                      {channelData?.conversion >= 3 
                        ? "Leverage successful creative elements across other campaigns"
                        : "Test new creative variations to improve engagement metrics"}
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChannelDetailsPage;
