
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { BudgetAllocationChart } from "@/components/dashboard/BudgetAllocationChart";
import { ChannelBreakdownChart } from "@/components/dashboard/ChannelBreakdownChart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  ArrowRight, 
  TrendingUp, 
  PieChart,
  Radio,
  DollarSign,
  Percent,
  Users
} from "lucide-react";
import { 
  generatePerformanceData, 
  generateChannelBreakdown, 
  generateBudgetAllocation, 
  channelColors 
} from "@/data/mockData";

const Index = () => {
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
      const channels = generateChannelBreakdown();
      const budget = generateBudgetAllocation();
      
      setPerformanceData(performance);
      setChannelData(channels);
      setBudgetData(budget);
      setLoading(false);
    };
    
    loadData();
  }, [timeframe]);

  const totalRevenue = !loading && performanceData.length
    ? performanceData.reduce((sum, day) => sum + day.totalRevenue, 0)
    : 0;
    
  const averageRoas = !loading && channelData.length
    ? channelData.reduce((sum, channel) => sum + channel.roas, 0) / channelData.length
    : 0;
    
  const totalConversions = !loading && channelData.length
    ? channelData.reduce((sum, channel) => sum + (channel.revenue / channel.cpa), 0)
    : 0;

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Marketing Analytics Dashboard" 
        description="Overview of your marketing performance across all channels"
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
          change={5.8} 
          description="vs. previous period"
          icon={<DollarSign className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard 
          title="Average ROAS" 
          value={loading ? "-" : `${averageRoas.toFixed(2)}x`} 
          change={2.4}
          description="vs. previous period"
          icon={<TrendingUp className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard 
          title="Conversion Rate" 
          value={loading ? "-" : "3.2%"} 
          change={-0.8}
          description="vs. previous period"
          icon={<Percent className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard 
          title="Total Conversions" 
          value={loading ? "-" : Math.round(totalConversions).toLocaleString()} 
          change={4.2}
          description="vs. previous period"
          icon={<Users className="h-4 w-4" />}
          loading={loading}
        />
      </div>
      
      {/* Performance chart */}
      <div className="dashboard-card mb-8 animate-fade-in" style={{ animationDelay: "150ms" }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h3 className="text-lg font-medium">Performance Trend</h3>
            <p className="text-sm text-muted-foreground">Revenue by channel over time</p>
          </div>
          <Button variant="ghost" size="sm" className="gap-1" asChild>
            <a href="/data">
              View detailed data <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
        
        <PerformanceChart
          data={performanceData}
          lines={[
            { dataKey: "search", color: channelColors.search, label: "Search" },
            { dataKey: "social", color: channelColors.social, label: "Social" },
            { dataKey: "email", color: channelColors.email, label: "Email" },
            { dataKey: "display", color: channelColors.display, label: "Display" },
          ]}
          loading={loading}
          height={350}
        />
      </div>
      
      {/* Lower section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Channel breakdown */}
        <div className="dashboard-card animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium">Channel Performance</h3>
              <p className="text-sm text-muted-foreground">Revenue and ROAS by channel</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <a href="/channels">
                <Radio className="h-4 w-4 mr-1" /> All channels
              </a>
            </Button>
          </div>
          
          <ChannelBreakdownChart
            data={channelData}
            bars={[
              { dataKey: "revenue", color: channelColors.search, label: "Revenue" },
            ]}
            xAxisKey="name"
            loading={loading}
            height={300}
          />
        </div>
        
        {/* Budget allocation */}
        <div className="dashboard-card animate-fade-in" style={{ animationDelay: "450ms" }}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium">Budget Allocation</h3>
              <p className="text-sm text-muted-foreground">Current distribution across channels</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <a href="/budget">
                <PieChart className="h-4 w-4 mr-1" /> Budget optimizer
              </a>
            </Button>
          </div>
          
          <BudgetAllocationChart data={budgetData} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Index;
