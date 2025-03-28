
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  ReferenceArea,
  ReferenceLine,
  TooltipProps
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

// Generate saturation curve data for a channel
const generateSaturationData = (channelId: string) => {
  // We'll create points of a curve that demonstrates diminishing returns
  const points = [];
  const baseSpend = channelId === "search" ? 20000 : 
                   channelId === "social" ? 15000 : 
                   channelId === "display" ? 10000 : 5000;
  
  const maxRoas = channelId === "search" ? 4.5 : 
                 channelId === "social" ? 3.8 : 
                 channelId === "display" ? 3.2 : 2.8;
                 
  const saturationPoint = channelId === "search" ? 35000 : 
                         channelId === "social" ? 25000 : 
                         channelId === "display" ? 18000 : 12000;
  
  // Current spend point (for the marker)
  const currentSpend = baseSpend * 1.3;
  const currentRoas = calculateRoas(currentSpend, maxRoas, saturationPoint);
  const currentRevenue = currentSpend * currentRoas;
  
  // Points for the curve
  for (let spend = 0; spend <= baseSpend * 3; spend += baseSpend / 10) {
    const roas = calculateRoas(spend, maxRoas, saturationPoint);
    points.push({
      spend,
      roas,
      revenue: spend * roas,
      // Mark the current point
      isCurrent: Math.abs(spend - currentSpend) < baseSpend / 20,
      // Mark the saturation point
      isSaturation: Math.abs(spend - saturationPoint) < baseSpend / 20
    });
  }
  
  return { points, currentPoint: { roas: currentRoas, spend: currentSpend, revenue: currentRevenue } };
};

// Helper function to calculate ROAS with diminishing returns
const calculateRoas = (spend: number, maxRoas: number, saturationPoint: number) => {
  if (spend === 0) return 0;
  // Diminishing returns formula
  return maxRoas * Math.exp(-Math.pow(spend - (saturationPoint * 0.5), 2) / (2 * Math.pow(saturationPoint, 2))) + 1;
};

// Generate marginal ROAS data 
const generateMarginalData = (points: any[]) => {
  return points.map((point, index, array) => {
    if (index === 0) return { ...point, marginalRoas: point.roas };
    
    const prevPoint = array[index - 1];
    const revenueChange = point.revenue - prevPoint.revenue;
    const spendChange = point.spend - prevPoint.spend;
    
    // Calculate marginal ROAS - the return on the additional spend
    const marginalRoas = spendChange > 0 ? revenueChange / spendChange : 0;
    
    return {
      ...point,
      marginalRoas
    };
  });
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps<string | number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-md shadow-md">
        <p className="font-medium">Spend: ${payload[0]?.payload?.spend?.toLocaleString()}</p>
        <p>Average ROAS: {payload[0]?.payload?.roas?.toFixed(2)}x</p>
        <p>Marginal ROAS: {payload[0]?.payload?.marginalRoas?.toFixed(2)}x</p>
        <p>Revenue: ${payload[0]?.payload?.revenue?.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

type ChannelSaturationCurveProps = {
  channelId: string;
  channelName: string;
  color: string;
};

export function ChannelSaturationCurve({ channelId, channelName, color }: ChannelSaturationCurveProps) {
  // Generate data for the curve
  const { points, currentPoint } = generateSaturationData(channelId);
  const data = generateMarginalData(points);
  
  // Find the point where marginal ROAS drops below 1.0 (unprofitable)
  const optimalSpendPoint = data.find(point => point.marginalRoas < 1);
  
  return (
    <div className="space-y-6">
      {/* Main Chart */}
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">{channelName} Saturation Curve</h3>
            <p className="text-sm text-muted-foreground">
              Shows how ROAS changes as spend increases, with average and marginal returns
            </p>
          </div>
          
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="spend" 
                  tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                  label={{ value: 'Media Spend ($)', position: 'insideBottomRight', offset: -10 }}
                />
                <YAxis 
                  yAxisId="left"
                  label={{ value: 'ROAS (x)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Average ROAS Line */}
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="roas"
                  name="Average ROAS"
                  stroke={color}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                
                {/* Marginal ROAS Line */}
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="marginalRoas"
                  name="Marginal ROAS"
                  stroke="#888888"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                />
                
                {/* Current point marker */}
                <Scatter
                  yAxisId="left"
                  data={[{ spend: currentPoint.spend, roas: currentPoint.roas }]}
                  fill={color}
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  shape="circle"
                  name="Current Spend"
                >
                </Scatter>
                
                {/* Optimal spend point marker (where marginal ROAS crosses 1.0) */}
                {optimalSpendPoint && (
                  <Scatter
                    yAxisId="left"
                    data={[{ spend: optimalSpendPoint.spend, roas: optimalSpendPoint.roas }]}
                    fill="#000000"
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    shape="circle"
                    name="Optimal Spend"
                  >
                  </Scatter>
                )}
                
                {/* Reference line for ROAS = 1.0 */}
                <ReferenceLine y={1} yAxisId="left" stroke="red" strokeDasharray="3 3" />
                
                {/* Reference area for unprofitable zone */}
                <ReferenceArea yAxisId="left" y1={0} y2={1} stroke="none" fill="rgba(255, 0, 0, 0.05)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }}></div>
              <span>Average ROAS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gray-500"></div>
              <span>Marginal ROAS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full border-2 border-white" style={{ backgroundColor: color }}></div>
              <span>Current Spend</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Insights Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3 items-start">
            <div className="p-2 rounded-full bg-blue-100/50">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-md font-medium mb-1">Saturation Analysis Insights</h3>
              <ul className="space-y-2 text-sm">
                <li>Current ROAS is <span className="font-medium">{currentPoint.roas.toFixed(2)}x</span> at a spend of <span className="font-medium">${currentPoint.spend.toLocaleString()}</span></li>
                <li>
                  {optimalSpendPoint 
                    ? `Optimal spend is around $${optimalSpendPoint.spend.toLocaleString()} before marginal returns become unprofitable`
                    : `This channel has not yet reached the point of unprofitable marginal returns`
                  }
                </li>
                <li>
                  {currentPoint.spend < (optimalSpendPoint?.spend || Infinity)
                    ? `There is room to increase spend by approximately $${((optimalSpendPoint?.spend || currentPoint.spend * 1.5) - currentPoint.spend).toLocaleString()}`
                    : `Consider optimizing or reducing spend as you've exceeded the optimal efficiency point`
                  }
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
