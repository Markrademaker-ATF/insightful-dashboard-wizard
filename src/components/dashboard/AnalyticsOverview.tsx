
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  generatePerformanceData, 
  generateChannelData, 
  generateBudgetAllocation, 
  channelColors 
} from "@/data/mockData";

import { ROISummaryCard } from "@/components/dashboard/ROISummaryCard";
import { PerformanceSection } from "@/components/dashboard/PerformanceSection";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";
import { TimeSeriesSection } from "@/components/dashboard/TimeSeriesSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, LineChart, PieChart, Activity, Zap, LightbulbIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function AnalyticsOverview() {
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [channelData, setChannelData] = useState<any[]>([]);
  const [budgetData, setBudgetData] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState("30d");

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90;
      const performance = generatePerformanceData(days);
      const channels = generateChannelData(timeframe === "7d" ? "Q1" : timeframe === "30d" ? "Q2" : "Q3");
      const budget = generateBudgetAllocation();
      
      setPerformanceData(performance);
      setChannelData(channels);
      setBudgetData(budget);
      setLoading(false);
    };
    
    loadData();
  }, [timeframe]);

  // Calculate top-level metrics
  const totalRevenue = !loading && performanceData.length
    ? performanceData.reduce((sum, day) => sum + day.totalRevenue, 0)
    : 0;
    
  const totalCost = !loading && channelData.length
    ? channelData.reduce((sum, channel) => sum + channel.cost, 0)
    : 0;
    
  const totalRoas = totalCost > 0 ? totalRevenue / totalCost : 0;
  
  const totalConversions = !loading && channelData.length
    ? channelData.reduce((sum, channel) => sum + (channel.revenue / channel.cpa), 0)
    : 0;
    
  // Find top and bottom performing channels
  const topChannel = !loading && channelData.length
    ? channelData.reduce((prev, current) => (prev.roas > current.roas) ? prev : current, channelData[0])
    : null;
    
  const bottomChannel = !loading && channelData.length
    ? channelData.reduce((prev, current) => (prev.roas < current.roas) ? prev : current, channelData[0])
    : null;

  // Calculate week-over-week changes for revenue and cost
  const revenueChange = 5.8; // Mocked for now, would calculate from actual data
  const costChange = 3.2;    // Mocked for now, would calculate from actual data
  const roasChange = revenueChange - costChange;
  const conversionChange = 4.2;

  // Prepare data for time series visualization
  const timeSeriesData = React.useMemo(() => {
    if (loading || performanceData.length === 0) return [];
    
    // Transform performance data for time series
    return performanceData.map((day, index) => {
      // Calculate estimated cost based on revenue and overall ROAS
      const dailyCost = day.totalRevenue / (totalRoas || 1);
      
      return {
        date: day.name,
        revenue: day.totalRevenue,
        cost: Math.round(dailyCost),
        roas: dailyCost > 0 ? +(day.totalRevenue / dailyCost).toFixed(2) : 0,
        // Keep these for possible future use
        baseline: Math.round(day.totalRevenue * 0.2),
        nonPaid: Math.round(day.totalRevenue * 0.15),
        organic: Math.round(day.totalRevenue * 0.25),
        paid: Math.round(day.totalRevenue * 0.4)
      };
    });
  }, [performanceData, loading, totalRoas]);

  // Navigation stories
  const analyticsStories = [
    {
      title: "Channel Analysis",
      description: "Dive deeper into each channel's performance and identify optimization opportunities",
      icon: BarChart,
      path: "/channels",
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Campaign Analysis",
      description: "Analyze campaigns across channels to understand what's working",
      icon: Activity,
      path: "/channel-details",
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Budget Optimizer",
      description: "Optimize your channel mix to maximize ROI and revenue",
      icon: PieChart,
      path: "/budget",
      color: "bg-green-100 text-green-700"
    },
    {
      title: "A/B Testing",
      description: "See test results and measure the impact of your experiments",
      icon: LineChart,
      path: "/ab-testing",
      color: "bg-amber-100 text-amber-700"
    }
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Analytics Overview" 
        description="Your marketing performance journey starts here"
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
      
      {/* Introduction Card */}
      <Card className="mb-8 border-l-4 border-l-blue-500 animate-fade-in">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-blue-100">
              <LightbulbIcon className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Your Analytics Journey</h2>
              <p className="text-muted-foreground">
                Follow your marketing performance story from high-level ROI metrics down to channel 
                optimization opportunities. Use the insights to optimize your strategy and improve results.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Part 1: Return on Investment - The Big Picture */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm">1</span>
            The Big Picture: ROI Summary
          </h2>
        </div>
        
        {/* Top-level ROI overview card */}
        <ROISummaryCard
          totalRevenue={totalRevenue}
          totalCost={totalCost}
          totalRoas={totalRoas}
          revenueChange={revenueChange}
          costChange={costChange}
          roasChange={roasChange}
          topChannel={topChannel}
          bottomChannel={bottomChannel}
        />
      </div>
      
      {/* Part 2: Revenue Trends Over Time */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm">2</span>
            Revenue Trends Over Time
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/data" className="flex items-center gap-1">
              Detailed trends <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {/* Revenue and Cost Time Series */}
        <TimeSeriesSection
          data={timeSeriesData}
          loading={loading}
        />
      </div>
      
      {/* Part 3: Channel Performance */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm">3</span>
            Channel Performance
          </h2>
        </div>
        
        {/* Performance chart */}
        <PerformanceSection
          performanceData={performanceData}
          loading={loading}
          channelColors={channelColors}
        />
      </div>
      
      {/* Part 4: Channel Analysis */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm">4</span>
            Channel Analysis
          </h2>
        </div>
        
        {/* Lower section */}
        <AnalyticsSection
          channelData={channelData}
          budgetData={budgetData}
          loading={loading}
          channelColors={channelColors}
        />
      </div>
      
      {/* Part 5: Next Steps */}
      <div className="mb-10">
        <div className="mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm">5</span>
            Continue Your Analysis
          </h2>
          <p className="text-muted-foreground mt-1">Choose where to explore next based on your goals</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsStories.map((story, index) => (
            <Link to={story.path} key={index}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                <div className={`p-6 ${story.color}`}>
                  <story.icon className="h-10 w-10" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{story.title}</h3>
                  <p className="text-muted-foreground text-sm">{story.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Insights Card */}
      <Card className="mb-8 border-l-4 border-l-amber-500 animate-fade-in">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-amber-100">
              <Zap className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Key Insights</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span> 
                  <span>Your top performing channel is <span className="font-medium text-foreground">{topChannel?.name || 'Loading...'}</span> with a ROAS of {topChannel?.roas.toFixed(2) || '0'}x</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span> 
                  <span>Overall ROAS is <span className="font-medium text-foreground">{totalRoas.toFixed(2)}x</span>, which is {roasChange >= 0 ? 'up' : 'down'} {Math.abs(roasChange).toFixed(1)}% vs. previous period</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span> 
                  <span>Consider optimizing your budget allocation to improve performance of <span className="font-medium text-foreground">{bottomChannel?.name || 'Loading...'}</span></span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
