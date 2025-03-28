
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
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">
          Channel Saturation Curve
        </CardTitle>
        <div className="flex items-center text-muted-foreground hover:text-primary cursor-pointer">
          <Info className="h-4 w-4 mr-1" />
          <span className="text-xs">About this chart</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          This curve shows the relationship between marketing spend and revenue, 
          helping identify the optimal investment level before diminishing returns.
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
                tickFormatter={(value) => `$${value/1000}k`}
                label={{ value: 'Marketing Spend', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                tickFormatter={(value) => `$${value/1000}k`}
                label={{ value: 'Revenue', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                labelFormatter={(value) => `Spend: $${Number(value).toLocaleString()}`}
              />
              <Legend />
              <ReferenceLine 
                x={optimalSpendPoint} 
                stroke="#8b5cf6" 
                strokeDasharray="3 3" 
                label={{ value: 'Optimal Spend', position: 'top', fill: '#8b5cf6' }} 
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
                dot={<CustomDot />}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
          <h4 className="text-sm font-medium mb-1">Insight</h4>
          <p className="text-xs text-muted-foreground">
            The optimal marketing spend appears to be around ${optimalSpendPoint.toLocaleString()}, 
            after which additional investment yields diminishing returns. Consider reallocating 
            budget beyond this point to other channels.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
