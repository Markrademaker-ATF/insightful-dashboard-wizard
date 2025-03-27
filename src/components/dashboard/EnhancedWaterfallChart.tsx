import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  Cell,
  LabelList,
} from "recharts";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Define colors for different category types
const categoryColors = {
  baseline: "#9b87f5", // Primary Purple
  nonPaid: "#0EA5E9", // Ocean Blue
  organic: "#6E59A5", // Tertiary Purple
  paid: "#F97316", // Bright Orange
  total: "#33C3F0", // Sky Blue
};

// Define colors for channels within each category
const channelColors = {
  // Paid channels
  search: "#4361ee",
  social: "#3a0ca3",
  display: "#7209b7",
  video: "#f72585",
  
  // Organic channels
  organicSearch: "#4cc9f0",
  organicSocial: "#480ca8",
  
  // Non-paid channels
  email: "#4895ef",
  affiliate: "#560bad",
  referral: "#b5179e",
  
  // Used for total
  total: "#33C3F0",
  
  // Used for baseline
  baseline: "#9b87f5",
};

type WaterfallItem = {
  name: string;
  value: number;
  category: string;
  isTotal?: boolean;
  isExpanded?: boolean;
  children?: Array<{
    name: string;
    value: number;
    parentCategory: string;
  }>;
};

type EnhancedWaterfallChartProps = {
  data: any;
  loading?: boolean;
  height?: number;
  className?: string;
};

