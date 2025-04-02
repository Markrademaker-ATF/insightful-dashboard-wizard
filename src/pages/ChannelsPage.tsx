import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, PieChart, LineChart as LineChartIcon, Filter, ArrowDown, ArrowUp, Table as TableIcon, Info, ChevronRight, TrendingUp, Lightbulb } from "lucide-react";
import { ChannelPerformanceTable } from "@/components/channels/ChannelPerformanceTable";
import { ChannelBreakdownChart } from "@/components/channels/ChannelBreakdownChart";
import { ChannelTrendsChart } from "@/components/channels/ChannelTrendsChart";
import { ChannelComparisonChart } from "@/components/channels/ChannelComparisonChart";
import { ChannelMetricsOverview } from "@/components/channels/ChannelMetricsOverview";
import { generateChannelData, generateChannelTrendsData, channelColors, channelNames, generateSankeyData } from "@/data/mockData";
import { FilterExportControls } from "@/components/channels/FilterExportControls";
import { ChannelDetailView } from "@/components/channels/ChannelDetailView";
import { RoasComparisonChart } from "@/components/channels/RoasComparisonChart";
import { EnhancedWaterfallChart } from "@/components/dashboard/EnhancedWaterfallChart";
import { SankeyDiagram } from "@/components/dashboard/SankeyDiagram";
import { ChartContainer } from "@/components/ui/chart";
import { WaterfallChart } from "@/components/dashboard/WaterfallChart";

