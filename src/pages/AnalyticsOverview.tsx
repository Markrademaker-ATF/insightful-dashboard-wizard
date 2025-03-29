
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
  ScrollText,
  Clock,
  TrendingDown,
  BarChart,
  Award,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { motion } from "framer-motion";

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
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Calculate progress based on active section
  const journeyProgress = ((journeySections.findIndex(s => s.id === activeSection) + 1) / journeySections.length) * 100;
  
  useEffect(() => {
    // Animate progress on load
    const timer = setTimeout(() => {
      setProgress(journeyProgress);
      setIsLoaded(true);
    }, 300);
    
    // Add scroll event listener for animations
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [journeyProgress]);
  
  // Add default values for saturation curve props
  const defaultCustomBudgets = {
    "bau": { "social": 15000, "search": 20000, "display": 10000, "video": 5000 },
    "cost-savings": { "social": 13500, "search": 18000, "display": 9000, "video": 4500 },
    "revenue-uplift": { "social": 18000, "search": 24000, "display": 12000, "video": 6000 }
  };

  // Sample data for dynamic charts
  const marketingTrends = [
    { month: 'Jan', revenue: 120000, forecast: 110000 },
    { month: 'Feb', revenue: 132000, forecast: 125000 },
    { month: 'Mar', revenue: 141000, forecast: 135000 },
    { month: 'Apr', revenue: 160000, forecast: 150000 },
    { month: 'May', revenue: 178000, forecast: 170000 },
    { month: 'Jun', revenue: 195000, forecast: 185000 },
  ];
  
  // Trigger animation based on scroll position
  const animateOnScroll = (startPosition) => {
    return {
      opacity: scrollPosition > startPosition ? 1 : 0,
      y: scrollPosition > startPosition ? 0 : 20,
      transition: { duration: 0.5 }
    };
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
      
      {/* NEW: Dynamic Marketing Performance Trends Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50/30 border border-indigo-100/50 shadow-md p-8 mt-16">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500/80 to-blue-500/40"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl"></div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <BarChart className="h-6 w-6 text-indigo-600" />
            Dynamic Marketing Performance
          </h2>
          <p className="text-muted-foreground">Interactive visualization showing your marketing effectiveness over time</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Chart Card */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-100/50 shadow-sm">
            <div className="p-6">
              <div className="h-72 relative">
                {/* This would be a real chart in a complete implementation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Chart visualization placeholder */}
                      <div className="absolute bottom-0 left-0 right-0 flex items-end h-full">
                        {marketingTrends.map((item, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div className="relative w-full px-1">
                              <div 
                                className="bg-indigo-500/80 rounded-t w-full" 
                                style={{ height: `${(item.revenue/200000) * 100}%`, minHeight: '20px' }}
                              ></div>
                              <div 
                                className="absolute top-0 left-0 right-0 border-b-2 border-dashed border-blue-400" 
                                style={{ bottom: `${(item.forecast/200000) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs mt-1 text-gray-600">{item.month}</span>
                          </div>
                        ))}
                      </div>
                      <div className="absolute top-2 left-2 px-2 py-1 bg-white/80 backdrop-blur-sm rounded text-xs text-gray-700 font-medium">
                        Revenue vs Forecast
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Metrics Cards */}
          <div className="space-y-4">
            <Card className="bg-white/70 backdrop-blur-sm border-indigo-100/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-green-100">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">Revenue Growth</h3>
                    <p className="text-2xl font-bold text-green-600">+18.4%</p>
                    <p className="text-xs text-muted-foreground">vs previous period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-sm border-indigo-100/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-amber-100">
                    <Award className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">Top Channel</h3>
                    <p className="text-xl font-bold text-gray-800">Social Media</p>
                    <div className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                      <TrendingUp className="h-3 w-3" /> 
                      <span>3.2x ROAS</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-sm border-indigo-100/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">Customer Acquisition</h3>
                    <p className="text-2xl font-bold text-blue-600">2,847</p>
                    <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                      <TrendingUp className="h-3 w-3" /> 
                      <span>+12% new customers</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* NEW: Interactive Timeline Section */}
      <div className="py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Marketing Campaign Timeline</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Track the impact of your marketing campaigns over time</p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute h-full w-1 bg-gray-100 left-1/2 transform -translate-x-1/2"></div>
          
          {/* Timeline events */}
          <div className="space-y-12">
            {/* Event 1 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-gray-800 mb-2 text-lg">Summer Campaign Launch</h3>
                  <p className="text-muted-foreground mb-3">Our summer campaign reached over 2M impressions across channels</p>
                  <div className="flex items-center justify-end gap-3">
                    <span className="text-sm text-gray-500">May 15, 2023</span>
                    <div className="p-1 rounded bg-green-100">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative md:mx-auto flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-primary shadow-sm flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
            </div>
            
            {/* Event 2 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
              
              <div className="relative md:mx-auto flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-amber-500 shadow-sm flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-gray-800 mb-2 text-lg">Mid-Season Optimization</h3>
                  <p className="text-muted-foreground mb-3">Budget reallocation to top-performing channels improved ROAS by 32%</p>
                  <div className="flex items-center gap-3">
                    <div className="p-1 rounded bg-amber-100">
                      <LineChart className="h-4 w-4 text-amber-600" />
                    </div>
                    <span className="text-sm text-gray-500">July 2, 2023</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Event 3 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-gray-800 mb-2 text-lg">Product Launch Campaign</h3>
                  <p className="text-muted-foreground mb-3">New product line introduction exceeded sales targets by 18%</p>
                  <div className="flex items-center justify-end gap-3">
                    <span className="text-sm text-gray-500">September 10, 2023</span>
                    <div className="p-1 rounded bg-blue-100">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative md:mx-auto flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-blue-500 shadow-sm flex items-center justify-center">
                  <Target className="h-4 w-4 text-white" />
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* NEW: Marketing Insights Spotlight */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50/30 rounded-2xl p-8 border border-purple-100/50 shadow-md">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Lightbulb className="h-6 w-6 text-amber-500" />
            <span>Marketing Insights Spotlight</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Discover key findings from your latest marketing activities</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100/30 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-purple-500/80 to-purple-300/40"></div>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-full bg-purple-100">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Customer Segments</h3>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">Your highest value customers are 35-44 year old professionals who primarily engage via mobile devices.</p>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">Based on Q2 2023 data</span>
                <Link to="/data" className="text-purple-600 text-sm font-medium hover:underline flex items-center gap-1">
                  Explore <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100/30 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-blue-500/80 to-blue-300/40"></div>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-full bg-blue-100">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Channel Effectiveness</h3>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">Social channels perform 28% better for awareness, while search drives 3.4x more conversions.</p>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">Updated last week</span>
                <Link to="/channels" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                  Analyze <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100/30 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-green-500/80 to-green-300/40"></div>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-full bg-green-100">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Growth Opportunity</h3>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">Increasing display retargeting budget by 15% could yield an estimated 23% revenue boost.</p>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">AI recommendation</span>
                <Link to="/budget" className="text-green-600 text-sm font-medium hover:underline flex items-center gap-1">
                  Optimize <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
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
      
      {/* NEW: Latest Reports & Resources */}
      <div className="bg-gradient-to-br from-gray-50 to-slate-50/20 rounded-2xl p-8 border border-gray-100/50 shadow-md mt-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Latest Reports & Resources</h2>
            <p className="text-muted-foreground">Access your recent reports and marketing resources</p>
          </div>
          <Link to="/data" className="text-primary font-medium hover:underline flex items-center gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
              <div className="bg-gradient-to-br from-blue-500/5 to-blue-500/30 w-full h-full flex items-center justify-center">
                <ScrollText className="h-10 w-10 text-blue-500/70" />
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1 text-gray-800">Q2 Performance Report</h3>
              <p className="text-xs text-muted-foreground mb-4">Complete analysis of Q2 marketing performance</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Updated 2 days ago</span>
                <Link to="/data" className="text-blue-600 text-sm font-medium hover:underline">
                  View
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
              <div className="bg-gradient-to-br from-purple-500/5 to-purple-500/30 w-full h-full flex items-center justify-center">
                <BarChart3 className="h-10 w-10 text-purple-500/70" />
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1 text-gray-800">Channel Comparison</h3>
              <p className="text-xs text-muted-foreground mb-4">Side-by-side analysis of all marketing channels</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Updated weekly</span>
                <Link to="/channels" className="text-purple-600 text-sm font-medium hover:underline">
                  View
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
              <div className="bg-gradient-to-br from-amber-500/5 to-amber-500/30 w-full h-full flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-amber-500/70" />
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1 text-gray-800">Marketing Playbook</h3>
              <p className="text-xs text-muted-foreground mb-4">Best practices and strategic guidelines</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Last updated July 2023</span>
                <Link to="/guide" className="text-amber-600 text-sm font-medium hover:underline">
                  View
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
              <div className="bg-gradient-to-br from-green-500/5 to-green-500/30 w-full h-full flex items-center justify-center">
                <LineChart className="h-10 w-10 text-green-500/70" />
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1 text-gray-800">Budget Forecast</h3>
              <p className="text-xs text-muted-foreground mb-4">Projected spending and ROI for next quarter</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Generated yesterday</span>
                <Link to="/budget" className="text-green-600 text-sm font-medium hover:underline">
                  View
                </Link>
              </div>
            </CardContent>
          </Card>
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
