
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Calendar, ArrowDownUp, TrendingUp, Layers } from "lucide-react";
import { TimeSeriesChart } from "@/components/dashboard/TimeSeriesChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mediaGroupColors } from "@/components/dashboard/MediaGroupBreakdownChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScenarioSelector } from "@/components/budget/ScenarioSelector";

interface TimeSeriesSectionProps {
  data: any[];
  loading: boolean;
}

export function TimeSeriesSection({ data, loading }: TimeSeriesSectionProps) {
  const [chartView, setChartView] = useState("stacked");
  const [timeGranularity, setTimeGranularity] = useState("all");
  const [showRollingAverage, setShowRollingAverage] = useState(false);
  const [showBrush, setShowBrush] = useState(false);
  const [scenario, setScenario] = useState("bau");
  const [showComparison, setShowComparison] = useState(false);

  // Filter data based on time granularity selection
  const filteredData = React.useMemo(() => {
    if (timeGranularity === "all") return data;
    
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
        return data;
    }
    
    return data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
  }, [data, timeGranularity]);

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
          <CardTitle>Performance Over Time</CardTitle>
          <CardDescription>
            Historical trends by media type
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
          defaultValue="stacked"
          value={chartView}
          onValueChange={setChartView}
          className="mb-4"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
            <TabsList className="grid w-full sm:w-[240px] grid-cols-2">
              <TabsTrigger value="stacked" className="flex items-center gap-1">
                <Layers className="h-4 w-4" /> Stacked
              </TabsTrigger>
              <TabsTrigger value="grouped" className="flex items-center gap-1">
                <ArrowDownUp className="h-4 w-4" /> Layered
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
        
          <TabsContent value="stacked">
            <TimeSeriesChart
              data={filteredData}
              series={[
                { dataKey: "baseline", color: mediaGroupColors.baseline, label: "Baseline", type: "area" },
                { dataKey: "nonPaid", color: mediaGroupColors.nonPaid, label: "Non-Paid Media", type: "area" },
                { dataKey: "organic", color: mediaGroupColors.organic, label: "Organic Media", type: "area" },
                { dataKey: "paid", color: mediaGroupColors.paid, label: "Paid Media", type: "area" },
                { dataKey: "total", color: "#6366f1", label: "Total Revenue", type: "line" }
              ]}
              loading={loading}
              height={400}
              stacked={true}
              showBrush={showBrush}
              showRollingAverage={showRollingAverage}
              comparisonPeriod={comparisonPeriod}
            />
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> 
                The stacked view shows how each media type contributes to total revenue over time.
                {showComparison && " The highlighted area represents a comparison period for analysis."}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="grouped">
            <TimeSeriesChart
              data={filteredData}
              series={[
                { dataKey: "baseline", color: mediaGroupColors.baseline, label: "Baseline", type: "area" },
                { dataKey: "nonPaid", color: mediaGroupColors.nonPaid, label: "Non-Paid Media", type: "area" },
                { dataKey: "organic", color: mediaGroupColors.organic, label: "Organic Media", type: "area" },
                { dataKey: "paid", color: mediaGroupColors.paid, label: "Paid Media", type: "area" },
                { dataKey: "total", color: "#6366f1", label: "Total Revenue", type: "line" }
              ]}
              loading={loading}
              height={400}
              stacked={false}
              showBrush={showBrush}
              showRollingAverage={showRollingAverage}
              comparisonPeriod={comparisonPeriod}
            />
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> 
                The layered view allows comparison of media performance trends over time.
                Click on legend items to show/hide specific series.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Scenario Comparison Section */}
        <div className="mt-8 border-t pt-4">
          <h3 className="text-lg font-medium mb-4">Budget Scenario Analysis</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1">
              <ScenarioSelector
                activeScenario={scenario}
                onScenarioChange={setScenario}
              />
            </div>
            <div className="lg:col-span-2">
              <div className="text-sm text-muted-foreground">
                <p className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-primary" /> 
                  {scenario === "bau" && "The Business As Usual scenario shows expected performance with current budgets."}
                  {scenario === "cost-savings" && "The Cost Savings scenario shows how reducing media spend affects performance."}
                  {scenario === "revenue-uplift" && "The Revenue Uplift scenario shows potential gains from increased media investment."}
                </p>
                <p>
                  Click on different scenarios to compare their impact on performance metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
