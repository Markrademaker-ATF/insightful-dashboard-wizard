
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, PieChart, LineChart as LineChartIcon } from "lucide-react";
import { ChannelPerformanceTable } from "@/components/channels/ChannelPerformanceTable";
import { ChannelBreakdownChart } from "@/components/channels/ChannelBreakdownChart";
import { ChannelTrendsChart } from "@/components/channels/ChannelTrendsChart";
import { ChannelComparisonChart } from "@/components/channels/ChannelComparisonChart";
import { ChannelMetricsCards } from "@/components/channels/ChannelMetricsCards";
import { generateChannelData, generateChannelTrendsData } from "@/data/mockData";
import { FilterExportControls } from "@/components/channels/FilterExportControls";

export default function ChannelsPage() {
  const [activeTab, setActiveTab] = useState("performance");
  const [channelData, setChannelData] = useState<any[]>([]);
  const [trendsData, setTrendsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("Q4");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const data = generateChannelData(timeframe);
      const trends = generateChannelTrendsData();
      
      setChannelData(data);
      setTrendsData(trends);
      setLoading(false);
    };

    loadData();
  }, [timeframe]);

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col">
        <PageHeader title="Channels" description="Analyze campaign performance by channel">
          <div className="flex items-center gap-2">
            <Select onValueChange={handleTimeframeChange} defaultValue="Q4">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Q1">Q1 2023</SelectItem>
                <SelectItem value="Q2">Q2 2023</SelectItem>
                <SelectItem value="Q3">Q3 2023</SelectItem>
                <SelectItem value="Q4">Q4 2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </PageHeader>
      </div>

      <ChannelMetricsCards data={channelData} loading={loading} />

      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex flex-col space-y-1.5">
            <CardTitle>Channel Analysis</CardTitle>
            <CardDescription>
              Compare performance metrics across channels
            </CardDescription>
          </div>
          <div className="ml-auto">
            <FilterExportControls />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="performance" className="flex items-center gap-1">
                <BarChart className="h-4 w-4" /> Performance
              </TabsTrigger>
              <TabsTrigger value="breakdown" className="flex items-center gap-1">
                <PieChart className="h-4 w-4" /> Breakdown
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-1">
                <LineChartIcon className="h-4 w-4" /> Trends
              </TabsTrigger>
              <TabsTrigger value="comparison" className="flex items-center gap-1">
                <BarChart className="h-4 w-4" /> Comparison
              </TabsTrigger>
            </TabsList>
            <TabsContent value="performance" className="border-none p-0 pt-4">
              <ChannelPerformanceTable data={channelData} loading={loading} />
            </TabsContent>
            <TabsContent value="breakdown" className="border-none p-0 pt-4">
              <ChannelBreakdownChart data={channelData} loading={loading} />
            </TabsContent>
            <TabsContent value="trends" className="border-none p-0 pt-4">
              <ChannelTrendsChart data={trendsData} loading={loading} />
            </TabsContent>
            <TabsContent value="comparison" className="border-none p-0 pt-4">
              <ChannelComparisonChart data={channelData} loading={loading} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
