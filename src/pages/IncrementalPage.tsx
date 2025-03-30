import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, TrendingUp, BarChart3, PieChart, Activity, Calendar, Filter, ArrowUpDown } from "lucide-react";
import {
  generateIncrementalData,
  channelColors,
  generateSankeyData,
  generateChannelTrendsData
} from "@/data/mockData";
import {
  generateMediaGroupData,
  generateSaturationData,
  generateTimeSeriesData,
  generateMarginalReturnsData,
  getChannelDataByMediaType,
} from "@/data/mediaGroupData";

// Import the components
import { PerformanceBreakdownSection } from "@/components/dashboard/PerformanceBreakdownSection";
import { MediaTypeAnalysisSection } from "@/components/dashboard/MediaTypeAnalysisSection";
import { KeyContributorsSection } from "@/components/dashboard/KeyContributorsSection";
import { MediaTypesExplanationCard } from "@/components/dashboard/MediaTypesExplanationCard";
import { ChannelOption } from "@/components/dashboard/MediaTypeSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChannelTrendsChart } from "@/components/channels/ChannelTrendsChart";
import { FilterDropdown } from "@/components/dashboard/FilterDropdown";

const IncrementalPage = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [incrementalData, setIncrementalData] = useState<any[]>([]);
  const [mediaGroupData, setMediaGroupData] = useState<any[]>([]);
  const [saturationData, setSaturationData] = useState<any[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);
  const [marginalReturnsData, setMarginalReturnsData] = useState<any[]>([]);
  const [channelData, setChannelData] = useState<any[]>([]);
  const [channelTrendsData, setChannelTrendsData] = useState<any[]>([]);
  const [mediaType, setMediaType] = useState("all");
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [timeframe, setTimeframe] = useState("90d");

  // Channel options for each media type
  const channelOptions: ChannelOption[] = [
    // Paid Media Channels
    { value: "search", label: "Search", color: "#4361ee", group: "paid" },
    { value: "social", label: "Social Media", color: "#3a0ca3", group: "paid" },
    { value: "display", label: "Display", color: "#4cc9f0", group: "paid" },
    { value: "video", label: "Video", color: "#7209b7", group: "paid" },
    
    // Organic Media Channels
    { value: "seo", label: "SEO", color: "#06d6a0", group: "organic" },
    { value: "content", label: "Content", color: "#2dc653", group: "organic" },
    { value: "referral", label: "Referral", color: "#57cc99", group: "organic" },
    
    // Non-Paid Media Channels
    { value: "email", label: "Email", color: "#ffd166", group: "nonPaid" },
    { value: "affiliate", label: "Affiliate", color: "#ffb703", group: "nonPaid" },
    { value: "pr", label: "PR", color: "#fb8500", group: "nonPaid" },
    
    // Baseline Channels
    { value: "brand", label: "Brand", color: "#ef476f", group: "baseline" },
    { value: "seasonal", label: "Seasonal", color: "#e56b6f", group: "baseline" },
    { value: "market", label: "Market Factors", color: "#d62828", group: "baseline" },
  ];

  // Time period options
  const timeframeOptions = [
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "6m", label: "Last 6 Months" },
    { value: "1y", label: "Last Year" }
  ];

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Load all the data
      const incData = generateIncrementalData();
      const mediaData = generateMediaGroupData();
      const satData = generateSaturationData();
      const tsData = generateTimeSeriesData();
      const mrData = generateMarginalReturnsData();
      const chData = getChannelDataByMediaType(mediaType);
      const trendData = generateChannelTrendsData(90); // 90 days of trend data

      setIncrementalData(incData);
      setMediaGroupData(mediaData);
      setSaturationData(satData);
      setTimeSeriesData(tsData);
      setMarginalReturnsData(mrData);
      setChannelData(chData);
      setChannelTrendsData(trendData);
      setLoading(false);
    };

    loadData();
  }, [timeframe]);

  // Update channel data when media type or selected channel changes
  useEffect(() => {
    if (!loading) {
      const updatedChannelData = getChannelDataByMediaType(mediaType);
      setChannelData(updatedChannelData);
    }
  }, [mediaType, selectedChannel, loading]);

  // Calculate latest period data for key metrics
  const latestPeriodData = !loading && mediaGroupData.length > 0 
    ? mediaGroupData[mediaGroupData.length - 1] 
    : { paid: 0, organic: 0, nonPaid: 0, baseline: 0, total: 0 };

  // Handler for timeframe change  
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Incremental Analysis"
        description="Analyze baseline and incremental contribution to performance across media types and channels"
      >
        <div className="flex items-center gap-2">
          <FilterDropdown 
            options={timeframeOptions}
            value={timeframe}
            onChange={handleTimeframeChange}
            icon={<Calendar className="h-4 w-4 mr-2" />}
            label="Time Period"
          />
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </PageHeader>

      {/* Key metrics section with improved visual cards */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Paid Media Card */}
          <Card className="shadow-sm border border-border/40 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-blue-500/40 to-blue-400/20"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Paid Media</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {loading ? "..." : `$${Math.round(latestPeriodData.paid).toLocaleString()}`}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {loading ? "" : `${Math.round((latestPeriodData.paid / latestPeriodData.total) * 100)}% of total`}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-blue-50">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organic Media Card */}
          <Card className="shadow-sm border border-border/40 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-green-500/40 to-green-400/20"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Organic Media</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {loading ? "..." : `$${Math.round(latestPeriodData.organic).toLocaleString()}`}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {loading ? "" : `${Math.round((latestPeriodData.organic / latestPeriodData.total) * 100)}% of total`}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-green-50">
                  <Activity className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Non-Paid Media Card */}
          <Card className="shadow-sm border border-border/40 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-purple-500/40 to-purple-400/20"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Non-Paid Media</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {loading ? "..." : `$${Math.round(latestPeriodData.nonPaid).toLocaleString()}`}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {loading ? "" : `${Math.round((latestPeriodData.nonPaid / latestPeriodData.total) * 100)}% of total`}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-purple-50">
                  <PieChart className="h-5 w-5 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Baseline Card */}
          <Card className="shadow-sm border border-border/40 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-gray-500/40 to-gray-400/20"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Baseline</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {loading ? "..." : `$${Math.round(latestPeriodData.baseline).toLocaleString()}`}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {loading ? "" : `${Math.round((latestPeriodData.baseline / latestPeriodData.total) * 100)}% of total`}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-gray-50">
                  <TrendingUp className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content with Tabs Navigation */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-8"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="mediaTypes" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" /> Media Types
          </TabsTrigger>
          <TabsTrigger value="channels" className="flex items-center gap-2">
            <Activity className="h-4 w-4" /> Channel Analysis
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> Performance Trends
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-8">
          <PerformanceBreakdownSection data={timeSeriesData} loading={loading} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <KeyContributorsSection incrementalData={incrementalData} loading={loading} />
            <MediaTypesExplanationCard />
          </div>
        </TabsContent>

        {/* Media Types Tab Content */}
        <TabsContent value="mediaTypes" className="space-y-8">
          <MediaTypeAnalysisSection
            mediaGroupData={mediaGroupData}
            saturationData={saturationData}
            marginalReturnsData={marginalReturnsData}
            channelData={channelData}
            mediaType={mediaType}
            setMediaType={setMediaType}
            loading={loading}
            channelOptions={channelOptions}
            selectedChannel={selectedChannel}
            setSelectedChannel={setSelectedChannel}
            timeSeriesData={timeSeriesData}
          />
        </TabsContent>

        {/* Channels Tab Content */}
        <TabsContent value="channels" className="space-y-8">
          <IncrementalChannelAnalysis 
            incrementalData={incrementalData}
            loading={loading}
            channelOptions={channelOptions}
          />
        </TabsContent>

        {/* Trends Tab Content */}
        <TabsContent value="trends" className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Channel Performance Trends</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Track how each channel's performance has changed over time to identify emerging patterns and shifts in effectiveness.
              </p>
              <ChannelTrendsChart 
                data={channelTrendsData}
                loading={loading}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IncrementalPage;

