import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  BarChart3, 
  Radio, 
  GitCompare, 
  PieChart, 
  TrendingUp, 
  HelpCircle,
  CheckCircle,
  ExternalLink
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Welcome to Artefact Analytics"
        description="Your comprehensive marketing analytics dashboard"
        icon={LayoutDashboard}
      />

      <Tabs defaultValue="overview" className="dashboard-card">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Pages Guide</TabsTrigger>
          <TabsTrigger value="metrics">Metrics Guide</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Your Marketing Analytics Dashboard</CardTitle>
              <CardDescription>
                A powerful tool for data-driven marketing decisions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                This dashboard provides a comprehensive view of your marketing performance across all channels. 
                It's designed to help you understand what's working, identify opportunities for optimization, 
                and make data-driven decisions to improve your marketing ROI.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Comprehensive Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Track performance across all marketing channels in one place
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Data Visualization</h4>
                    <p className="text-sm text-muted-foreground">
                      Intuitive charts and graphs make complex data easy to understand
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Actionable Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      Get recommendations for optimizing your marketing strategy
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Budget Optimization</h4>
                    <p className="text-sm text-muted-foreground">
                      Data-driven budget allocation recommendations to maximize ROI
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Navigate through the dashboard using the sidebar menu. Each section provides
                  different insights into your marketing performance:
                </p>
                
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <LayoutDashboard className="h-4 w-4 text-primary mt-0.5" />
                    <span><strong>Dashboard:</strong> A high-level overview of key metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BarChart3 className="h-4 w-4 text-primary mt-0.5" />
                    <span><strong>Data Overview:</strong> Detailed data across all channels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Radio className="h-4 w-4 text-primary mt-0.5" />
                    <span><strong>Channel Analysis:</strong> Performance by marketing channel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-primary mt-0.5" />
                    <span><strong>Incremental Analysis:</strong> Measure true marketing impact</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  The dashboard includes several powerful features to help you analyze and optimize 
                  your marketing performance:
                </p>
                
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <GitCompare className="h-4 w-4 text-primary mt-0.5" />
                    <span><strong>Metric Comparison:</strong> Compare different metrics side by side</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-primary mt-0.5" />
                    <span><strong>Incremental Analysis:</strong> Measure true incremental impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <PieChart className="h-4 w-4 text-primary mt-0.5" />
                    <span><strong>Budget Optimizer:</strong> Get data-driven budget recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <HelpCircle className="h-4 w-4 text-primary mt-0.5" />
                    <span><strong>Interactive Help:</strong> Explanations and tips throughout</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="pages" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5 text-primary" />
                  <CardTitle>Dashboard</CardTitle>
                </div>
                <CardDescription>
                  Summary and performance overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  The Dashboard page provides a high-level overview of your marketing performance with key metrics, trends, and insights.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Review key performance metrics at a glance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Track revenue trends across channels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>View budget allocation across channels</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle>Data Overview</CardTitle>
                </div>
                <CardDescription>
                  Raw and aggregated marketing data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  The Data Overview page provides detailed data for all marketing channels, allowing you to explore and analyze raw performance data.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>View detailed data in chart or table format</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Export data for further analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Filter data by timeframe</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Radio className="h-5 w-5 text-primary" />
                  <CardTitle>Channel Analysis</CardTitle>
                </div>
                <CardDescription>
                  Performance metrics by channel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  The Channel Analysis page breaks down performance by marketing channel, allowing you to compare and analyze channel-specific metrics.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Compare channel performance with interactive charts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>View detailed metrics for each channel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Identify top and underperforming channels</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle>Incremental Analysis</CardTitle>
                </div>
                <CardDescription>
                  Separating baseline from marketing impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  The Incremental Analysis page helps you understand the true incremental impact of your marketing efforts beyond baseline performance.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Separate baseline from incremental revenue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Identify channels with highest incremental impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Make more informed budget allocation decisions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  <CardTitle>Budget Optimizer</CardTitle>
                </div>
                <CardDescription>
                  Data-driven budget recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  The Budget Optimizer provides data-driven recommendations for allocating your marketing budget to maximize ROI.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Compare current vs. recommended budget allocation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>View projected impact of budget changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Apply recommendations with one click</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <GitCompare className="h-5 w-5 text-primary" />
                  <CardTitle>Metric Comparison</CardTitle>
                </div>
                <CardDescription>
                  Compare metrics side by side
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  The Metric Comparison page allows you to compare different performance metrics side by side to identify correlations and patterns.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Compare different metrics across channels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Identify correlations between metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Get actionable insights from comparison data</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Metrics Explained</CardTitle>
              <CardDescription>
                Understanding the metrics used throughout the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <h4 className="font-medium">Revenue</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Total revenue attributed to marketing activities across all channels.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>How to use it:</strong> Track overall marketing performance and compare
                    revenue contribution across channels.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">ROAS (Return on Ad Spend)</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Revenue divided by cost, representing the return for each dollar spent.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>How to use it:</strong> Evaluate efficiency of marketing spend and
                    identify channels with highest return.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Conversion Rate</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Percentage of users who complete a desired action (purchase, signup, etc.).
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>How to use it:</strong> Identify optimization opportunities to improve
                    campaign effectiveness.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">CPA (Cost Per Acquisition)</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Average cost to acquire a customer or conversion.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>How to use it:</strong> Compare acquisition costs across channels
                    and optimize for efficiency.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Incremental Revenue</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Revenue directly attributable to marketing efforts, excluding baseline.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>How to use it:</strong> Measure true impact of marketing activities
                    beyond organic performance.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Budget Allocation</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Distribution of marketing budget across different channels.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>How to use it:</strong> Optimize budget distribution based on
                    performance and incremental impact.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">CTR (Click-Through Rate)</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Percentage of impressions that result in clicks.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>How to use it:</strong> Evaluate the effectiveness of ad creative
                    and targeting.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">ROI Impact</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Projected improvement in return on investment from recommended changes.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>How to use it:</strong> Prioritize optimization opportunities based
                    on potential impact.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-1">How is incremental revenue calculated?</h4>
                <p className="text-sm text-muted-foreground">
                  Incremental revenue is calculated using a combination of marketing mix modeling, 
                  holdout testing, and multi-touch attribution. This methodology isolates the impact 
                  of marketing activities from baseline revenue that would occur organically.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">How often is data updated?</h4>
                <p className="text-sm text-muted-foreground">
                  The dashboard data is refreshed daily with a 24-hour lag to ensure data completeness. 
                  Some metrics that require more complex processing (like incremental analysis) may have 
                  a 48-72 hour lag.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">How are budget recommendations generated?</h4>
                <p className="text-sm text-muted-foreground">
                  Budget recommendations are based on historical performance data, incremental analysis, 
                  and predictive modeling. The algorithm optimizes for maximum ROI while considering factors 
                  like seasonality, diminishing returns, and channel interactions.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Can I export data for further analysis?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can export data from most dashboard pages using the Export button. Data can be 
                  exported in CSV or Excel format for further analysis in your preferred tools.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">How can I customize the dashboard?</h4>
                <p className="text-sm text-muted-foreground">
                  The dashboard offers several customization options. You can filter by date range, 
                  select different metrics for comparison, and customize views on most pages. Additional 
                  customization options are available in the Settings page.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Where can I get additional help?</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  For additional help, please contact our support team or refer to the detailed documentation.
                  <a href="#" className="text-primary inline-flex items-center hover:underline">
                    View Documentation <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePage;
