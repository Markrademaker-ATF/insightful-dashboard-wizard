
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChannelBreakdownChart } from "@/components/dashboard/ChannelBreakdownChart";
import { BudgetAllocationChart } from "@/components/dashboard/BudgetAllocationChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DollarSign, 
  PieChart, 
  Download, 
  ArrowRight, 
  Check, 
  ArrowUp, 
  ArrowDown, 
  Minus,
  Calculator
} from "lucide-react";
import {
  generateBudgetAllocation,
  generateBudgetRecommendations,
  channelColors,
} from "@/data/mockData";
import { cn } from "@/lib/utils";

const BudgetPage = () => {
  const [loading, setLoading] = useState(true);
  const [budgetData, setBudgetData] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState("current");

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const budget = generateBudgetAllocation();
      const recs = generateBudgetRecommendations();
      
      setBudgetData(budget);
      setRecommendations(recs);
      setLoading(false);
    };

    loadData();
  }, []);

  // Calculate totals
  const totalCurrentBudget = !loading
    ? recommendations.reduce((sum, channel) => sum + channel.currentBudget, 0)
    : 0;
    
  const totalRecommendedBudget = !loading
    ? recommendations.reduce((sum, channel) => sum + channel.recommendedBudget, 0)
    : 0;
    
  const totalImpact = !loading
    ? recommendations.reduce((sum, channel) => {
        // Impact is represented as percentage of change * budget
        const budgetChange = channel.recommendedBudget - channel.currentBudget;
        const impact = (budgetChange / channel.currentBudget) * channel.impact;
        return sum + Math.abs(impact);
      }, 0)
    : 0;

  // Prepare chart data for recommended budget view
  const recommendedBudgetChart = !loading
    ? recommendations.map(item => ({
        name: item.name,
        value: item.recommendedBudget,
        color: item.color
      }))
    : [];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Budget Optimizer"
        description="Data-driven budget allocation recommendations to maximize ROI"
      >
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="gap-1">
            <Check className="h-4 w-4" />
            Apply Recommendations
          </Button>
        </div>
      </PageHeader>

      {/* Budget allocation charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium">Current Budget Allocation</h3>
              <p className="text-sm text-muted-foreground">
                ${totalCurrentBudget.toLocaleString()} total budget
              </p>
            </div>
          </div>
          
          <BudgetAllocationChart data={budgetData} loading={loading} />
        </div>
        
        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium">Recommended Budget Allocation</h3>
              <p className="text-sm text-muted-foreground">
                ${totalRecommendedBudget.toLocaleString()} total budget
              </p>
            </div>
          </div>
          
          <BudgetAllocationChart data={recommendedBudgetChart} loading={loading} />
        </div>
      </div>
      
      {/* Budget recommendations table */}
      <div className="dashboard-card mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <div>
              <h3 className="text-lg font-medium">Budget Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Projected to increase overall ROI by {Math.round(totalImpact)}%
              </p>
            </div>
          </div>
          
          <Tabs
            defaultValue="current"
            value={viewMode}
            onValueChange={setViewMode}
            className="w-[240px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Current</TabsTrigger>
              <TabsTrigger value="optimized">Optimized</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel</TableHead>
                <TableHead>Current Budget</TableHead>
                <TableHead>Recommended Budget</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <TableCell key={j}>
                          <div className="h-4 bg-muted rounded animate-pulse"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : recommendations
                    .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
                    .map((channel, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: channel.color }}
                          ></div>
                          {channel.name}
                        </TableCell>
                        <TableCell>${channel.currentBudget.toLocaleString()}</TableCell>
                        <TableCell>${channel.recommendedBudget.toLocaleString()}</TableCell>
                        <TableCell>
                          <div
                            className={cn(
                              "flex items-center",
                              channel.change > 0
                                ? "text-green-600"
                                : channel.change < 0
                                ? "text-red-600"
                                : "text-muted-foreground"
                            )}
                          >
                            {channel.change > 0 ? (
                              <ArrowUp className="h-4 w-4 mr-1" />
                            ) : channel.change < 0 ? (
                              <ArrowDown className="h-4 w-4 mr-1" />
                            ) : (
                              <Minus className="h-4 w-4 mr-1" />
                            )}
                            {Math.abs(channel.change)}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-green-600">
                            <ArrowUp className="h-4 w-4 mr-1" />
                            {channel.impact}%
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Impact analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Impact Analysis</CardTitle>
            <CardDescription>
              Projected performance improvements by channel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChannelBreakdownChart
              data={recommendations}
              bars={[
                { dataKey: "impact", color: "#4361ee", label: "ROI Impact %" },
              ]}
              xAxisKey="name"
              loading={loading}
              height={300}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Optimization Insights</CardTitle>
            <CardDescription>
              Data-driven budget recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-1">Key Findings</h4>
                <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                  <li>
                    {recommendations.some(r => r.change > 10)
                      ? "Significant opportunity to improve performance by reallocating budget"
                      : "Current budget allocation is relatively efficient, with room for minor optimizations"}
                  </li>
                  <li>
                    {recommendations.find(r => r.change > 0)?.name || "Search"} channel shows 
                    strong ROI and would benefit from increased investment
                  </li>
                  <li>
                    {recommendations.find(r => r.change < 0)?.name || "Display"} channel is 
                    underperforming relative to budget allocation
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Recommendation Logic</h4>
                <p className="text-muted-foreground">
                  Budget recommendations are based on historical ROAS, incremental 
                  performance analysis, and customer journey impact for each channel. 
                  The model optimizes for overall portfolio ROI while maintaining 
                  customer acquisition targets.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetPage;
