
import React, { useState } from "react";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SectionNav } from "@/components/dashboard/SectionNav";
import { ChevronRight, Lightbulb } from "lucide-react";
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

      {/* Link to Methodologies Page */}
      <Card className="mb-8 p-4 border-l-4 border-l-primary">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Looking for Analytics Methodology Information?</h2>
            <p className="text-muted-foreground mt-1">
              Learn about MMM, Incrementality Testing, and Multi-Touch Attribution methodologies
            </p>
          </div>
          <Link 
            to="/methodologies"
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            <Lightbulb className="h-5 w-5" />
            <span>Explore Methodologies</span>
          </Link>
        </div>
      </Card>

      <Card className="mb-8 border-l-4 border-l-primary">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-3">Marketing Performance Insights</h2>
          <p className="text-muted-foreground mb-4">
            Dive deep into your marketing strategy with a comprehensive analytics journey. Uncover insights from ROI metrics to channel optimization.
          </p>
          
          <div className="p-4 bg-accent/30 rounded-lg space-y-6">
            <div className="text-sm">
              <p className="font-medium mb-3">Your Analytics Journey Path:</p>
              <ol className="space-y-3 list-decimal list-inside">
                <li className="font-medium text-primary">
                  <span>ROI Summary</span>
                  <p className="ml-6 text-muted-foreground font-normal">Begin with a high-level overview of your overall marketing return on investment</p>
                </li>
                <li>
                  <span>Revenue Trends</span>
                  <p className="ml-6 text-muted-foreground font-normal">Analyze revenue patterns and growth trajectories over time</p>
                </li>
                <li>
                  <span>Channel Performance</span>
                  <p className="ml-6 text-muted-foreground font-normal">Compare effectiveness across different marketing channels</p>
                </li>
                <li>
                  <span>Attribution</span>
                  <p className="ml-6 text-muted-foreground font-normal">Understand which touchpoints drive conversions in the customer journey</p>
                </li>
                <li>
                  <span>Optimization</span>
                  <p className="ml-6 text-muted-foreground font-normal">Discover opportunities to improve campaign efficiency and effectiveness</p>
                </li>
                <li>
                  <span>Forecasting</span>
                  <p className="ml-6 text-muted-foreground font-normal">Project future performance based on historical data and trends</p>
                </li>
                <li>
                  <span>Insights</span>
                  <p className="ml-6 text-muted-foreground font-normal">Extract actionable recommendations to enhance marketing strategy</p>
                </li>
              </ol>
            </div>
            
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
