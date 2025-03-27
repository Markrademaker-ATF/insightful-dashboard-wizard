
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChannelBreakdownChart } from "@/components/dashboard/ChannelBreakdownChart";
import { MetricCard } from "@/components/dashboard/MetricCard";
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
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  SlidersHorizontal,
  ArrowUpRight,
  Info,
} from "lucide-react";
import {
  generateChannelBreakdown,
  channelColors,
} from "@/data/mockData";
import { cn } from "@/lib/utils";

const ChannelsPage = () => {
  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState<any[]>([]);
  const [metric, setMetric] = useState("revenue");

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const channels = generateChannelBreakdown();
      setChannelData(channels);
      setLoading(false);
    };

    loadData();
  }, []);

  const totalRevenue = !loading
    ? channelData.reduce((sum, channel) => sum + channel.revenue, 0)
    : 0;

  const totalSpend = !loading
    ? channelData.reduce((sum, channel) => sum + channel.cost, 0)
    : 0;

  const avgRoas = !loading
    ? (totalRevenue / totalSpend).toFixed(2)
    : 0;

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Channel Analysis"
        description="Compare performance across all marketing channels"
      >
        <Button variant="outline" size="sm" className="gap-1">
          <SlidersHorizontal className="h-4 w-4" />
          Customize
        </Button>
      </PageHeader>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total Revenue"
          value={loading ? "-" : `$${totalRevenue.toLocaleString()}`}
          change={5.8}
          icon={<DollarSign className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard
          title="Total Spend"
          value={loading ? "-" : `$${totalSpend.toLocaleString()}`}
          change={3.2}
          icon={<BarChart3 className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard
          title="Average ROAS"
          value={loading ? "-" : `${avgRoas}x`}
          change={1.3}
          icon={<TrendingUp className="h-4 w-4" />}
          loading={loading}
        />
      </div>

      {/* Channel comparison chart */}
      <div className="dashboard-card mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h3 className="text-lg font-medium">Channel Comparison</h3>
            <p className="text-sm text-muted-foreground">
              Performance metrics across all channels
            </p>
          </div>

          <Tabs
            defaultValue="revenue"
            value={metric}
            onValueChange={setMetric}
            className="w-[300px]"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="cost">Cost</TabsTrigger>
              <TabsTrigger value="roas">ROAS</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ChannelBreakdownChart
          data={channelData}
          bars={[
            {
              dataKey: metric,
              color:
                metric === "revenue"
                  ? "#4361ee"
                  : metric === "cost"
                  ? "#f72585"
                  : "#4cc9f0",
              label:
                metric === "revenue"
                  ? "Revenue"
                  : metric === "cost"
                  ? "Cost"
                  : "ROAS",
            },
          ]}
          xAxisKey="name"
          loading={loading}
          height={350}
        />
      </div>

      {/* Channel data table */}
      <div className="dashboard-card">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-medium">Channel Details</h3>
            <p className="text-sm text-muted-foreground">
              All metrics by channel
            </p>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>ROAS</TableHead>
                <TableHead>Conv. Rate</TableHead>
                <TableHead>CPA</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <TableCell key={j}>
                          <div className="h-4 bg-muted rounded animate-pulse"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : channelData.map((channel, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        {channel.name}
                      </TableCell>
                      <TableCell>${channel.revenue.toLocaleString()}</TableCell>
                      <TableCell>${channel.cost.toLocaleString()}</TableCell>
                      <TableCell
                        className={cn(
                          channel.roas >= 3
                            ? "text-green-600"
                            : channel.roas >= 1
                            ? "text-blue-600"
                            : "text-red-600"
                        )}
                      >
                        {channel.roas}x
                      </TableCell>
                      <TableCell>{channel.conversion}%</TableCell>
                      <TableCell>${channel.cpa}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`/channel-details?id=${channel.id}`}>
                            <Info className="h-4 w-4" />
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ChannelsPage;
