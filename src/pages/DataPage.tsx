
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Download, Filter, SlidersHorizontal } from "lucide-react";
import {
  generatePerformanceData,
  channelColors,
  channelNames,
} from "@/data/mockData";

const DataPage = () => {
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState("30d");
  const [view, setView] = useState("chart");

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90;
      const performance = generatePerformanceData(days);

      setPerformanceData(performance);
      setLoading(false);
    };

    loadData();
  }, [timeframe]);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Data Overview"
        description="Explore and analyze your raw marketing data across all channels"
      >
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" variant="outline" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </PageHeader>

      <div className="dashboard-card">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Tabs
            defaultValue="chart"
            value={view}
            onValueChange={setView}
            className="w-[200px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs
            defaultValue="30d"
            value={timeframe}
            onValueChange={setTimeframe}
            className="w-[240px]"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
              <TabsTrigger value="90d">90D</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {loading ? (
          <div className="py-12 flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : view === "chart" ? (
          <>
            <PerformanceChart
              data={performanceData}
              lines={[
                { dataKey: "search", color: channelColors.search, label: "Search" },
                { dataKey: "social", color: channelColors.social, label: "Social" },
                { dataKey: "email", color: channelColors.email, label: "Email" },
                { dataKey: "display", color: channelColors.display, label: "Display" },
                { dataKey: "video", color: channelColors.video, label: "Video" },
                { dataKey: "affiliate", color: channelColors.affiliate, label: "Affiliate" },
                { dataKey: "direct", color: channelColors.direct, label: "Direct" },
                { dataKey: "referral", color: channelColors.referral, label: "Referral" },
              ]}
              height={450}
            />
          </>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    {Object.keys(channelNames).map((channel) => (
                      <TableHead key={channel}>
                        {channelNames[channel as keyof typeof channelNames]}
                      </TableHead>
                    ))}
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceData.map((entry, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{entry.name}</TableCell>
                      {Object.keys(channelNames).map((channel) => (
                        <TableCell key={channel}>
                          ${entry[channel]?.toLocaleString() || "0"}
                        </TableCell>
                      ))}
                      <TableCell className="font-semibold">
                        ${entry.totalRevenue.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DataPage;