export function EnhancedWaterfallChart({
  data,
  loading = false,
  height = 400,
  className,
}: EnhancedWaterfallChartProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
  if (loading) {
    return (
      <div className={cn("w-full", className)}>
        <Skeleton className="w-full" style={{ height }} />
      </div>
    );
  }
  
  // Convert raw data into the format needed for the waterfall chart
  const prepareWaterfallData = () => {
    if (!data || data.length === 0) return [];
    
    // Take the latest data point for the waterfall
    const latestData = data[data.length - 1];
    
    // Base waterfall items (categories)
    const baseItems: WaterfallItem[] = [
      { 
        name: "Total", 
        value: latestData.total, 
        category: "total", 
        isTotal: true 
      },
      { 
        name: "Baseline", 
        value: -latestData.baseline, 
        category: "baseline",
        children: [
          { name: "Organic Baseline", value: -latestData.baseline * 0.7, parentCategory: "baseline" },
          { name: "Direct Traffic", value: -latestData.baseline * 0.3, parentCategory: "baseline" }
        ]
      },
      { 
        name: "Non-Paid Media", 
        value: -latestData.nonPaid, 
        category: "nonPaid",
        children: [
          { name: "Email", value: -latestData.nonPaid * 0.5, parentCategory: "nonPaid" },
          { name: "Affiliate", value: -latestData.nonPaid * 0.3, parentCategory: "nonPaid" },
          { name: "Referral", value: -latestData.nonPaid * 0.2, parentCategory: "nonPaid" }
        ]
      },
      { 
        name: "Organic Media", 
        value: -latestData.organic, 
        category: "organic",
        children: [
          { name: "Organic Search", value: -latestData.organic * 0.6, parentCategory: "organic" },
          { name: "Organic Social", value: -latestData.organic * 0.4, parentCategory: "organic" }
        ]
      },
      { 
        name: "Paid Media", 
        value: -latestData.paid, 
        category: "paid",
        children: [
          { name: "Search", value: -latestData.paid * 0.4, parentCategory: "paid" },
          { name: "Social", value: -latestData.paid * 0.3, parentCategory: "paid" },
          { name: "Display", value: -latestData.paid * 0.2, parentCategory: "paid" },
          { name: "Video", value: -latestData.paid * 0.1, parentCategory: "paid" }
        ]
      },
      { 
        name: "Remaining", 
        value: 0, 
        category: "remaining",
        isTotal: true 
      },
    ];
    
    // Mark categories as expanded if they're in expandedCategories
    baseItems.forEach(item => {
      if (expandedCategories.includes(item.category)) {
        item.isExpanded = true;
      }
    });
    
    // Create final data array, expanding categories as needed
    let finalData: Array<WaterfallItem | {name: string, value: number, parentCategory: string}> = [];
    
    baseItems.forEach(item => {
      // Add the main category item
      finalData.push(item);
      
      // If this category is expanded and has children, add them
      if (item.isExpanded && item.children) {
        finalData = [...finalData, ...item.children];
      }
    });
    
    return finalData;
  };
  
  const waterfallData = prepareWaterfallData();
  
  // Calculate running total for waterfall positioning
  const calculateRunningTotal = (data: any[]) => {
    let runningTotal = 0;
    
    return data.map(item => {
      if (item.isTotal) {
        // For total items, set start to 0
        if (item.name === "Total") {
          // Starting total
          runningTotal = item.value;
          return { ...item, start: 0, end: item.value };
        } else {
          // Ending "Remaining" item
          return { ...item, start: runningTotal, end: runningTotal, displayValue: runningTotal };
        }
      } else if (item.parentCategory) {
        // For child items (channels within a category)
        const start = runningTotal;
        runningTotal += item.value;
        return { ...item, start, end: runningTotal, displayValue: Math.abs(item.value) };
      } else {
        // For main category items
        const start = runningTotal;
        // Only adjust running total if category is not expanded
        // (otherwise children will handle the adjustment)
        if (!item.isExpanded) {
          runningTotal += item.value;
        }
        return { ...item, start, end: item.isExpanded ? start : runningTotal, displayValue: Math.abs(item.value) };
      }
    });
  };
  
  const chartData = calculateRunningTotal(waterfallData);
  
  // Toggle expansion of a category
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Card>
          <CardContent className="py-2 px-3">
            <p className="font-medium">{data.name}</p>
            <p className="text-sm">
              {data.isTotal 
                ? `Total: $${Math.abs(data.value).toLocaleString()}`
                : `Contribution: $${Math.abs(data.value).toLocaleString()} (${getPercentage(data.value)})`
              }
            </p>
          </CardContent>
        </Card>
      );
    }
    return null;
  };
  
  // Helper to format percentage
  const getPercentage = (value: number) => {
    if (!data || data.length === 0) return "0%";
    const latestData = data[data.length - 1];
    return `${Math.round(Math.abs(value) / latestData.total * 100)}%`;
  };
  
  // Get color for a bar
  const getBarColor = (item: any) => {
    if (item.parentCategory) {
      // For child items, use channel colors
      const channelName = item.name.toLowerCase().replace(/\s+/g, '');
      return channelColors[channelName as keyof typeof channelColors] || "#888888";
    } else {
      // For category items, use category colors
      return categoryColors[item.category as keyof typeof categoryColors] || "#888888";
    }
  };
  
  // Custom label component for bars
  const renderCustomBarLabel = (props: any) => {
    const { x, y, width, height, value, index } = props;
    const item = chartData[index];
    
    // Only show label if bar is large enough
    if (height < 15) return null;
    
    // For "Remaining" item, show total value
    const displayText = item.name === "Remaining" 
      ? `$${item.displayValue.toLocaleString()}`
      : `$${Math.abs(item.value).toLocaleString()}`;
    
    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={12}
        fontWeight="bold"
      >
        {displayText}
      </text>
    );
  };
  
  return (
    <div className={cn("w-full", className)}>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            barGap={0}
            layout="vertical"
          >
            <XAxis
              type="number"
              tickFormatter={(value) => `$${Math.abs(value).toLocaleString()}`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={({ x, y, payload, index }) => {
                const item = chartData[index];
                
                // Don't render toggle buttons for total items or channel items
                if (item.isTotal || item.parentCategory) {
                  return (
                    <text x={x} y={y} dy={4} textAnchor="end" fontSize={12}>
                      {item.parentCategory ? `└─ ${item.name}` : item.name}
                    </text>
                  );
                }
                
                // For main categories, render with toggle button
                return (
                  <g onClick={() => toggleCategory(item.category)}>
                    <text 
                      x={x - 20} 
                      y={y} 
                      dy={4} 
                      textAnchor="end" 
                      fontSize={12}
                      className="cursor-pointer hover:font-medium"
                    >
                      {item.name}
                    </text>
                    {item.children && (
                      <g 
                        className="cursor-pointer"
                        transform={`translate(${x - 15}, ${y - 7})`}
                      >
                        {item.isExpanded ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                      </g>
                    )}
                  </g>
                );
              }}
              width={150}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x={0} stroke="#000" />
            <Bar
              dataKey="value"
              fill="#8884d8"
              onMouseDown={(data: any) => {
                // Only toggle when clicking on a category (not child or total)
                if (!data.isTotal && !data.parentCategory) {
                  toggleCategory(data.category);
                }
              }}
            >
              <LabelList dataKey="value" content={renderCustomBarLabel} />
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={getBarColor(entry)}
                  style={{ cursor: entry.isTotal || entry.parentCategory ? 'default' : 'pointer' }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
