
import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Label, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DownloadIcon, BarChart3, TableIcon } from "lucide-react";

// Define colors for each media type
const mediaTypeColors = {
  paid: "#4361ee",
  organic: "#3a0ca3",
  nonPaid: "#7209b7",
  baseline: "#f72585",
  total: "#000000"
};

const channelColors = {
  search: "#4361ee",
  social: "#3a0ca3",
  display: "#7209b7",
  video: "#f72585",
  email: "#4cc9f0",
  affiliates: "#480ca8",
};

type PerformanceBreakdownSectionProps = {
  data: any[];
  loading: boolean;
};

export function PerformanceBreakdownSection({ data, loading }: PerformanceBreakdownSectionProps) {
  const [selectedMediaType, setSelectedMediaType] = useState<string | null>(null);
  const [view, setView] = useState<'chart' | 'table'>('chart');
  
  // For demonstration purposes, mock data for channels within each media type
  const getChannelBreakdown = (mediaType: string) => {
    const channelData = [];
    
    if (mediaType === 'paid') {
      channelData.push(
        { name: 'Search', value: 35000, fill: channelColors.search },
        { name: 'Social', value: 25000, fill: channelColors.social },
        { name: 'Display', value: 15000, fill: channelColors.display }
      );
    } else if (mediaType === 'organic') {
      channelData.push(
        { name: 'SEO', value: 22000, fill: channelColors.search },
        { name: 'Social', value: 18000, fill: channelColors.social }
      );
    } else if (mediaType === 'nonPaid') {
      channelData.push(
        { name: 'Email', value: 12000, fill: channelColors.email },
        { name: 'Affiliates', value: 8000, fill: channelColors.affiliates }
      );
    }
    
    return channelData;
  };
  
  // Transform data for waterfall chart
  const prepareWaterfallData = () => {
    if (!data || data.length === 0) return [];
    
    // Take the latest data point
    const latestData = data[data.length - 1];
    
    // Prepare waterfall data
    const waterfallData = [
      { name: 'Baseline', value: latestData.baseline, fill: mediaTypeColors.baseline, isTotal: false },
      { name: 'Non-Paid Media', value: latestData.nonPaid, fill: mediaTypeColors.nonPaid, isTotal: false },
      { name: 'Organic Media', value: latestData.organic, fill: mediaTypeColors.organic, isTotal: false },
      { name: 'Paid Media', value: latestData.paid, fill: mediaTypeColors.paid, isTotal: false },
      { name: 'Total', value: latestData.total, fill: mediaTypeColors.total, isTotal: true }
    ];
    
    return waterfallData;
  };
  
  // Handle media type click to show channel breakdown
  const handleMediaTypeClick = (mediaType: string) => {
    if (selectedMediaType === mediaType) {
      // Toggle off if already selected
      setSelectedMediaType(null);
    } else {
      // Set new selection
      setSelectedMediaType(mediaType);
    }
  };
  
  // Prepare channel breakdown data
  const channelBreakdownData = selectedMediaType ? getChannelBreakdown(selectedMediaType) : [];

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Performance Breakdown</CardTitle>
          <CardDescription>Contribution to revenue by media type</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border rounded-md">
            <Button
              variant={view === 'chart' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-r-none"
              onClick={() => setView('chart')}
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Chart
            </Button>
            <Button
              variant={view === 'table' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-l-none"
              onClick={() => setView('table')}
            >
              <TableIcon className="h-4 w-4 mr-1" />
              Table
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="w-full h-[400px]" />
        ) : (
          <>
            {view === 'chart' ? (
              <div className="space-y-6">
                {/* Main waterfall chart showing media type contributions */}
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={prepareWaterfallData()}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      barGap={0}
                    >
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`}>
                        <Label
                          value="Revenue Contribution ($)"
                          angle={-90}
                          position="insideLeft"
                          style={{ textAnchor: 'middle' }}
                        />
                      </YAxis>
                      <Tooltip
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                      />
                      <Legend />
                      <Bar
                        dataKey="value"
                        fill="#8884d8"
                        onClick={(data) => {
                          if (!data.isTotal) {
                            const mediaType = data.name.toLowerCase().replace('-', '');
                            handleMediaTypeClick(mediaType === 'baseline' ? 'baseline' : mediaType);
                          }
                        }}
                      >
                        {prepareWaterfallData().map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            cursor={entry.isTotal ? 'default' : 'pointer'}
                            fill={entry.fill}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Channel breakdown section - shown only when a media type is selected */}
                {selectedMediaType && (
                  <div className="border-t pt-4">
                    <h3 className="text-md font-medium mb-2">
                      {selectedMediaType.charAt(0).toUpperCase() + selectedMediaType.slice(1)} Media Channels
                    </h3>
                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={channelBreakdownData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                          <Tooltip
                            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                          />
                          <Legend />
                          <Bar dataKey="value" name="Revenue">
                            {channelBreakdownData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Table view
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Media Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue Contribution
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        % of Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {prepareWaterfallData().map((item, index) => {
                      // Skip the total row for percentage calculation
                      const total = data[data.length - 1].total;
                      const percentage = item.isTotal ? 100 : (item.value / total) * 100;
                      
                      return (
                        <tr 
                          key={index}
                          className={item.isTotal ? "font-bold bg-gray-50" : "cursor-pointer hover:bg-gray-50"}
                          onClick={() => {
                            if (!item.isTotal) {
                              const mediaType = item.name.toLowerCase().replace('-', '');
                              handleMediaTypeClick(mediaType === 'baseline' ? 'baseline' : mediaType);
                            }
                          }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: item.fill }}
                              ></div>
                              {item.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ${item.value.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {percentage.toFixed(1)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                
                {/* Channel breakdown table - shown only when a media type is selected */}
                {selectedMediaType && (
                  <div className="mt-6 border-t pt-4">
                    <h3 className="text-md font-medium mb-2">
                      {selectedMediaType.charAt(0).toUpperCase() + selectedMediaType.slice(1)} Media Channels
                    </h3>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Channel
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Revenue Contribution
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            % of Media Type
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {channelBreakdownData.map((channel, index) => {
                          const mediaTypeTotal = channelBreakdownData.reduce((sum, item) => sum + item.value, 0);
                          const percentage = (channel.value / mediaTypeTotal) * 100;
                          
                          return (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div 
                                    className="w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: channel.fill }}
                                  ></div>
                                  {channel.name}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                ${channel.value.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {percentage.toFixed(1)}%
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
