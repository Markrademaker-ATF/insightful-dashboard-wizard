
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, ChevronDown, Download, ArrowDownUp } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  // Waterfall data generation
  const waterfallData = useMemo(() => {
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
  const channelBreakdownData = useMemo(() => {
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

  // Calculate the running total for waterfall chart
  const processWaterfallData = (data: any[]) => {
    let total = 0;
    return data.map(item => {
      if (item.isTotal) {
        return { ...item, start: 0, end: item.value };
      }
      
      const start = total;
      total += item.value;
      
      return {
        ...item,
        start,
        end: total,
      };
    });
  };

  // Process the data for waterfall chart
  const processedWaterfallData = useMemo(() => 
    processWaterfallData(waterfallData), [waterfallData]);

  // Handle click on a waterfall segment
  const handleWaterfallClick = (data: any) => {
    if (data.mediaType && data.mediaType !== "total") {
      setSelectedMediaType(data.mediaType);
    }
  };

  // Handle export options
  const handleExport = (format: string) => {
    console.log(`Exporting chart as ${format}`);
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
              : "Contribution to performance by media type"}
          </CardDescription>
        </div>
        
        <div className="flex flex-col sm:flex-row items-end gap-4">
          {selectedMediaType && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSelectedMediaType(null)}
              className="gap-1"
            >
              <ArrowDownUp className="h-4 w-4" /> Back to Overview
            </Button>
          )}

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
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={processedWaterfallData}
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
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-lg border border-border/50 bg-background px-3 py-2 text-sm shadow-xl">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-muted-foreground pt-1">
                          {data.isTotal ? "Total" : "Contribution"}: ${Math.abs(data.value).toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
                onClick={handleWaterfallClick}
                cursor={!selectedMediaType ? "pointer" : "default"}
                animationDuration={1500}
              >
                {processedWaterfallData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isTotal ? mediaGroupColors.total : entry.fill}
                    style={{ opacity: entry.isTotal ? 1 : 0.8 }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {selectedMediaType && (
          <div className="mt-8">
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
          </div>
        )}
        
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

