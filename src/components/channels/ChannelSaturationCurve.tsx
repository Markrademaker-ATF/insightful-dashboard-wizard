
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from "recharts";
import { Info } from "lucide-react";

// Sample data for the saturation curve
const saturationData = [
  { spend: 0, revenue: 0 },
  { spend: 10000, revenue: 25000 },
  { spend: 20000, revenue: 45000 },
  { spend: 30000, revenue: 60000 },
  { spend: 40000, revenue: 72000 },
  { spend: 50000, revenue: 82000 },
  { spend: 60000, revenue: 90000 },
  { spend: 70000, revenue: 96000 },
  { spend: 80000, revenue: 100000 },
  { spend: 90000, revenue: 103000 },
  { spend: 100000, revenue: 105000 },
];

// Calculate ROAS for each data point
const dataWithRoas = saturationData.map(point => ({
  ...point,
  roas: point.spend > 0 ? point.revenue / point.spend : 0
}));

// Find optimal spend point (where ROAS starts to decline significantly)
const optimalSpendPoint = dataWithRoas.reduce((optimal, point, index, array) => {
  if (index > 0 && point.roas < array[index - 1].roas * 0.9) {
    return optimal || array[index - 1].spend;
  }
  return optimal;
}, null) || 60000;

// Custom dot component for the line chart
const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  
  // Highlight the optimal point
  if (payload.spend === optimalSpendPoint) {
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={6} 
        fill="#8b5cf6" 
        stroke="white" 
        strokeWidth={2} 
      />
    );
  }
  
  // Regular dots
  return (
    <circle 
      cx={cx} 
      cy={cy} 
      r={4} 
      fill="#8b5cf6" 
      opacity={0.8} 
    />
  );
};

export function ChannelSaturationCurve() {
  return (
    <Card className="overflow-hidden border-indigo-100/50 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-indigo-50/50 to-white">
        <CardTitle className="text-xl font-semibold text-gray-800">
          Channel Saturation Analysis
        </CardTitle>
        <div className="flex items-center text-primary hover:text-primary/80 cursor-pointer transition-colors">
          <Info className="h-4 w-4 mr-1" />
          <span className="text-xs font-medium">About this chart</span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-sm text-muted-foreground mb-4 bg-blue-50/30 p-3 rounded-lg border border-blue-100/50">
          <p>This curve illustrates the relationship between marketing spend and revenue generation, 
          helping identify the optimal investment level before diminishing returns occur.</p>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={saturationData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="spend" 
                tickFormatter={(value: number) => `$${value/1000}k`}
                label={{ value: 'Marketing Spend', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                tickFormatter={(value: number) => `$${value/1000}k`}
                label={{ value: 'Revenue', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: number) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                labelFormatter={(value: number) => `Spend: $${Number(value).toLocaleString()}`}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                }}
              />
              <Legend 
                formatter={(value: string) => <span className="text-sm font-medium">Channel Revenue</span>}
              />
              <ReferenceLine 
                x={optimalSpendPoint} 
                stroke="#8b5cf6" 
                strokeDasharray="3 3" 
                label={{ 
                  value: 'Optimal Spend', 
                  position: 'top', 
                  fill: '#8b5cf6',
                  fontSize: 12,
                  fontWeight: 500
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                name="Revenue"
                stroke="url(#colorGradient)" 
                strokeWidth={3}
                activeDot={{ r: 8 }}
                dot={<CustomDot />}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#c4b5fd" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-white rounded-lg border border-primary/10 flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-full mt-0.5">
            <Info className="h-4 w-4 text-primary" /> 
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-800 mb-1">Strategic Insight</h4>
            <p className="text-sm text-muted-foreground">
              The optimal marketing spend appears to be around ${optimalSpendPoint.toLocaleString()}, 
              after which additional investment yields diminishing returns. Consider reallocating 
              budget beyond this point to other channels with higher growth potential.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
