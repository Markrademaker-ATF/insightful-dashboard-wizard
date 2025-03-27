
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChannelBreakdownChart } from "@/components/dashboard/ChannelBreakdownChart";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { MetricCard } from "@/components/dashboard/MetricCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  SlidersHorizontal,
  ArrowUpRight,
  Info,
  LineChart,
  ZoomIn,
  Maximize2,
  PieChart,
  ArrowRightLeft,
  Waypoints,
} from "lucide-react";
import {
  generateChannelBreakdown,
  channelColors,
  generatePerformanceData,
  channelNames,
} from "@/data/mockData";
import { cn } from "@/lib/utils";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";

const ChannelsPage = () => {
  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState<any[]>([]);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [metric, setMetric] = useState("revenue");
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [showMarginalReturns, setShowMarginalReturns] = useState(false);
  const [spendMultiplier, setSpendMultiplier] = useState([1.0]);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const channels = generateChannelBreakdown();
      const performance = generatePerformanceData(30);
      setChannelData(channels);
      setPerformanceData(performance);
      setLoading(false);
    };

    loadData();
  }, []);

  const totalRevenue = !loading
    ? channelData.reduce((sum, channel) => sum + channel.revenue, 0)
    : 0;

  const totalSpend = !loading
    ? channelData.reduce((sum, channel) => sum + channel.cost, 0)
    : 0;

  const avgRoas = !loading
    ? (totalRevenue / totalSpend).toFixed(2)
    : 0;

  // Generate saturation curve data based on current channel data and spend multiplier
  const generateSaturationData = (channel: any) => {
    const baseReturn = channel.revenue / channel.cost;
    const points = [];
    
    // Generate points for saturation curve
    for (let i = 0; i <= 20; i++) {
      const spendMultiplier = i * 0.1;
      const spend = channel.cost * spendMultiplier;
      
      // Model diminishing returns: as spend increases, return on ad spend decreases
      // Use a logarithmic model for diminishing returns
      const saturationFactor = Math.log(1 + spendMultiplier) / (1 + spendMultiplier * 0.2);
      const returns = spend * baseReturn * saturationFactor;
      
      points.push({
        spend: Math.round(spend),
        returns: Math.round(returns),
        marginal: i > 0 
          ? Math.round((returns - points[i-1].returns) / (spend - points[i-1].spend) * 100) / 100
          : baseReturn
      });
    }
    
    return points;
  };

  // Calculate projected returns for selected channel based on spend multiplier
  const getProjectedReturns = () => {
    if (!selectedChannel || loading) return { spend: 0, returns: 0, change: 0 };
    
    const channel = channelData.find(c => c.id === selectedChannel);
    if (!channel) return { spend: 0, returns: 0, change: 0 };
    
    const currentSpend = channel.cost;
    const currentReturns = channel.revenue;
    
    const saturationData = generateSaturationData(channel);
    const projectedIndex = Math.round(spendMultiplier[0] * 10); 
    const projectedDataPoint = saturationData[Math.min(projectedIndex, saturationData.length - 1)];
    
    return {
      spend: projectedDataPoint.spend,
      returns: projectedDataPoint.returns,
      change: ((projectedDataPoint.returns - currentReturns) / currentReturns) * 100
    };
  };

  const projectedResults = getProjectedReturns();

  // Filter performance data by selected channel
  const filteredPerformanceData = !loading && selectedChannel 
    ? performanceData.map(day => ({
        ...day,
        filteredRevenue: day[selectedChannel] || 0
      }))
    : performanceData;

  return (
    <div className="animate-fade-in space-y-8">
      <PageHeader
        title="Channel Analysis"
        description="Compare performance across all marketing channels"
      >
        <Button variant="outline" size="sm" className="gap-1">
          <SlidersHorizontal className="h-4 w-4" />
          Customize
        </Button>
      </PageHeader>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Revenue"
          value={loading ? "-" : `$${totalRevenue.toLocaleString()}`}
          change={5.8}
          icon={<DollarSign className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard
          title="Total Spend"
          value={loading ? "-" : `$${totalSpend.toLocaleString()}`}
          change={3.2}
          icon={<BarChart3 className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard
          title="Average ROAS"
          value={loading ? "-" : `${avgRoas}x`}
          change={1.3}
          icon={<TrendingUp className="h-4 w-4" />}
          loading={loading}
        />
      </div>

      {/* Performance Trend */}
      <div className="dashboard-card">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h3 className="text-lg font-medium">Performance Trend</h3>
            <p className="text-sm text-muted-foreground">
              Historical revenue performance across all channels
            </p>
          </div>
        </div>

        <PerformanceChart
          data={performanceData}
          lines={[
            {
              dataKey: "totalRevenue",
              color: "#4361ee",
              label: "Total Revenue"
            },
            ...(selectedChannel ? [{
              dataKey: selectedChannel,
              color: channelColors[selectedChannel as keyof typeof channelColors] || "#f72585",
              label: channelNames[selectedChannel as keyof typeof channelNames] || selectedChannel
            }] : [])
          ]}
          xAxisKey="name"
          loading={loading}
          height={350}
        />
      </div>

      {/* Channel comparison chart */}
      <div className="dashboard-card">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h3 className="text-lg font-medium">Channel Comparison</h3>
            <p className="text-sm text-muted-foreground">
              Performance metrics across all channels
            </p>
          </div>

          <Tabs
            defaultValue="revenue"
            value={metric}
            onValueChange={setMetric}
            className="w-[300px]"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="cost">Cost</TabsTrigger>
              <TabsTrigger value="roas">ROAS</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ChannelBreakdownChart
          data={channelData}
          bars={[
            {
              dataKey: metric,
              color:
                metric === "revenue"
                  ? "#4361ee"
                  : metric === "cost"
                  ? "#f72585"
                  : "#4cc9f0",
              label:
                metric === "revenue"
                  ? "Revenue"
                  : metric === "cost"
                  ? "Cost"
                  : "ROAS",
            },
          ]}
          xAxisKey="name"
          loading={loading}
          height={350}
        />
      </div>

      {/* AI-Powered Channel Analysis */}
      <div className="dashboard-card">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Waypoints className="h-5 w-5 text-primary" />
              AI-Powered Channel Analysis
            </h3>
            <p className="text-sm text-muted-foreground">
              Select a channel to view detailed insights and projections
            </p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="text-sm font-medium">Select a channel:</div>
            <div className="flex flex-wrap gap-2">
              {!loading && channelData.map((channel) => (
                <Button
                  key={channel.id}
                  variant={selectedChannel === channel.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedChannel(channel.id)}
                  className="min-w-24"
                >
                  {channel.name}
                </Button>
              ))}
              {selectedChannel && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedChannel(null)}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>

        {selectedChannel && !loading ? (
          <div className="space-y-8 animate-fade-in">
            {/* Channel Details Section */}
            <div>
              <h4 className="text-md font-medium mb-4">
                {channelNames[selectedChannel as keyof typeof channelNames] || selectedChannel} Details
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {channelData
                  .filter(channel => channel.id === selectedChannel)
                  .map(channel => (
                    <React.Fragment key={channel.id}>
                      <MetricCard
                        title="Revenue"
                        value={`$${channel.revenue.toLocaleString()}`}
                        description="Total revenue"
                        className="h-full"
                      />
                      <MetricCard
                        title="Cost"
                        value={`$${channel.cost.toLocaleString()}`}
                        description="Total spend"
                        className="h-full"
                      />
                      <MetricCard
                        title="ROAS"
                        value={`${channel.roas}x`}
                        description="Return on ad spend"
                        className="h-full"
                      />
                      <MetricCard
                        title="Conv. Rate"
                        value={`${channel.conversion}%`}
                        description="Conversion rate"
                        className="h-full"
                      />
                    </React.Fragment>
                  ))}
              </div>
            </div>

            {/* Saturation & Marginal Returns Analysis */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-md font-medium">
                    Saturation & Returns Analysis
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Analyze diminishing returns as spend increases
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-muted-foreground">
                    Show marginal returns
                  </div>
                  <Switch 
                    checked={showMarginalReturns} 
                    onCheckedChange={setShowMarginalReturns} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="col-span-2 bg-card rounded-md border p-4">
                  {channelData
                    .filter(channel => channel.id === selectedChannel)
                    .map(channel => {
                      const saturationData = generateSaturationData(channel);
                      return (
                        <div key={channel.id} className="h-80">
                          <ChartContainer
                            config={{
                              returns: { 
                                label: "Returns",
                                color: "#4361ee" 
                              },
                              marginal: { 
                                label: "Marginal Returns",
                                color: "#f72585" 
                              },
                            }}
                          >
                            <PerformanceChart
                              data={saturationData}
                              lines={[
                                {
                                  dataKey: "returns",
                                  color: "#4361ee",
                                  label: "Returns"
                                },
                                ...(showMarginalReturns ? [
                                  {
                                    dataKey: "marginal",
                                    color: "#f72585",
                                    label: "Marginal Returns"
                                  }
                                ] : [])
                              ]}
                              xAxisKey="spend"
                              height={280}
                            />
                            <ChartTooltip
                              content={
                                <ChartTooltipContent 
                                  formatter={(value, name) => {
                                    if (name === "marginal") {
                                      return [`${value}x ROAS`, "Marginal Return"]
                                    }
                                    return [`$${value.toLocaleString()}`, name]
                                  }}
                                />
                              }
                            />
                          </ChartContainer>
                        </div>
                      );
                    })}
                </div>

                <div className="bg-card rounded-md border p-4 flex flex-col">
                  <h4 className="text-sm font-medium mb-2">
                    Budget Adjustment Simulator
                  </h4>
                  <p className="text-xs text-muted-foreground mb-6">
                    Adjust budget level to see projected returns
                  </p>
                  
                  <div className="flex flex-col gap-6 flex-grow justify-between">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="text-sm">Budget Multiplier</div>
                          <div className="font-mono font-medium">{spendMultiplier[0]}x</div>
                        </div>
                        <Slider 
                          value={spendMultiplier} 
                          onValueChange={setSpendMultiplier} 
                          step={0.1}
                          min={0.1}
                          max={2.0}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <div>0.1x</div>
                          <div>2.0x</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <div>Projected Spend:</div>
                        <div className="font-mono font-medium">${projectedResults.spend.toLocaleString()}</div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div>Projected Returns:</div>
                        <div className="font-mono font-medium">${projectedResults.returns.toLocaleString()}</div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div>Change in Returns:</div>
                        <div className={cn(
                          "font-mono font-medium",
                          projectedResults.change > 0 ? "text-green-600" : "text-red-600"
                        )}>
                          {projectedResults.change > 0 ? "+" : ""}{projectedResults.change.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Maximize2 className="h-4 w-4 mr-2" />
                          View Full Analysis
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>In-Depth Channel Analysis</DialogTitle>
                          <DialogDescription>
                            Comprehensive performance metrics and forecasts for {channelNames[selectedChannel as keyof typeof channelNames] || selectedChannel}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <MetricCard
                              title="Current ROAS"
                              value={`${channelData.find(c => c.id === selectedChannel)?.roas}x`}
                              description="Return on Ad Spend"
                            />
                            <MetricCard
                              title="Recommended Budget Change"
                              value={projectedResults.change > 5 ? "+10%" : "-5%"}
                              description="Based on marginal returns"
                              change={projectedResults.change > 5 ? 10 : -5}
                            />
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Key Insights</h4>
                            <ul className="text-sm space-y-1">
                              <li className="flex items-start gap-2">
                                <ArrowUpRight className="h-4 w-4 mt-0.5 text-green-600 shrink-0" />
                                <span>
                                  This channel shows {projectedResults.change > 5 ? "strong" : "diminishing"} returns on additional spend.
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Info className="h-4 w-4 mt-0.5 text-blue-600 shrink-0" />
                                <span>
                                  {projectedResults.change > 5 
                                    ? "Consider increasing budget allocation for this channel."
                                    : "Consider optimizing campaigns before increasing budget."
                                  }
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <LineChart className="h-4 w-4 mt-0.5 text-purple-600 shrink-0" />
                                <span>
                                  Seasonal trends show best performance during {Math.random() > 0.5 ? "Q4" : "Q2"}.
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed rounded-md bg-muted/30">
            <ZoomIn className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <h4 className="text-lg font-medium mb-1">Select a Channel</h4>
            <p className="text-sm text-muted-foreground">
              Choose a marketing channel above to view in-depth analysis and projections
            </p>
          </div>
        )}
      </div>

      {/* Channel data table */}
      <div className="dashboard-card">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-medium">Channel Details</h3>
            <p className="text-sm text-muted-foreground">
              All metrics by channel
            </p>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>ROAS</TableHead>
                <TableHead>Conv. Rate</TableHead>
                <TableHead>CPA</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <TableCell key={j}>
                          <div className="h-4 bg-muted rounded animate-pulse"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : channelData.map((channel, i) => (
                    <TableRow key={i} className={cn(
                      selectedChannel === channel.id && "bg-accent/30",
                      "cursor-pointer hover:bg-accent/20"
                    )} onClick={() => setSelectedChannel(channel.id)}>
                      <TableCell className="font-medium">
                        {channel.name}
                      </TableCell>
                      <TableCell>${channel.revenue.toLocaleString()}</TableCell>
                      <TableCell>${channel.cost.toLocaleString()}</TableCell>
                      <TableCell
                        className={cn(
                          channel.roas >= 3
                            ? "text-green-600"
                            : channel.roas >= 1
                            ? "text-blue-600"
                            : "text-red-600"
                        )}
                      >
                        {channel.roas}x
                      </TableCell>
                      <TableCell>{channel.conversion}%</TableCell>
                      <TableCell>${channel.cpa}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`/channel-details?id=${channel.id}`}>
                            <Info className="h-4 w-4" />
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ChannelsPage;
