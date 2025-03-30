
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Info, TrendingUp, LineChart as LineChartIcon, PieChart, BarChart4 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaTypeSelector, ChannelOption } from "@/components/dashboard/MediaTypeSelector";
import { MediaGroupBreakdownChart } from "@/components/dashboard/MediaGroupBreakdownChart";
import { MediaSaturationChart } from "@/components/dashboard/MediaSaturationChart";
import { ChannelBreakdownDisplay } from "@/components/dashboard/ChannelBreakdownDisplay";
import { ChannelInsights } from "@/components/dashboard/ChannelInsights";
import { MarginalReturnsChart } from "@/components/dashboard/MarginalReturnsChart";
import { mediaGroupColors } from "@/components/dashboard/MediaGroupBreakdownChart";
import { channelSaturationData } from "@/data/mockData";

interface MediaTypeAnalysisSectionProps {
  mediaGroupData: any[];
  saturationData: any[];
  marginalReturnsData: any[];
  channelData: any[];
  mediaType: string;
  setMediaType: (type: string) => void;
  loading: boolean;
  channelOptions?: ChannelOption[];
  selectedChannel?: string;
  setSelectedChannel?: (channel: string) => void;
}

export function MediaTypeAnalysisSection({
  mediaGroupData,
  saturationData,
  marginalReturnsData,
  channelData,
  mediaType,
  setMediaType,
  loading,
  channelOptions = [],
  selectedChannel = "all",
  setSelectedChannel
}: MediaTypeAnalysisSectionProps) {
  const [insightView, setInsightView] = React.useState("breakdown");

  return (
    <Card className="mb-8">
      <CardHeader>
        <MediaTypeSelector 
          activeType={mediaType} 
          onTypeChange={setMediaType}
          activeChannel={selectedChannel}
          onChannelChange={setSelectedChannel}
          channelOptions={channelOptions}
        />
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="breakdown"
          value={insightView}
          onValueChange={setInsightView}
          className="w-full mb-6"
        >
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="breakdown" className="flex items-center gap-1">
              <BarChart4 className="h-4 w-4" /> Breakdown
            </TabsTrigger>
            <TabsTrigger value="saturation" className="flex items-center gap-1">
              <LineChartIcon className="h-4 w-4" /> Saturation
            </TabsTrigger>
            <TabsTrigger value="marginal" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" /> Returns
            </TabsTrigger>
            {mediaType !== "all" && (
              <TabsTrigger value="channels" className="flex items-center gap-1">
                <PieChart className="h-4 w-4" /> Channels
              </TabsTrigger>
            )}
          </TabsList>

          {/* Breakdown Chart */}
          <TabsContent value="breakdown" className="mt-0">
            <MediaGroupBreakdownChart
              data={mediaGroupData}
              mediaGroups={[
                { dataKey: "baseline", color: mediaGroupColors.baseline, label: "Baseline" },
                { dataKey: "nonPaid", color: mediaGroupColors.nonPaid, label: "Non-Paid Media" },
                { dataKey: "organic", color: mediaGroupColors.organic, label: "Organic Media" },
                { dataKey: "paid", color: mediaGroupColors.paid, label: "Paid Media" }
              ]}
              loading={loading}
              height={400}
              stacked={true}
            />
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> 
                This chart shows the monthly contribution of each media type to total revenue.
                {selectedChannel !== "all" && " Filtered by selected channel."}
              </p>
            </div>
          </TabsContent>

          {/* Saturation Chart */}
          <TabsContent value="saturation" className="mt-0">
            <MediaSaturationChart
              data={saturationData}
              curves={[
                { dataKey: "search", color: channelSaturationData.search.color, label: "Search" },
                { dataKey: "social", color: channelSaturationData.social.color, label: "Social" },
                { dataKey: "display", color: channelSaturationData.display.color, label: "Display" }
              ]}
              loading={loading}
              height={400}
            />
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> 
                Saturation curves show how incremental revenue changes as media spend increases, highlighting diminishing returns.
                <span className="font-medium ml-1">Current spending points are marked with white centers, and maximum saturation points with black dots.</span>
              </p>
            </div>
          </TabsContent>

          {/* Marginal Returns Chart */}
          <TabsContent value="marginal" className="mt-0">
            <MarginalReturnsChart data={marginalReturnsData} />
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> 
                The marginal returns chart shows the average and incremental return on ad spend (ROAS) at different spending levels.
                <span className="font-medium">Note:</span> When the marginal ROAS drops below 1.0, additional spend becomes unprofitable.
              </p>
            </div>
          </TabsContent>

          {/* Channels Chart */}
          {mediaType !== "all" && (
            <TabsContent value="channels" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ChannelBreakdownDisplay 
                  channelData={channelData} 
                  loading={loading} 
                  mediaType={mediaType} 
                />
                <ChannelInsights 
                  mediaType={mediaType} 
                />
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
