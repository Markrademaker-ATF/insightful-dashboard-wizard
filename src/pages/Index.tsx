
import React, { useState } from "react";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SectionNav } from "@/components/dashboard/SectionNav";
import { ChevronRight, Lightbulb, Target } from "lucide-react";
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
  
  // Calculate progress based on active section
  const progress = ((journeySections.findIndex(s => s.id === activeSection) + 1) / journeySections.length) * 100;
  
  return (
    <>
      <Helmet>
        <title>Analytics Dashboard - Artefact</title>
      </Helmet>
      <div className="mb-6 flex items-center justify-between">
        <img 
          src="/lovable-uploads/c91593ad-aa3a-4f49-b9f4-86d049161286.png" 
          alt="Artefact Logo" 
          className="h-12" 
        />
        
        <Card className="inline-flex items-center px-4 py-2 bg-accent/50 border-none">
          <span className="text-sm font-medium text-primary mr-3">Analytics Journey Progress</span>
          <Progress value={progress} className="w-24 h-2" />
        </Card>
      </div>

      {/* Marketing Performance Insights - Redesigned */}
      <div className="bg-gradient-to-br from-blue-50 to-white/50 rounded-2xl p-8 space-y-6 mb-8 animate-fade-in">
        <div className="flex items-center gap-6">
          <div className="p-4 rounded-full bg-blue-100/70">
            <Target className="h-8 w-8 text-blue-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Marketing Performance Insights</h2>
            <p className="text-muted-foreground">
              Dive deep into your marketing strategy with a comprehensive analytics journey. 
              Uncover insights from ROI metrics to channel optimization.
            </p>
          </div>
        </div>

        <AnalyticsOverview />
      </div>
    </>
  );
};

export default Index;
