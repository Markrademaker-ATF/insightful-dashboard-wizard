
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { SectionNav } from "@/components/dashboard/SectionNav";
import { 
  ChevronRight, 
  Lightbulb, 
  Target, 
  BarChart3, 
  ArrowUpRight, 
  Zap,
  TrendingUp,
  PieChart,
  LineChart,
  AreaChart,
  Users,
  Layers,
  HelpCircle,
  FileBarChart,
  ChevronDown,
  ChevronUp,
  Calendar,
  BarChart,
  Presentation,
  ThumbsUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";

const journeySections = [
  { id: "roi", title: "ROI Summary" },
  { id: "revenue", title: "Revenue Trends" },
  { id: "channel", title: "Channel Performance" },
  { id: "attribution", title: "Attribution" },
  { id: "optimization", title: "Optimization" },
  { id: "forecasting", title: "Forecasting" },
  { id: "insights", title: "Insights" }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("roi");
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
  
  // Calculate progress based on active section
  const journeyProgress = ((journeySections.findIndex(s => s.id === activeSection) + 1) / journeySections.length) * 100;
  
  useEffect(() => {
    // Animate progress on load
    const timer = setTimeout(() => {
      setProgress(journeyProgress);
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [journeyProgress]);
  
  // Add default values for saturation curve props
  const defaultCustomBudgets = {
    "bau": { "social": 15000, "search": 20000, "display": 10000, "video": 5000 },
    "cost-savings": { "social": 13500, "search": 18000, "display": 9000, "video": 4500 },
    "revenue-uplift": { "social": 18000, "search": 24000, "display": 12000, "video": 6000 }
  };

  // Campaign trends data for visualization
  const campaignTrends = [
    { month: "Jan", conversion: 3.2, ctr: 2.1, cpa: 12.5 },
    { month: "Feb", conversion: 3.5, ctr: 2.3, cpa: 11.8 },
    { month: "Mar", conversion: 3.8, ctr: 2.5, cpa: 11.2 },
    { month: "Apr", conversion: 4.2, ctr: 2.8, cpa: 10.5 },
    { month: "May", conversion: 4.5, ctr: 3.0, cpa: 9.8 },
    { month: "Jun", conversion: 4.7, ctr: 3.1, cpa: 9.5 }
  ];

  // Top performing channels
  const topChannels = [
    { name: "Search", roas: 4.2, budget: 20000, color: "bg-blue-500" },
    { name: "Social", roas: 3.8, budget: 15000, color: "bg-purple-500" },
    { name: "Display", roas: 2.5, budget: 10000, color: "bg-green-500" },
    { name: "Video", roas: 3.2, budget: 5000, color: "bg-amber-500" }
  ];

  // Recent insights
  const recentInsights = [
    {
      id: "insight-1",
      title: "Search Campaign Performance",
      description: "Your search campaigns show a 15% higher conversion rate in the last 30 days compared to the previous period.",
      impact: "high",
      date: "2 days ago",
      metrics: {
        before: 3.2,
        after: 3.7,
        unit: "%"
      }
    },
    {
      id: "insight-2",
      title: "Budget Allocation Recommendation",
      description: "Moving 20% of your display budget to social channels could increase overall ROAS by approximately 8% based on recent performance trends.",
      impact: "medium",
      date: "1 week ago",
      metrics: {
        current: 3.4,
        projected: 3.7,
        unit: "ROAS"
      }
    },
    {
      id: "insight-3",
      title: "Mobile Conversion Optimization",
      description: "Mobile traffic has a 23% lower conversion rate than desktop. Consider optimizing your mobile landing pages to close this gap.",
      impact: "high",
      date: "2 weeks ago",
      metrics: {
        desktop: 4.2,
        mobile: 3.2,
        unit: "%"
      }
    }
  ];
  
  const toggleInsight = (id: string) => {
    setExpandedInsight(expandedInsight === id ? null : id);
  };
  
  return (
    <div className="space-y-8">
      <Helmet>
        <title>Analytics Dashboard - Artefact</title>
      </Helmet>
      
      {/* Hero Section with gradient background */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-purple-50/30 rounded-2xl p-8 border border-indigo-100/50 shadow-lg animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <div className="p-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 animate-float shadow-sm">
            <Target className="h-10 w-10 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">Marketing Analytics Dashboard</h1>
            <p className="text-muted-foreground text-balance text-lg">
              Gain actionable insights from your marketing data with comprehensive analytics and visualizations
            </p>
          </div>
          <Link 
            to="/data" 
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors shadow-md"
          >
            <span>View Detailed Data</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Analytics Overview with enhanced styling */}
        <Card className="bg-white/90 rounded-xl shadow-md border-indigo-100/50 overflow-hidden">
          <CardContent className="p-6">
            <AnalyticsOverview />
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Insights Section */}
      <div className="space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">Quick Insights</h2>
            <p className="text-muted-foreground">Get a snapshot of your marketing performance</p>
          </div>
          <Link 
            to="/channels" 
            className="flex items-center text-primary font-medium hover:underline mt-2 md:mt-0"
          >
            View all channels <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {/* Quick Action Cards - Enhanced Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-white to-blue-50/50 border-blue-100/50 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col gap-3">
              <div className="p-3 rounded-full bg-blue-50 w-fit">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Channel Analysis</h3>
                <p className="text-sm text-muted-foreground">Compare performance across channels</p>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium text-blue-600">4 active channels</span>
                <ChevronRight className="h-4 w-4 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-green-50/50 border-green-100/50 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col gap-3">
              <div className="p-3 rounded-full bg-green-50 w-fit">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Revenue Tracking</h3>
                <p className="text-sm text-muted-foreground">Monitor trends and predictions</p>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium text-green-600">+12.5% this month</span>
                <ChevronRight className="h-4 w-4 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-amber-50/50 border-amber-100/50 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col gap-3">
              <div className="p-3 rounded-full bg-amber-50 w-fit">
                <Zap className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Quick Insights</h3>
                <p className="text-sm text-muted-foreground">Actionable recommendations</p>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium text-amber-600">3 new insights</span>
                <ChevronRight className="h-4 w-4 text-amber-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-purple-50/50 border-purple-100/50 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col gap-3">
              <div className="p-3 rounded-full bg-purple-50 w-fit">
                <PieChart className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Budget Allocation</h3>
                <p className="text-sm text-muted-foreground">Optimize spending distribution</p>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium text-purple-600">Budget review due</span>
                <ChevronRight className="h-4 w-4 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* NEW: Campaign Performance Trends */}
      <div className="bg-gradient-to-br from-blue-50/30 to-indigo-50/30 rounded-2xl p-8 border border-blue-100/50 shadow-md animate-fade-in" style={{ animationDelay: "300ms" }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">Campaign Performance Trends</h2>
            <p className="text-muted-foreground">Track key performance metrics over time</p>
          </div>
          <Link 
            to="/campaign" 
            className="flex items-center text-primary font-medium hover:underline mt-2 md:mt-0"
          >
            View campaign details <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Interactive Trend Visualization */}
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-700 mb-4">Key Metrics Evolution</h3>
                <div className="h-64 relative">
                  {/* Simple trends visualization with bars and lines */}
                  <div className="absolute inset-0 flex items-end justify-between">
                    {campaignTrends.map((data, index) => (
                      <div key={index} className="flex flex-col items-center gap-1 w-1/6">
                        <div className="relative w-full flex justify-center items-end h-48">
                          {/* Conversion Rate */}
                          <div 
                            className="w-2 bg-blue-500 mx-0.5 rounded-t-sm" 
                            style={{ height: `${data.conversion * 10}%` }}
                            title={`Conversion: ${data.conversion}%`}
                          />
                          {/* CTR */}
                          <div 
                            className="w-2 bg-purple-500 mx-0.5 rounded-t-sm" 
                            style={{ height: `${data.ctr * 12}%` }}
                            title={`CTR: ${data.ctr}%`}
                          />
                          {/* CPA */}
                          <div 
                            className="w-2 bg-amber-400 mx-0.5 rounded-t-sm" 
                            style={{ height: `${100 - data.cpa * 4}%` }}
                            title={`CPA: $${data.cpa}`}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center items-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                    <span className="text-xs text-gray-600">Conversion Rate (%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                    <span className="text-xs text-gray-600">CTR (%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-400 rounded-sm"></div>
                    <span className="text-xs text-gray-600">CPA ($)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Campaign Stats Cards */}
          <div className="flex flex-col gap-4">
            <Card className="bg-white hover:shadow-md transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Active Campaigns</h4>
                      <p className="text-2xl font-bold text-gray-900">7</p>
                    </div>
                  </div>
                  <div className="text-xs font-medium flex items-center text-green-600">
                    <span>+2</span>
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-purple-100">
                      <BarChart className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Avg. ROAS</h4>
                      <p className="text-2xl font-bold text-gray-900">3.4x</p>
                    </div>
                  </div>
                  <div className="text-xs font-medium flex items-center text-green-600">
                    <span>+0.3</span>
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-amber-100">
                      <Presentation className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Impressions</h4>
                      <p className="text-2xl font-bold text-gray-900">2.4M</p>
                    </div>
                  </div>
                  <div className="text-xs font-medium flex items-center text-green-600">
                    <span>+8%</span>
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100">
                      <ThumbsUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Conversion Rate</h4>
                      <p className="text-2xl font-bold text-gray-900">4.7%</p>
                    </div>
                  </div>
                  <div className="text-xs font-medium flex items-center text-green-600">
                    <span>+0.5%</span>
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* NEW: Top Performing Channels */}
      <div className="rounded-2xl p-8 border border-gray-200 shadow-md bg-white animate-fade-in" style={{ animationDelay: "400ms" }}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Top Performing Channels</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {topChannels.map((channel, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">{channel.name}</h3>
                <div className={`${channel.color} p-1 rounded-full w-3 h-3`}></div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">ROAS</p>
                  <p className="text-2xl font-bold">{channel.roas}x</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Budget</p>
                  <p className="text-lg font-semibold">${channel.budget.toLocaleString()}</p>
                </div>
                
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <Link to={`/channels?channel=${channel.name.toLowerCase()}`} className="text-primary text-sm font-medium flex items-center hover:underline">
                    View details <ChevronRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* NEW: AI-Powered Insights */}
      <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-2xl p-8 border border-indigo-100/50 shadow-md animate-fade-in" style={{ animationDelay: "500ms" }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-indigo-100/80">
            <Zap className="h-5 w-5 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">AI-Powered Insights</h2>
        </div>
        
        <div className="space-y-4">
          {recentInsights.map((insight) => (
            <Card 
              key={insight.id} 
              className="overflow-hidden transition-all duration-300"
            >
              <div 
                className={`p-5 cursor-pointer hover:bg-gray-50`}
                onClick={() => toggleInsight(insight.id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-full ${
                      insight.impact === 'high' ? 'bg-red-100' : 
                      insight.impact === 'medium' ? 'bg-amber-100' : 'bg-blue-100'
                    }`}>
                      <Lightbulb className={`h-4 w-4 ${
                        insight.impact === 'high' ? 'text-red-600' : 
                        insight.impact === 'medium' ? 'text-amber-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <h3 className="font-medium text-gray-800">{insight.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{insight.date}</span>
                    {expandedInsight === insight.id ? 
                      <ChevronUp className="h-4 w-4 text-gray-400" /> : 
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    }
                  </div>
                </div>
              </div>
              
              {expandedInsight === insight.id && (
                <div className="px-5 pb-5 pt-0">
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600 mb-4">{insight.description}</p>
                    
                    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                      {'before' in insight.metrics ? (
                        <>
                          <div className="text-center">
                            <p className="text-xs text-gray-500">Before</p>
                            <p className="text-xl font-semibold">{insight.metrics.before}{insight.metrics.unit}</p>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-0.5 bg-gray-300 relative">
                              <div className="absolute -right-3 -top-1.5 text-green-600">
                                <ArrowUpRight className="h-4 w-4" />
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500">After</p>
                            <p className="text-xl font-semibold text-green-600">{insight.metrics.after}{insight.metrics.unit}</p>
                          </div>
                        </>
                      ) : 'current' in insight.metrics ? (
                        <>
                          <div className="text-center">
                            <p className="text-xs text-gray-500">Current</p>
                            <p className="text-xl font-semibold">{insight.metrics.current}</p>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-0.5 bg-gray-300 relative">
                              <div className="absolute -right-3 -top-1.5 text-blue-600">
                                <ArrowUpRight className="h-4 w-4" />
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500">Projected</p>
                            <p className="text-xl font-semibold text-blue-600">{insight.metrics.projected}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-center">
                            <p className="text-xs text-gray-500">Desktop</p>
                            <p className="text-xl font-semibold">{insight.metrics.desktop}{insight.metrics.unit}</p>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-0.5 bg-gray-300 relative">
                              <div className="absolute -right-3 -top-1.5 text-amber-600">
                                <ArrowUpRight className="h-4 w-4" />
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500">Mobile</p>
                            <p className="text-xl font-semibold text-amber-600">{insight.metrics.mobile}{insight.metrics.unit}</p>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Link to="/chat-ai" className="text-primary text-sm font-medium flex items-center hover:underline">
                        Get more details <ChevronRight className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
      
      {/* Help & Resources Section */}
      <div className="bg-gradient-to-br from-emerald-50/30 to-teal-50/30 rounded-2xl p-8 border border-emerald-100/50 shadow-md animate-fade-in" style={{ animationDelay: "400ms" }}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Help & Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pages Guide */}
          <Link to="/guide" className="flex flex-col gap-4 p-6 rounded-xl bg-white/80 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="p-3 rounded-full bg-blue-50 w-fit">
              <Layers className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Pages Guide</h3>
              <p className="text-sm text-muted-foreground">
                Explore available pages and understand their functions
              </p>
            </div>
          </Link>
          
          {/* Metrics Guide */}
          <Link to="/metrics-guide" className="flex flex-col gap-4 p-6 rounded-xl bg-white/80 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="p-3 rounded-full bg-green-50 w-fit">
              <FileBarChart className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Metrics Guide</h3>
              <p className="text-sm text-muted-foreground">
                Learn about the key metrics and how to interpret them
              </p>
            </div>
          </Link>
          
          {/* FAQ */}
          <Link to="/faq" className="flex flex-col gap-4 p-6 rounded-xl bg-white/80 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="p-3 rounded-full bg-purple-50 w-fit">
              <HelpCircle className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">FAQ</h3>
              <p className="text-sm text-muted-foreground">
                Find answers to commonly asked questions about analytics
              </p>
            </div>
          </Link>
        </div>
        
        <div className="mt-6 text-center">
          <Link
            to="/methodologies"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md"
          >
            <Lightbulb className="h-4 w-4" />
            <span>Learn Analytics Methodologies</span>
          </Link>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-gradient-to-br from-indigo-50/30 to-white rounded-2xl p-8 border border-indigo-100/50 shadow-md animate-fade-in" style={{ animationDelay: "500ms" }}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Comprehensive Analytics Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-4 p-4 rounded-xl bg-white/80 border border-gray-100 shadow-sm">
            <div className="p-3 rounded-full bg-blue-50 w-fit">
              <LineChart className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Advanced Forecasting</h3>
              <p className="text-sm text-muted-foreground">
                Use machine learning algorithms to predict future performance and identify trends before they emerge.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 p-4 rounded-xl bg-white/80 border border-gray-100 shadow-sm">
            <div className="p-3 rounded-full bg-green-50 w-fit">
              <AreaChart className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Multi-Channel Attribution</h3>
              <p className="text-sm text-muted-foreground">
                Understand the true impact of each marketing channel with sophisticated attribution modeling.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 p-4 rounded-xl bg-white/80 border border-gray-100 shadow-sm">
            <div className="p-3 rounded-full bg-purple-50 w-fit">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Audience Insights</h3>
              <p className="text-sm text-muted-foreground">
                Gain deeper understanding of your audience segments and their behaviors across touchpoints.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link
            to="/guide"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-md"
          >
            <Layers className="h-4 w-4" />
            <span>Explore All Features</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
