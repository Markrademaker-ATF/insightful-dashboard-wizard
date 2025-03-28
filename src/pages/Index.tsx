
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
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { KeyMetricsSection } from "@/components/dashboard/KeyMetricsSection";

const journeySections = [
  { id: "roi", title: "ROI Summary" },
  { id: "revenue", title: "Revenue Trends" },
  { id: "channel", title: "Channel Performance" },
  { id: "attribution", title: "Attribution" },
  { id: "optimization", title: "Optimization" },
  { id: "forecasting", title: "Forecasting" },
  { id: "insights", title: "Insights" }
];

const dummyMetricsData = {
  total: 1250000,
  paid: 425000,
  organic: 320000,
  nonPaid: 275000,
  baseline: 230000
};

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
    <>
      <Helmet>
        <title>Analytics Dashboard - Artefact</title>
      </Helmet>
      
      {/* Header Section with Progress only (logo is now in HeaderBanner) */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 animate-fade-in">
        <div></div> {/* Empty div to maintain layout */}
        
        <Card className="flex items-center px-4 py-2 bg-accent/50 border-none soft-shadow w-full md:w-auto">
          <div className="flex flex-col mr-4">
            <span className="text-sm font-medium text-primary">Analytics Journey</span>
            <span className="text-xs text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-24 h-2" />
        </Card>
      </div>

      {/* Statistics Cards */}
      <div className={`mb-8 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: "100ms" }}>
        <KeyMetricsSection 
          loading={false} 
          latestPeriodData={dummyMetricsData}
        />
      </div>

      {/* Marketing Performance Insights - Enhanced */}
      <div className="sleek-gradient p-8 space-y-6 mb-8 animate-fade-in soft-shadow" style={{ animationDelay: "200ms" }}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="p-4 rounded-full bg-blue-100/70 animate-float">
            <Target className="h-8 w-8 text-blue-700" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Marketing Performance Insights</h2>
            <p className="text-muted-foreground text-balance">
              Dive deep into your marketing strategy with a comprehensive analytics journey. 
              Uncover insights from ROI metrics to channel optimization.
            </p>
          </div>
          <Link 
            to="/data" 
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <span>View Detailed Data</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Analytics Overview with enhanced styling */}
        <div className="bg-white/70 rounded-xl p-6 soft-shadow">
          <AnalyticsOverview />
        </div>
        
        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <Card className="glass-card hover-scale transition-smooth hover:border-primary/30">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="p-3 rounded-full bg-blue-50">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Channel Analysis</h3>
                <p className="text-sm text-muted-foreground">Compare performance across channels</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card hover-scale transition-smooth hover:border-primary/30">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="p-3 rounded-full bg-green-50">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Revenue Tracking</h3>
                <p className="text-sm text-muted-foreground">Monitor trends and predictions</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card hover-scale transition-smooth hover:border-primary/30">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="p-3 rounded-full bg-amber-50">
                <Zap className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Quick Insights</h3>
                <p className="text-sm text-muted-foreground">Actionable recommendations</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Index;
