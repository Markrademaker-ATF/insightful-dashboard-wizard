
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChannelBreakdownChart } from "@/components/dashboard/ChannelBreakdownChart";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Download, Info, Layers, ArrowUp } from "lucide-react";
import {
  generateIncrementalData,
  channelColors,
} from "@/data/mockData";

const IncrementalPage = () => {
  const [loading, setLoading] = useState(true);
  const [incrementalData, setIncrementalData] = useState<any[]>([]);
  const [chartView, setChartView] = useState("stacked");

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const data = generateIncrementalData();
      setIncrementalData(data);
      setLoading(false);
    };

    loadData();
  }, []);

  const totalIncremental = !loading
    ? incrementalData.reduce((sum, channel) => sum + channel.incremental, 0)
    : 0;

  const totalBaseline = !loading
    ? incrementalData.reduce((sum, channel) => sum + channel.baseline, 0)
    : 0;

  const totalRevenue = totalIncremental + totalBaseline;
  
  const incrementalPct = totalRevenue > 0 
    ? ((totalIncremental / totalRevenue) * 100).toFixed(1) 
    : "0";

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Incremental Analysis"
        description="Analyze baseline and incremental contribution to performance"
      >
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </PageHeader>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total Revenue"
          value={loading ? "-" : `$${totalRevenue.toLocaleString()}`}
          icon={<Layers className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard
          title="Baseline Revenue"
          value={loading ? "-" : `$${totalBaseline.toLocaleString()}`}
          description={`${(100 - parseFloat(incrementalPct)).toFixed(1)}% of total`}
          loading={loading}
        />
        <MetricCard
          title="Incremental Revenue"
          value={loading ? "-" : `$${totalIncremental.toLocaleString()}`}
          description={`${incrementalPct}% of total`}
          change={parseFloat(incrementalPct)}
          icon={<TrendingUp className="h-4 w-4" />}
          loading={loading}
        />
      </div>

      {/* Incremental vs Baseline Chart */}
      <div className="dashboard-card mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-medium">Baseline vs. Incremental Performance</h3>
            <p className="text-sm text-muted-foreground">
              Revenue breakdown by channel
            </p>
          </div>

          <Tabs
            defaultValue="stacked"
            value={chartView}
            onValueChange={setChartView}
            className="w-[180px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stacked">Stacked</TabsTrigger>
              <TabsTrigger value="grouped">Grouped</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ChannelBreakdownChart
          data={incrementalData}
          bars={[
            { dataKey: "baseline", color: "#4cc9f0", label: "Baseline" },
            { dataKey: "incremental", color: "#4361ee", label: "Incremental" },
          ]}
          xAxisKey="name"
          loading={loading}
          height={400}
          stacked={chartView === "stacked"}
        />
      </div>

      {/* Channel insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Key Contributors</CardTitle>
            <CardDescription>
              Channels with the highest incremental impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {!loading && incrementalData
                .sort((a, b) => b.incremental - a.incremental)
                .slice(0, 3)
                .map((channel, index) => {
                  const incrementalPct = ((channel.incremental / channel.total) * 100).toFixed(1);
                  
                  return (
                    <div key={index} className="flex flex-col">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: channel.color }}
                          ></div>
                          <span className="font-medium">{channel.name}</span>
                        </div>
                        <div className="flex items-center text-sm font-medium">
                          <ArrowUp className="h-3 w-3 mr-1 text-green-600" />
                          <span>{incrementalPct}% Incremental</span>
                        </div>
                      </div>
                      
                      <div className="w-full bg-accent rounded-full h-2.5">
                        <div
                          className="h-2.5 rounded-full"
                          style={{
                            width: `${incrementalPct}%`,
                            backgroundColor: channel.color,
                          }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Baseline: ${channel.baseline.toLocaleString()}</span>
                        <span>Incremental: ${channel.incremental.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Incremental Impact</CardTitle>
            <CardDescription>
              How to interpret this analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-1 flex items-center gap-1">
                  <Info className="h-4 w-4 text-primary" /> Baseline Performance
                </h4>
                <p className="text-muted-foreground">
                  Revenue that would likely occur without marketing efforts. This represents 
                  your brand's organic performance.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-primary" /> Incremental Impact
                </h4>
                <p className="text-muted-foreground">
                  Additional revenue directly attributable to your marketing activities. 
                  This is the true measure of your marketing effectiveness.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1 flex items-center gap-1">
                  <Layers className="h-4 w-4 text-primary" /> Optimization Focus
                </h4>
                <p className="text-muted-foreground">
                  Channels with higher incremental percentages deliver better ROI. 
                  Consider reallocating budget to high-incremental channels for improved 
                  overall performance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IncrementalPage;
