
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Download, Filter, ArrowUpRight } from "lucide-react";
import {
  generateIncrementalData,
  channelColors,
  generateSankeyData
} from "@/data/mockData";
import {
  generateMediaGroupData,
  generateSaturationData,
  generateTimeSeriesData,
  generateMarginalReturnsData,
  getChannelDataByMediaType,
} from "@/data/mediaGroupData";

// Import the components
import { KeyMetricsSection } from "@/components/dashboard/KeyMetricsSection";
import { PerformanceBreakdownSection } from "@/components/dashboard/PerformanceBreakdownSection";
import { MediaTypeAnalysisSection } from "@/components/dashboard/MediaTypeAnalysisSection";
import { KeyContributorsSection } from "@/components/dashboard/KeyContributorsSection";
import { MediaTypesExplanationCard } from "@/components/dashboard/MediaTypesExplanationCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChannelMetricsOverview } from "@/components/channels/ChannelMetricsOverview";
import { ChannelMetricsCards } from "@/components/channels/ChannelMetricsCards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const IncrementalPage = () => {
  const [loading, setLoading] = useState(true);
  const [incrementalData, setIncrementalData] = useState<any[]>([]);
  const [mediaGroupData, setMediaGroupData] = useState<any[]>([]);
  const [saturationData, setSaturationData] = useState<any[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);
  const [marginalReturnsData, setMarginalReturnsData] = useState<any[]>([]);
  const [channelData, setChannelData] = useState<any[]>([]);
  const [mediaType, setMediaType] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

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
      const mrData = generateMarginalReturnsData();
      const chData = getChannelDataByMediaType(mediaType);

      setIncrementalData(incData);
      setMediaGroupData(mediaData);
      setSaturationData(satData);
      setTimeSeriesData(tsData);
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

  // Calculate latest period data for key metrics
  const latestPeriodData = !loading && mediaGroupData.length > 0 
    ? mediaGroupData[mediaGroupData.length - 1] 
    : { paid: 0, organic: 0, nonPaid: 0, baseline: 0, total: 0 };

  return (
    <div className="animate-fade-in space-y-8">
      <PageHeader
        title="Incremental Analysis"
        description="Analyze baseline and incremental contribution to performance across media types"
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </PageHeader>

      {/* Hero section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-purple-50/30 rounded-2xl p-8 border border-indigo-100/50 shadow-md">
        <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Incremental Analysis Overview</h2>
            <p className="text-muted-foreground text-balance">
              Understand the true impact of your marketing activities beyond the baseline contribution, helping you identify which channels are driving genuine incremental value.
            </p>
          </div>
          <Link 
            to="/methodologies" 
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors shadow-md"
          >
            <span>Learn Methodology</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Channel metrics cards for summary */}
        <ChannelMetricsCards data={channelData} loading={loading} />
      </div>

      {/* Tabs for different analysis views */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <CardTitle>Analysis Views</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="comparison">Channel Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Key metrics section */}
              <KeyMetricsSection loading={loading} latestPeriodData={latestPeriodData} />
              
              {/* Channel metrics overview */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Channel Performance Overview</h3>
                <ChannelMetricsOverview data={channelData} loading={loading} />
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-8">
              {/* Performance Breakdown Section */}
              <PerformanceBreakdownSection data={timeSeriesData} loading={loading} />
            </TabsContent>

            <TabsContent value="comparison" className="space-y-8">
              {/* Media Type Analysis */}
              <MediaTypeAnalysisSection
                mediaGroupData={mediaGroupData}
                saturationData={saturationData}
                marginalReturnsData={marginalReturnsData}
                channelData={channelData}
                mediaType={mediaType}
                setMediaType={setMediaType}
                loading={loading}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Channel insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <KeyContributorsSection incrementalData={incrementalData} loading={loading} />
        <MediaTypesExplanationCard />
      </div>
    </div>
  );
};

export default IncrementalPage;
