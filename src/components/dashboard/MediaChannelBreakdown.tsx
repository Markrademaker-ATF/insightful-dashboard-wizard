
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMediaTypeChannelData } from "@/data/mockData";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  Legend 
} from "recharts";
import { channelColors } from "@/data/mockData";
import { Skeleton } from "@/components/ui/skeleton";

interface MediaChannelBreakdownProps {
  mediaType: string;
  selectedChannel: string;
  loading: boolean;
}

export function MediaChannelBreakdown({ mediaType, selectedChannel, loading }: MediaChannelBreakdownProps) {
  const [activeTab, setActiveTab] = React.useState("baseline");
  
  // Get data for each media type group
  const baselineChannels = getMediaTypeChannelData("baseline");
  const paidChannels = getMediaTypeChannelData("paid");
  const organicChannels = getMediaTypeChannelData("organic");
  const nonPaidChannels = getMediaTypeChannelData("nonPaid");

  const renderTabContent = (data: any[]) => {
    if (loading) {
      return <Skeleton className="w-full h-[400px]" />;
    }

    // Sort by revenue (value) descending for better visualization
    const sortedData = [...data].sort((a, b) => b.value - a.value);

    return (
      <div className="pt-4">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={sortedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={80} 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={(value) => `$${value.toLocaleString()}`} 
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
              contentStyle={{
                borderRadius: "0.5rem",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                border: "none",
                backgroundColor: "rgba(255, 255, 255, 0.95)"
              }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Bar 
              dataKey="value" 
              name="Revenue" 
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <h4 className="text-md font-medium">Channel Revenue Breakdown</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {sortedData.map((channel, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: channel.color }}
                />
                <div>
                  <p className="text-sm font-medium">{channel.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ${channel.value.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="baseline">Baseline</TabsTrigger>
          <TabsTrigger value="paid">Paid Media</TabsTrigger>
          <TabsTrigger value="organic">Organic Media</TabsTrigger>
          <TabsTrigger value="nonPaid">Non-Paid Media</TabsTrigger>
        </TabsList>

        <TabsContent value="baseline">
          {renderTabContent(baselineChannels)}
        </TabsContent>
        <TabsContent value="paid">
          {renderTabContent(paidChannels)}
        </TabsContent>
        <TabsContent value="organic">
          {renderTabContent(organicChannels)}
        </TabsContent>
        <TabsContent value="nonPaid">
          {renderTabContent(nonPaidChannels)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
