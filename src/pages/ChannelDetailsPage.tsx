import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, LineChart, Target, Users, DollarSign, BarChart3 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterExportControls } from "@/components/channels/FilterExportControls";
import {
  generateChannelData,
  generatePerformanceData,
  channelColors,
  channelNames,
} from "@/data/mockData";
import { CampaignBreakdownTab } from "@/components/campaigns/CampaignBreakdownTab";
import { Cpu, Database, BarChart4, Info } from "lucide-react";
import { ChannelJourneyComparison } from "@/components/campaigns/ChannelJourneyComparison";

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
  const [activeTab, setActiveTab] = useState("attribution");
  const [campaignData, setCampaignData] = useState<any | null>(null);
  
  // Generate journey analysis data
  const [journeyData, setJourneyData] = useState<any | null>(null);

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
      
      // Generate campaign-specific data if a campaign is selected
      if (selectedCampaign !== "all") {
        const campaign = campaigns.find(c => c.id === selectedCampaign);
        const campaignPerformance = {
          name: campaign?.name || "Campaign",
          revenue: Math.round(20000 + Math.random() * 80000),
          cost: Math.round(5000 + Math.random() * 30000),
          impressions: Math.round(500000 + Math.random() * 2000000),
          clicks: Math.round(15000 + Math.random() * 50000),
          conversions: Math.round(500 + Math.random() * 2000),
          targetAudience: ["25-34", "35-44", Math.random() > 0.5 ? "18-24" : "45-54"],
          topCreatives: [
            {
              id: "cr1",
              name: "Creative 1",
              performance: Math.round(80 + Math.random() * 20),
              impressions: Math.round(100000 + Math.random() * 400000),
              clicks: Math.round(5000 + Math.random() * 15000),
              ctr: parseFloat((2 + Math.random() * 5).toFixed(2)),
            },
            {
              id: "cr2",
              name: "Creative 2",
              performance: Math.round(60 + Math.random() * 30),
              impressions: Math.round(80000 + Math.random() * 300000),
              clicks: Math.round(3000 + Math.random() * 12000),
              ctr: parseFloat((1.5 + Math.random() * 4).toFixed(2)),
            },
            {
              id: "cr3",
              name: "Creative 3",
              performance: Math.round(50 + Math.random() * 40),
              impressions: Math.round(60000 + Math.random() * 200000),
              clicks: Math.round(2000 + Math.random() * 8000),
              ctr: parseFloat((1 + Math.random() * 3).toFixed(2)),
            }
          ],
          dailyData: Array.from({ length: days }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (days - i - 1));
            
            return {
              date: date.toISOString().split('T')[0],
              impressions: Math.round(10000 + Math.random() * 30000),
              clicks: Math.round(300 + Math.random() * 1500),
              conversions: Math.round(10 + Math.random() * 50),
              revenue: Math.round(1000 + Math.random() * 5000),
              cost: Math.round(300 + Math.random() * 1500),
            };
          }),
          geographicData: [
            { region: "North America", value: Math.round(30 + Math.random() * 40) },
            { region: "Europe", value: Math.round(20 + Math.random() * 30) },
            { region: "Asia", value: Math.round(10 + Math.random() * 20) },
            { region: "South America", value: Math.round(5 + Math.random() * 15) },
            { region: "Africa", value: Math.round(2 + Math.random() * 8) },
            { region: "Oceania", value: Math.round(1 + Math.random() * 5) },
          ]
        };
        
        setCampaignData(campaignPerformance);
      } else {
        setCampaignData(null);
      }
      
      // Generate journey analysis data
      const journeyChannels = [
        {
          id: "search",
          name: channelNames.search,
          colorClass: "bg-blue-600",
          conversions: 171850,
          journeyContribution: {
            awareness: 31,
            consideration: 12,
            conversion: 8,
            advocacy: 0
          }
        },
        {
          id: "social",
          name: channelNames.social,
          colorClass: "bg-gray-500",
          conversions: 56205,
          journeyContribution: {
            awareness: 32,
            consideration: 18,
            conversion: 9,
            advocacy: 8
          }
        },
        {
          id: "video",
          name: channelNames.video,
          colorClass: "bg-purple-300",
          conversions: 13824,
          journeyContribution: {
            awareness: 0,
            consideration: 0,
            conversion: 24,
            advocacy: 47
          }
        },
        {
          id: "display",
          name: channelNames.display,
          colorClass: "bg-red-300",
          conversions: 2847,
          journeyContribution: {
            awareness: 24,
            consideration: 24,
            conversion: 8,
            advocacy: 12
          }
        },
        {
          id: "affiliate",
          name: channelNames.affiliate,
          colorClass: "bg-blue-400",
          conversions: 1234,
          journeyContribution: {
            awareness: 23,
            consideration: 15,
            conversion: 6,
            advocacy: 0
          }
        },
        {
          id: "email",
          name: channelNames.email,
          colorClass: "bg-teal-300",
          conversions: 1435,
          journeyContribution: {
            awareness: 12,
            consideration: 12,
            conversion: 4,
            advocacy: 23
          }
        },
        {
          id: "direct",
          name: channelNames.direct,
          colorClass: "bg-blue-300",
          conversions: 23,
          journeyContribution: {
            awareness: 0,
            consideration: 0,
            conversion: 0,
            advocacy: 48
          }
        },
        {
          id: "referral",
          name: channelNames.referral,
          colorClass: "bg-green-300",
          conversions: 9,
          journeyContribution: {
            awareness: 0,
            consideration: 9,
            conversion: 0,
            advocacy: 0
          }
        }
      ];
      
      setJourneyData({ channels: journeyChannels });
      
      setLoading(false);
    };
    
    loadChannelData();
  }, [channelId, timeframe, selectedCampaign]);
  
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

  // Handle campaign change
  const handleCampaignChange = (campaignId: string) => {
    setSelectedCampaign(campaignId);
    setLoading(true);
    
    // If we're selecting a specific campaign, switch to campaign breakdown tab
    if (campaignId !== "all" && activeTab !== "campaign-breakdown") {
      setActiveTab("campaign-breakdown");
    }
    // If switching back to all campaigns, go to attribution tab
    else if (campaignId === "all") {
      setActiveTab("attribution");
    }
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

      {/* Campaign Selector */}
      <div className="flex items-center justify-end mb-6">
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

      {/* Main Tabs for different analysis views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="attribution" className="flex items-center gap-1">
            <Brain className="h-4 w-4" /> Data-Driven Attribution
          </TabsTrigger>
          {selectedCampaign !== "all" && (
            <TabsTrigger value="campaign-breakdown" className="flex items-center gap-1">
              <Target className="h-4 w-4" /> Campaign Breakdown
            </TabsTrigger>
          )}
        </TabsList>

        {/* Data-Driven Attribution Tab */}
        <TabsContent value="attribution" className="space-y-6">
          {/* Data-Driven Attribution Section */}
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

              {/* Key metrics */}
              <h3 className="text-sm font-medium mb-6">Channel Contribution Analysis</h3>
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
                  icon={<LineChart className="h-4 w-4" />}
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

          {/* Journey Analysis Section - New! */}
          <ChannelJourneyComparison 
            data={journeyData || { channels: [] }} 
            loading={loading} 
          />

          {/* Attribution over time */}
          <Card>
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
        </TabsContent>

        {/* Campaign Breakdown Tab - Only shown when a specific campaign is selected */}
        {selectedCampaign !== "all" && (
          <TabsContent value="campaign-breakdown" className="space-y-6">
            <CampaignBreakdownTab 
              campaignData={campaignData} 
              loading={loading} 
              campaign={campaigns.find(c => c.id === selectedCampaign) || { id: "", name: "" }}
            />
          </TabsContent>
        )}
      </Tabs>
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
