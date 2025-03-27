
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
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

// Import the components
import { KeyMetricsSection } from "@/components/dashboard/KeyMetricsSection";
import { PerformanceBreakdownSection } from "@/components/dashboard/PerformanceBreakdownSection";
import { MediaTypeAnalysisSection } from "@/components/dashboard/MediaTypeAnalysisSection";
import { KeyContributorsSection } from "@/components/dashboard/KeyContributorsSection";
import { MediaTypesExplanationCard } from "@/components/dashboard/MediaTypesExplanationCard";

const IncrementalPage = () => {
  const [loading, setLoading] = useState(true);
  const [incrementalData, setIncrementalData] = useState<any[]>([]);
  const [mediaGroupData, setMediaGroupData] = useState<any[]>([]);
  const [saturationData, setSaturationData] = useState<any[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);
  const [waterfallData, setWaterfallData] = useState<any[]>([]);
  const [marginalReturnsData, setMarginalReturnsData] = useState<any[]>([]);
  const [channelData, setChannelData] = useState<any[]>([]);
  const [mediaType, setMediaType] = useState("all");

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

  // Calculate latest period data for key metrics
  const latestPeriodData = !loading && mediaGroupData.length > 0 
    ? mediaGroupData[mediaGroupData.length - 1] 
    : { paid: 0, organic: 0, nonPaid: 0, baseline: 0, total: 0 };

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
      <KeyMetricsSection loading={loading} latestPeriodData={latestPeriodData} />

      {/* Performance Breakdown Section - replacing TimeSeriesSection */}
      <PerformanceBreakdownSection data={timeSeriesData} loading={loading} />

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

      {/* Channel insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <KeyContributorsSection incrementalData={incrementalData} loading={loading} />
        <MediaTypesExplanationCard />
      </div>
    </div>
  );
};

export default IncrementalPage;
