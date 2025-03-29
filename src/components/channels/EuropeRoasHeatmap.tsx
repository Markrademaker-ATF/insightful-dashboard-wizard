
import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Info } from "lucide-react";

// Define European regions and their mock ROAS data
const europeRegionsData = [
  { id: "uk", name: "United Kingdom", roas: 4.2 },
  { id: "fr", name: "France", roas: 3.7 },
  { id: "de", name: "Germany", roas: 4.5 },
  { id: "es", name: "Spain", roas: 3.2 },
  { id: "it", name: "Italy", roas: 3.8 },
  { id: "nl", name: "Netherlands", roas: 5.1 },
  { id: "be", name: "Belgium", roas: 4.3 },
  { id: "pt", name: "Portugal", roas: 2.9 },
  { id: "ch", name: "Switzerland", roas: 5.3 },
  { id: "at", name: "Austria", roas: 4.1 },
  { id: "se", name: "Sweden", roas: 4.8 },
  { id: "no", name: "Norway", roas: 4.6 },
  { id: "dk", name: "Denmark", roas: 4.4 },
  { id: "fi", name: "Finland", roas: 3.9 },
  { id: "pl", name: "Poland", roas: 3.1 },
  { id: "cz", name: "Czech Republic", roas: 3.0 },
  { id: "hu", name: "Hungary", roas: 2.8 },
  { id: "ro", name: "Romania", roas: 2.6 },
  { id: "gr", name: "Greece", roas: 2.7 },
  { id: "ie", name: "Ireland", roas: 4.0 },
];

// Helper function to get color based on ROAS value
const getRoasColor = (roas: number) => {
  if (roas >= 5.0) return "bg-green-600";
  if (roas >= 4.0) return "bg-green-500";
  if (roas >= 3.5) return "bg-green-400";
  if (roas >= 3.0) return "bg-yellow-400";
  if (roas >= 2.5) return "bg-yellow-500";
  return "bg-red-500";
};

// Get text color for contrast
const getTextColor = (roas: number) => {
  return roas >= 3.0 ? "text-white" : "text-gray-800";
};

type EuropeRoasHeatmapProps = {
  loading: boolean;
  selectedChannel?: string | null;
};

export function EuropeRoasHeatmap({ loading, selectedChannel }: EuropeRoasHeatmapProps) {
  // Adjust ROAS values based on selected channel
  const adjustedData = useMemo(() => {
    return europeRegionsData.map(region => {
      let adjustFactor = 1;
      
      if (selectedChannel) {
        // Adjust ROAS based on channel selection (mock variation)
        switch (selectedChannel) {
          case "search":
            adjustFactor = region.id === "de" || region.id === "uk" ? 1.2 : 0.9;
            break;
          case "social":
            adjustFactor = region.id === "fr" || region.id === "es" ? 1.3 : 0.95;
            break;
          case "display":
            adjustFactor = region.id === "it" || region.id === "pt" ? 1.1 : 0.85;
            break;
          case "video":
            adjustFactor = region.id === "se" || region.id === "no" ? 1.25 : 0.9;
            break;
          case "email":
            adjustFactor = region.id === "nl" || region.id === "be" ? 1.15 : 0.95;
            break;
          default:
            adjustFactor = 1;
        }
      }
      
      return {
        ...region,
        roas: parseFloat((region.roas * adjustFactor).toFixed(1))
      };
    });
  }, [selectedChannel]);

  // Calculate average ROAS
  const averageRoas = useMemo(() => {
    const sum = adjustedData.reduce((acc, region) => acc + region.roas, 0);
    return (sum / adjustedData.length).toFixed(1);
  }, [adjustedData]);

  // Find best and worst regions
  const bestRegion = useMemo(() => {
    return adjustedData.reduce((best, current) => (current.roas > best.roas ? current : best), adjustedData[0]);
  }, [adjustedData]);

  const worstRegion = useMemo(() => {
    return adjustedData.reduce((worst, current) => (current.roas < worst.roas ? current : worst), adjustedData[0]);
  }, [adjustedData]);

  if (loading) {
    return <Skeleton className="w-full h-[400px] rounded-md" />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              Europe ROAS Performance Heatmap
            </CardTitle>
            <CardDescription>
              {selectedChannel 
                ? `ROAS performance across European regions for ${selectedChannel} channel` 
                : "ROAS performance across European regions for all channels"}
            </CardDescription>
          </div>
          <div className="text-xs text-right">
            <div className="mb-1">Avg ROAS: <span className="font-semibold">{averageRoas}x</span></div>
            <div className="text-green-600 mb-1">Best: {bestRegion.name} ({bestRegion.roas}x)</div>
            <div className="text-red-500">Worst: {worstRegion.name} ({worstRegion.roas}x)</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Heat map grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {adjustedData.map((region) => (
              <div 
                key={region.id} 
                className={`${getRoasColor(region.roas)} ${getTextColor(region.roas)} p-3 rounded-md transition-colors`}
              >
                <div className="font-medium">{region.name}</div>
                <div className="text-sm opacity-90">ROAS: {region.roas}x</div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="mt-6 flex items-center gap-2 text-xs">
            <span className="flex items-center">
              <span className="inline-block w-3 h-3 bg-red-500 mr-1 rounded-sm"></span>
              &lt;2.5x
            </span>
            <span className="flex items-center">
              <span className="inline-block w-3 h-3 bg-yellow-500 mr-1 rounded-sm"></span>
              2.5-3.0x
            </span>
            <span className="flex items-center">
              <span className="inline-block w-3 h-3 bg-yellow-400 mr-1 rounded-sm"></span>
              3.0-3.5x
            </span>
            <span className="flex items-center">
              <span className="inline-block w-3 h-3 bg-green-400 mr-1 rounded-sm"></span>
              3.5-4.0x
            </span>
            <span className="flex items-center">
              <span className="inline-block w-3 h-3 bg-green-500 mr-1 rounded-sm"></span>
              4.0-5.0x
            </span>
            <span className="flex items-center">
              <span className="inline-block w-3 h-3 bg-green-600 mr-1 rounded-sm"></span>
              5.0x+
            </span>
          </div>
          
          <div className="mt-2 text-xs text-muted-foreground flex items-center">
            <Info className="h-3 w-3 mr-1" />
            {selectedChannel 
              ? "Regional ROAS varies by channel. Try selecting different channels to see the impact."
              : "Select a specific channel to see regional performance differences."}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
