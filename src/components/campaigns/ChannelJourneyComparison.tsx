
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, MapPin, Info, ExternalLink, BarChart4, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { channelColors, channelNames } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChannelJourneyComparisonProps {
  data: {
    channels: Array<{
      id: string;
      name: string;
      colorClass: string;
      conversions: number;
      journeyContribution: {
        awareness: number;
        consideration: number;
        conversion: number;
        advocacy: number;
      };
    }>;
  };
  loading: boolean;
}

export const ChannelJourneyComparison: React.FC<ChannelJourneyComparisonProps> = ({
  data,
  loading
}) => {
  const [activeView, setActiveView] = useState("matrix");
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    );
  }

  // Journey stage labels
  const journeyStages = [
    { id: "awareness", label: "Beginning of Path", description: "First touch awareness building channels" },
    { id: "consideration", label: "Middle of Path", description: "Research and consideration touchpoints" },
    { id: "conversion", label: "Near Conversion", description: "Decision-making and purchase intent" },
    { id: "advocacy", label: "Post-Conversion", description: "Loyalty and advocacy building" }
  ];
  
  // Helper to get color intensity based on percentage
  const getColorIntensity = (percentage: number): string => {
    if (percentage === 0) return "bg-gray-100 opacity-30";
    if (percentage < 10) return "opacity-40";
    if (percentage < 20) return "opacity-60";
    if (percentage < 30) return "opacity-80";
    return "opacity-100";
  };

  // Get top performing channel for each journey stage
  const getTopChannelsByStage = () => {
    const result: Record<string, any[]> = {};
    
    journeyStages.forEach(stage => {
      const stageId = stage.id;
      
      // Sort channels by their contribution to this stage
      const sortedChannels = [...data.channels].sort((a, b) => 
        b.journeyContribution[stageId as keyof typeof b.journeyContribution] - 
        a.journeyContribution[stageId as keyof typeof a.journeyContribution]
      );
      
      // Get top 3 channels
      result[stageId] = sortedChannels.slice(0, 3);
    });
    
    return result;
  };
  
  const topChannelsByStage = getTopChannelsByStage();

  // Calculate total conversions
  const totalConversions = data.channels.reduce((sum, channel) => sum + channel.conversions, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Customer Journey Driver Analysis
            </CardTitle>
            <CardDescription>
              Channel effectiveness at different stages of the customer journey
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Tabs value={activeView} onValueChange={setActiveView} className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="matrix">Matrix</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm" className="gap-1">
              <Info className="h-4 w-4" /> How this works
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TabsContent value="matrix" className="mt-0">
          <div className="overflow-x-auto">
            <div className="min-w-[750px]">
              {/* Header */}
              <div className="grid grid-cols-12 mb-6">
                <div className="col-span-3 px-2 font-medium text-sm">Channel</div>
                <div className="col-span-6 grid grid-cols-4 gap-1 px-2">
                  {journeyStages.map((stage) => (
                    <div key={stage.id} className="text-center font-medium text-sm">
                      {stage.label}
                      <div className="text-xs text-muted-foreground">{stage.description}</div>
                    </div>
                  ))}
                </div>
                <div className="col-span-3 text-right px-2 font-medium text-sm"># Conversions</div>
              </div>

              {/* Channel rows */}
              <div className="space-y-3">
                {data.channels.map((channel, index) => {
                  // Get channel color from the standardized colors
                  const channelColor = channel.id in channelColors
                    ? `bg-[${channelColors[channel.id as keyof typeof channelColors]}]`
                    : channel.colorClass;
                  
                  // Calculate the percentage of total conversions
                  const conversionPercentage = totalConversions > 0 
                    ? ((channel.conversions / totalConversions) * 100).toFixed(1) 
                    : "0";
                  
                  return (
                    <div key={index} className="grid grid-cols-12 items-center">
                      {/* Channel name */}
                      <div className={`col-span-3 p-2 rounded-l-md ${channelColor} bg-opacity-20 font-medium`}>
                        {channelNames[channel.id as keyof typeof channelNames] || channel.name}
                      </div>
                      
                      {/* Journey stages */}
                      <div className="col-span-6 grid grid-cols-4 gap-1 p-1">
                        {Object.entries(channel.journeyContribution).map(([stage, percentage], i) => {
                          // Ensure all percentages have a value (even if 0%)
                          const displayPercentage = percentage || 0;
                          return (
                            <div key={stage} className="flex justify-center p-1">
                              <div 
                                className={`h-8 w-8 rounded-md flex items-center justify-center ${channelColor} ${getColorIntensity(displayPercentage)}`}
                                title={`${displayPercentage}% contribution at ${journeyStages[i]?.label}`}
                              >
                                <span className="text-xs font-medium text-white">
                                  {`${displayPercentage}%`}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Conversions */}
                      <div className="col-span-3 p-2 rounded-r-md bg-gray-100 text-right">
                        <div className="font-medium">{channel.conversions.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{conversionPercentage}% of total</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-gray-100 opacity-30 rounded-sm"></div>
                    <span className="text-xs text-muted-foreground">0%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {[10, 20, 30, 40, 50].map((value, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <div className={`w-4 h-4 bg-primary ${getColorIntensity(value)} rounded-sm`}></div>
                        <span className="text-xs text-muted-foreground">
                          {`${value}%`}
                          {value === 50 ? "+" : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground max-w-[200px] text-right">
                  % reflects the overall weighting of a channel at a particular position in the path
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-0 space-y-6">
          {/* Stage performance insights */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <BarChart4 className="h-4 w-4 text-primary" />
              Journey Stage Performance Analysis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {journeyStages.map((stage) => {
                const topChannels = topChannelsByStage[stage.id] || [];
                
                return (
                  <div key={stage.id} className="border rounded-lg p-4">
                    <div className="font-medium mb-2">{stage.label}</div>
                    <div className="text-xs text-muted-foreground mb-3">{stage.description}</div>
                    
                    <div className="space-y-3">
                      <div className="text-xs font-medium">Top Performing Channels:</div>
                      {topChannels.map((channel, idx) => {
                        const channelColor = channel.id in channelColors
                          ? `bg-[${channelColors[channel.id as keyof typeof channelColors]}]`
                          : channel.colorClass;
                        
                        const contribution = channel.journeyContribution[stage.id as keyof typeof channel.journeyContribution];
                        
                        return (
                          <div key={idx} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${channelColor}`}></div>
                            <div className="text-xs flex-1">
                              {channelNames[channel.id as keyof typeof channelNames] || channel.name}
                            </div>
                            <div className="text-xs font-medium">{contribution}%</div>
                          </div>
                        );
                      })}
                      
                      {topChannels.length === 0 && (
                        <div className="text-xs text-muted-foreground">No data available</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Key insights and recommendations */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Key Insights & Recommendations
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <div className="font-medium mb-2">Channel Optimization</div>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                    <span>
                      <span className="font-medium">Search</span> is strongest at the beginning of the journey, allocate more budget to awareness campaigns.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                    <span>
                      <span className="font-medium">Email</span> shows high impact near conversion, optimize for bottom-funnel messaging.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                    <span>
                      <span className="font-medium">Direct</span> and <span className="font-medium">Social</span> are key for post-conversion advocacy.
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="font-medium mb-2">Budget Allocation</div>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                    <span>
                      Increase investment in channels with >30% contribution at crucial stages.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                    <span>
                      Re-evaluate low-performing channels with <10% contribution across all stages.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                    <span>
                      Balance spending across journey stages to maintain consistent customer flow.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-2 text-xs text-muted-foreground flex items-center justify-end gap-1.5">
            <Info className="h-3.5 w-3.5" />
            <span>Analysis based on multi-touch attribution data from the last 90 days</span>
            <Button variant="ghost" size="sm" className="h-6 gap-1 text-xs">
              <ExternalLink className="h-3.5 w-3.5" /> Full Report
            </Button>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};
