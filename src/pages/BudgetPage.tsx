import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChannelBreakdownChart } from "@/components/dashboard/ChannelBreakdownChart";
import { BudgetAllocationChart } from "@/components/dashboard/BudgetAllocationChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
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
  Check, 
  Minus,
  LineChart,
  TrendingUp,
  TrendingDown,
  BarChart3
} from "lucide-react";
import {
  generateBudgetAllocation,
  generateBudgetRecommendations,
  channelColors,
} from "@/data/mockData";
import { cn } from "@/lib/utils";
import { ScenarioSelector } from "@/components/budget/ScenarioSelector";
import { ScenarioDetails } from "@/components/budget/ScenarioDetails";
import { ChannelSaturationCurvePanel } from "@/components/budget/ChannelSaturationCurvePanel";
import { toast } from "sonner";

const BudgetPage = () => {
  const [loading, setLoading] = useState(true);
  const [budgetData, setBudgetData] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState("current");
  const [activeScenario, setActiveScenario] = useState("bau");
  const [customBudgets, setCustomBudgets] = useState<Record<string, Record<string, number>>>({
    bau: {},
    "cost-savings": {},
    "revenue-uplift": {}
  });
  const [scenarioMetrics, setScenarioMetrics] = useState({
    bau: { totalBudget: 0, projectedROI: 0, projectedRevenue: 0 },
    "cost-savings": { totalBudget: 0, projectedROI: 0, projectedRevenue: 0 },
    "revenue-uplift": { totalBudget: 0, projectedROI: 0, projectedRevenue: 0 }
  });

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

      // Initialize custom budgets with current values
      const bauBudgets: Record<string, number> = {};
      const csBudgets: Record<string, number> = {};
      const ruBudgets: Record<string, number> = {};

      recs.forEach(channel => {
        bauBudgets[channel.name] = channel.currentBudget;
        
        // Cost savings scenario - reduce budgets for low-impact channels
        const impactRatio = channel.impact / channel.currentBudget;
        const savingFactor = impactRatio < 0.1 ? 0.7 : impactRatio < 0.15 ? 0.85 : 0.95;
        csBudgets[channel.name] = Math.round(channel.currentBudget * savingFactor);
        
        // Revenue uplift scenario - use recommended budgets
        ruBudgets[channel.name] = channel.recommendedBudget;
      });

      setCustomBudgets({
        bau: bauBudgets,
        "cost-savings": csBudgets,
        "revenue-uplift": ruBudgets
      });

      // Calculate scenario metrics
      calculateScenarioMetrics(bauBudgets, csBudgets, ruBudgets, recs);
      
      setLoading(false);
    };

    loadData();
  }, []);

  // Calculate metrics for each scenario
  const calculateScenarioMetrics = (
    bauBudgets: Record<string, number>,
    csBudgets: Record<string, number>,
    ruBudgets: Record<string, number>,
    channels: any[]
  ) => {
    // BAU metrics
    const bauTotalBudget = Object.values(bauBudgets).reduce((sum, budget) => sum + budget, 0);
    const bauRevenue = channels.reduce((sum, channel) => {
      const budget = bauBudgets[channel.name] || channel.currentBudget;
      return sum + (budget * channel.impact / 100);
    }, 0);
    const bauROI = bauRevenue / bauTotalBudget;

    // Cost Savings metrics
    const csTotalBudget = Object.values(csBudgets).reduce((sum, budget) => sum + budget, 0);
    const csRevenue = channels.reduce((sum, channel) => {
      const budget = csBudgets[channel.name] || channel.currentBudget * 0.8;
      // Diminishing returns formula
      const impactFactor = budget / channel.currentBudget < 0.8 ? 0.9 : 0.95;
      return sum + (budget * channel.impact / 100 * impactFactor);
    }, 0);
    const csROI = csRevenue / csTotalBudget;

    // Revenue Uplift metrics
    const ruTotalBudget = Object.values(ruBudgets).reduce((sum, budget) => sum + budget, 0);
    const ruRevenue = channels.reduce((sum, channel) => {
      const budget = ruBudgets[channel.name] || channel.recommendedBudget;
      // Increasing impact with optimization
      const impactFactor = budget > channel.currentBudget ? 1.2 : 1;
      return sum + (budget * channel.impact / 100 * impactFactor);
    }, 0);
    const ruROI = ruRevenue / ruTotalBudget;

    setScenarioMetrics({
      bau: { 
        totalBudget: bauTotalBudget, 
        projectedROI: bauROI, 
        projectedRevenue: bauRevenue 
      },
      "cost-savings": { 
        totalBudget: csTotalBudget, 
        projectedROI: csROI, 
        projectedRevenue: csRevenue 
      },
      "revenue-uplift": { 
        totalBudget: ruTotalBudget, 
        projectedROI: ruROI, 
        projectedRevenue: ruRevenue 
      }
    });
  };

  // Apply recommended changes
  const applyRecommendations = () => {
    toast.success("Budget recommendations applied");
  };

  // Calculate totals
  const totalCurrentBudget = !loading
    ? recommendations.reduce((sum, channel) => sum + channel.currentBudget, 0)
    : 0;
    
  const activeBudgets = customBudgets[activeScenario];
  const activeScenarioTotalBudget = !loading
    ? Object.values(activeBudgets).reduce((sum, budget) => sum + (budget as number), 0)
    : 0;
    
  // Prepare chart data for the active scenario
  const scenarioBudgetChart = !loading
    ? recommendations.map(item => ({
        name: item.name,
        value: activeBudgets[item.name] || item.currentBudget,
        color: item.color
      }))
    : [];

  // Comparison data between BAU and active scenario
  const comparisonData = activeScenario !== "bau" ? {
    budgetChange: scenarioMetrics[activeScenario].totalBudget - scenarioMetrics.bau.totalBudget,
    roiChange: scenarioMetrics[activeScenario].projectedROI - scenarioMetrics.bau.projectedROI,
    revenueChange: scenarioMetrics[activeScenario].projectedRevenue - scenarioMetrics.bau.projectedRevenue
  } : undefined;

  // Impact data for visualization
  const impactData = !loading ? recommendations.map(channel => {
    const currentBudget = channel.currentBudget;
    const scenarioBudget = activeBudgets[channel.name] || currentBudget;
    const budgetChange = scenarioBudget - currentBudget;
    
    // Calculate impact with diminishing returns for budget increases
    let impactChange = 0;
    if (budgetChange > 0) {
      // Diminishing returns on increases
      impactChange = (budgetChange / currentBudget) * channel.impact * 0.9;
    } else if (budgetChange < 0) {
      // Budget decreases have less than proportional impact reduction
      impactChange = (budgetChange / currentBudget) * channel.impact * 0.8;
    }
    
    return {
      name: channel.name,
      budgetChange: budgetChange,
      impactChange: impactChange,
      color: channel.color
    };
  }) : [];

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
          <Button size="sm" className="gap-1" onClick={applyRecommendations}>
            <Check className="h-4 w-4" />
            Apply Recommendations
          </Button>
        </div>
      </PageHeader>

      {/* Scenario Selector */}
      <div className="mb-8">
        <ScenarioSelector 
          activeScenario={activeScenario} 
          onScenarioChange={setActiveScenario} 
        />
      </div>

      {/* Scenario Details */}
      <div className="mb-8">
        <ScenarioDetails 
          scenario={activeScenario}
          totalBudget={scenarioMetrics[activeScenario].totalBudget}
          projectedROI={scenarioMetrics[activeScenario].projectedROI}
          projectedRevenue={scenarioMetrics[activeScenario].projectedRevenue}
          comparisonData={comparisonData}
        />
      </div>

      {/* Budget allocation charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              <div>
                <h3 className="text-lg font-medium">Current Budget Allocation</h3>
                <p className="text-sm text-muted-foreground">
                  ${totalCurrentBudget.toLocaleString()} total budget
                </p>
              </div>
            </div>
          </div>
          
          <BudgetAllocationChart data={budgetData} loading={loading} />
        </div>
        
        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              <div>
                <h3 className="text-lg font-medium">{activeScenario === "bau" ? "Current" : activeScenario === "cost-savings" ? "Cost Savings" : "Revenue Uplift"} Allocation</h3>
                <p className="text-sm text-muted-foreground">
                  ${activeScenarioTotalBudget.toLocaleString()} total budget
                </p>
              </div>
            </div>
          </div>
          
          <BudgetAllocationChart data={scenarioBudgetChart} loading={loading} />
        </div>
      </div>
      
      {/* Impact analysis section */}
      <div className="mb-8">
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle>Impact Analysis</CardTitle>
            </div>
            <CardDescription>
              Projected performance impact by channel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              {loading ? (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="h-32 w-32 bg-muted rounded animate-pulse"></div>
                </div>
              ) : (
                <ChartContainer
                  config={{
                    positive: { color: "#4ade80" },
                    negative: { color: "#f87171" }
                  }}
                  className="w-full h-full"
                >
                  <ChannelBreakdownChart
                    data={impactData.sort((a, b) => Math.abs(b.impactChange) - Math.abs(a.impactChange))}
                    bars={[
                      { 
                        dataKey: "impactChange", 
                        color: "var(--color-positive)", 
                        label: "Impact %" 
                      }
                    ]}
                    xAxisKey="name"
                    height={400}
                  />
                </ChartContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel Saturation Curves - MOVED LOWER IN THE PAGE */}
      <ChannelSaturationCurvePanel
        activeScenario={activeScenario}
        customBudgets={customBudgets}
      />
      
      {/* Scenario comparison table */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-primary" />
            <CardTitle>Scenario Comparison</CardTitle>
          </div>
          <CardDescription>
            Compare budget allocations and projected outcomes across scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Channel</TableHead>
                  <TableHead>BAU Budget</TableHead>
                  <TableHead>Cost Savings Budget</TableHead>
                  <TableHead>Revenue Uplift Budget</TableHead>
                  <TableHead>Recommended Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <TableCell key={j}>
                          <div className="h-4 bg-muted rounded animate-pulse"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  recommendations.map((channel, i) => {
                    const csBudget = customBudgets["cost-savings"][channel.name] || 0;
                    const ruBudget = customBudgets["revenue-uplift"][channel.name] || 0;
                    const csChange = csBudget - channel.currentBudget;
                    const ruChange = ruBudget - channel.currentBudget;
                    
                    let recommendedAction;
                    if (csChange < -1000 && ruChange < 1000) {
                      recommendedAction = "Reduce Budget";
                    } else if (ruChange > 1000) {
                      recommendedAction = "Increase Budget";
                    } else {
                      recommendedAction = "Maintain Budget";
                    }
                    
                    return (
                      <TableRow key={i}>
                        <TableCell className="font-medium flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: channel.color }}
                          ></div>
                          {channel.name}
                        </TableCell>
                        <TableCell>${channel.currentBudget.toLocaleString()}</TableCell>
                        <TableCell>
                          <div
                            className={cn(
                              "flex items-center",
                              csChange < 0 ? "text-red-600" : csChange > 0 ? "text-green-600" : "text-muted-foreground"
                            )}
                          >
                            ${csBudget.toLocaleString()}
                            {csChange !== 0 && (
                              <span className="ml-2 text-xs">
                                ({csChange > 0 ? "+" : ""}{((csChange / channel.currentBudget) * 100).toFixed(1)}%)
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={cn(
                              "flex items-center",
                              ruChange > 0 ? "text-green-600" : ruChange < 0 ? "text-red-600" : "text-muted-foreground"
                            )}
                          >
                            ${ruBudget.toLocaleString()}
                            {ruChange !== 0 && (
                              <span className="ml-2 text-xs">
                                ({ruChange > 0 ? "+" : ""}{((ruChange / channel.currentBudget) * 100).toFixed(1)}%)
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={cn(
                              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                              recommendedAction === "Reduce Budget" 
                                ? "bg-red-100 text-red-800" 
                                : recommendedAction === "Increase Budget" 
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            )}
                          >
                            {recommendedAction === "Reduce Budget" && <TrendingDown className="h-3 w-3 mr-1" />}
                            {recommendedAction === "Increase Budget" && <TrendingUp className="h-3 w-3 mr-1" />}
                            {recommendedAction === "Maintain Budget" && <Minus className="h-3 w-3 mr-1" />}
                            {recommendedAction}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Insights */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>Optimization Insights</CardTitle>
          </div>
          <CardDescription>
            Data-driven insights and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-sm">
            <div>
              <h4 className="font-medium mb-2 text-base">Key Findings</h4>
              <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                <li>
                  {activeScenario === "cost-savings" 
                    ? `Cost Savings scenario reduces budget by ${Math.abs(comparisonData?.budgetChange || 0).toLocaleString()} with minimal impact on performance.`
                    : activeScenario === "revenue-uplift"
                    ? `Revenue Uplift scenario can increase revenue by ${Math.round((comparisonData?.revenueChange || 0) / scenarioMetrics.bau.projectedRevenue * 100)}% without increasing total budget.`
                    : "Current allocation is relatively efficient, with room for optimization."}
                </li>
                <li>
                  {recommendations.sort((a, b) => b.impact / b.currentBudget - a.impact / a.currentBudget)[0]?.name} shows 
                  the highest ROI and would benefit from increased investment.
                </li>
                <li>
                  {recommendations.sort((a, b) => a.impact / a.currentBudget - b.impact / b.currentBudget)[0]?.name} shows 
                  diminishing returns and may benefit from budget reallocation.
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 text-base">Recommendations</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  {activeScenario === "cost-savings" 
                    ? "The Cost Savings scenario maintains most of the performance while reducing total budget. Consider implementing these changes for improved efficiency."
                    : activeScenario === "revenue-uplift"
                    ? "The Revenue Uplift scenario maximizes performance by reallocating budget to high-performing channels. This approach is recommended for growth objectives."
                    : "Consider testing the recommended budget allocations to validate performance improvements before full implementation."}
                </p>
                <p>
                  Budget optimization should be an ongoing process, with regular updates based on new performance data and changing market conditions.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetPage;