export default function ChannelsPage() {
  const [mainTab, setMainTab] = useState("analysis");
  const [activeTab, setActiveTab] = useState("performance");
  const [channelData, setChannelData] = useState<any[]>([]);
  const [trendsData, setTrendsData] = useState<any[]>([]);
  const [mmmTab, setMmmTab] = useState("current");
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("Q4");
  const [selectedChannel, setSelectedChannel] = useState<string | null>(Object.keys(channelNames)[0]); // Default to first channel
  const [incrementalData, setIncrementalData] = useState<any[]>([]);
  const [yoyData, setYoyData] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Generate data with incremental outcomes included
      const data = generateChannelData(timeframe);
      const trends = generateChannelTrendsData();

      // Generate incremental data for waterfall chart
      const incrementalData = [
        {
          baseline: 1200000,
          paid: 350000,
          organic: 280000,
          nonPaid: 220000,
          total: 2050000
        }
      ];
      
      // Generate YoY comparative data
      const yoyData = {
        factors: [
          { name: "Paid Online Media", currentYear: 350000, previousYear: 310000, percentChange: 12.9 },
          { name: "Offline Media", currentYear: 180000, previousYear: 210000, percentChange: -14.3 },
          { name: "Branding", currentYear: 120000, previousYear: 90000, percentChange: 33.3 },
          { name: "Promotions", currentYear: 210000, previousYear: 190000, percentChange: 10.5 },
          { name: "Pricing", currentYear: 90000, previousYear: 100000, percentChange: -10.0 },
          { name: "Distribution", currentYear: 70000, previousYear: 50000, percentChange: 40.0 },
          { name: "External Factors", currentYear: 50000, previousYear: 70000, percentChange: -28.6 },
          { name: "Baseline", currentYear: 1200000, previousYear: 1100000, percentChange: 9.1 }
        ],
        channels: [
          { name: "Search", currentYear: 150000, previousYear: 130000, percentChange: 15.4, roasChange: 8.2 },
          { name: "Social", currentYear: 120000, previousYear: 95000, percentChange: 26.3, roasChange: -3.5 },
          { name: "Display", currentYear: 50000, previousYear: 60000, percentChange: -16.7, roasChange: -12.1 },
          { name: "Video", currentYear: 30000, previousYear: 25000, percentChange: 20.0, roasChange: 15.8 }
        ],
        external: [
          { name: "Economic Growth", currentYear: 15000, previousYear: 20000, percentChange: -25.0 },
          { name: "Seasonality", currentYear: 20000, previousYear: 25000, percentChange: -20.0 },
          { name: "Competition", currentYear: 10000, previousYear: 15000, percentChange: -33.3 },
          { name: "Market Trends", currentYear: 5000, previousYear: 10000, percentChange: -50.0 }
        ]
      };
      
      setChannelData(data);
      setTrendsData(trends);
      setIncrementalData(incrementalData);
      setYoyData(yoyData);
      setLoading(false);
    };

    loadData();
  }, [timeframe]);

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
  };

  const handleChannelSelect = (value: string) => {
    setSelectedChannel(value);
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

  // Generate data for Sankey diagram
  const sankeyData = generateSankeyData();

  // Prepare data for the media channel breakdown
  const mediaChannelsData = [
    { name: 'Search', value: 150000, fill: channelColors.search },
    { name: 'Social', value: 120000, fill: channelColors.social },
    { name: 'Display', value: 50000, fill: channelColors.display },
    { name: 'Video', value: 30000, fill: channelColors.video },
    { name: 'Total', value: 350000, fill: '#33C3F0', isTotal: true }
  ];

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col">
        <PageHeader title="Channel Analysis (MMM)" description="Analyze campaign performance by channel">
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

      {/* Top-level MMM tabs for Current Analysis vs Year-over-Year */}
      <Tabs value={mmmTab} onValueChange={setMmmTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="current">Current Analysis</TabsTrigger>
          <TabsTrigger value="yoy">Channel Analysis YoY</TabsTrigger>
        </TabsList>
        
        {/* Current Analysis Tab Content */}
        <TabsContent value="current" className="space-y-6">
          {/* High-level contributions */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    High-level Contributions
                  </CardTitle>
                  <CardDescription>
                    What % of my revenue comes from different channels?
                  </CardDescription>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg max-w-sm">
                  <h4 className="flex items-center gap-2 text-sm font-medium mb-1 text-primary">
                    <Lightbulb className="h-4 w-4" /> Key Takeaway
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Paid media contributes 17% of your total revenue, with Search and Social being the strongest performers.
                    Your organic baseline accounts for 58% of revenue.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-medium mb-2">Media Channel Breakdowns</h3>
                  <SankeyDiagram data={sankeyData} height={350} />
                </div>
                <div>
                  <h3 className="text-md font-medium mb-2">Incremental Revenue per Factor</h3>
                  <EnhancedWaterfallChart data={incrementalData} height={350} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Incremental Revenue per Media Channel */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    Incremental Revenue per Media Channel
                  </CardTitle>
                  <CardDescription>
                    What is the breakdown of Incremental Revenue per media channel?
                  </CardDescription>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg max-w-sm">
                  <h4 className="flex items-center gap-2 text-sm font-medium mb-1 text-primary">
                    <Lightbulb className="h-4 w-4" /> Key Takeaway
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Search and Social media drive 77% of your media-attributed revenue. 
                    Consider reallocating budget from Display to better performing channels.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-medium mb-2">Media Channel Contribution</h3>
                  <WaterfallChart data={mediaChannelsData} height={350} />
                </div>
                <div>
                  <h3 className="text-md font-medium mb-2">ROAS per Media Channel</h3>
                  <RoasComparisonChart channelData={channelData} loading={loading} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Individual Channel Deep Dives */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <LineChartIcon className="h-5 w-5 text-primary" />
                    Deep Dives into Individual Channel Performance
                  </CardTitle>
                  <CardDescription>
                    Detailed analysis of each channel's performance metrics
                  </CardDescription>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg max-w-sm">
                  <h4 className="flex items-center gap-2 text-sm font-medium mb-1 text-primary">
                    <Lightbulb className="h-4 w-4" /> Key Takeaway
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Search shows the highest ROAS (4.5) and consistently delivers strong performance.
                    Social media has the strongest growth trend with 26% YoY improvement.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                <h3 className="text-sm font-medium mb-3">Channel Filter</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {availableChannels.filter(channel => 
                    ["google", "facebook", "youtube", "tiktok"].includes(channel.id)
                  ).map((channel) => (
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
              </div>
              
              {/* Show Channel Detail View when a channel is selected */}
              {selectedChannel && selectedChannelData ? (
                <ChannelDetailView 
                  channelData={selectedChannelData} 
                  trendsData={trendsData}
                  loading={loading} 
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Select a channel above to view detailed performance data
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Year-over-Year Analysis Tab Content */}
        <TabsContent value="yoy" className="space-y-6">
          {/* % change in incremental revenue per macro factor */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Percentage Change in Incremental Revenue per Factor
                  </CardTitle>
                  <CardDescription>
                    How has incremental revenue changed since last year across different factors?
                  </CardDescription>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg max-w-sm">
                  <h4 className="flex items-center gap-2 text-sm font-medium mb-1 text-primary">
                    <Lightbulb className="h-4 w-4" /> Key Takeaway
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Distribution (+40%) and Branding (+33%) show the strongest improvements this year,
                    while External Factors (-29%) and Offline Media (-14%) show the largest declines.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse table-auto">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3">Factor</th>
                      <th className="text-right p-3">Current Year</th>
                      <th className="text-right p-3">Previous Year</th>
                      <th className="text-right p-3">% Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yoyData.factors.map((factor, index) => (
                      <tr key={index} className="border-t border-border hover:bg-muted/20">
                        <td className="p-3 font-medium">{factor.name}</td>
                        <td className="p-3 text-right">${factor.currentYear.toLocaleString()}</td>
                        <td className="p-3 text-right">${factor.previousYear.toLocaleString()}</td>
                        <td className={`p-3 text-right font-medium ${factor.percentChange > 0 ? 'text-green-600' : factor.percentChange < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                          {factor.percentChange > 0 ? '+' : ''}{factor.percentChange.toFixed(1)}%
                          {factor.percentChange > 0 ? <ArrowUp className="h-4 w-4 inline ml-1" /> : factor.percentChange < 0 ? <ArrowDown className="h-4 w-4 inline ml-1" /> : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* % change in channel-level performance */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ChevronRight className="h-5 w-5 text-primary" />
                    Percentage Change in Channel-Level Performance
                  </CardTitle>
                  <CardDescription>
                    How has revenue and ROAS changed per media channel?
                  </CardDescription>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg max-w-sm">
                  <h4 className="flex items-center gap-2 text-sm font-medium mb-1 text-primary">
                    <Lightbulb className="h-4 w-4" /> Key Takeaway
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Social media shows the strongest revenue growth (+26.3%) while Display advertising 
                    has declined (-16.7%). Video is showing the best ROAS improvement (+15.8%).
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="overflow-x-auto">
                  <h3 className="text-md font-medium mb-2">Revenue Change by Channel</h3>
                  <table className="w-full border-collapse table-auto">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3">Channel</th>
                        <th className="text-right p-3">Current Year</th>
                        <th className="text-right p-3">Previous Year</th>
                        <th className="text-right p-3">% Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yoyData.channels.map((channel, index) => (
                        <tr key={index} className="border-t border-border hover:bg-muted/20">
                          <td className="p-3 font-medium">{channel.name}</td>
                          <td className="p-3 text-right">${channel.currentYear.toLocaleString()}</td>
                          <td className="p-3 text-right">${channel.previousYear.toLocaleString()}</td>
                          <td className={`p-3 text-right font-medium ${channel.percentChange > 0 ? 'text-green-600' : channel.percentChange < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                            {channel.percentChange > 0 ? '+' : ''}{channel.percentChange.toFixed(1)}%
                            {channel.percentChange > 0 ? <ArrowUp className="h-4 w-4 inline ml-1" /> : channel.percentChange < 0 ? <ArrowDown className="h-4 w-4 inline ml-1" /> : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="overflow-x-auto">
                  <h3 className="text-md font-medium mb-2">ROAS Change by Channel</h3>
                  <table className="w-full border-collapse table-auto">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3">Channel</th>
                        <th className="text-right p-3">% Change in ROAS</th>
                        <th className="text-right p-3">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yoyData.channels.map((channel, index) => (
                        <tr key={index} className="border-t border-border hover:bg-muted/20">
                          <td className="p-3 font-medium">{channel.name}</td>
                          <td className={`p-3 text-right font-medium ${channel.roasChange > 0 ? 'text-green-600' : channel.roasChange < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                            {channel.roasChange > 0 ? '+' : ''}{channel.roasChange.toFixed(1)}%
                          </td>
                          <td className="p-3 text-right">
                            {channel.roasChange > 10 ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Strong <ArrowUp className="h-3 w-3 ml-1" />
                              </span>
                            ) : channel.roasChange > 0 ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Improving <ArrowUp className="h-3 w-3 ml-1" />
                              </span>
                            ) : channel.roasChange > -10 ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Declining <ArrowDown className="h-3 w-3 ml-1" />
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Weak <ArrowDown className="h-3 w-3 ml-1" />
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* % change from external factors */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Percentage Change from External Factors
                  </CardTitle>
                  <CardDescription>
                    How has incremental revenue from external factors changed?
                  </CardDescription>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg max-w-sm">
                  <h4 className="flex items-center gap-2 text-sm font-medium mb-1 text-primary">
                    <Lightbulb className="h-4 w-4" /> Key Takeaway
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    All external factors show negative impacts compared to last year, with Market Trends
                    showing the largest decline (-50%). This suggests a challenging external environment.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse table-auto">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3">External Factor</th>
                      <th className="text-right p-3">Current Year</th>
                      <th className="text-right p-3">Previous Year</th>
                      <th className="text-right p-3">% Change</th>
                      <th className="text-right p-3">Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yoyData.external.map((factor, index) => (
                      <tr key={index} className="border-t border-border hover:bg-muted/20">
                        <td className="p-3 font-medium">{factor.name}</td>
                        <td className="p-3 text-right">${factor.currentYear.toLocaleString()}</td>
                        <td className="p-3 text-right">${factor.previousYear.toLocaleString()}</td>
                        <td className={`p-3 text-right font-medium ${factor.percentChange > 0 ? 'text-green-600' : factor.percentChange < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                          {factor.percentChange > 0 ? '+' : ''}{factor.percentChange.toFixed(1)}%
                          {factor.percentChange > 0 ? <ArrowUp className="h-4 w-4 inline ml-1" /> : factor.percentChange < 0 ? <ArrowDown className="h-4 w-4 inline ml-1" /> : null}
                        </td>
                        <td className="p-3 text-right">
                          {factor.percentChange > 0 ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Positive
                            </span>
                          ) : factor.percentChange > -25 ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Moderate
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Significant
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t border-t-2 border-border bg-muted/10">
                      <td className="p-3 font-medium">Total External Impact</td>
                      <td className="p-3 text-right font-medium">${yoyData.external.reduce((sum, factor) => sum + factor.currentYear, 0).toLocaleString()}</td>
                      <td className="p-3 text-right font-medium">${yoyData.external.reduce((sum, factor) => sum + factor.previousYear, 0).toLocaleString()}</td>
                      <td className="p-3 text-right font-medium text-red-600">
                        {((yoyData.external.reduce((sum, factor) => sum + factor.currentYear, 0) / 
                          yoyData.external.reduce((sum, factor) => sum + factor.previousYear, 0) - 1) * 100).toFixed(1)}%
                        <ArrowDown className="h-4 w-4 inline ml-1" />
                      </td>
                      <td className="p-3 text-right">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Significant
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Original Tabs Content - Keeping for reference if needed */}
      {/* Remove this section if you want to completely replace the content */}
      {/* <ChannelMetricsOverview data={channelData} loading={loading} /> */}
      
      {/* Main Tabs 
      <Tabs value={mainTab} onValueChange={setMainTab} className="space-y-6">
        <TabsList className="justify-start">
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" /> Channel Overview
          </TabsTrigger>
          <TabsTrigger value="details" className="flex items-center gap-2">
            <TableIcon className="h-4 w-4" /> Channel Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="flex flex-col space-y-1.5">
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" /> Channel Overview
                </CardTitle>
                <CardDescription>
                  Compare performance metrics across channels
                </CardDescription>
              </div>
              <div className="ml-auto">
                <FilterExportControls />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium mb-1">About Channel Overview</h3>
                    <p className="text-sm text-muted-foreground">
                      This dashboard provides a comprehensive view of your marketing channel performance. 
                      ROAS (Return on Ad Spend) is the primary metric used to evaluate efficiency across channels.
                      Use the tabs below to explore different visualizations and insights about your marketing mix.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">ROAS by Channel</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Compare the return on ad spend across your marketing channels. Higher values indicate more efficient spending.
                </p>
                <RoasComparisonChart channelData={channelData} loading={loading} />
              </div>
              
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
                
                <div className="mt-2 mb-4">
                  {activeTab === "performance" && (
                    <p className="text-sm text-muted-foreground">
                      View detailed performance metrics for each channel in a tabular format.
                    </p>
                  )}
                  {activeTab === "breakdown" && (
                    <p className="text-sm text-muted-foreground">
                      Visualize the contribution of each channel to your overall marketing performance.
                    </p>
                  )}
                  {activeTab === "trends" && (
                    <p className="text-sm text-muted-foreground">
                      Track how channel performance has evolved over time to identify patterns and opportunities.
                    </p>
                  )}
                  {activeTab === "comparison" && (
                    <p className="text-sm text-muted-foreground">
                      Compare multiple metrics across channels to understand relative strengths and weaknesses.
                    </p>
                  )}
                </div>
                
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
        </TabsContent>

        <TabsContent value="details" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TableIcon className="h-5 w-5" /> 
                    Channel Details
                  </CardTitle>
                  <CardDescription>
                    Select a specific channel to view detailed performance insights
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-sm font
