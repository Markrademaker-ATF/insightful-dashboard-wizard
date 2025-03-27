
import { useState, useEffect } from "react";
import { generatePerformanceData, channelNames } from "@/data/mockData";

export function useDataProcessor(timeframe: string) {
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState<any[]>([]);

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

  // Aggregate the data based on selected metrics
  const aggregateData = (data: any[]) => {
    if (!data.length) return [];
    
    return data.map(day => {
      const metrics: Record<string, any> = {
        date: day.name,
        revenue: day.totalRevenue,
        cost: Object.keys(channelNames).reduce((sum, channel) => sum + (day[channel] || 0) * 0.4, 0),
        clicks: Math.round(day.totalRevenue / 2.5),
        impressions: Math.round(day.totalRevenue * 10),
        conversions: Math.round(day.totalRevenue / 50),
        ctr: (Math.round(day.totalRevenue / 2.5) / Math.round(day.totalRevenue * 10) * 100).toFixed(2) + '%',
      };
      
      return metrics;
    });
  };

  const aggregatedData = aggregateData(performanceData);

  // Calculate summary metrics
  const getSummaryMetrics = () => {
    if (!aggregatedData.length) return null;
    
    const summary = {
      totalRevenue: aggregatedData.reduce((sum, day) => sum + day.revenue, 0),
      totalCost: aggregatedData.reduce((sum, day) => sum + day.cost, 0),
      totalClicks: aggregatedData.reduce((sum, day) => sum + day.clicks, 0),
      totalImpressions: aggregatedData.reduce((sum, day) => sum + day.impressions, 0),
      totalConversions: aggregatedData.reduce((sum, day) => sum + day.conversions, 0),
      avgCTR: aggregatedData.reduce((sum, day) => sum + parseFloat(day.ctr), 0) / aggregatedData.length,
    };

    return {
      ...summary,
      roas: summary.totalRevenue / summary.totalCost,
      cpa: summary.totalCost / summary.totalConversions,
      cpc: summary.totalCost / summary.totalClicks
    };
  };

  const summaryMetrics = getSummaryMetrics();

  // Get date range information
  const getDateInfo = () => {
    if (!aggregatedData || aggregatedData.length === 0) return null;
    
    return {
      startDate: aggregatedData[0].date,
      endDate: aggregatedData[aggregatedData.length - 1].date,
      totalDataPoints: aggregatedData.length,
      dataGranularity: "daily"
    };
  };

  const dateInfo = getDateInfo();

  return {
    loading,
    performanceData,
    aggregatedData,
    summaryMetrics,
    dateInfo,
  };
}
