
import React, { useState, useRef, useEffect } from "react";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SectionNav } from "@/components/dashboard/SectionNav";
import { ChevronRight } from "lucide-react";

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
          <span className="text-sm font-medium text-primary mr-3">Your analytics journey</span>
          <Progress value={progress} className="w-24 h-2" />
        </Card>
      </div>

      <Card className="mb-8 border-l-4 border-l-primary">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-3">Your 7-Step Analytics Journey</h2>
          <p className="text-muted-foreground mb-4">
            Follow this guided path to understand your marketing performance, from high-level metrics to optimization opportunities
          </p>
          
          <div className="p-4 bg-accent/30 rounded-lg">
            <SectionNav 
              sections={journeySections}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </CardContent>
      </Card>

      <AnalyticsOverview />
    </>
  );
};

export default Index;
