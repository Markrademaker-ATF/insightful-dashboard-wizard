
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

// Define enhanced colors for different category types with gradients
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

// Define gradient IDs for each category
const gradients = {
  baseline: {
    id: "baselineGradient",
    startColor: "#9b87f5",
    endColor: "#7a65d6"
  },
  nonPaid: {
    id: "nonPaidGradient",
    startColor: "#0EA5E9",
    endColor: "#0284c7"
  },
  organic: {
    id: "organicGradient",
    startColor: "#6E59A5",
    endColor: "#4c3882"
  },
  paid: {
    id: "paidGradient",
    startColor: "#F97316",
    endColor: "#ea580c"
  },
  total: {
    id: "totalGradient",
    startColor: "#33C3F0",
    endColor: "#06b6d4"
  },
  remaining: {
    id: "remainingGradient",
    startColor: "#33C3F0", 
    endColor: "#0891b2"
  }
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
        <Card className="shadow-lg border-border/60">
          <CardContent className="py-3 px-4">
            <p className="font-medium text-base">{data.name}</p>
            <p className="text-muted-foreground text-sm mt-1">
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
  
  // Get color or gradient for a bar
  const getBarFill = (item: any) => {
    if (item.parentCategory) {
      // For child items, use channel colors
      const channelName = item.name.toLowerCase().replace(/\s+/g, '');
      return channelColors[channelName as keyof typeof channelColors] || "#888888";
    } else {
      // For category items, use gradient
      const category = item.category as keyof typeof gradients;
      return `url(#${gradients[category]?.id || 'defaultGradient'})`;
    }
  };
  
  // Custom label component for bars
  const renderCustomBarLabel = (props: any) => {
    const { x, y, width, height, value, index } = props;
    const item = chartData[index];
    
    // Only show label if bar is large enough
    if (height < 20) return null;
    
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
        fontSize={13}
        fontWeight="500"
        style={{ textShadow: "0px 1px 2px rgba(0,0,0,0.3)" }}
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
            margin={{ top: 30, right: 30, left: 40, bottom: 5 }}
            barGap={2}
            layout="vertical"
            className="drop-shadow-sm"
          >
            {/* Define gradients for each category */}
            <defs>
              {Object.entries(gradients).map(([key, gradient]) => (
                <linearGradient 
                  key={gradient.id} 
                  id={gradient.id} 
                  x1="0" 
                  y1="0" 
                  x2="1" 
                  y2="0"
                >
                  <stop offset="0%" stopColor={gradient.startColor} stopOpacity={0.95} />
                  <stop offset="100%" stopColor={gradient.endColor} stopOpacity={0.8} />
                </linearGradient>
              ))}
              <filter id="shadow" height="130%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.2" />
              </filter>
            </defs>
            
            <XAxis
              type="number"
              tickFormatter={(value) => `$${Math.abs(value).toLocaleString()}`}
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={({ x, y, payload, index }) => {
                const item = chartData[index];
                
                // Don't render toggle buttons for total items or channel items
                if (item.isTotal || item.parentCategory) {
                  return (
                    <text 
                      x={x} 
                      y={y} 
                      dy={4} 
                      textAnchor="end" 
                      fontSize={13} 
                      fontWeight={item.isTotal ? "500" : "400"}
                      fill={item.isTotal ? "#334155" : "#64748b"}
                    >
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
                      fontSize={13}
                      fontWeight="500"
                      fill="#334155"
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
                          <ChevronUp size={14} color="#64748b" />
                        ) : (
                          <ChevronDown size={14} color="#64748b" />
                        )}
                      </g>
                    )}
                  </g>
                );
              }}
              width={160}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x={0} stroke="#64748b" />
            <Bar
              dataKey="value"
              radius={[4, 4, 4, 4]}
              onMouseDown={(data: any) => {
                // Only toggle when clicking on a category (not child or total)
                if (!data.isTotal && !data.parentCategory) {
                  toggleCategory(data.category);
                }
              }}
              animationDuration={1000}
              animationEasing="ease-out"
            >
              <LabelList dataKey="value" content={renderCustomBarLabel} />
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={getBarFill(entry)}
                  style={{ 
                    cursor: entry.isTotal || entry.parentCategory ? 'default' : 'pointer',
                    filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.1))'
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
