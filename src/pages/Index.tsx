
import React, { useState, useEffect } from "react";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { Helmet } from "react-helmet";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
  FileBarChart
} from "lucide-react";
import { Link } from "react-router-dom";

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
  
  return (
    <div className="space-y-8">
      <Helmet>
        <title>Analytics Dashboard - Artefact</title>
      </Helmet>
      
      {/* Header Section with Progress */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between animate-fade-in">
        <div className="mb-4 md:mb-0"></div> {/* Empty div to maintain layout */}
        
        <Card className="flex items-center px-4 py-2 bg-accent/50 border-none soft-shadow w-full md:w-auto hover:bg-accent/70 transition-all">
          <div className="flex flex-col mr-4">
            <span className="text-sm font-medium text-primary">Analytics Journey</span>
            <span className="text-xs text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-24 h-2 bg-gray-200" />
        </Card>
      </div>

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
