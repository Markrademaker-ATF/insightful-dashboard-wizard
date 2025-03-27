
import React from "react";
import { MarginalReturnsChart } from "@/components/dashboard/MarginalReturnsChart";
import { channelSaturationData } from "@/data/mockData";

interface ChannelSaturationCurveProps {
  channelId: string;
  channelName: string;
  color?: string;
}

export function ChannelSaturationCurve({ 
  channelId, 
  channelName,
  color = "#4361ee" 
}: ChannelSaturationCurveProps) {
  // Generate mock saturation curve data based on channelId for consistency
  const generateSaturationData = () => {
    // Different channels have different saturation characteristics
    const isSaturatedChannel = ["display", "affiliate"].includes(channelId);
    const isHighPerformingChannel = ["search", "email"].includes(channelId);
    
    // Use a hash of the channelId to get consistent random values
    const channelSeed = channelId.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
    const seedRandom = (base: number) => (channelSeed * base) % 100 / 100;
    
    // Start point for returns curve
    const initialROAS = isHighPerformingChannel ? 3 + seedRandom(7) : 2 + seedRandom(5);
    
    // How quickly returns diminish
    const saturationRate = isSaturatedChannel ? 0.9 + seedRandom(2) : 0.4 + seedRandom(1.5);
    
    // Get saturation data for this channel type
    let channelType = "search";
    if (["facebook", "tiktok", "organicSocial"].includes(channelId)) channelType = "social";
    if (["display", "google"].includes(channelId)) channelType = "display";
    if (["youtube"].includes(channelId)) channelType = "video";
    
    const currentSpend = channelSaturationData[channelType as keyof typeof channelSaturationData]?.currentSpend || 30000;
    const maxSaturation = channelSaturationData[channelType as keyof typeof channelSaturationData]?.maxSaturation || 60000;
    
    const data = [];
    // Generate data points across various spend levels
    for (let spend = 5000; spend <= 100000; spend += 5000) {
      // Calculate returns as a curve that diminishes based on saturationRate
      const returns = initialROAS * Math.pow(spend / 5000, -saturationRate * (spend / 100000));
      
      // Calculate marginal returns (derivative of the returns curve)
      // This shows the incremental ROAS for the next dollar spent
      const prevSpend = Math.max(5000, spend - 5000);
      const prevReturns = initialROAS * Math.pow(prevSpend / 5000, -saturationRate * (prevSpend / 100000));
      const marginal = (returns * spend - prevReturns * prevSpend) / (spend - prevSpend);
      
      data.push({
        spend,
        returns: parseFloat(returns.toFixed(2)),
        marginal: parseFloat(marginal.toFixed(2)),
        isCurrentSpend: spend === currentSpend,
        isMaxSaturation: spend === maxSaturation
      });
    }
    
    return data;
  };

  const saturationData = generateSaturationData();
  
  // Find optimal spend level (where marginal returns = 1)
  const optimalSpend = (() => {
    for (let i = 0; i < saturationData.length - 1; i++) {
      if (saturationData[i].marginal >= 1 && saturationData[i + 1].marginal < 1) {
        return (saturationData[i].spend + saturationData[i + 1].spend) / 2;
      }
    }
    // If never crosses 1, return the last point
    return saturationData[saturationData.length - 1].spend;
  })();

  // Custom render for the dot component to highlight current spending and max saturation
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    
    // Only render dots for special points
    const isCurrentSpend = payload.isCurrentSpend;
    const isMaxSaturation = payload.isMaxSaturation;
    
    if (!isCurrentSpend && !isMaxSaturation) return null;

    return (
      <g>
        <circle 
          cx={cx} 
          cy={cy} 
          r={6} 
          fill={isCurrentSpend ? "#ffffff" : "#000000"} 
          stroke={color}
          strokeWidth={2}
        />
        {isCurrentSpend && (
          <circle cx={cx} cy={cy} r={3} fill={color} />
        )}
      </g>
    );
  };

  return (
    <div className="space-y-4">
      <MarginalReturnsChart 
        data={saturationData} 
        customDot={CustomDot}
      />
      
      <div className="bg-muted/30 p-4 rounded-lg">
        <h4 className="text-sm font-medium mb-2">Analysis</h4>
        <p className="text-sm text-muted-foreground">
          The optimal budget allocation for {channelName} is approximately 
          <strong> ${Math.round(optimalSpend).toLocaleString()}</strong>. 
          At this level, each additional dollar spent will return exactly one dollar in revenue 
          (marginal ROAS = 1.0x).
          {saturationData[0].marginal > 2 && (
            " This channel shows strong initial returns, making it a good candidate for increased investment."
          )}
          {saturationData[0].marginal <= 2 && saturationData[0].marginal > 1 && (
            " This channel shows moderate returns efficiency with reasonable scaling potential."
          )}
          {saturationData[0].marginal <= 1 && (
            " This channel is already approaching its efficiency limit and may not benefit from additional spending."
          )}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          <strong>Current spend:</strong> ${saturationData.find(d => d.isCurrentSpend)?.spend.toLocaleString()} | 
          <strong> Maximum saturation:</strong> ${saturationData.find(d => d.isMaxSaturation)?.spend.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
