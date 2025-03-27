
import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, BarChart3, DollarSign, Users, Percent, Info, Filter, Cpu, Database, BarChart4, Brain } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterExportControls } from "@/components/channels/FilterExportControls";
import {
  generateChannelData,
  generatePerformanceData,
  channelColors,
  channelNames,
} from "@/data/mockData";

const ChannelDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const channelId = searchParams.get("id") || "search"; // Default to search if no ID

  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState<any | null>(null);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState("30d");
  const [attributionData, setAttributionData] = useState<any[]>([]);
  const [channelContribution, setChannelContribution] = useState<any[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState("all");

  // Mock campaigns for the filter
  const campaigns = [
    { id: "all", name: "All Campaigns" },
    { id: "camp1", name: "Summer Sale 2023" },
    { id: "camp2", name: "Holiday Promotion" },
    { id: "camp3", name: "Back to School" },
    { id: "camp4", name: "Spring Collection" },
    { id: "camp5", name: "Black Friday" },
  ];

  useEffect(() => {
    // Simulate data loading
    const loadChannelData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const channelsData = generateChannelData(timeframe === "7d" ? "Q1" : timeframe === "30d" ? "Q2" : "Q3");
      const channel = channelsData.find((c) => c.id === channelId) || channelsData[0];
      
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
      
      // Generate attribution data
      const attributionChannels = ["Paid Search", "Organic Search", "Social Media", "Display", "Email", "Direct"];
      
      // Generate date range based on timeframe
      const attributionData = Array.from({ length: days }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - i - 1));
        
        return {
          date: date.toISOString().split('T')[0],
          value: Math.round(10000 + Math.random() * 50000),
          conversions: Math.round(50 + Math.random() * 200),
        };
      });
      
      // Generate channel contribution data for data-driven attribution
      const channelContribution = attributionChannels.map(channelName => {
        // Data-driven attribution gives more nuanced distribution based on model output
        const contributionValue = parseFloat((8 + Math.random() * 25).toFixed(1));
        
        return {
          channel: channelName,
          contribution: contributionValue,
          color: getChannelColor(channelName)
        };
      });
      
      // Normalize contributions to sum to 100%
      const totalContribution = channelContribution.reduce((sum, item) => sum + item.contribution, 0);
      channelContribution.forEach(item => {
        item.contribution = parseFloat(((item.contribution / totalContribution) * 100).toFixed(1));
      });
      
      // Sort by contribution value (descending)
      channelContribution.sort((a, b) => b.contribution - a.contribution);
      
      setAttributionData(attributionData);
      setChannelContribution(channelContribution);
      setLoading(false);
    };
    
    loadChannelData();
  }, [channelId, timeframe, selectedCampaign]); // Added selectedCampaign dependency
  
  // Calculate totals for attribution metrics
  const totalRevenue = !loading && attributionData.length
    ? attributionData.reduce((sum, day) => sum + day.value, 0)
    : 0;
    
  const totalConversions = !loading && attributionData.length
    ? attributionData.reduce((sum, day) => sum + day.conversions, 0)
    : 0;
    
  const avgOrderValue = totalConversions > 0
    ? totalRevenue / totalConversions
    : 0;
  
  const conversionRate = 5.2; // Dummy value

  // Helper function to get channel colors
  const getChannelColor = (channel: string) => {
    const colors: Record<string, string> = {
      "Paid Search": "#4361ee",
      "Organic Search": "#3a0ca3",
      "Social Media": "#7209b7",
      "Display": "#f72585",
      "Email": "#4cc9f0",
      "Direct": "#560bad"
    };
    
    return colors[channel] || "#888888";
  };
  
  // Calculate channel metrics for current data
  const channelName = channelNames[channelId as keyof typeof channelNames] || "Channel";
  const channelColor = channelColors[channelId as keyof typeof channelColors] || "#4361ee";
  
  const channelTotalRevenue = !loading && performanceData.length
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

  // Handle campaign change
  const handleCampaignChange = (campaignId: string) => {
    setSelectedCampaign(campaignId);
    setLoading(true);
    // In a real app, this would fetch data for the selected campaign
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Campaign Analysis"
        description="Advanced campaign performance analysis with data-driven attribution"
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

      {/* Data-Driven Attribution Section */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <div className="flex flex-row items-center gap-2 mb-1">
              <Brain className="h-5 w-5 text-primary" />
              <CardTitle>Data-Driven Attribution</CardTitle>
            </div>
            <CardDescription>
              Powered by deep learning LSTM and Temporal Fusion Transformer models 
              that analyze touchpoint sequences to determine true contribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium mb-3">How It Works</h3>
                <div className="p-4 bg-muted/40 rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                      <Database className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Data Collection</p>
                      <p className="text-xs text-muted-foreground">
                        Captures complete customer journey touchpoints across all channels and devices
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                      <Cpu className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Deep Learning Models</p>
                      <p className="text-xs text-muted-foreground">
                        LSTM networks analyze sequential patterns while Temporal Fusion Transformers identify key interactions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                      <BarChart4 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Advanced Analytics</p>
                      <p className="text-xs text-muted-foreground">
                        Algorithms identify true incremental impact of each touchpoint based on conversion probability
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium mb-3">Model Advantages</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Captures complex non-linear relationships between touchpoints</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Accounts for time delays between marketing activities and conversions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Identifies channel synergies and diminishing returns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Continuously improves attribution accuracy with new data</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Personalizes attribution based on customer segments</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Campaign Selector */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-medium">Channel Contribution Analysis</h3>
              <Select
                value={selectedCampaign}
                onValueChange={handleCampaignChange}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Select campaign" />
                </SelectTrigger>
                <SelectContent>
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Attributed Revenue"
                value={loading ? "-" : `$${totalRevenue.toLocaleString()}`}
                change={5.2}
                description="vs. previous period"
                icon={<DollarSign className="h-4 w-4" />}
                loading={loading}
              />
              <MetricCard
                title="Attributed Conversions"
                value={loading ? "-" : totalConversions.toLocaleString()}
                change={3.8}
                description="vs. previous period"
                icon={<Users className="h-4 w-4" />}
                loading={loading}
              />
              <MetricCard
                title="Average Order Value"
                value={loading ? "-" : `$${avgOrderValue.toFixed(2)}`}
                change={1.5}
                description="vs. previous period"
                icon={<BarChart3 className="h-4 w-4" />}
                loading={loading}
              />
              <MetricCard
                title="Conversion Rate"
                value={loading ? "-" : `${conversionRate}%`}
                change={0.3}
                description="vs. previous period"
                icon={<TrendingUp className="h-4 w-4" />}
                loading={loading}
              />
            </div>

            {/* Attribution chart */}
            {loading ? (
              <Skeleton className="w-full h-[400px]" />
            ) : (
              <div className="h-[400px]">
                <AttributionChart data={channelContribution} />
              </div>
            )}
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> 
                Showing data-driven attribution results from neural network models trained on your marketing data.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attribution over time */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Attribution Performance Over Time</CardTitle>
          <CardDescription>
            Visualize attributed revenue and conversions across the selected time period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PerformanceChart 
            data={attributionData} 
            lines={[
              {
                dataKey: "value",
                color: "#4361ee",
                label: "Attributed Revenue",
              },
            ]}
            loading={loading}
            height={350}
          />
        </CardContent>
      </Card>

      {/* Campaign Details Section */}
      <div className="mt-10 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Campaign Details</h2>
          <FilterExportControls 
            filterOptions={{ 
              metrics: true, 
              channels: false
            }}
          />
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={loading ? "-" : `$${channelTotalRevenue.toLocaleString()}`}
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
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{selectedCampaign === "all" ? "All Campaigns" : campaigns.find(c => c.id === selectedCampaign)?.name || "Campaign"} Performance</CardTitle>
            <CardDescription>
              Revenue and engagement metrics over time
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

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
                <CardTitle>Campaign Insights</CardTitle>
                <CardDescription>
                  Analysis and recommendations for {selectedCampaign === "all" ? "all campaigns" : campaigns.find(c => c.id === selectedCampaign)?.name || "the campaign"}
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
    </div>
  );
};

export default ChannelDetailsPage;

// Helper component for the attribution chart
const AttributionChart: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="w-full h-full flex">
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="relative pt-1">
              {data.map((item, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-sm">{item.channel}</span>
                    <span className="font-medium text-sm">{item.contribution}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${item.contribution}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-80 flex flex-col justify-center">
        <div className="aspect-square relative rounded-full overflow-hidden border border-border">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium">
              Attribution<br/>Breakdown
            </span>
          </div>
          {data.map((item, index) => {
            // Calculate the size of this segment
            const previousTotal = data
              .slice(0, index)
              .reduce((sum, i) => sum + i.contribution, 0);
            const angle = (item.contribution / 100) * 360;
            const startAngle = (previousTotal / 100) * 360;
            
            return (
              <div
                key={index}
                className="absolute inset-0"
                style={{
                  background: `conic-gradient(
                    ${item.color} ${startAngle}deg,
                    ${item.color} ${startAngle + angle}deg,
                    transparent ${startAngle + angle}deg,
                    transparent 360deg
                  )`
                }}
              ></div>
            );
          })}
        </div>
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-xs">{item.channel}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
