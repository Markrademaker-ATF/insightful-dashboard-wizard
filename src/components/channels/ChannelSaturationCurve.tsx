
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
const generateSaturationData = (channelId: string, activeScenario: string, customBudgets: Record<string, Record<string, number>>) => {
  // We'll create points of a curve that demonstrates diminishing returns with a hill shape
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
  
  // New spend point based on the active scenario
  const newSpend = customBudgets[activeScenario]?.[channelId] || currentSpend;
  
  // Calculate maximum saturation point (where marginal returns become negative)
  const maxSaturationSpend = saturationPoint * 1.5;
  
  // Calculate ROAS/outcomes for key points
  const currentRoas = calculateRoas(currentSpend, maxRoas, saturationPoint);
  const newRoas = calculateRoas(newSpend, maxRoas, saturationPoint);
  const maxSaturationRoas = calculateRoas(maxSaturationSpend, maxRoas, saturationPoint);
  
  const currentRevenue = currentSpend * currentRoas;
  const newRevenue = newSpend * newRoas;
  const maxSaturationRevenue = maxSaturationSpend * maxSaturationRoas;
  
  // Points for the curve - create a hill shape curve
  for (let spend = 0; spend <= baseSpend * 3.5; spend += baseSpend / 15) {
    const roas = calculateRoas(spend, maxRoas, saturationPoint);
    const incrementalOutcome = calculateIncrementalOutcome(spend, maxRoas, saturationPoint);
    
    points.push({
      spend,
      roas,
      incrementalOutcome,
      revenue: spend * roas,
      // Mark the points
      isCurrent: Math.abs(spend - currentSpend) < baseSpend / 20,
      isNew: Math.abs(spend - newSpend) < baseSpend / 20,
      isMaxSaturation: Math.abs(spend - maxSaturationSpend) < baseSpend / 20
    });
  }
  
  return { 
    points, 
    currentPoint: { roas: currentRoas, spend: currentSpend, revenue: currentRevenue, incrementalOutcome: calculateIncrementalOutcome(currentSpend, maxRoas, saturationPoint) },
    newPoint: { roas: newRoas, spend: newSpend, revenue: newRevenue, incrementalOutcome: calculateIncrementalOutcome(newSpend, maxRoas, saturationPoint) },
    maxSaturationPoint: { roas: maxSaturationRoas, spend: maxSaturationSpend, revenue: maxSaturationRevenue, incrementalOutcome: calculateIncrementalOutcome(maxSaturationSpend, maxRoas, saturationPoint) }
  };
};

// Helper function to calculate ROAS with diminishing returns
const calculateRoas = (spend: number, maxRoas: number, saturationPoint: number) => {
  if (spend === 0) return 0;
  // Diminishing returns formula
  return maxRoas * Math.exp(-Math.pow(spend - (saturationPoint * 0.5), 2) / (2 * Math.pow(saturationPoint, 2))) + 1;
};

// Helper function to calculate incremental outcome (hill shape)
const calculateIncrementalOutcome = (spend: number, maxRoas: number, saturationPoint: number) => {
  if (spend === 0) return 0;
  
  // Create a hill-shaped curve that peaks at the saturation point and then declines
  const hill = Math.exp(-Math.pow(spend - saturationPoint, 2) / (2 * Math.pow(saturationPoint * 0.6, 2)));
  return hill * maxRoas * 20000; // Scale the outcome for visualization
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps<string | number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    const isSpecialPoint = data?.isCurrent || data?.isNew || data?.isMaxSaturation;
    
    return (
      <div className="bg-white p-3 border rounded-md shadow-md">
        <p className="font-medium">Ad Spend: ${data?.spend?.toLocaleString()}</p>
        <p>Incremental Outcome: ${data?.incrementalOutcome?.toLocaleString()}</p>
        <p>ROAS: {data?.roas?.toFixed(2)}x</p>
        <p>Revenue: ${data?.revenue?.toLocaleString()}</p>
        {isSpecialPoint && (
          <p className="font-bold mt-1 text-primary">
            {data?.isCurrent ? "Current Spend Point" : 
             data?.isNew ? "New Recommended Spend" : 
             "Maximum Saturation Point"}
          </p>
        )}
      </div>
    );
  }
  return null;
};

