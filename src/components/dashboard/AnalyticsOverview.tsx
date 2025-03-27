
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

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Analytics Overview" 
        description="High-level view of marketing performance and ROI across channels"
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
      
      {/* Performance chart */}
      <PerformanceSection
        performanceData={performanceData}
        loading={loading}
        channelColors={channelColors}
      />
      
      {/* Lower section */}
      <AnalyticsSection
        channelData={channelData}
        budgetData={budgetData}
        loading={loading}
        channelColors={channelColors}
      />
    </div>
  );
}
