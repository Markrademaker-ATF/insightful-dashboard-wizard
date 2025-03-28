
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { BarChart4, CircleDot } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { channelColors } from "@/data/mockData";

interface RoasComparisonChartProps {
  channelData: any[];
  loading: boolean;
}

export function RoasComparisonChart({ channelData, loading }: RoasComparisonChartProps) {
  if (loading) {
    return <Skeleton className="w-full h-80" />;
  }

  // Sort channels by ROAS for better visualization
  const sortedData = [...channelData].sort((a, b) => b.roas - a.roas);

  return (
    <Card className="overflow-hidden border-border/40 shadow-sm mb-6">
      <div className="h-1 bg-gradient-to-r from-[#4cc9f0] to-[#7209b7]"></div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <BarChart4 className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-lg">Channel Performance Matrix</CardTitle>
        </div>
        <CardDescription className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <CircleDot className="h-3 w-3 text-blue-500" />
            <span>ROAS (scatter)</span>
          </div>
          <span className="text-muted-foreground">vs.</span>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-blue-300/70"></div>
            <span>Cost</span>
          </div>
          <span className="text-muted-foreground">and</span>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-green-400/70"></div>
            <span>Incremental Outcome</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <div className="w-full h-64">
          <ChartContainer 
            config={{
              cost: {
                label: "Cost",
                color: "rgb(147, 197, 253, 0.7)" // blue-300 with opacity
              },
              incremental: {
                label: "Incremental Outcome",
                color: "rgb(74, 222, 128, 0.7)" // green-400 with opacity
              },
              roas: {
                label: "ROAS",
                color: "#3b82f6" // blue-500
              }
            }}
          >
            <RechartsPrimitive.ComposedChart
              data={sortedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <RechartsPrimitive.XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end"
                tick={{ fontSize: 12 }}
                height={60}
              />
              <RechartsPrimitive.YAxis 
                yAxisId="left"
                orientation="left" 
                stroke="#94a3b8" 
                label={{ 
                  value: 'Cost & Incremental ($)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fontSize: 11, fill: '#94a3b8' }
                }}
              />
              <RechartsPrimitive.YAxis 
                yAxisId="right" 
                orientation="right"
                stroke="#3b82f6"
                label={{ 
                  value: 'ROAS (x)', 
                  angle: -90, 
                  position: 'insideRight',
                  style: { textAnchor: 'middle', fontSize: 11, fill: '#3b82f6' }
                }}
              />
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" opacity={0.6} />
              <RechartsPrimitive.Bar 
                dataKey="cost" 
                yAxisId="left"
                fill="rgb(147, 197, 253, 0.7)" 
                name="Cost"
                barSize={20}
              />
              <RechartsPrimitive.Bar 
                dataKey="incremental" 
                yAxisId="left"
                fill="rgb(74, 222, 128, 0.7)" 
                name="Incremental Outcome"
                barSize={20}
              />
              <RechartsPrimitive.Scatter 
                dataKey="roas" 
                yAxisId="right" 
                fill="#3b82f6" 
                name="ROAS"
                shape={(props) => {
                  const { cx, cy, payload } = props;
                  const channelId = payload.id;
                  const color = channelColors[channelId as keyof typeof channelColors] || "#3b82f6";
                  
                  return (
                    <svg>
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r={8} 
                        stroke={color}
                        strokeWidth={2}
                        fill="white"
                      />
                      <text 
                        x={cx} 
                        y={cy} 
                        textAnchor="middle" 
                        dominantBaseline="central"
                        fill={color}
                        fontSize={9}
                        fontWeight="bold"
                      >
                        {payload.roas}
                      </text>
                    </svg>
                  );
                }}
              />
              <ChartTooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={<ChartTooltipContent />}
                wrapperStyle={{ outline: "none" }}
              />
              <RechartsPrimitive.Legend 
                verticalAlign="top" 
                height={36}
              />
            </RechartsPrimitive.ComposedChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