type ChannelSaturationCurveProps = {
  channelId: string;
  channelName: string;
  color: string;
  activeScenario: string;
  customBudgets: Record<string, Record<string, number>>;
};

export function ChannelSaturationCurve({ 
  channelId, 
  channelName, 
  color,
  activeScenario,
  customBudgets
}: ChannelSaturationCurveProps) {
  // Generate data for the curve
  const { points, currentPoint, newPoint, maxSaturationPoint } = generateSaturationData(channelId, activeScenario, customBudgets);
  
  return (
    <div className="space-y-6">
      {/* Main Chart */}
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">{channelName} Saturation Curve</h3>
            <p className="text-sm text-muted-foreground">
              Shows how incremental outcomes change as ad spending increases, highlighting key points
            </p>
          </div>
          
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={points}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="spend" 
                  tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                  label={{ value: 'Ad Spend ($)', position: 'insideBottomRight', offset: -10 }}
                />
                <YAxis 
                  yAxisId="left"
                  label={{ value: 'Incremental Outcome ($)', angle: -90, position: 'insideLeft' }}
                  tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Hill-shaped Incremental Outcome Line */}
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="incrementalOutcome"
                  name="Incremental Outcome"
                  stroke={color}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                
                {/* Current point marker */}
                <Scatter
                  yAxisId="left"
                  data={[{ spend: currentPoint.spend, incrementalOutcome: currentPoint.incrementalOutcome }]}
                  fill="#FF8C00"  // Orange color
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  shape="circle"
                  name="Current Spend"
                >
                </Scatter>
                
                {/* New point marker */}
                <Scatter
                  yAxisId="left"
                  data={[{ spend: newPoint.spend, incrementalOutcome: newPoint.incrementalOutcome }]}
                  fill="#4CAF50"  // Green color
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  shape="diamond"
                  name="New Spend"
                >
                </Scatter>
                
                {/* Max saturation point marker */}
                <Scatter
                  yAxisId="left"
                  data={[{ spend: maxSaturationPoint.spend, incrementalOutcome: maxSaturationPoint.incrementalOutcome }]}
                  fill="#9C27B0"  // Purple color
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  shape="star"
                  name="Max Saturation"
                >
                </Scatter>
                
                {/* Reference lines for key points */}
                <ReferenceLine x={currentPoint.spend} stroke="#FF8C00" strokeDasharray="3 3" />
                <ReferenceLine x={newPoint.spend} stroke="#4CAF50" strokeDasharray="3 3" />
                <ReferenceLine x={maxSaturationPoint.spend} stroke="#9C27B0" strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }}></div>
              <span>Incremental Outcome</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-500"></div>
              <span>Current Spend (${currentPoint.spend.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span>New Spend (${newPoint.spend.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-600"></div>
              <span>Maximum Saturation (${maxSaturationPoint.spend.toLocaleString()})</span>
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
                <li>Current spend: <span className="font-medium">${currentPoint.spend.toLocaleString()}</span> with outcome of <span className="font-medium">${currentPoint.incrementalOutcome.toLocaleString()}</span></li>
                <li>
                  {newPoint.spend > currentPoint.spend 
                    ? `Increasing spend to $${newPoint.spend.toLocaleString()} would increase outcomes by ${((newPoint.incrementalOutcome - currentPoint.incrementalOutcome) / currentPoint.incrementalOutcome * 100).toFixed(1)}%`
                    : `Decreasing spend to $${newPoint.spend.toLocaleString()} would decrease outcomes by ${((currentPoint.incrementalOutcome - newPoint.incrementalOutcome) / currentPoint.incrementalOutcome * 100).toFixed(1)}%`
                  }
                </li>
                <li>
                  Maximum saturation point at <span className="font-medium">${maxSaturationPoint.spend.toLocaleString()}</span> where incremental returns start declining
                </li>
                <li className="font-medium">
                  {newPoint.spend < maxSaturationPoint.spend && newPoint.spend > currentPoint.spend
                    ? "Recommendation: Continue increasing spend up to optimization point"
                    : newPoint.spend > maxSaturationPoint.spend
                    ? "Recommendation: Consider reducing spend to improve efficiency"
                    : "The recommended spend appears to be optimized for your goals"}
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