// New component for Channel Analysis Tab
interface IncrementalChannelAnalysisProps {
  incrementalData: any[];
  loading: boolean;
  channelOptions: ChannelOption[];
}

function IncrementalChannelAnalysis({ incrementalData, loading, channelOptions }: IncrementalChannelAnalysisProps) {
  const [sortBy, setSortBy] = useState<string>("incremental");
  const [filterGroup, setFilterGroup] = useState<string>("all");
  
  // Filter and sort channels
  const filteredChannels = incrementalData.filter(channel => 
    filterGroup === "all" || 
    channelOptions.find(opt => opt.value === channel.id)?.group === filterGroup
  );
  
  const sortedChannels = [...filteredChannels].sort((a, b) => {
    if (sortBy === "incremental") return b.incremental - a.incremental;
    if (sortBy === "baseline") return b.baseline - a.baseline;
    if (sortBy === "total") return b.total - a.total;
    return 0;
  });

  // Calculate totals for the selected group
  const groupTotals = {
    incremental: sortedChannels.reduce((sum, channel) => sum + channel.incremental, 0),
    baseline: sortedChannels.reduce((sum, channel) => sum + channel.baseline, 0),
    total: sortedChannels.reduce((sum, channel) => sum + channel.total, 0)
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium">Channel Contribution Analysis</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Breakdown of incremental and baseline contribution by individual channels
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
              {/* Filter by Media Group */}
              <div>
                <select 
                  className="px-3 py-2 rounded-md border text-sm"
                  value={filterGroup}
                  onChange={e => setFilterGroup(e.target.value)}
                >
                  <option value="all">All Media Groups</option>
                  <option value="paid">Paid Media</option>
                  <option value="organic">Organic Media</option>
                  <option value="nonPaid">Non-Paid Media</option>
                  <option value="baseline">Baseline</option>
                </select>
              </div>
              
              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <Button 
                  variant={sortBy === "incremental" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSortBy("incremental")}
                >
                  Incremental
                </Button>
                <Button 
                  variant={sortBy === "baseline" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSortBy("baseline")}
                >
                  Baseline
                </Button>
                <Button 
                  variant={sortBy === "total" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSortBy("total")}
                >
                  Total
                </Button>
              </div>
            </div>
          </div>
          
          {/* Channel Analysis Grid */}
          {loading ? (
            <div className="py-12 flex justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <>
              {/* Summary Row */}
              <div className="border-b pb-4 mb-4">
                <div className="text-sm font-medium mb-2">
                  {filterGroup === "all" ? "All Channels" : 
                   filterGroup === "paid" ? "Paid Media Channels" :
                   filterGroup === "organic" ? "Organic Media Channels" : 
                   filterGroup === "nonPaid" ? "Non-Paid Media Channels" : "Baseline Channels"} Summary
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted/40 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground">Incremental</div>
                    <div className="text-xl font-bold">${groupTotals.incremental.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((groupTotals.incremental / groupTotals.total) * 100)}% of selected
                    </div>
                  </div>
                  <div className="bg-muted/40 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground">Baseline</div>
                    <div className="text-xl font-bold">${groupTotals.baseline.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((groupTotals.baseline / groupTotals.total) * 100)}% of selected
                    </div>
                  </div>
                  <div className="bg-muted/40 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground">Total Revenue</div>
                    <div className="text-xl font-bold">${groupTotals.total.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">100% of selected</div>
                  </div>
                </div>
              </div>
              
              {/* Channels List */}
              <div className="space-y-4 max-h-[600px] overflow-auto pr-2">
                {sortedChannels.map((channel) => {
                  // Find the channel option to get color and group info
                  const channelOption = channelOptions.find(opt => opt.value === channel.id);
                  const channelColor = channelOption?.color || "#888";
                  const groupName = channelOption?.group === "paid" ? "Paid Media" :
                                  channelOption?.group === "organic" ? "Organic Media" :
                                  channelOption?.group === "nonPaid" ? "Non-Paid Media" : "Baseline";
                  
                  // Calculate percentages
                  const incrementalPerc = Math.round((channel.incremental / channel.total) * 100);
                  const baselinePerc = Math.round((channel.baseline / channel.total) * 100);
                  
                  return (
                    <div key={channel.id} className="border rounded-lg p-4 transition-all hover:shadow-md">
                      <div className="flex flex-wrap items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channelColor }}></div>
                          <h4 className="font-medium">{channel.name}</h4>
                        </div>
                        <div className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-full">
                          {groupName}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Incremental</div>
                          <div className="text-lg font-bold">${channel.incremental.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">{incrementalPerc}% of channel</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Baseline</div>
                          <div className="text-lg font-bold">${channel.baseline.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">{baselinePerc}% of channel</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Total Revenue</div>
                          <div className="text-lg font-bold">${channel.total.toLocaleString()}</div>
                        </div>
                      </div>
                      
                      {/* Progress bar showing split */}
                      <div className="mt-3 h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ 
                            width: `${incrementalPerc}%`, 
                            backgroundColor: channelColor 
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <div>Incremental: {incrementalPerc}%</div>
                        <div>Baseline: {baselinePerc}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
