
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Calendar, ChevronDown, Download, Plus, Minus, ArrowDownUp } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from "recharts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { channelColors } from "@/data/mockData";
import { ChannelPerformanceTable } from "../channels/ChannelPerformanceTable";

// Media group colors matching your existing data
const mediaGroupColors = {
  baseline: "#ef476f", // Red
  paid: "#4361ee", // Blue
  organic: "#06d6a0", // Green
  nonPaid: "#ffd166", // Amber
  total: "#9b87f5", // Purple
};

interface PerformanceBreakdownSectionProps {
  data: any[];
  loading: boolean;
}

export function PerformanceBreakdownSection({ data, loading }: PerformanceBreakdownSectionProps) {
  const [selectedMediaType, setSelectedMediaType] = useState<string | null>(null);
  const [timeGranularity, setTimeGranularity] = useState("all");
  const [viewType, setViewType] = useState("waterfall");

  // This will hold our transformed data for the waterfall chart
  const waterfallData = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Use the latest data point for the waterfall
    const latestData = data[data.length - 1]; 
    
    return [
      {
        name: "Baseline",
        value: latestData.baseline,
        fill: mediaGroupColors.baseline,
        mediaType: "baseline"
      },
      {
        name: "Paid Media",
        value: latestData.paid,
        fill: mediaGroupColors.paid,
        mediaType: "paid"
      },
      {
        name: "Organic Media",
        value: latestData.organic,
        fill: mediaGroupColors.organic,
        mediaType: "organic"
      },
      {
        name: "Non-Paid Media",
        value: latestData.nonPaid,
        fill: mediaGroupColors.nonPaid,
        mediaType: "nonPaid"
      },
      {
        name: "Total Revenue",
        value: latestData.total,
        fill: mediaGroupColors.total,
        isTotal: true,
        mediaType: "total"
      }
    ];
  }, [data]);

  // Generate channel data based on the selected media type
  const channelBreakdownData = React.useMemo(() => {
    if (!selectedMediaType || selectedMediaType === "total") return [];
    
    // Example channel data - in a real app this would come from your API/data source
    switch (selectedMediaType) {
      case "baseline":
        return [
          { id: "brand", name: "Brand Value", value: 4500, fill: "#ef476f" },
          { id: "recurring", name: "Recurring Customers", value: 2500, fill: "#d54062" },
          { id: "seasonal", name: "Seasonal Factors", value: 1500, fill: "#ba3f57" }
        ];
      case "paid":
        return [
          { id: "search", name: "Search Ads", value: 6000, fill: "#4361ee" },
          { id: "social", name: "Social Media Ads", value: 4500, fill: "#3a56d4" },
          { id: "display", name: "Display Ads", value: 3000, fill: "#324eba" },
          { id: "video", name: "Video Ads", value: 3500, fill: "#2a45a0" }
        ];
      case "organic":
        return [
          { id: "seo", name: "SEO", value: 3500, fill: "#06d6a0" },
          { id: "content", name: "Content Marketing", value: 1500, fill: "#05b588" },
          { id: "referral", name: "Referral", value: 1300, fill: "#05a37b" }
        ];
      case "nonPaid":
        return [
          { id: "email", name: "Email Marketing", value: 1800, fill: "#ffd166" },
          { id: "affiliate", name: "Affiliate", value: 1100, fill: "#e6bc5c" },
          { id: "pr", name: "PR & Events", value: 900, fill: "#cca751" }
        ];
      default:
        return [];
    }
  }, [selectedMediaType]);

  // For channel waterfall, let's calculate running totals and differences
  const channelWaterfallData = React.useMemo(() => {
    if (!selectedMediaType || !channelBreakdownData.length) return [];

    // Get the total value from our main waterfall for the selected media type
    const mediaTypeTotal = waterfallData.find(d => d.mediaType === selectedMediaType)?.value || 0;
    
    // Start with the total at the beginning
    const result = [
      {
        name: `${selectedMediaType.charAt(0).toUpperCase() + selectedMediaType.slice(1)} Total`,
        value: mediaTypeTotal,
        fill: mediaGroupColors[selectedMediaType as keyof typeof mediaGroupColors],
        isTotal: false
      }
    ];
    
    // Add each channel as a contribution to the total
    channelBreakdownData.forEach(channel => {
      result.push({
        name: channel.name,
        value: channel.value,
        fill: channel.fill,
        isContribution: true
      });
    });
    
    // Add the total at the end
    result.push({
      name: "Total",
      value: mediaTypeTotal,
      fill: mediaGroupColors.total,
      isTotal: true
    });
    
    return result;
  }, [selectedMediaType, channelBreakdownData, waterfallData]);

  // Calculate the running total for waterfall chart
  const processWaterfallData = (data: any[]) => {
    let total = 0;
    return data.map(item => {
      if (item.isTotal) {
        return { ...item, start: 0, end: item.value };
      }
      
      if (item.isContribution) {
        // For contributions in channel breakdown
        const start = total;
        total += item.value;
        return { ...item, start, end: total };
      } else {
        // For regular waterfall items
        const start = total;
        total += item.value;
        return { ...item, start, end: total };
      }
    });
  };

  // Process the data for both waterfall charts
  const processedWaterfallData = React.useMemo(() => 
    processWaterfallData(waterfallData), [waterfallData]);
    
  const processedChannelWaterfallData = React.useMemo(() => 
    processWaterfallData(channelWaterfallData), [channelWaterfallData]);

  // Handle click on a waterfall segment
  const handleWaterfallClick = (data: any) => {
    if (data.mediaType && data.mediaType !== "total") {
      setSelectedMediaType(data.mediaType);
    }
  };

  // Reset selection to go back to main waterfall
  const handleBackToOverview = () => {
    setSelectedMediaType(null);
  };

  // Handle export options
  const handleExport = (format: string) => {
    console.log(`Exporting chart as ${format}`);
    // Implement export functionality here
  };

  // Generate bar colors based on whether it's a positive or negative contribution
  const getBarColor = (entry: any) => {
    if (entry.isTotal) return entry.fill;
    return entry.value >= 0 ? entry.fill : `${entry.fill}80`; // lighter for negative values
  };

  if (loading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <div className="h-6 w-1/3 bg-muted rounded animate-pulse"></div>
          <div className="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full bg-muted rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>
            {selectedMediaType 
              ? `${selectedMediaType.charAt(0).toUpperCase() + selectedMediaType.slice(1)} Media Channel Breakdown` 
              : "Performance Breakdown by Media Type"}
          </CardTitle>
          <CardDescription>
            {selectedMediaType 
              ? `Channel contribution to ${selectedMediaType} media performance` 
              : "Contribution to revenue by media type"}
          </CardDescription>
        </div>
        
        <div className="flex flex-col sm:flex-row items-end gap-4">
          {selectedMediaType && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBackToOverview}
              className="gap-1"
            >
              <ArrowDownUp className="h-4 w-4" /> Back to Overview
            </Button>
          )}
          
          <Select
            value={timeGranularity}
            onValueChange={setTimeGranularity}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="last30">Last 30 Days</SelectItem>
              <SelectItem value="last90">Last Quarter</SelectItem>
              <SelectItem value="lastYear">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                Export <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleExport('png')}>
                <Download className="h-4 w-4 mr-2" /> Export as PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                <Download className="h-4 w-4 mr-2" /> Export as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={viewType} onValueChange={setViewType} className="mb-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="waterfall">Waterfall Chart</TabsTrigger>
            <TabsTrigger value="table">Detailed Table</TabsTrigger>
          </TabsList>

          <TabsContent value="waterfall" className="mt-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={selectedMediaType ? processedChannelWaterfallData : processedWaterfallData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barGap={0}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }} 
                    tickLine={false}
                    axisLine={{ stroke: "rgba(0,0,0,0.09)" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${Math.abs(value/1000)}K`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        const valueText = data.isContribution 
                          ? "Contribution" 
                          : data.isTotal 
                            ? "Total" 
                            : "Value";
                        
                        return (
                          <div className="rounded-lg border border-border/50 bg-background px-3 py-2 text-sm shadow-xl">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-muted-foreground pt-1">
                              {valueText}: ${Math.abs(data.value).toLocaleString()}
                            </p>
                            {data.isContribution && (
                              <p className="text-muted-foreground">
                                % of Total: {((data.value / data.end) * 100).toFixed(1)}%
                              </p>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <ReferenceLine y={0} stroke="rgba(0,0,0,0.3)" />
                  <Bar 
                    dataKey="value" 
                    radius={[4, 4, 0, 0]}
                    onClick={handleWaterfallClick}
                    cursor={!selectedMediaType ? "pointer" : "default"}
                    animationDuration={1500}
                  >
                    {(selectedMediaType ? processedChannelWaterfallData : processedWaterfallData).map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={getBarColor(entry)}
                        style={{ opacity: entry.isTotal ? 1 : 0.8 }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="table" className="mt-4">
            {selectedMediaType ? (
              <ChannelPerformanceTable 
                data={channelBreakdownData.map(item => ({
                  id: item.id,
                  name: item.name,
                  revenue: item.value,
                  cost: Math.round(item.value * 0.4), // Mock cost as 40% of revenue
                  roas: +(item.value / (item.value * 0.4)).toFixed(2),
                  conversion: +(Math.random() * 5).toFixed(2),
                  cpa: Math.round(70 + Math.random() * 50),
                }))} 
                loading={loading}
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium">Media Type</th>
                      <th className="py-3 px-4 text-right font-medium">Revenue</th>
                      <th className="py-3 px-4 text-right font-medium">% of Total</th>
                      <th className="py-3 px-4 text-right font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waterfallData.filter(item => !item.isTotal).map((item, index) => {
                      const totalRevenue = waterfallData.find(d => d.isTotal)?.value || 0;
                      const percentage = ((item.value / totalRevenue) * 100).toFixed(1);
                      
                      return (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: item.fill }} 
                            />
                            {item.name}
                          </td>
                          <td className="py-3 px-4 text-right">${item.value.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">{percentage}%</td>
                          <td className="py-3 px-4 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedMediaType(item.mediaType)}
                            >
                              <Plus className="h-4 w-4 mr-1" /> Details
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="border-b bg-muted/20 font-medium">
                      <td className="py-3 px-4">Total Revenue</td>
                      <td className="py-3 px-4 text-right">
                        ${(waterfallData.find(d => d.isTotal)?.value || 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right">100%</td>
                      <td className="py-3 px-4"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" /> 
            {selectedMediaType 
              ? `Click on the bars to see detailed contribution of each channel to ${selectedMediaType} media performance.`
              : "Click on any media type bar to see a breakdown of its channels."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
