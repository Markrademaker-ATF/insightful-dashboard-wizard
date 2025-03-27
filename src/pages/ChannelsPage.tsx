
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, PieChart, LineChart as LineChartIcon, Filter, ArrowDown, ArrowUp } from "lucide-react";
import { ChannelPerformanceTable } from "@/components/channels/ChannelPerformanceTable";
import { ChannelBreakdownChart } from "@/components/channels/ChannelBreakdownChart";
import { ChannelTrendsChart } from "@/components/channels/ChannelTrendsChart";
import { ChannelComparisonChart } from "@/components/channels/ChannelComparisonChart";
import { ChannelMetricsCards } from "@/components/channels/ChannelMetricsCards";
import { generateChannelData, generateChannelTrendsData, channelColors, channelNames } from "@/data/mockData";
import { FilterExportControls } from "@/components/channels/FilterExportControls";
import { ChannelDetailView } from "@/components/channels/ChannelDetailView";

export default function ChannelsPage() {
  const [activeTab, setActiveTab] = useState("performance");
  const [channelData, setChannelData] = useState<any[]>([]);
  const [trendsData, setTrendsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("Q4");
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

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

  const handleChannelSelect = (value: string) => {
    if (value === "all") {
      setSelectedChannel(null);
    } else {
      setSelectedChannel(value);
    }
  };

  // Get the list of available channels for the filter
  const availableChannels = Object.keys(channelNames).map(id => ({
    id,
    name: channelNames[id as keyof typeof channelNames]
  }));

  // Get the selected channel data
  const selectedChannelData = selectedChannel 
    ? channelData.find(channel => channel.id === selectedChannel)
    : null;

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

      {/* Channel Filter Section */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Channel Filter</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedChannel(null)}
              disabled={!selectedChannel}
            >
              Clear Filter
            </Button>
          </div>
          <CardDescription>
            Select a specific channel to view detailed performance insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            <Button
              variant={!selectedChannel ? "default" : "outline"} 
              className="w-full justify-start" 
              onClick={() => handleChannelSelect("all")}
            >
              All Channels
            </Button>
            {availableChannels.map((channel) => (
              <Button
                key={channel.id}
                variant={selectedChannel === channel.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => handleChannelSelect(channel.id)}
                style={{ borderColor: selectedChannel === channel.id ? "transparent" : channelColors[channel.id as keyof typeof channelColors] }}
              >
                {channel.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Show Channel Detail View when a channel is selected */}
      {selectedChannel && selectedChannelData && (
        <ChannelDetailView 
          channelData={selectedChannelData} 
          trendsData={trendsData}
          loading={loading} 
        />
      )}

      {/* Show regular analysis when no channel is selected */}
      {!selectedChannel && (
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
      )}
    </div>
  );
}
