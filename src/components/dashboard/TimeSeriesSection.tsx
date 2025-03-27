
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Calendar, ArrowDownUp, TrendingUp, Layers } from "lucide-react";
import { TimeSeriesChart } from "@/components/dashboard/TimeSeriesChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface TimeSeriesSectionProps {
  data: any[];
  loading: boolean;
}

export function TimeSeriesSection({ data, loading }: TimeSeriesSectionProps) {
  const [chartView, setChartView] = useState("layered");
  const [timeGranularity, setTimeGranularity] = useState("all");
  const [showRollingAverage, setShowRollingAverage] = useState(false);
  const [showBrush, setShowBrush] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Calculate ROAS for each data point
  const enhancedData = React.useMemo(() => {
    return data.map(item => ({
      ...item,
      roas: item.cost > 0 ? +(item.revenue / item.cost).toFixed(2) : 0
    }));
  }, [data]);

  // Filter data based on time granularity selection
  const filteredData = React.useMemo(() => {
    if (timeGranularity === "all") return enhancedData;
    
    const now = new Date();
    let cutoffDate = new Date();
    
    switch (timeGranularity) {
      case "last30":
        cutoffDate.setDate(now.getDate() - 30);
        break;
      case "last90":
        cutoffDate.setDate(now.getDate() - 90);
        break;
      case "lastYear":
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return enhancedData;
    }
    
    return enhancedData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
  }, [enhancedData, timeGranularity]);

  // Define comparison period (middle third of the data for demo purposes)
  const comparisonPeriod = React.useMemo(() => {
    if (!showComparison || data.length === 0) return null;
    
    const startIndex = Math.floor(data.length / 3);
    const endIndex = Math.floor(data.length * 2 / 3);
    
    return { 
      start: startIndex, 
      end: endIndex 
    };
  }, [data, showComparison]);

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>Revenue, Cost & ROAS Over Time</CardTitle>
          <CardDescription>
            Track performance trends over time
          </CardDescription>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            value={timeGranularity}
            onValueChange={setTimeGranularity}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="last30">Last 30 Days</SelectItem>
              <SelectItem value="last90">Last Quarter</SelectItem>
              <SelectItem value="lastYear">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="layered"
          value={chartView}
          onValueChange={setChartView}
          className="mb-4"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
            <TabsList className="grid w-full sm:w-[240px] grid-cols-2">
              <TabsTrigger value="layered" className="flex items-center gap-1">
                <ArrowDownUp className="h-4 w-4" /> Layered
              </TabsTrigger>
              <TabsTrigger value="stacked" className="flex items-center gap-1">
                <Layers className="h-4 w-4" /> Stacked
              </TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="rolling-average" 
                  checked={showRollingAverage}
                  onCheckedChange={setShowRollingAverage}
                />
                <Label htmlFor="rolling-average" className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" /> Rolling Average
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="zoom-brush" 
                  checked={showBrush}
                  onCheckedChange={setShowBrush}
                />
                <Label htmlFor="zoom-brush" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Time Zoom
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="comparison-period" 
                  checked={showComparison}
                  onCheckedChange={setShowComparison}
                />
                <Label htmlFor="comparison-period">Compare Period</Label>
              </div>
            </div>
          </div>
        
          <TabsContent value="layered">
            <TimeSeriesChart
              data={filteredData}
              series={[
                { dataKey: "cost", color: "#ea384c", label: "Marketing Cost", type: "area" },
                { dataKey: "revenue", color: "#0EA5E9", label: "Total Revenue", type: "area" },
                { dataKey: "roas", color: "#9b87f5", label: "ROAS", type: "scatter" }
              ]}
              loading={loading}
              height={400}
              stacked={false}
              showBrush={showBrush}
              showRollingAverage={showRollingAverage}
              comparisonPeriod={comparisonPeriod}
              roasScatterVisible={true}
            />
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> 
                This chart shows revenue and marketing costs over time, with ROAS (Return on Ad Spend) plotted as scatter points.
                {showComparison && " The highlighted area represents a comparison period for analysis."}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="stacked">
            <TimeSeriesChart
              data={filteredData}
              series={[
                { dataKey: "cost", color: "#ea384c", label: "Marketing Cost", type: "area" },
                { dataKey: "revenue", color: "#0EA5E9", label: "Total Revenue", type: "area" },
                { dataKey: "roas", color: "#9b87f5", label: "ROAS", type: "scatter" }
              ]}
              loading={loading}
              height={400}
              stacked={true}
              showBrush={showBrush}
              showRollingAverage={showRollingAverage}
              comparisonPeriod={comparisonPeriod}
              roasScatterVisible={true}
            />
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> 
                The stacked view compares the total marketing investment against generated revenue, with ROAS as scatter points.
                Click on legend items to show/hide specific series.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
