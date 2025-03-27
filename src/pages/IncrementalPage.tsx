
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChannelBreakdownChart } from "@/components/dashboard/ChannelBreakdownChart";
import { MediaGroupBreakdownChart, mediaGroupColors } from "@/components/dashboard/MediaGroupBreakdownChart";
import { MediaSaturationChart } from "@/components/dashboard/MediaSaturationChart";
import { TimeSeriesChart } from "@/components/dashboard/TimeSeriesChart";
import { WaterfallChart } from "@/components/dashboard/WaterfallChart";
import { MediaTypeSelector } from "@/components/dashboard/MediaTypeSelector";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { 
  TrendingUp, 
  Download, 
  Info, 
  Layers, 
  ArrowUp, 
  BarChart4, 
  LineChart, 
  PieChart, 
  DollarSign 
} from "lucide-react";
import {
  generateIncrementalData,
  channelColors,
} from "@/data/mockData";
import {
  generateMediaGroupData,
  generateSaturationData,
  generateTimeSeriesData,
  generateWaterfallData,
  getChannelDataByMediaType,
  generateMarginalReturnsData
} from "@/data/mediaGroupData";

const IncrementalPage = () => {
  const [loading, setLoading] = useState(true);
  const [incrementalData, setIncrementalData] = useState<any[]>([]);
  const [mediaGroupData, setMediaGroupData] = useState<any[]>([]);
  const [saturationData, setSaturationData] = useState<any[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);
  const [waterfallData, setWaterfallData] = useState<any[]>([]);
  const [marginalReturnsData, setMarginalReturnsData] = useState<any[]>([]);
  const [channelData, setChannelData] = useState<any[]>([]);
  const [chartView, setChartView] = useState("stacked");
  const [mediaType, setMediaType] = useState("all");
  const [insightView, setInsightView] = useState("breakdown");

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Load all the data
      const incData = generateIncrementalData();
      const mediaData = generateMediaGroupData();
      const satData = generateSaturationData();
      const tsData = generateTimeSeriesData();
      const wfData = generateWaterfallData();
      const mrData = generateMarginalReturnsData();
      const chData = getChannelDataByMediaType(mediaType);

      setIncrementalData(incData);
      setMediaGroupData(mediaData);
      setSaturationData(satData);
      setTimeSeriesData(tsData);
      setWaterfallData(wfData);
      setMarginalReturnsData(mrData);
      setChannelData(chData);
      setLoading(false);
    };

    loadData();
  }, []);

  // Update channel data when media type changes
  useEffect(() => {
    if (!loading) {
      setChannelData(getChannelDataByMediaType(mediaType));
    }
  }, [mediaType, loading]);

  // Calculate total metrics
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

  // Calculate media group metrics
  const latestPeriodData = !loading && mediaGroupData.length > 0 
    ? mediaGroupData[mediaGroupData.length - 1] 
    : { paid: 0, organic: 0, nonPaid: 0, baseline: 0 };

  const paidPct = latestPeriodData.total > 0 
    ? ((latestPeriodData.paid / latestPeriodData.total) * 100).toFixed(1) 
    : "0";

  const organicPct = latestPeriodData.total > 0 
    ? ((latestPeriodData.organic / latestPeriodData.total) * 100).toFixed(1) 
    : "0";

  const nonPaidPct = latestPeriodData.total > 0 
    ? ((latestPeriodData.nonPaid / latestPeriodData.total) * 100).toFixed(1) 
    : "0";

  const baselinePct = latestPeriodData.total > 0 
    ? ((latestPeriodData.baseline / latestPeriodData.total) * 100).toFixed(1) 
    : "0";

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Incremental Analysis"
        description="Analyze baseline and incremental contribution to performance across media types"
      >
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </PageHeader>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <MetricCard
          title="Total Revenue"
          value={loading ? "-" : `$${latestPeriodData.total.toLocaleString()}`}
          icon={<Layers className="h-4 w-4" />}
          loading={loading}
          className="md:col-span-1"
        />
        <MetricCard
          title="Paid Media"
          value={loading ? "-" : `$${latestPeriodData.paid.toLocaleString()}`}
          description={`${paidPct}% of total`}
          icon={<DollarSign className="h-4 w-4" />}
          loading={loading}
          className="md:col-span-1"
          color={mediaGroupColors.paid}
        />
        <MetricCard
          title="Organic Media"
          value={loading ? "-" : `$${latestPeriodData.organic.toLocaleString()}`}
          description={`${organicPct}% of total`}
          loading={loading}
          className="md:col-span-1"
          color={mediaGroupColors.organic}
        />
        <MetricCard
          title="Non-Paid Media"
          value={loading ? "-" : `$${latestPeriodData.nonPaid.toLocaleString()}`}
          description={`${nonPaidPct}% of total`}
          loading={loading}
          className="md:col-span-1"
          color={mediaGroupColors.nonPaid}
        />
        <MetricCard
          title="Baseline"
          value={loading ? "-" : `$${latestPeriodData.baseline.toLocaleString()}`}
          description={`${baselinePct}% of total`}
          loading={loading}
          className="md:col-span-1"
          color={mediaGroupColors.baseline}
        />
      </div>

      {/* Waterfall Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Revenue Breakdown</CardTitle>
          <CardDescription>
            Contribution to revenue by media type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WaterfallChart
            data={waterfallData}
            loading={loading}
            height={350}
          />
          <div className="mt-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" /> 
              The waterfall chart shows how each media type contributes to total revenue, starting with the baseline performance.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Time Series Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Performance Over Time</CardTitle>
          <CardDescription>
            Historical trends by media type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="stacked"
            value={chartView}
            onValueChange={setChartView}
            className="w-[180px] mb-4"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stacked">Stacked</TabsTrigger>
              <TabsTrigger value="grouped">Layered</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <TimeSeriesChart
            data={timeSeriesData}
            series={[
              { dataKey: "baseline", color: mediaGroupColors.baseline, label: "Baseline", type: "area" },
              { dataKey: "nonPaid", color: mediaGroupColors.nonPaid, label: "Non-Paid Media", type: "area" },
              { dataKey: "organic", color: mediaGroupColors.organic, label: "Organic Media", type: "area" },
              { dataKey: "paid", color: mediaGroupColors.paid, label: "Paid Media", type: "area" },
              { dataKey: "total", color: "#6366f1", label: "Total Revenue", type: "line" }
            ]}
            loading={loading}
            height={400}
            stacked={chartView === "stacked"}
          />
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" /> 
              {chartView === "stacked" 
                ? "The stacked view shows how each media type contributes to total revenue over time." 
                : "The layered view allows comparison of media performance trends over time."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Media Type Analysis */}
      <Card className="mb-8">
        <CardHeader>
          <MediaTypeSelector 
            activeType={mediaType} 
            onTypeChange={setMediaType} 
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
                <LineChart className="h-4 w-4" /> Saturation
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
          </Tabs>

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
              </p>
            </div>
          </TabsContent>

          {/* Saturation Chart */}
          <TabsContent value="saturation" className="mt-0">
            <MediaSaturationChart
              data={saturationData}
              curves={[
                { dataKey: "search", color: "#4361ee", label: "Search" },
                { dataKey: "social", color: "#3a0ca3", label: "Social" },
                { dataKey: "display", color: "#7209b7", label: "Display" }
              ]}
              loading={loading}
              height={400}
            />
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> 
                Saturation curves show how incremental revenue changes as media spend increases, highlighting diminishing returns.
              </p>
            </div>
          </TabsContent>

          {/* Marginal Returns Chart */}
          <TabsContent value="marginal" className="mt-0">
            <ChartContainer 
              className="w-full" 
              style={{ height: 400 }} 
              config={{
                returns: { label: "Returns", color: "#4361ee" },
                marginal: { label: "Marginal Returns", color: "#ef476f" }
              }}
            >
              <LineChart
                data={marginalReturnsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis
                  dataKey="spend"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  tickFormatter={(value) => `$${value/1000}k`}
                  label={{ value: "Media Spend", position: "insideBottom", offset: -5 }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 'auto']}
                  label={{ value: "Return on Ad Spend", angle: -90, position: "insideLeft" }}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="returns"
                  stroke="#4361ee"
                  name="ROAS"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="marginal"
                  stroke="#ef476f"
                  name="Marginal ROAS"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <ReferenceLine y={1} stroke="rgba(0,0,0,0.3)" strokeDasharray="3 3" />
              </LineChart>
            </ChartContainer>
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
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} Media Channel Breakdown
                  </h3>
                  <div className="space-y-6">
                    {!loading && channelData.map((channel, index) => {
                      const totalValue = channelData.reduce((sum, ch) => sum + ch.value, 0);
                      const percentage = ((channel.value / totalValue) * 100).toFixed(1);
                      
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
                              <span>${channel.value.toLocaleString()} ({percentage}%)</span>
                            </div>
                          </div>
                          
                          <div className="w-full bg-accent rounded-full h-2.5">
                            <div
                              className="h-2.5 rounded-full"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: channel.color,
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Key Insights</h3>
                  <div className="space-y-4 text-sm border rounded-lg p-4 bg-muted/20">
                    {mediaType === "paid" && (
                      <>
                        <p className="flex items-start gap-2">
                          <TrendingUp className="h-4 w-4 text-primary mt-1" /> 
                          <span>Search shows the highest ROI among paid channels, with every $1 generating $2.3 in incremental revenue.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-primary mt-1" /> 
                          <span>Display ads are reaching saturation at current spending levels, with diminishing returns above $15K monthly spend.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <ArrowUp className="h-4 w-4 text-primary mt-1" /> 
                          <span>Social media shows potential for growth, with consistent performance improvements over the last 3 months.</span>
                        </p>
                      </>
                    )}
                    
                    {mediaType === "organic" && (
                      <>
                        <p className="flex items-start gap-2">
                          <TrendingUp className="h-4 w-4 text-primary mt-1" /> 
                          <span>SEO delivers the highest organic contribution, driven by content investments from the previous quarter.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-primary mt-1" /> 
                          <span>Direct traffic shows strong brand recognition, with users seeking out your products specifically.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <ArrowUp className="h-4 w-4 text-primary mt-1" /> 
                          <span>Referral traffic presents an opportunity for growth through partnership expansion.</span>
                        </p>
                      </>
                    )}
                    
                    {mediaType === "nonPaid" && (
                      <>
                        <p className="flex items-start gap-2">
                          <TrendingUp className="h-4 w-4 text-primary mt-1" /> 
                          <span>Affiliate marketing provides a steady, performance-based contribution with minimal overhead.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-primary mt-1" /> 
                          <span>Email shows high engagement and conversion rates from your existing customer base.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <ArrowUp className="h-4 w-4 text-primary mt-1" /> 
                          <span>PR activities demonstrate lasting impact on awareness and consideration metrics.</span>
                        </p>
                      </>
                    )}
                    
                    {mediaType === "baseline" && (
                      <>
                        <p className="flex items-start gap-2">
                          <TrendingUp className="h-4 w-4 text-primary mt-1" /> 
                          <span>Brand strength accounts for nearly half of baseline performance, highlighting the value of long-term brand building.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-primary mt-1" /> 
                          <span>Seasonal factors create predictable patterns that should inform campaign timing and budgeting.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <ArrowUp className="h-4 w-4 text-primary mt-1" /> 
                          <span>Market conditions impact baseline performance, with macroeconomic factors explaining 23% of variation.</span>
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          )}
        </CardContent>
      </Card>

      {/* Channel insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
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
            <CardTitle>Understanding Media Types</CardTitle>
            <CardDescription>
              How to interpret this analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-1 flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#ef476f]"></div>
                  Baseline
                </h4>
                <p className="text-muted-foreground">
                  Revenue that would occur regardless of marketing activities, driven by brand 
                  strength, seasonality, and market conditions.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1 flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#4361ee]"></div>
                  Paid Media
                </h4>
                <p className="text-muted-foreground">
                  Channels where you directly invest marketing budget to drive performance, such 
                  as search, social, display, and video ads.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1 flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#06d6a0]"></div>
                  Organic Media
                </h4>
                <p className="text-muted-foreground">
                  Non-paid channels that generate traffic and conversions naturally, including 
                  SEO, direct visits, and referral traffic.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1 flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#ffd166]"></div>
                  Non-Paid Media
                </h4>
                <p className="text-muted-foreground">
                  Channels that influence performance without direct ad spend, such as affiliate 
                  marketing, email, partnerships, and PR activities.
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
