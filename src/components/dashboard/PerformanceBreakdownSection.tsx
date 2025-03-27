
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DownloadIcon, BarChart3, TableIcon } from "lucide-react";
import { EnhancedWaterfallChart } from "./EnhancedWaterfallChart";

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
  const [view, setView] = useState<'chart' | 'table'>('chart');
  
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

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Waterfall Chart</CardTitle>
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
                {/* Enhanced Waterfall Chart */}
                <EnhancedWaterfallChart
                  data={data}
                  loading={loading}
                  height={450}
                />
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
                          className={item.isTotal ? "font-bold bg-gray-50" : "hover:bg-gray-50"}
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
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
