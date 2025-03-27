
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { TimeSeriesChart } from "@/components/dashboard/TimeSeriesChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mediaGroupColors } from "@/components/dashboard/MediaGroupBreakdownChart";

interface TimeSeriesSectionProps {
  data: any[];
  loading: boolean;
}

export function TimeSeriesSection({ data, loading }: TimeSeriesSectionProps) {
  const [chartView, setChartView] = React.useState("stacked");

  return (
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
        
          <TabsContent value="stacked">
            <TimeSeriesChart
              data={data}
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
            />
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> 
                The stacked view shows how each media type contributes to total revenue over time.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="grouped">
            <TimeSeriesChart
              data={data}
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
            />
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> 
                The layered view allows comparison of media performance trends over time.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
