
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
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Wallet
} from "lucide-react";
import { 
  generatePerformanceData, 
  generateChannelData, 
  generateBudgetAllocation, 
  channelColors 
} from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
      <Card className="mb-8 animate-fade-in border-l-4 border-l-primary">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Marketing ROI Summary</h2>
              <p className="text-muted-foreground mb-4">
                Overall campaign performance for the selected period
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-muted-foreground">Total Return</div>
                  <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                  <div className={`text-sm flex items-center gap-1 ${revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {revenueChange >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(revenueChange)}% vs. prev
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Investment</div>
                  <div className="text-2xl font-bold">${totalCost.toLocaleString()}</div>
                  <div className={`text-sm flex items-center gap-1 ${costChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {costChange >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(costChange)}% vs. prev
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Overall ROAS</div>
                  <div className="text-2xl font-bold">{totalRoas.toFixed(2)}x</div>
                  <div className={`text-sm flex items-center gap-1 ${roasChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {roasChange >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(roasChange).toFixed(1)}% vs. prev
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[280px] border-l pl-6 hidden lg:block">
              <h3 className="text-sm font-medium mb-4">Performance Insights</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-green-100 p-2 text-green-700">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Top Performer</div>
                    <div className="text-sm text-muted-foreground">{topChannel?.name || 'Loading...'}</div>
                    <div className="text-sm font-medium">{topChannel ? `${topChannel.roas.toFixed(2)}x ROAS` : ''}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-red-100 p-2 text-red-700">
                    <TrendingUp className="h-4 w-4 transform rotate-180" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Needs Attention</div>
                    <div className="text-sm text-muted-foreground">{bottomChannel?.name || 'Loading...'}</div>
                    <div className="text-sm font-medium">{bottomChannel ? `${bottomChannel.roas.toFixed(2)}x ROAS` : ''}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Total Revenue" 
          value={loading ? "-" : `$${totalRevenue.toLocaleString()}`} 
          change={revenueChange} 
          description="vs. previous period"
          icon={<DollarSign className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard 
          title="Marketing Spend" 
          value={loading ? "-" : `$${totalCost.toLocaleString()}`} 
          change={costChange}
          description="vs. previous period"
          icon={<Wallet className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard 
          title="Return on Ad Spend" 
          value={loading ? "-" : `${totalRoas.toFixed(2)}x`} 
          change={roasChange}
          description="vs. previous period"
          icon={<TrendingUp className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard 
          title="Total Conversions" 
          value={loading ? "-" : Math.round(totalConversions).toLocaleString()} 
          change={conversionChange}
          description="vs. previous period"
          icon={<Users className="h-4 w-4" />}
          loading={loading}
        />
      </div>
      
      {/* Performance chart */}
      <div className="dashboard-card mb-8 animate-fade-in" style={{ animationDelay: "150ms" }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h3 className="text-lg font-medium">Revenue Performance</h3>
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
              <h3 className="text-lg font-medium">Channel ROAS</h3>
              <p className="text-sm text-muted-foreground">Return on ad spend by channel</p>
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
              { dataKey: "roas", color: channelColors.search, label: "ROAS" },
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
