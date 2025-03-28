
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
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Your Analytics Journey Path:</h3>
          <ol className="space-y-3 pl-6 border-l-2 border-blue-200">
            {journeySections.map((section, index) => (
              <li 
                key={section.id} 
                className={`pl-4 -ml-[3px] border-l-2 transition-colors duration-300 ${
                  activeSection === section.id 
                    ? 'border-blue-500 text-blue-700' 
                    : 'border-transparent text-muted-foreground hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{section.title}</span>
                  {index === 0 && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      Current Step
                    </span>
                  )}
                </div>
                {index === 0 && (
                  <p className="text-sm mt-1">
                    Begin with a high-level overview of your overall marketing return on investment
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-muted-foreground">
            Progress through your analytics journey
          </p>
          <Progress value={progress} className="w-48 h-2" />
        </div>
      </div>

      <AnalyticsOverview />
    </>
  );
};

export default Index;
