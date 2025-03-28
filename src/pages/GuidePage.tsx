
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
  ExternalLink,
  Sparkles,
  BookOpen,
  MessagesSquare,
  Lightbulb,
  ArrowRight,
  BarChart4,
  FileBarChart,
  Layers,
  LineChart
} from "lucide-react";

const GuidePage = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Marketing Analytics Guide"
        description="Everything you need to know to master your marketing analytics dashboard"
      />

      <Tabs defaultValue="overview" className="dashboard-card">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 bg-white/70 backdrop-blur-sm">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20">Overview</TabsTrigger>
          <TabsTrigger value="pages" className="data-[state=active]:bg-primary/20">Pages Guide</TabsTrigger>
          <TabsTrigger value="metrics" className="data-[state=active]:bg-primary/20">Metrics Guide</TabsTrigger>
          <TabsTrigger value="faq" className="data-[state=active]:bg-primary/20">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-indigo-50/50">
            <CardHeader className="pb-2 border-b border-indigo-100/30">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
                    Welcome to Your Marketing Analytics Dashboard
                  </CardTitle>
                  <CardDescription className="text-base">
                    A powerful tool for data-driven marketing decisions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <p className="text-gray-600 text-balance">
                This dashboard provides a comprehensive view of your marketing performance across all channels. 
                It's designed to help you understand what's working, identify opportunities for optimization, 
                and make data-driven decisions to improve your marketing ROI.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-indigo-50">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Comprehensive Analytics</h4>
                    <p className="text-sm text-gray-500">
                      Track performance across all marketing channels in one place
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-indigo-50">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Data Visualization</h4>
                    <p className="text-sm text-gray-500">
                      Intuitive charts and graphs make complex data easy to understand
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-indigo-50">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Actionable Insights</h4>
                    <p className="text-sm text-gray-500">
                      Get recommendations for optimizing your marketing strategy
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-indigo-50">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Budget Optimization</h4>
                    <p className="text-sm text-gray-500">
                      Data-driven budget allocation recommendations to maximize ROI
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-b from-white to-indigo-50/30 border-0 shadow-md overflow-hidden">
              <CardHeader className="border-b border-indigo-100/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Getting Started</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <p className="text-sm text-gray-600">
                  Navigate through the dashboard using the sidebar menu. Each section provides
                  different insights into your marketing performance:
                </p>
                
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 p-3 bg-white rounded-lg hover:shadow-sm transition-all border border-indigo-50/50">
                    <LayoutDashboard className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-800">Dashboard</span>
                      <p className="text-gray-500 mt-1">A high-level overview of key metrics and performance indicators</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-white rounded-lg hover:shadow-sm transition-all border border-indigo-50/50">
                    <BarChart3 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-800">Data Overview</span>
                      <p className="text-gray-500 mt-1">Detailed data across all channels with filtering capabilities</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-white rounded-lg hover:shadow-sm transition-all border border-indigo-50/50">
                    <Radio className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-800">Channel Analysis</span>
                      <p className="text-gray-500 mt-1">Deep dive into performance metrics by marketing channel</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-white rounded-lg hover:shadow-sm transition-all border border-indigo-50/50">
                    <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-800">Incremental Analysis</span>
                      <p className="text-gray-500 mt-1">Measure true marketing impact beyond baseline performance</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-b from-white to-indigo-50/30 border-0 shadow-md overflow-hidden">
              <CardHeader className="border-b border-indigo-100/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Key Features</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <p className="text-sm text-gray-600">
                  The dashboard includes several powerful features to help you analyze and optimize 
                  your marketing performance:
                </p>
                
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 p-3 bg-white rounded-lg hover:shadow-sm transition-all border border-indigo-50/50">
                    <GitCompare className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-800">Metric Comparison</span>
                      <p className="text-gray-500 mt-1">Compare different metrics side by side for better insights</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-white rounded-lg hover:shadow-sm transition-all border border-indigo-50/50">
                    <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-800">Incremental Analysis</span>
                      <p className="text-gray-500 mt-1">Sophisticated models to measure true incremental impact</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-white rounded-lg hover:shadow-sm transition-all border border-indigo-50/50">
                    <PieChart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-800">Budget Optimizer</span>
                      <p className="text-gray-500 mt-1">AI-powered budget recommendations based on performance data</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-white rounded-lg hover:shadow-sm transition-all border border-indigo-50/50">
                    <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-800">Interactive Help</span>
                      <p className="text-gray-500 mt-1">Contextual explanations and tips throughout the dashboard</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="pages" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-md hover:shadow-lg transition-all border border-indigo-50 overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors">
                    <LayoutDashboard className="h-5 w-5 text-indigo-600" />
                  </div>
                  <CardTitle>Dashboard</CardTitle>
                </div>
                <CardDescription>
                  Summary and performance overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3 text-gray-600">
                  The Dashboard page provides a high-level overview of your marketing performance with key metrics, trends, and insights.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Review key performance metrics at a glance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Track revenue trends across channels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">View budget allocation across channels</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-all border border-indigo-50 overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle>Data Overview</CardTitle>
                </div>
                <CardDescription>
                  Raw and aggregated marketing data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3 text-gray-600">
                  The Data Overview page provides detailed data for all marketing channels, allowing you to explore and analyze raw performance data.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">View detailed data in chart or table format</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Export data for further analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Filter data by timeframe</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-all border border-indigo-50 overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-50 rounded-full group-hover:bg-purple-100 transition-colors">
                    <Radio className="h-5 w-5 text-purple-600" />
                  </div>
                  <CardTitle>Channel Analysis</CardTitle>
                </div>
                <CardDescription>
                  Performance metrics by channel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3 text-gray-600">
                  The Channel Analysis page breaks down performance by marketing channel, allowing you to compare and analyze channel-specific metrics.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Compare channel performance with interactive charts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">View detailed metrics for each channel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Identify top and underperforming channels</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-all border border-indigo-50 overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-400"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle>Incremental Analysis</CardTitle>
                </div>
                <CardDescription>
                  Separating baseline from marketing impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3 text-gray-600">
                  The Incremental Analysis page helps you understand the true incremental impact of your marketing efforts beyond baseline performance.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Separate baseline from incremental revenue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Identify channels with highest incremental impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Make more informed budget allocation decisions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-all border border-indigo-50 overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-amber-500 to-yellow-400"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-50 rounded-full group-hover:bg-amber-100 transition-colors">
                    <PieChart className="h-5 w-5 text-amber-600" />
                  </div>
                  <CardTitle>Budget Optimizer</CardTitle>
                </div>
                <CardDescription>
                  Data-driven budget recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3 text-gray-600">
                  The Budget Optimizer provides data-driven recommendations for allocating your marketing budget to maximize ROI.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Compare current vs. recommended budget allocation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">View projected impact of budget changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Apply recommendations with one click</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-all border border-indigo-50 overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-blue-400"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors">
                    <BarChart4 className="h-5 w-5 text-indigo-600" />
                  </div>
                  <CardTitle>Campaign Analysis</CardTitle>
                </div>
                <CardDescription>
                  Detailed campaign performance insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3 text-gray-600">
                  The Campaign Analysis page provides detailed metrics and insights for individual marketing campaigns across channels.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">View detailed campaign metrics and KPIs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Compare performance across creative variations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Analyze audience engagement and conversion data</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-all border border-indigo-50 overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-violet-500 to-purple-400"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-violet-50 rounded-full group-hover:bg-violet-100 transition-colors">
                    <Lightbulb className="h-5 w-5 text-violet-600" />
                  </div>
                  <CardTitle>Analytics Methodologies</CardTitle>
                </div>
                <CardDescription>
                  Learn about analysis approaches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3 text-gray-600">
                  The Analytics Methodologies page explains the different approaches used to analyze marketing data and derive insights.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Learn about Marketing Mix Modeling (MMM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Understand Incrementality Testing approaches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Explore Multi-Touch Attribution (MTA) techniques</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-all border border-indigo-50 overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-red-500 to-orange-400"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-red-50 rounded-full group-hover:bg-red-100 transition-colors">
                    <GitCompare className="h-5 w-5 text-red-600" />
                  </div>
                  <CardTitle>A/B Testing</CardTitle>
                </div>
                <CardDescription>
                  Experiment results and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3 text-gray-600">
                  The A/B Testing page shows results from marketing experiments, helping you identify what works best for your audience.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Compare test variants performance metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Review statistical significance of results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Get actionable insights based on test outcomes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-all border border-indigo-50 overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-teal-500 to-cyan-400"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-teal-50 rounded-full group-hover:bg-teal-100 transition-colors">
                    <Layers className="h-5 w-5 text-teal-600" />
                  </div>
                  <CardTitle>Metric Comparison</CardTitle>
                </div>
                <CardDescription>
                  Compare metrics side by side
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3 text-gray-600">
                  The Metric Comparison page allows you to compare different performance metrics side by side to identify correlations and patterns.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Compare different metrics across channels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Identify correlations between metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Get actionable insights from comparison data</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="metrics" className="space-y-6">
          <Card className="bg-white border-0 shadow-md overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500"></div>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-violet-50 rounded-full">
                  <BarChart4 className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <CardTitle>Key Metrics Explained</CardTitle>
                  <CardDescription>
                    Understanding the metrics used throughout the dashboard
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="bg-white p-4 rounded-lg border border-indigo-50 hover:shadow-md transition-all">
                  <h4 className="font-medium text-indigo-700 mb-2 flex items-center gap-2">
                    <span className="p-1 bg-indigo-100 rounded text-xs text-indigo-600">01</span>
                    Revenue
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Total revenue attributed to marketing activities across all channels.
                  </p>
                  <div className="text-sm bg-indigo-50/50 p-2 rounded border border-indigo-100/50">
                    <strong className="text-gray-700">How to use it:</strong> Track overall marketing performance and compare
                    revenue contribution across channels.
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-indigo-50 hover:shadow-md transition-all">
                  <h4 className="font-medium text-indigo-700 mb-2 flex items-center gap-2">
                    <span className="p-1 bg-indigo-100 rounded text-xs text-indigo-600">02</span>
                    ROAS (Return on Ad Spend)
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Revenue divided by cost, representing the return for each dollar spent.
                  </p>
                  <div className="text-sm bg-indigo-50/50 p-2 rounded border border-indigo-100/50">
                    <strong className="text-gray-700">How to use it:</strong> Evaluate efficiency of marketing spend and
                    identify channels with highest return.
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-indigo-50 hover:shadow-md transition-all">
                  <h4 className="font-medium text-indigo-700 mb-2 flex items-center gap-2">
                    <span className="p-1 bg-indigo-100 rounded text-xs text-indigo-600">03</span>
                    Conversion Rate
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Percentage of users who complete a desired action (purchase, signup, etc.).
                  </p>
                  <div className="text-sm bg-indigo-50/50 p-2 rounded border border-indigo-100/50">
                    <strong className="text-gray-700">How to use it:</strong> Identify optimization opportunities to improve
                    campaign effectiveness.
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-indigo-50 hover:shadow-md transition-all">
                  <h4 className="font-medium text-indigo-700 mb-2 flex items-center gap-2">
                    <span className="p-1 bg-indigo-100 rounded text-xs text-indigo-600">04</span>
                    CPA (Cost Per Acquisition)
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Average cost to acquire a customer or conversion.
                  </p>
                  <div className="text-sm bg-indigo-50/50 p-2 rounded border border-indigo-100/50">
                    <strong className="text-gray-700">How to use it:</strong> Compare acquisition costs across channels
                    and optimize for efficiency.
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-indigo-50 hover:shadow-md transition-all">
                  <h4 className="font-medium text-indigo-700 mb-2 flex items-center gap-2">
                    <span className="p-1 bg-indigo-100 rounded text-xs text-indigo-600">05</span>
                    Incremental Revenue
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Revenue directly attributable to marketing efforts, excluding baseline.
                  </p>
                  <div className="text-sm bg-indigo-50/50 p-2 rounded border border-indigo-100/50">
                    <strong className="text-gray-700">How to use it:</strong> Measure true impact of marketing activities
                    beyond organic performance.
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-indigo-50 hover:shadow-md transition-all">
                  <h4 className="font-medium text-indigo-700 mb-2 flex items-center gap-2">
                    <span className="p-1 bg-indigo-100 rounded text-xs text-indigo-600">06</span>
                    Budget Allocation
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Distribution of marketing budget across different channels.
                  </p>
                  <div className="text-sm bg-indigo-50/50 p-2 rounded border border-indigo-100/50">
                    <strong className="text-gray-700">How to use it:</strong> Optimize budget distribution based on
                    performance and incremental impact.
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-indigo-50 hover:shadow-md transition-all">
                  <h4 className="font-medium text-indigo-700 mb-2 flex items-center gap-2">
                    <span className="p-1 bg-indigo-100 rounded text-xs text-indigo-600">07</span>
                    CTR (Click-Through Rate)
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Percentage of impressions that result in clicks.
                  </p>
                  <div className="text-sm bg-indigo-50/50 p-2 rounded border border-indigo-100/50">
                    <strong className="text-gray-700">How to use it:</strong> Evaluate the effectiveness of ad creative
                    and targeting.
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-indigo-50 hover:shadow-md transition-all">
                  <h4 className="font-medium text-indigo-700 mb-2 flex items-center gap-2">
                    <span className="p-1 bg-indigo-100 rounded text-xs text-indigo-600">08</span>
                    ROI Impact
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Projected improvement in return on investment from recommended changes.
                  </p>
                  <div className="text-sm bg-indigo-50/50 p-2 rounded border border-indigo-100/50">
                    <strong className="text-gray-700">How to use it:</strong> Prioritize optimization opportunities based
                    on potential impact.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faq" className="space-y-6">
          <Card className="bg-white border-0 shadow-md overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-full">
                  <MessagesSquare className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white p-5 rounded-lg border border-blue-50 hover:shadow-md transition-all">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <span className="p-1.5 bg-blue-100 rounded-full text-blue-600 flex items-center justify-center">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  How is incremental revenue calculated?
                </h4>
                <p className="text-sm text-gray-600">
                  Incremental revenue is calculated using a combination of marketing mix modeling, 
                  holdout testing, and multi-touch attribution. This methodology isolates the impact 
                  of marketing activities from baseline revenue that would occur organically.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-blue-50 hover:shadow-md transition-all">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <span className="p-1.5 bg-blue-100 rounded-full text-blue-600 flex items-center justify-center">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  How often is data updated?
                </h4>
                <p className="text-sm text-gray-600">
                  The dashboard data is refreshed daily with a 24-hour lag to ensure data completeness. 
                  Some metrics that require more complex processing (like incremental analysis) may have 
                  a 48-72 hour lag.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-blue-50 hover:shadow-md transition-all">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <span className="p-1.5 bg-blue-100 rounded-full text-blue-600 flex items-center justify-center">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  How are budget recommendations generated?
                </h4>
                <p className="text-sm text-gray-600">
                  Budget recommendations are based on historical performance data, incremental analysis, 
                  and predictive modeling. The algorithm optimizes for maximum ROI while considering factors 
                  like seasonality, diminishing returns, and channel interactions.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-blue-50 hover:shadow-md transition-all">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <span className="p-1.5 bg-blue-100 rounded-full text-blue-600 flex items-center justify-center">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  Can I export data for further analysis?
                </h4>
                <p className="text-sm text-gray-600">
                  Yes, you can export data from most dashboard pages using the Export button. Data can be 
                  exported in CSV or Excel format for further analysis in your preferred tools.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-blue-50 hover:shadow-md transition-all">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <span className="p-1.5 bg-blue-100 rounded-full text-blue-600 flex items-center justify-center">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  How can I customize the dashboard?
                </h4>
                <p className="text-sm text-gray-600">
                  The dashboard offers several customization options. You can filter by date range, 
                  select different metrics for comparison, and customize views on most pages. Additional 
                  customization options are available in the Settings page.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-blue-50 hover:shadow-md transition-all">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <span className="p-1.5 bg-blue-100 rounded-full text-blue-600 flex items-center justify-center">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  Where can I get additional help?
                </h4>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  For additional help, please contact our support team or refer to the detailed documentation.
                  <a href="#" className="text-primary inline-flex items-center hover:underline transition-colors">
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

export default GuidePage;
